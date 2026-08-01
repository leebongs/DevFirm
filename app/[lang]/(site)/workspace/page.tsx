import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { CTASection } from "@/components/content/cta-section";
import { MapEmbed } from "@/components/content/map-embed";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.workspace,
    path: "/workspace",
    lang: locale,
  });
}

export default async function WorkspacePage({
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
        photo={photos.workspaceHero}
        eyebrow={t.workspace.hero.eyebrow}
        title={t.workspace.hero.title}
        lead={t.workspace.hero.lead}
      />

      <ArticleShell href="/workspace">
        <section>
          <SectionHeading
            id={t.workspace.concept.id}
            eyebrow={t.workspace.concept.eyebrow}
            title={t.workspace.concept.title}
            lead={t.workspace.concept.lead}
          />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.workspace.facilities.id}
            eyebrow={t.workspace.facilities.eyebrow}
            title={t.workspace.facilities.title}
          />
          {/*
            O-2 는 "기존 사진 재사용"이었지만 확보된 사진이 없었다. 저해상도
            사진으로 채우느니 일러스트로 공간의 성격을 전달한다 — 실사진이
            확보되면 같은 자리에 교체하면 된다(치수만 맞추면 CLS 영향 없음).
          */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.workspace.facilities.items.map((item) => (
              <FeatureCard
                key={item.title}
                art={item.art}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.workspace.tenants.id}
            eyebrow={t.workspace.tenants.eyebrow}
            title={t.workspace.tenants.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {t.workspace.tenants.items.map((item) => (
              <li key={item} className="p-4 text-sm break-keep">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.workspace.pricing.id}
            eyebrow={t.workspace.pricing.eyebrow}
            title={t.workspace.pricing.title}
          />
          <p className="text-muted-foreground mt-6 max-w-[68ch] leading-[1.75] break-keep">
            {t.workspace.pricing.note}
          </p>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.workspace.location.id}
            eyebrow={t.workspace.location.eyebrow}
            title={t.workspace.location.title}
          />
          <div className="border-border mt-8 max-w-[68ch] overflow-hidden rounded-lg border">
            <MapEmbed title={t.workspace.location.mapTitle} />
            <div className="border-border border-t p-5">
              <p className="text-sm break-keep">
                {t.workspace.location.address}
              </p>
              <a
                href={t.workspace.location.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {t.workspace.location.mapLinkLabel}
                <ExternalLink className="size-3.5" aria-hidden />
                <span className="sr-only">{t.ui.nav.externalLink}</span>
              </a>
            </div>
          </div>
        </section>
      </ArticleShell>

      <CTASection
        title={t.workspace.cta.title}
        desc={t.workspace.cta.desc}
        cta={t.workspace.cta.primary}
      />
    </>
  );
}
