import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { ComparisonTable } from "@/components/content/comparison-table";
import { CTASection } from "@/components/content/cta-section";
import { Illustration } from "@/components/content/illustration";
import { Photo } from "@/components/content/photo";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { photos } from "@/content/photos";
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
      {/*
        1. Hero — 배경 사진 + 그라데이션 스크림 + 유리 패널
        LCP 는 이제 배경 사진이 가져갈 수 있으므로 priority 로 미리 가져오고
        AVIF 30KB 로 줄여 두었다(scripts/optimize-photos.mjs).
        헤드라인은 사진의 비어 있는 좌측 1/3 위에 앉는다.
      */}
      {/*
        음수 마진으로 히어로를 sticky 헤더 **아래까지** 끌어올린다.
        그래야 헤더의 backdrop-blur 가 블러할 대상(사진)을 갖는다 —
        그러지 않으면 헤더는 뒤에 아무것도 없어 그냥 흰 막대로 보인다.
        같은 크기의 패딩으로 콘텐츠 위치는 그대로 유지한다.
      */}
      <section className="relative isolate -mt-16 overflow-hidden pt-16 lg:-mt-18 lg:pt-18">
        <Photo
          photo={photos.heroOffice}
          priority
          tone={false}
          rounded={false}
          sizes="100vw"
          className="absolute inset-0 -z-20"
          imgClassName="object-cover object-[70%_center]"
        />
        <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

        <Container className="text-brand-foreground py-24 lg:grid lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-16 lg:py-32">
          <div className="min-w-0">
            <p className="text-highlight text-xs font-semibold tracking-[0.08em] uppercase">
              {home.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[2.25rem] leading-[1.25] font-bold tracking-[-0.02em] break-keep lg:text-[3.75rem] lg:leading-[1.08]">
              {home.hero.title}
            </h1>
            <p className="text-brand-foreground/85 mt-6 max-w-[52ch] text-base leading-[1.75] break-keep lg:text-[1.0625rem] lg:leading-[1.8]">
              {home.hero.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={home.hero.primaryCta.href}
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {home.hero.primaryCta.label}
              </Link>
              <Link
                href={home.hero.secondaryCta.href}
                className="glass glass-sheen focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {home.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* 유리 패널에 신뢰 지표를 올린다. 사진 위 정보 레이어가 곧 유리다 */}
          <div className="mt-12 lg:mt-0 lg:self-end">
            <dl className="glass glass-sheen grid grid-cols-3 gap-4 rounded-xl p-5 lg:p-6">
              {home.trust.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-brand-foreground/70 mt-1 text-xs break-keep">
                    {stat.label}
                  </dt>
                  <dd className="text-xl font-bold tracking-[-0.02em] lg:text-2xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* 2. Slogan Band — 피지컬AI ↔ 최과장AI 2분할 대비 */}
      <Section variant="brand">
        <h2 className="text-[1.375rem] leading-[1.35] font-semibold break-keep lg:text-[2rem] lg:leading-[1.25]">
          {home.slogan.title}
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {[
            { ...home.slogan.left, art: illustrations.physicalAi },
            { ...home.slogan.right, art: illustrations.officeAi },
          ].map((side) => (
            <Link
              key={side.href}
              href={side.href}
              className="bg-brand-foreground/5 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground group overflow-hidden rounded-lg transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {/*
                일러스트가 네이비 밴드 위에 놓인다. 원본은 흰 배경 전제로 그려져
                있으므로 밝은 판을 깔아 형태가 배경에 묻히지 않게 한다.
              */}
              <div className="bg-brand-foreground/90">
                <Illustration
                  src={side.art.src}
                  width={side.art.width}
                  height={side.art.height}
                  decorative
                />
              </div>
              <div className="p-6 lg:p-8">
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
              </div>
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
              art={card.art}
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
        {/* 계획 §5.1 이 "로펌 비유 다이어그램"을 명시했다. 표가 세부를 말하고
            다이어그램이 구조를 말한다 — 둘은 대체재가 아니다. */}
        <div className="border-border bg-muted/50 mt-10 rounded-lg border p-6 lg:p-10">
          <Illustration
            src={illustrations.lawfirmModel.src}
            width={illustrations.lawfirmModel.width}
            height={illustrations.lawfirmModel.height}
            alt={illustrations.lawfirmModel.alt}
            className="mx-auto max-w-[52rem]"
          />
        </div>
        <ComparisonTable
          className="mt-6"
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

      {/*
        7. 회사 사진
        신뢰 지표는 히어로의 유리 패널로 올라갔으므로 여기서 반복하지 않는다.
        대신 실제 일하는 모습을 보여준다 — 숫자보다 이쪽이 "개발법인"이라는
        주장을 뒷받침한다.
      */}
      <Section>
        <SectionHeading eyebrow={home.trust.eyebrow} title={home.trust.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
          <Photo
            photo={photos.aboutTeam}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[4/3]"
          />
          <Photo
            photo={photos.aboutSpace}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[4/3]"
          />
          <Photo
            photo={photos.aboutBackoffice}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[4/3]"
          />
        </div>
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
