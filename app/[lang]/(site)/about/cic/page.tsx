import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { StepFlow } from "@/components/content/step-flow";
import { CTASection } from "@/components/content/cta-section";
import { Illustration } from "@/components/content/illustration";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import { illustrations } from "@/content/illustrations";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.cic,
    path: "/about/cic",
    lang: locale,
  });
}

export default async function CicPage({
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
        photo={photos.aboutHero}
        eyebrow={t.cic.hero.eyebrow}
        title={t.cic.hero.title}
        lead={t.cic.hero.lead}
      />

      <ArticleShell href="/about/cic">
        <section>
          <SectionHeading
            id={t.cic.what.id}
            eyebrow={t.cic.what.eyebrow}
            title={t.cic.what.title}
            lead={t.cic.what.lead}
          />
          <Illustration
            src={illustrations.cic.src}
            width={illustrations.cic.width}
            height={illustrations.cic.height}
            alt={illustrations.cic.alt}
            className="border-border bg-muted/50 mt-8 rounded-lg border p-5 lg:p-8"
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {t.cic.what.items.map((item) => (
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
            id={t.cic.operation.id}
            eyebrow={t.cic.operation.eyebrow}
            title={t.cic.operation.title}
          />
          <StepFlow className="mt-8" steps={t.cic.operation.steps} />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.cic.roadmap.id}
            eyebrow={t.cic.roadmap.eyebrow}
            title={t.cic.roadmap.title}
            lead={t.cic.roadmap.lead}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.cic.roadmap.items.map((item) => (
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
            id={t.cic.conditions.id}
            eyebrow={t.cic.conditions.eyebrow}
            title={t.cic.conditions.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {t.cic.conditions.items.map((item) => (
              <li key={item} className="p-4 text-sm break-keep">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 max-w-[68ch] text-sm leading-relaxed break-keep">
            {t.cic.conditions.note}
          </p>
        </section>
      </ArticleShell>

      <CTASection
        title={t.cic.cta.title}
        desc={t.cic.cta.desc}
        cta={t.cic.cta.primary}
      />
    </>
  );
}
