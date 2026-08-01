import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { StepFlow } from "@/components/content/step-flow";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.software,
    path: "/services/software",
    lang: locale,
  });
}

export default async function SoftwarePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  return (
    <>
      <PageHero
        photo={photos.servicesSoftwareHero}
        eyebrow={t.services.software.hero.eyebrow}
        title={t.services.software.hero.title}
        lead={t.services.software.hero.lead}
      />

      <ArticleShell href="/services/software">
        <section>
          <SectionHeading
            id={t.services.software.areas.id}
            eyebrow={t.services.software.areas.eyebrow}
            title={t.services.software.areas.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.services.software.areas.items.map((item) => (
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
            id={t.services.software.process.id}
            eyebrow={t.services.software.process.eyebrow}
            title={t.services.software.process.title}
          />
          <StepFlow
            className="mt-8 lg:grid-cols-3"
            steps={t.services.software.process.steps}
          />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.services.software.quality.id}
            eyebrow={t.services.software.quality.eyebrow}
            title={t.services.software.quality.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {t.services.software.quality.items.map((item) => (
              <li key={item} className="p-4 text-sm break-keep">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 max-w-[68ch] text-sm leading-relaxed break-keep">
            {t.services.software.quality.note}
          </p>
        </section>
      </ArticleShell>

      <CTASection
        title={t.services.software.cta.title}
        desc={t.services.software.cta.desc}
        cta={t.services.software.cta.primary}
      />
    </>
  );
}
