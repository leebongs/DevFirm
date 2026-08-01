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
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import { illustrations } from "@/content/illustrations";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.about,
    path: "/about",
    lang: locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  return (
    <>
      <PageHero
        photo={photos.aboutHero}
        eyebrow={t.about.hero.eyebrow}
        title={t.about.hero.title}
        lead={t.about.hero.lead}
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
            id={t.about.metaphor.id}
            eyebrow={t.about.metaphor.eyebrow}
            title={t.about.metaphor.title}
            lead={t.about.metaphor.lead}
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
            leftLabel={t.about.metaphor.comparison.leftLabel}
            rightLabel={t.about.metaphor.comparison.rightLabel}
            rows={t.about.metaphor.comparison.rows}
          />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.about.backoffice.id}
            eyebrow={t.about.backoffice.eyebrow}
            title={t.about.backoffice.title}
            lead={t.about.backoffice.lead}
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
            {t.about.backoffice.items.map((item) => (
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
            id={t.about.history.id}
            eyebrow={t.about.history.eyebrow}
            title={t.about.history.title}
          />
          <TimelineList className="mt-8" items={t.about.history.items} />
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
            id={t.about.profile.id}
            eyebrow={t.about.profile.eyebrow}
            title={t.about.profile.title}
          />
          <dl className="border-border divide-border mt-8 divide-y rounded-lg border">
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-muted-foreground text-sm">
                {t.ui.footer.businessNumberLabel}
              </dt>
              <dd className="text-sm font-medium">{site.businessNumber}</dd>
            </div>
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-muted-foreground text-sm">
                {t.ui.footer.addressLabel}
              </dt>
              <dd className="text-sm font-medium break-keep">
                {t.site.addressFull}
              </dd>
            </div>
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-muted-foreground text-sm">
                {t.ui.footer.telLabel}
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
        title={t.about.cta.title}
        desc={t.about.cta.desc}
        cta={t.about.cta.primary}
        secondary={t.about.cta.secondary}
      />
    </>
  );
}
