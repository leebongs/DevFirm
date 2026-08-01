import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
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
    ...t.seo.page.services,
    path: "/services",
    lang: locale,
  });
}

export default async function ServicesPage({
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
        photo={photos.servicesHero}
        eyebrow={t.services.hub.hero.eyebrow}
        title={t.services.hub.hero.title}
        lead={t.services.hub.hero.lead}
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {t.services.hub.cards.map((card) => (
            <FeatureCard
              key={card.href}
              title={card.title}
              desc={card.desc}
              href={card.href}
              linkLabel={card.linkLabel}
            />
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={t.services.hub.collaboration.id}
          eyebrow={t.services.hub.collaboration.eyebrow}
          title={t.services.hub.collaboration.title}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t.services.hub.collaboration.items.map((item) => (
            <FeatureCard key={item.title} title={item.title} desc={item.desc} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          id={t.services.hub.domains.id}
          eyebrow={t.services.hub.domains.eyebrow}
          title={t.services.hub.domains.title}
        />
        <ul className="border-border divide-border mt-8 max-w-[68ch] divide-y rounded-lg border">
          {t.services.hub.domains.items.map((item) => (
            <li key={item} className="p-4 text-sm break-keep">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        title={t.services.hub.cta.title}
        desc={t.services.hub.cta.desc}
        cta={t.services.hub.cta.primary}
      />
    </>
  );
}
