import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { StatBlock } from "@/components/content/stat-block";
import { StepFlow } from "@/components/content/step-flow";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import {
  DEFAULT_LOCALE,
  isLocale,
  localeCodes,
  type Locale,
} from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
// 슬러그는 언어와 무관한 구조 데이터다. generateStaticParams 는
// 동기라 사전을 await 할 수 없으므로 원문 배열로 열거한다.
import { agents } from "@/content/agents";
import { agentIllustrations } from "@/content/illustrations";
type Params = { lang: string; industry: string };

/**
 * 산업별 AI 에이전트 상세 — **6개 경로를 이 파일 하나가 렌더한다**(§5.8).
 *
 * 산업이 늘어나면 content/t.agents.ts 에 한 건을 추가하면 되고 페이지 파일은
 * 건드리지 않는다. 계획이 "중복 page.tsx 0" 을 DoD 로 못 박은 이유다.
 */
/**
 * 언어 × 슬러그. 언어를 곱하지 않으면 기본 언어판만 굳고
 * 나머지는 dynamicParams=false 에 걸려 404 가 된다.
 */
export function generateStaticParams(): Params[] {
  return localeCodes.flatMap((lang) =>
    agents
      .map((agent) => ({ industry: agent.slug }))
      .map((p) => ({ lang, ...p })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, industry } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const agent = t.agents.find((item) => item.slug === industry);
  if (!agent) return {};

  return buildMetadata({
    title: agent.seo.title,
    description: agent.seo.description,
    path: `/solutions/agents/${agent.slug}`,
  });
}

export default async function IndustryAgentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, industry } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const agent = t.agents.find((item) => item.slug === industry);
  if (!agent) notFound();

  // 형제 산업은 자기 자신을 뺀 5개
  const siblings = t.agents.filter((item) => item.slug !== agent.slug);

  return (
    <>
      <PageHero
        eyebrow={agent.name}
        title={agent.tagline}
        lead={agent.seo.description}
        art={agentIllustrations[agent.slug]}
      />

      <ArticleShell href={`/solutions/agents/${agent.slug}`}>
        <section>
          <SectionHeading
            id={t.solutions.agentPage.problems.id}
            eyebrow={t.solutions.agentPage.problems.eyebrow}
            title={t.solutions.agentPage.problems.title}
          />
          <ul className="border-border divide-border mt-8 divide-y rounded-lg border">
            {agent.problems.map((problem) => (
              <li key={problem} className="p-4 text-sm break-keep">
                {problem}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.solutions.agentPage.capabilities.id}
            eyebrow={t.solutions.agentPage.capabilities.eyebrow}
            title={t.solutions.agentPage.capabilities.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {agent.capabilities.map((capability) => (
              <FeatureCard
                key={capability.title}
                title={capability.title}
                desc={capability.desc}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.solutions.agentPage.outcomes.id}
            eyebrow={t.solutions.agentPage.outcomes.eyebrow}
            title={t.solutions.agentPage.outcomes.title}
          />
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {agent.outcomes.map((outcome) => (
              <StatBlock
                key={outcome.label}
                value={outcome.value}
                label={outcome.label}
              />
            ))}
          </dl>
          <p className="text-muted-foreground mt-6 max-w-[68ch] text-sm leading-relaxed break-keep">
            {t.solutions.agentPage.outcomes.note}
          </p>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.solutions.agentPage.steps.id}
            eyebrow={t.solutions.agentPage.steps.eyebrow}
            title={t.solutions.agentPage.steps.title}
          />
          <StepFlow className="mt-8 lg:grid-cols-2" steps={agent.steps} />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={t.solutions.agentPage.siblings.id}
            eyebrow={t.solutions.agentPage.siblings.eyebrow}
            title={t.solutions.agentPage.siblings.title}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <IndustryAgentCard agent={sibling} />
              </li>
            ))}
          </ul>
        </section>
      </ArticleShell>

      <CTASection
        title={t.solutions.agentPage.cta.title}
        desc={t.solutions.agentPage.cta.desc}
        cta={t.solutions.agentPage.cta.primary}
        secondary={t.solutions.agentPage.cta.secondary}
      />
    </>
  );
}
