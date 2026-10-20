import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { Illustration } from "@/components/content/illustration";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import { illustrations } from "@/content/illustrations";
import { getDocAiEntry } from "@/content/docai-entry";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.officeAi,
    path: "/solutions/office-ai",
    lang: locale,
  });
}

export default async function OfficeAiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const docAiEntry = getDocAiEntry(locale);

  return (
    <>
      <PageHero
        eyebrow={t.solutions.officeAi.hero.eyebrow}
        title={t.solutions.officeAi.hero.title}
        lead={t.solutions.officeAi.hero.lead}
        art={illustrations.officeAi}
        actions={
          <Link
            href={docAiEntry.href}
            className="border-input hover:bg-accent focus-visible:ring-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
          >
            {docAiEntry.officeAiAction}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      />

      <ArticleShell href="/solutions/office-ai">
        <section>
          <SectionHeading
            id={t.solutions.officeAi.problem.id}
            eyebrow={t.solutions.officeAi.problem.eyebrow}
            title={t.solutions.officeAi.problem.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.solutions.officeAi.problem.items.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.solutions.officeAi.capabilities.id}
            eyebrow={t.solutions.officeAi.capabilities.eyebrow}
            title={t.solutions.officeAi.capabilities.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.solutions.officeAi.capabilities.items.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.solutions.officeAi.physical.id}
            eyebrow={t.solutions.officeAi.physical.eyebrow}
            title={t.solutions.officeAi.physical.title}
            lead={t.solutions.officeAi.physical.lead}
          />
          {/*
            이 섹션은 제목만 있고 본문이 비어 있었다. 문구가 주장하는 것
            ("현장 사진 한 장이 결재 문서까지 가는 경로를 하나로")이 곧 위상
            주장이라 문장보다 도형이 낫다. 자산은 이미 있는 것을 쓴다 —
            /solutions 허브가 같은 도형으로 같은 구조를 말하고 있고, 여기서는
            그 구조를 최과장AI 쪽에서 다시 본다.
          */}
          <Illustration
            src={illustrations.twoAxes.src}
            width={illustrations.twoAxes.width}
            height={illustrations.twoAxes.height}
            alt={illustrations.twoAxes.alt}
            className="border-border bg-muted/40 mt-8 rounded-lg border p-5 lg:p-8"
          />
        </section>
      </ArticleShell>

      <CTASection
        title={t.solutions.officeAi.cta.title}
        desc={t.solutions.officeAi.cta.desc}
        cta={t.solutions.officeAi.cta.primary}
        secondary={t.solutions.officeAi.cta.secondary}
      />
    </>
  );
}
