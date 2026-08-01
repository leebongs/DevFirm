import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { physicalAi } from "@/content/solutions";
import { agents } from "@/content/agents";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.physicalAi,
  path: "/solutions/physical-ai",
});

export default function PhysicalAiPage() {
  return (
    <>
      <PageHero
        eyebrow={physicalAi.hero.eyebrow}
        title={physicalAi.hero.title}
        lead={physicalAi.hero.lead}
        art={illustrations.physicalAi}
      />

      <ArticleShell href="/solutions/physical-ai">
        <section>
          <SectionHeading
            id={physicalAi.problem.id}
            eyebrow={physicalAi.problem.eyebrow}
            title={physicalAi.problem.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {physicalAi.problem.items.map((item) => (
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
            id={physicalAi.stack.id}
            eyebrow={physicalAi.stack.eyebrow}
            title={physicalAi.stack.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {physicalAi.stack.items.map((item) => (
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
            id={physicalAi.industries.id}
            eyebrow={physicalAi.industries.eyebrow}
            title={physicalAi.industries.title}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {agents.map((agent) => (
              <li key={agent.slug}>
                <IndustryAgentCard agent={agent} />
              </li>
            ))}
          </ul>
        </section>
      </ArticleShell>

      <CTASection
        title={physicalAi.cta.title}
        desc={physicalAi.cta.desc}
        cta={physicalAi.cta.primary}
        secondary={physicalAi.cta.secondary}
      />
    </>
  );
}
