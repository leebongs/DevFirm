import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { CTASection } from "@/components/content/cta-section";
import { Illustration } from "@/components/content/illustration";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { workspace } from "@/content/workspace";
import { pageSeo } from "@/content/seo";
import { ui } from "@/content/ui";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.workspace,
  path: "/workspace",
});

export default function WorkspacePage() {
  return (
    <>
      <PageHero
        eyebrow={workspace.hero.eyebrow}
        title={workspace.hero.title}
        lead={workspace.hero.lead}
      />

      <ArticleShell href="/workspace">
        <section>
          <SectionHeading
            id={workspace.concept.id}
            eyebrow={workspace.concept.eyebrow}
            title={workspace.concept.title}
            lead={workspace.concept.lead}
          />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={workspace.facilities.id}
            eyebrow={workspace.facilities.eyebrow}
            title={workspace.facilities.title}
          />
          {/*
            O-2 는 "기존 사진 재사용"이었지만 확보된 사진이 없었다. 저해상도
            사진으로 채우느니 일러스트로 공간의 성격을 전달한다 — 실사진이
            확보되면 같은 자리에 교체하면 된다(치수만 맞추면 CLS 영향 없음).
          */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {workspace.facilities.items.map((item) => (
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
            id={workspace.tenants.id}
            eyebrow={workspace.tenants.eyebrow}
            title={workspace.tenants.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {workspace.tenants.items.map((item) => (
              <li key={item} className="p-4 text-sm break-keep">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={workspace.pricing.id}
            eyebrow={workspace.pricing.eyebrow}
            title={workspace.pricing.title}
          />
          <p className="text-muted-foreground mt-6 max-w-[68ch] leading-[1.75] break-keep">
            {workspace.pricing.note}
          </p>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={workspace.location.id}
            eyebrow={workspace.location.eyebrow}
            title={workspace.location.title}
          />
          <div className="border-border mt-8 max-w-[68ch] overflow-hidden rounded-lg border">
            <Illustration
              src={illustrations.map.src}
              width={illustrations.map.width}
              height={illustrations.map.height}
              alt={illustrations.map.alt}
              className="bg-muted/40"
            />
            <div className="border-border border-t p-5">
              <p className="text-sm break-keep">{workspace.location.address}</p>
              <a
                href={workspace.location.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {workspace.location.mapLinkLabel}
                <ExternalLink className="size-3.5" aria-hidden />
                <span className="sr-only">{ui.nav.externalLink}</span>
              </a>
            </div>
          </div>
        </section>
      </ArticleShell>

      <CTASection
        title={workspace.cta.title}
        desc={workspace.cta.desc}
        cta={workspace.cta.primary}
      />
    </>
  );
}
