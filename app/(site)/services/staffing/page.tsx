import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { StepFlow } from "@/components/content/step-flow";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { staffing } from "@/content/services";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.staffing,
  path: "/services/staffing",
});

export default function StaffingPage() {
  return (
    <>
      <PageHero
        eyebrow={staffing.hero.eyebrow}
        title={staffing.hero.title}
        lead={staffing.hero.lead}
      />

      <ArticleShell href="/services/staffing">
        <section>
          <SectionHeading
            id={staffing.difference.id}
            eyebrow={staffing.difference.eyebrow}
            title={staffing.difference.title}
            lead={staffing.difference.lead}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {staffing.difference.items.map((item) => (
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
            id={staffing.formats.id}
            eyebrow={staffing.formats.eyebrow}
            title={staffing.formats.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {staffing.formats.items.map((item) => (
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
            id={staffing.process.id}
            eyebrow={staffing.process.eyebrow}
            title={staffing.process.title}
          />
          <StepFlow className="mt-8" steps={staffing.process.steps} />
        </section>
      </ArticleShell>

      <CTASection
        title={staffing.cta.title}
        desc={staffing.cta.desc}
        cta={staffing.cta.primary}
      />
    </>
  );
}
