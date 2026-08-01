import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CTASection } from "@/components/content/cta-section";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";
import {
  DEFAULT_LOCALE,
  isLocale,
  localeCodes,
  type Locale,
} from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
// 슬러그는 언어와 무관한 구조 데이터다. generateStaticParams 는
// 동기라 사전을 await 할 수 없으므로 원문 배열로 열거한다.
import { jobs } from "@/content/careers";
import { site } from "@/content/site";

type Params = { lang: string; slug: string };

/** 빌드 시점에 공고 수만큼 정적 페이지를 만든다(§5.4). */
/**
 * 언어 × 슬러그. 언어를 곱하지 않으면 기본 언어판만 굳고
 * 나머지는 dynamicParams=false 에 걸려 404 가 된다.
 */
export function generateStaticParams(): Params[] {
  return localeCodes.flatMap((lang) =>
    jobs.map((job) => ({ slug: job.slug })).map((p) => ({ lang, ...p })),
  );
}

/**
 * Next 16 부터 `params` 는 Promise 다(§12.1 D-4).
 * 동기 접근은 완전히 제거되어 반드시 await 해야 한다.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const job = t.careers.jobs.find((item) => item.slug === slug);
  if (!job) return {};

  return buildMetadata({
    title: job.title,
    description: t.careers.page.seoDescription(job),
    path: `/about/careers/${job.slug}`,
  });
}

const SECTIONS = [
  ["responsibilities", "responsibilities"],
  ["requirements", "requirements"],
  ["preferred", "preferred"],
  ["conditions", "conditions"],
] as const;

export default async function JobPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const job = t.careers.jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  const applyHref = `mailto:${site.email}?subject=${encodeURIComponent(
    t.careers.page.applySubject(job.title),
  )}`;

  return (
    <>
      <PageHero photo={photos.aboutHero} eyebrow={job.team} title={job.title} />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/about/careers" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant={job.status === "open" ? "default" : "secondary"}>
            {t.careers.page.statusLabel[job.status]}
          </Badge>
          <span className="text-muted-foreground text-sm">
            {job.employmentType} · {t.careers.page.fields.deadline}{" "}
            {job.deadline}
          </span>
        </div>

        <div className="mt-10 max-w-[68ch] space-y-10">
          {SECTIONS.map(([key]) => (
            <section key={key}>
              <h2 className="text-lg font-semibold">
                {t.careers.page.fields[key]}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {job[key].map((item) => (
                  <li key={item} className="leading-[1.75] break-keep">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <a
          href={applyHref}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mt-10 inline-flex min-h-11 items-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
        >
          {t.careers.page.fields.apply}
        </a>
      </Container>

      <CTASection
        title={t.careers.page.cta.title}
        desc={t.careers.page.cta.desc}
        cta={t.careers.page.cta.primary}
        secondary={t.careers.page.cta.secondary}
      />
    </>
  );
}
