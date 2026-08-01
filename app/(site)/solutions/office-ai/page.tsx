import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { Illustration } from "@/components/content/illustration";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { officeAi } from "@/content/solutions";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.officeAi,
  path: "/solutions/office-ai",
});

export default function OfficeAiPage() {
  return (
    <>
      <PageHero
        eyebrow={officeAi.hero.eyebrow}
        title={officeAi.hero.title}
        lead={officeAi.hero.lead}
        art={illustrations.officeAi}
      />

      <ArticleShell href="/solutions/office-ai">
        <section>
          <SectionHeading
            id={officeAi.problem.id}
            eyebrow={officeAi.problem.eyebrow}
            title={officeAi.problem.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {officeAi.problem.items.map((item) => (
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
            id={officeAi.capabilities.id}
            eyebrow={officeAi.capabilities.eyebrow}
            title={officeAi.capabilities.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {officeAi.capabilities.items.map((item) => (
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
            id={officeAi.physical.id}
            eyebrow={officeAi.physical.eyebrow}
            title={officeAi.physical.title}
            lead={officeAi.physical.lead}
          />
          {/*
            이 섹션은 제목만 있고 본문이 비어 있었다. 문구가 주장하는 것
            ("현장 사진 한 장이 결재 문서까지 가는 경로를 하나로")이 곧 위상
            주장이라 문장보다 도형이 낫다. 자산은 이미 있는 것을 쓴다 —
            /solutions 허브가 같은 도형으로 같은 구조를 말하고 있고, 여기서는
            그 구조를 최과장AI 쪽에서 다시 본다.
          */}
          <Illustration
            src={illustrations.twoAxes.src}
            width={illustrations.twoAxes.width}
            height={illustrations.twoAxes.height}
            alt={illustrations.twoAxes.alt}
            className="border-border bg-muted/40 mt-8 rounded-lg border p-5 lg:p-8"
          />
        </section>
      </ArticleShell>

      <CTASection
        title={officeAi.cta.title}
        desc={officeAi.cta.desc}
        cta={officeAi.cta.primary}
        secondary={officeAi.cta.secondary}
      />
    </>
  );
}
