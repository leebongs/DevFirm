import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { StepFlow } from "@/components/content/step-flow";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { academy, SCHOOLS } from "@/content/academy";
import { pageSeo } from "@/content/seo";
import { ui } from "@/content/ui";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.academy,
  path: "/academy",
});

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow={academy.hero.eyebrow}
        title={academy.hero.title}
        lead={academy.hero.lead}
        art={illustrations.academy}
      />

      <Section>
        <SectionHeading
          id={academy.pbl.id}
          eyebrow={academy.pbl.eyebrow}
          title={academy.pbl.title}
          lead={academy.pbl.lead}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {academy.pbl.items.map((item) => (
            <FeatureCard key={item.title} title={item.title} desc={item.desc} />
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={academy.schools.id}
          eyebrow={academy.schools.eyebrow}
          title={academy.schools.title}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {SCHOOLS.map((school) => (
            <FeatureCard
              key={school.key}
              art={school.art}
              title={school.name}
              desc={school.desc}
              href="/academy/courses"
              linkLabel={academy.cta.secondary.label}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          id={academy.external.id}
          eyebrow={academy.external.eyebrow}
          title={academy.external.title}
        />
        <a
          href={academy.external.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring mt-8 block max-w-[68ch] rounded-lg border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <p className="text-muted-foreground text-sm break-keep">
            {academy.external.desc}
          </p>
          <span className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
            {academy.external.linkLabel}
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only">{ui.nav.externalLink}</span>
          </span>
        </a>
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={academy.process.id}
          eyebrow={academy.process.eyebrow}
          title={academy.process.title}
        />
        <StepFlow className="mt-10" steps={academy.process.steps} />
      </Section>

      <CTASection
        title={academy.cta.title}
        desc={academy.cta.desc}
        cta={academy.cta.primary}
        secondary={academy.cta.secondary}
      />
    </>
  );
}
