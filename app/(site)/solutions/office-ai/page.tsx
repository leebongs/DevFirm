import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { officeAi } from "@/content/solutions";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.officeAi,
  path: "/solutions/office-ai",
});

export default function OfficeAiPage() {
  return (
    <>
      <PageHero
        eyebrow={officeAi.hero.eyebrow}
        title={officeAi.hero.title}
        lead={officeAi.hero.lead}
      />

      <ArticleShell href="/solutions/office-ai">
        <section>
          <SectionHeading
            id={officeAi.problem.id}
            eyebrow={officeAi.problem.eyebrow}
            title={officeAi.problem.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {officeAi.problem.items.map((item) => (
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
            id={officeAi.capabilities.id}
            eyebrow={officeAi.capabilities.eyebrow}
            title={officeAi.capabilities.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {officeAi.capabilities.items.map((item) => (
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
            id={officeAi.physical.id}
            eyebrow={officeAi.physical.eyebrow}
            title={officeAi.physical.title}
            lead={officeAi.physical.lead}
          />
        </section>
      </ArticleShell>

      <CTASection
        title={officeAi.cta.title}
        desc={officeAi.cta.desc}
        cta={officeAi.cta.primary}
        secondary={officeAi.cta.secondary}
      />
    </>
  );
}
