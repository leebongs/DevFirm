import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { services } from "@/content/services";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.services,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        photo={photos.servicesHero}
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        lead={services.hero.lead}
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {services.cards.map((card) => (
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
          id={services.collaboration.id}
          eyebrow={services.collaboration.eyebrow}
          title={services.collaboration.title}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {services.collaboration.items.map((item) => (
            <FeatureCard key={item.title} title={item.title} desc={item.desc} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          id={services.domains.id}
          eyebrow={services.domains.eyebrow}
          title={services.domains.title}
        />
        <ul className="border-border divide-border mt-8 max-w-[68ch] divide-y rounded-lg border">
          {services.domains.items.map((item) => (
            <li key={item} className="p-4 text-sm break-keep">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        title={services.cta.title}
        desc={services.cta.desc}
        cta={services.cta.primary}
      />
    </>
  );
}
