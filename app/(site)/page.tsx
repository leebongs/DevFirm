import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { ComparisonTable } from "@/components/content/comparison-table";
import { StatBlock } from "@/components/content/stat-block";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { home } from "@/content/home";
import { agents } from "@/content/agents";
import { site } from "@/content/site";
import { homeSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.nameKo} — ${site.tagline}`,
  description: homeSeo.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — LCP 대상은 이 제목 텍스트다(이미지 없음) */}
      <section className="border-border border-b py-20 lg:py-28">
        <Container>
          <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
            {home.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[18ch] text-[2.25rem] leading-[1.25] font-bold tracking-[-0.02em] break-keep lg:text-[4rem] lg:leading-[1.1]">
            {home.hero.title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[60ch] text-base leading-[1.75] break-keep lg:text-[1.0625rem] lg:leading-[1.8]">
            {home.hero.lead}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={home.hero.primaryCta.href}
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex min-h-11 items-center justify-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              {home.hero.primaryCta.label}
            </Link>
            <Link
              href={home.hero.secondaryCta.href}
              className="border-border hover:bg-muted focus-visible:ring-ring inline-flex min-h-11 items-center justify-center rounded-md border px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              {home.hero.secondaryCta.label}
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. Slogan Band — 피지컬AI ↔ 최과장AI 2분할 대비 */}
      <Section variant="brand">
        <h2 className="text-[1.375rem] leading-[1.35] font-semibold break-keep lg:text-[2rem] lg:leading-[1.25]">
          {home.slogan.title}
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {[home.slogan.left, home.slogan.right].map((side) => (
            <Link
              key={side.href}
              href={side.href}
              className="bg-brand-foreground/5 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground group rounded-lg p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none lg:p-8"
            >
              <p className="text-brand-foreground/60 text-xs font-semibold tracking-[0.08em] uppercase">
                {side.eyebrow}
              </p>
              <p className="mt-3 text-2xl font-bold">{side.name}</p>
              <p className="text-brand-foreground/80 mt-3 text-sm leading-relaxed break-keep">
                {side.desc}
              </p>
              <ArrowRight
                className="mt-5 size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. 고객 경로 분기 3카드 — 제공물 기준 IA(I-B)가 놓치는 부분을 흡수 */}
      <Section>
        <SectionHeading
          eyebrow={home.audience.eyebrow}
          title={home.audience.title}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
          {home.audience.cards.map((card) => (
            <FeatureCard
              key={card.href}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              href={card.href}
              linkLabel={card.linkLabel}
            />
          ))}
        </div>
      </Section>

      {/* 4. 산업별 AI 에이전트 6종 */}
      <Section variant="muted">
        <SectionHeading
          eyebrow={home.agentsSection.eyebrow}
          title={home.agentsSection.title}
          lead={home.agentsSection.lead}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {agents.map((agent) => (
            <li key={agent.slug}>
              <IndustryAgentCard agent={agent} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. 데브펌 모델 — 로펌 비유 */}
      <Section>
        <SectionHeading
          eyebrow={home.model.eyebrow}
          title={home.model.title}
          lead={home.model.lead}
        />
        <ComparisonTable
          className="mt-10"
          leftLabel={home.model.comparison.leftLabel}
          rightLabel={home.model.comparison.rightLabel}
          rows={home.model.comparison.rows}
        />
        <p className="text-muted-foreground mt-6 max-w-[68ch] text-sm leading-relaxed break-keep">
          {home.model.note}
        </p>
      </Section>

      {/* 6. 아카데미 / 공유오피스 2분할 */}
      <Section variant="muted">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {[home.bands.academy, home.bands.workspace].map((band) => (
            <Link
              key={band.href}
              href={band.href}
              className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring group rounded-lg border p-6 transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none lg:p-8"
            >
              <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
                {band.eyebrow}
              </p>
              <p className="mt-3 text-xl font-semibold break-keep lg:text-2xl">
                {band.title}
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed break-keep">
                {band.desc}
              </p>
              <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
                {band.linkLabel}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 7. 신뢰 지표 */}
      <Section>
        <SectionHeading eyebrow={home.trust.eyebrow} title={home.trust.title} />
        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          {home.trust.stats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </dl>
      </Section>

      {/* 8. 최종 CTA */}
      <CTASection
        title={home.finalCta.title}
        desc={home.finalCta.desc}
        cta={home.finalCta.cta}
      />
    </>
  );
}
