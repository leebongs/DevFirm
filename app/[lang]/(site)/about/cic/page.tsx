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
import { illustrations } from "@/content/illustrations";
import { cic } from "@/content/cic";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.cic,
  path: "/about/cic",
});

export default function CicPage() {
  return (
    <>
      <PageHero
        photo={photos.aboutHero}
        eyebrow={cic.hero.eyebrow}
        title={cic.hero.title}
        lead={cic.hero.lead}
      />

      <ArticleShell href="/about/cic">
        <section>
          <SectionHeading
            id={cic.what.id}
            eyebrow={cic.what.eyebrow}
            title={cic.what.title}
            lead={cic.what.lead}
          />
          <Illustration
            src={illustrations.cic.src}
            width={illustrations.cic.width}
            height={illustrations.cic.height}
            alt={illustrations.cic.alt}
            className="border-border bg-muted/50 mt-8 rounded-lg border p-5 lg:p-8"
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {cic.what.items.map((item) => (
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
            id={cic.operation.id}
            eyebrow={cic.operation.eyebrow}
            title={cic.operation.title}
          />
          <StepFlow className="mt-8" steps={cic.operation.steps} />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={cic.roadmap.id}
            eyebrow={cic.roadmap.eyebrow}
            title={cic.roadmap.title}
            lead={cic.roadmap.lead}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {cic.roadmap.items.map((item) => (
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
            id={cic.conditions.id}
            eyebrow={cic.conditions.eyebrow}
            title={cic.conditions.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {cic.conditions.items.map((item) => (
              <li key={item} className="p-4 text-sm break-keep">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 max-w-[68ch] text-sm leading-relaxed break-keep">
            {cic.conditions.note}
          </p>
        </section>
      </ArticleShell>

      <CTASection
        title={cic.cta.title}
        desc={cic.cta.desc}
        cta={cic.cta.primary}
      />
    </>
  );
}
