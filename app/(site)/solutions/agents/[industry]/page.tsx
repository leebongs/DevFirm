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
import { agents } from "@/content/agents";
import { agentPage } from "@/content/solutions";

type Params = { industry: string };

/**
 * 산업별 AI 에이전트 상세 — **6개 경로를 이 파일 하나가 렌더한다**(§5.8).
 *
 * 산업이 늘어나면 content/agents.ts 에 한 건을 추가하면 되고 페이지 파일은
 * 건드리지 않는다. 계획이 "중복 page.tsx 0" 을 DoD 로 못 박은 이유다.
 */
export function generateStaticParams(): Params[] {
  return agents.map((agent) => ({ industry: agent.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { industry } = await params;
  const agent = agents.find((item) => item.slug === industry);
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
  const { industry } = await params;
  const agent = agents.find((item) => item.slug === industry);
  if (!agent) notFound();

  // 형제 산업은 자기 자신을 뺀 5개
  const siblings = agents.filter((item) => item.slug !== agent.slug);

  return (
    <>
      <PageHero
        eyebrow={agent.name}
        title={agent.tagline}
        lead={agent.seo.description}
      />

      <ArticleShell href={`/solutions/agents/${agent.slug}`}>
        <section>
          <SectionHeading
            id={agentPage.problems.id}
            eyebrow={agentPage.problems.eyebrow}
            title={agentPage.problems.title}
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
            id={agentPage.capabilities.id}
            eyebrow={agentPage.capabilities.eyebrow}
            title={agentPage.capabilities.title}
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
            id={agentPage.outcomes.id}
            eyebrow={agentPage.outcomes.eyebrow}
            title={agentPage.outcomes.title}
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
            {agentPage.outcomes.note}
          </p>
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={agentPage.steps.id}
            eyebrow={agentPage.steps.eyebrow}
            title={agentPage.steps.title}
          />
          <StepFlow className="mt-8 lg:grid-cols-2" steps={agent.steps} />
        </section>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id={agentPage.siblings.id}
            eyebrow={agentPage.siblings.eyebrow}
            title={agentPage.siblings.title}
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
        title={agentPage.cta.title}
        desc={agentPage.cta.desc}
        cta={agentPage.cta.primary}
        secondary={agentPage.cta.secondary}
      />
    </>
  );
}
