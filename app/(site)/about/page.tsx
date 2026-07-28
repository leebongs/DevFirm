import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { ComparisonTable } from "@/components/content/comparison-table";
import { FeatureCard } from "@/components/content/feature-card";
import { TimelineList } from "@/components/content/timeline-list";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { about } from "@/content/about";
import { pageSeo } from "@/content/seo";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.about,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        lead={about.hero.lead}
      />

      <ArticleShell href="/about">
        <section>
          <SectionHeading
            id={about.metaphor.id}
            eyebrow={about.metaphor.eyebrow}
            title={about.metaphor.title}
            lead={about.metaphor.lead}
          />
          <ComparisonTable
            className="mt-8"
            leftLabel={about.metaphor.comparison.leftLabel}
            rightLabel={about.metaphor.comparison.rightLabel}
            rows={about.metaphor.comparison.rows}
          />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={about.backoffice.id}
            eyebrow={about.backoffice.eyebrow}
            title={about.backoffice.title}
            lead={about.backoffice.lead}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {about.backoffice.items.map((item) => (
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
            id={about.history.id}
            eyebrow={about.history.eyebrow}
            title={about.history.title}
          />
          <TimelineList className="mt-8" items={about.history.items} />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={about.profile.id}
            eyebrow={about.profile.eyebrow}
            title={about.profile.title}
          />
          <dl className="border-border divide-border mt-8 divide-y rounded-lg border">
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-muted-foreground text-sm">
                {ui.footer.businessNumberLabel}
              </dt>
              <dd className="text-sm font-medium">{site.businessNumber}</dd>
            </div>
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-muted-foreground text-sm">
                {ui.footer.addressLabel}
              </dt>
              <dd className="text-sm font-medium break-keep">
                {site.address.full}
              </dd>
            </div>
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-muted-foreground text-sm">
                {ui.footer.telLabel}
              </dt>
              <dd className="text-sm font-medium">
                <a href={site.telHref} className="hover:text-primary">
                  {site.tel}
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </ArticleShell>

      <CTASection
        title={about.cta.title}
        desc={about.cta.desc}
        cta={about.cta.primary}
        secondary={about.cta.secondary}
      />
    </>
  );
}
