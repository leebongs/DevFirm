import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
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
            갤러리는 O-2 결정(기존 자산 재사용)에 따라 실제 사진을 확보한 뒤
            채운다. 저해상도 사진을 미리 넣어 "세련됨" 목표를 깎느니
            타이포 중심 카드로 두는 편이 낫다(§12 리스크 완화).
          */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {workspace.facilities.items.map((item) => (
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
          <div className="border-border mt-8 max-w-[68ch] rounded-lg border p-5">
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
