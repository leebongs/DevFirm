import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/typography/page-hero";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CTASection } from "@/components/content/cta-section";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";
import { careersPage, jobs } from "@/content/careers";
import { site } from "@/content/site";

type Params = { slug: string };

/** 빌드 시점에 공고 수만큼 정적 페이지를 만든다(§5.4). */
export function generateStaticParams(): Params[] {
  return jobs.map((job) => ({ slug: job.slug }));
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
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) return {};

  return buildMetadata({
    title: job.title,
    description: careersPage.seoDescription(job),
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
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  const applyHref = `mailto:${site.email}?subject=${encodeURIComponent(
    careersPage.applySubject(job.title),
  )}`;

  return (
    <>
      <PageHero eyebrow={job.team} title={job.title} />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/about/careers" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant={job.status === "open" ? "default" : "secondary"}>
            {careersPage.statusLabel[job.status]}
          </Badge>
          <span className="text-muted-foreground text-sm">
            {job.employmentType} · {careersPage.fields.deadline} {job.deadline}
          </span>
        </div>

        <div className="mt-10 max-w-[68ch] space-y-10">
          {SECTIONS.map(([key]) => (
            <section key={key}>
              <h2 className="text-lg font-semibold">
                {careersPage.fields[key]}
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
          {careersPage.fields.apply}
        </a>
      </Container>

      <CTASection
        title={careersPage.cta.title}
        desc={careersPage.cta.desc}
        cta={careersPage.cta.primary}
        secondary={careersPage.cta.secondary}
      />
    </>
  );
}
