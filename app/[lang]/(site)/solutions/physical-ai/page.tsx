import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { IndustryAgentCard } from "@/components/content/industry-agent-card";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import { illustrations } from "@/content/illustrations";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.physicalAi,
    path: "/solutions/physical-ai",
    lang: locale,
  });
}

export default async function PhysicalAiPage({
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
        eyebrow={t.solutions.physicalAi.hero.eyebrow}
        title={t.solutions.physicalAi.hero.title}
        lead={t.solutions.physicalAi.hero.lead}
        art={illustrations.physicalAi}
      />

      <ArticleShell href="/solutions/physical-ai">
        <section>
          <SectionHeading
            id={t.solutions.physicalAi.problem.id}
            eyebrow={t.solutions.physicalAi.problem.eyebrow}
            title={t.solutions.physicalAi.problem.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.solutions.physicalAi.problem.items.map((item) => (
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
            id={t.solutions.physicalAi.stack.id}
            eyebrow={t.solutions.physicalAi.stack.eyebrow}
            title={t.solutions.physicalAi.stack.title}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.solutions.physicalAi.stack.items.map((item) => (
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
            id={t.solutions.physicalAi.industries.id}
            eyebrow={t.solutions.physicalAi.industries.eyebrow}
            title={t.solutions.physicalAi.industries.title}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.agents.map((agent) => (
              <li key={agent.slug}>
                <IndustryAgentCard agent={agent} />
              </li>
            ))}
          </ul>
        </section>
      </ArticleShell>

      <CTASection
        title={t.solutions.physicalAi.cta.title}
        desc={t.solutions.physicalAi.cta.desc}
        cta={t.solutions.physicalAi.cta.primary}
        secondary={t.solutions.physicalAi.cta.secondary}
      />
    </>
  );
}
