import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { StepFlow } from "@/components/content/step-flow";
import { FAQAccordion } from "@/components/content/faq-accordion";
import { CTASection } from "@/components/content/cta-section";
import { Illustration } from "@/components/content/illustration";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { solutions } from "@/content/solutions";
import { agents } from "@/content/agents";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.solutions,
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={solutions.hero.eyebrow}
        title={solutions.hero.title}
        lead={solutions.hero.lead}
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {solutions.axes.map((axis, index) => (
            <Link
              key={axis.href}
              href={axis.href}
              className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring group overflow-hidden rounded-lg border transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="bg-muted/60 border-border border-b">
                <Illustration
                  src={
                    index === 0
                      ? illustrations.physicalAi.src
                      : illustrations.officeAi.src
                  }
                  width={illustrations.physicalAi.width}
                  height={illustrations.physicalAi.height}
                  decorative
                />
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
                  {axis.eyebrow}
                </p>
                <p className="mt-3 text-2xl font-bold break-keep">
                  {axis.name}
                </p>
                <p className="text-muted-foreground mt-3 leading-relaxed break-keep">
                  {axis.desc}
                </p>
                <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
                  {axis.linkLabel}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={solutions.agentsSection.id}
          eyebrow={solutions.agentsSection.eyebrow}
          title={solutions.agentsSection.title}
          lead={solutions.agentsSection.lead}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {agents.map((agent) => (
            <li key={agent.slug}>
              <IndustryAgentCard agent={agent} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          id={solutions.process.id}
          eyebrow={solutions.process.eyebrow}
          title={solutions.process.title}
        />
        <StepFlow className="mt-10" steps={solutions.process.steps} />
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={solutions.faq.id}
          eyebrow={solutions.faq.eyebrow}
          title={solutions.faq.title}
        />
        <div className="mt-8 max-w-[68ch]">
          <FAQAccordion items={solutions.faq.items} />
        </div>
      </Section>

      <CTASection
        title={solutions.cta.title}
        desc={solutions.cta.desc}
        cta={solutions.cta.primary}
      />
    </>
  );
}
