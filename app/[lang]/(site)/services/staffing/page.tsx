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
    ...t.seo.page.staffing,
    path: "/services/staffing",
    lang: locale,
  });
}

export default async function StaffingPage({
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
        photo={photos.servicesStaffingHero}
        eyebrow={t.services.staffing.hero.eyebrow}
        title={t.services.staffing.hero.title}
        lead={t.services.staffing.hero.lead}
      />

      <ArticleShell href="/services/staffing">
        <section>
          <SectionHeading
            id={t.services.staffing.difference.id}
            eyebrow={t.services.staffing.difference.eyebrow}
            title={t.services.staffing.difference.title}
            lead={t.services.staffing.difference.lead}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.services.staffing.difference.items.map((item) => (
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
            id={t.services.staffing.formats.id}
            eyebrow={t.services.staffing.formats.eyebrow}
            title={t.services.staffing.formats.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.services.staffing.formats.items.map((item) => (
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
            id={t.services.staffing.process.id}
            eyebrow={t.services.staffing.process.eyebrow}
            title={t.services.staffing.process.title}
          />
          <StepFlow
            className="mt-8"
            steps={t.services.staffing.process.steps}
          />
        </section>
      </ArticleShell>

      <CTASection
        title={t.services.staffing.cta.title}
        desc={t.services.staffing.cta.desc}
        cta={t.services.staffing.cta.primary}
      />
    </>
  );
}
