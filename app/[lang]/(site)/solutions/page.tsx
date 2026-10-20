import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { StepFlow } from "@/components/content/step-flow";
import { FAQAccordion } from "@/components/content/faq-accordion";
import { CTASection } from "@/components/content/cta-section";
import { Illustration } from "@/components/content/illustration";
import { Photo } from "@/components/content/photo";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import { illustrations } from "@/content/illustrations";
import { photos } from "@/content/photos";
import { getDocAiEntry } from "@/content/docai-entry";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.solutions,
    path: "/solutions",
    lang: locale,
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const docAiEntry = getDocAiEntry(locale);

  return (
    <>
      <PageHero
        photo={photos.solutionsHero}
        eyebrow={t.solutions.hub.hero.eyebrow}
        title={t.solutions.hub.hero.title}
        lead={t.solutions.hub.hero.lead}
      />

      {/* DocASI 브랜드 스트립 — 허브에서 바로 보이는 온보딩 진입(사용자 지시 2026-10-20).
          공식 카피는 로고 옆 이 한 곳에만 쓰고 본문은 근거 중심을 유지한다. */}
      <Section>
        <div className="bg-brand text-brand-foreground overflow-hidden rounded-lg border border-white/10 p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <svg
                viewBox="0 0 1024 1024"
                className="size-12 shrink-0 rounded-xl"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="docasi-strip-mark"
                    x1="160"
                    y1="120"
                    x2="870"
                    y2="930"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2B9FBF" />
                    <stop offset=".36" stopColor="#0C486E" />
                    <stop offset="1" stopColor="#04141F" />
                  </linearGradient>
                </defs>
                <rect
                  x="64"
                  y="64"
                  width="896"
                  height="896"
                  rx="204"
                  fill="url(#docasi-strip-mark)"
                />
                <path
                  fill="#F9F7EF"
                  fillRule="evenodd"
                  d="M287 246H478C658 246 777 356 777 512S658 778 478 778H287C260 778 239 757 239 730V294C239 267 260 246 287 246ZM362 368V656H475C580 656 651 601 651 512S580 368 475 368H362Z"
                />
                <path
                  fill="#F5B451"
                  d="M502 426Q520 494 588 512Q520 530 502 598Q484 530 416 512Q484 494 502 426Z"
                />
                <circle cx="589" cy="425" r="22" fill="#7FD8E8" />
              </svg>
              <div>
                <p className="text-lg font-bold break-keep lg:text-xl">
                  {docAiEntry.banner.title}
                </p>
                <p className="text-brand-foreground/75 mt-2 max-w-[60ch] text-sm leading-relaxed break-keep">
                  {docAiEntry.banner.description}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href={docAiEntry.href}
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {docAiEntry.banner.startLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/solutions/docasi"
                className="border-brand-foreground/25 bg-brand-foreground/5 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center rounded-lg border px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {docAiEntry.banner.catalogLabel}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {t.solutions.hub.axes.map((axis, index) => (
            <Link
              key={axis.href}
              href={axis.href}
              className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring group overflow-hidden rounded-lg border transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="bg-muted/60 border-border border-b">
                <Illustration
                  src={
                    index === 0
                      ? illustrations.physicalAi.src
                      : illustrations.officeAi.src
                  }
                  width={illustrations.physicalAi.width}
                  height={illustrations.physicalAi.height}
                  decorative
                />
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
                  {axis.eyebrow}
                </p>
                <p className="mt-3 text-2xl font-bold break-keep">
                  {axis.name}
                </p>
                <p className="text-muted-foreground mt-3 leading-relaxed break-keep">
                  {axis.desc}
                </p>
                <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium">
                  {axis.linkLabel}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 두 축이 하나의 기반 위에 있다는 구조를 도형으로, 실제 현장은 사진으로 */}
      <Section variant="muted">
        <Illustration
          src={illustrations.twoAxes.src}
          width={illustrations.twoAxes.width}
          height={illustrations.twoAxes.height}
          alt={illustrations.twoAxes.alt}
          className="border-border bg-background mx-auto max-w-[52rem] rounded-lg border p-6 lg:p-10"
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Photo
            photo={photos.solutionsIndustrial}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2]"
          />
          <Photo
            photo={photos.solutionsDesk}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2]"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          id={t.solutions.hub.agentsSection.id}
          eyebrow={t.solutions.hub.agentsSection.eyebrow}
          title={t.solutions.hub.agentsSection.title}
          lead={t.solutions.hub.agentsSection.lead}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.agents.map((agent) => (
            <li key={agent.slug}>
              <IndustryAgentCard agent={agent} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          id={t.solutions.hub.process.id}
          eyebrow={t.solutions.hub.process.eyebrow}
          title={t.solutions.hub.process.title}
        />
        <Illustration
          src={illustrations.agentPipeline.src}
          width={illustrations.agentPipeline.width}
          height={illustrations.agentPipeline.height}
          alt={illustrations.agentPipeline.alt}
          className="border-border bg-muted/50 mt-10 rounded-lg border p-6 lg:p-8"
        />
        <Illustration
          src={illustrations.adoption.src}
          width={illustrations.adoption.width}
          height={illustrations.adoption.height}
          alt={illustrations.adoption.alt}
          className="border-border bg-muted/50 mt-5 rounded-lg border p-6 lg:p-8"
        />
        <StepFlow className="mt-6" steps={t.solutions.hub.process.steps} />
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={t.solutions.hub.faq.id}
          eyebrow={t.solutions.hub.faq.eyebrow}
          title={t.solutions.hub.faq.title}
        />
        <div className="mt-8 max-w-[68ch]">
          <FAQAccordion items={t.solutions.hub.faq.items} />
        </div>
      </Section>

      <CTASection
        title={t.solutions.hub.cta.title}
        desc={t.solutions.hub.cta.desc}
        cta={t.solutions.hub.cta.primary}
        secondary={{
          label: docAiEntry.solutionsAction,
          href: docAiEntry.href,
        }}
      />
    </>
  );
}
