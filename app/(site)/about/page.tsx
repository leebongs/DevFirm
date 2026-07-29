import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { ComparisonTable } from "@/components/content/comparison-table";
import { FeatureCard } from "@/components/content/feature-card";
import { TimelineList } from "@/components/content/timeline-list";
import { CTASection } from "@/components/content/cta-section";
import { Illustration } from "@/components/content/illustration";
import { Photo } from "@/components/content/photo";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { photos } from "@/content/photos";
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
        {/* 일하는 모습을 먼저 보여주고 구조 설명으로 들어간다 */}
        <Photo
          photo={photos.aboutTeam}
          sizes="(min-width: 1280px) 60rem, 100vw"
          className="aspect-[16/9]"
        />

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={about.metaphor.id}
            eyebrow={about.metaphor.eyebrow}
            title={about.metaphor.title}
            lead={about.metaphor.lead}
          />
          <Illustration
            src={illustrations.lawfirmModel.src}
            width={illustrations.lawfirmModel.width}
            height={illustrations.lawfirmModel.height}
            alt={illustrations.lawfirmModel.alt}
            className="border-border bg-muted/50 mt-8 rounded-lg border p-5 lg:p-8"
          />
          <ComparisonTable
            className="mt-6"
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
          <Illustration
            src={illustrations.backoffice.src}
            width={illustrations.backoffice.width}
            height={illustrations.backoffice.height}
            alt={illustrations.backoffice.alt}
            className="border-border bg-muted/50 mt-8 rounded-lg border p-5 lg:p-8"
          />
          {/* 개인과 계약할 때의 위험을 법인이 흡수한다는 구조를 도형으로 */}
          <Illustration
            src={illustrations.risk.src}
            width={illustrations.risk.width}
            height={illustrations.risk.height}
            alt={illustrations.risk.alt}
            className="border-border bg-muted/50 mt-5 rounded-lg border p-5 lg:p-8"
          />
          <Photo
            photo={photos.aboutBackoffice}
            sizes="(min-width: 1280px) 60rem, 100vw"
            className="mt-5 aspect-[16/9]"
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
          {/* 개인이 회사 안에서 어떻게 커지는지 — 연혁과 짝이 되는 축 */}
          <Illustration
            src={illustrations.growth.src}
            width={illustrations.growth.width}
            height={illustrations.growth.height}
            alt={illustrations.growth.alt}
            className="border-border bg-muted/50 mt-8 rounded-lg border p-5 lg:p-8"
          />
          <Photo
            photo={photos.aboutSpace}
            sizes="(min-width: 1280px) 60rem, 100vw"
            className="mt-5 aspect-[16/9]"
          />
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
