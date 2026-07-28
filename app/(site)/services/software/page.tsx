import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { StepFlow } from "@/components/content/step-flow";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { software } from "@/content/services";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.software,
  path: "/services/software",
});

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow={software.hero.eyebrow}
        title={software.hero.title}
        lead={software.hero.lead}
      />

      <ArticleShell href="/services/software">
        <section>
          <SectionHeading
            id={software.areas.id}
            eyebrow={software.areas.eyebrow}
            title={software.areas.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {software.areas.items.map((item) => (
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
            id={software.process.id}
            eyebrow={software.process.eyebrow}
            title={software.process.title}
          />
          <StepFlow
            className="mt-8 lg:grid-cols-3"
            steps={software.process.steps}
          />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={software.quality.id}
            eyebrow={software.quality.eyebrow}
            title={software.quality.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {software.quality.items.map((item) => (
              <li key={item} className="p-4 text-sm break-keep">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 max-w-[68ch] text-sm leading-relaxed break-keep">
            {software.quality.note}
          </p>
        </section>
      </ArticleShell>

      <CTASection
        title={software.cta.title}
        desc={software.cta.desc}
        cta={software.cta.primary}
      />
    </>
  );
}
