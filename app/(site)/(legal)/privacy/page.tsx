import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { Prose } from "@/components/typography/prose";
import { buildMetadata } from "@/lib/metadata";
import { privacy, legalUpdatedAt, legalUi } from "@/content/legal";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.privacy,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title={privacy.title}
        lead={`${legalUi.updatedAtLabel} ${legalUpdatedAt}`}
      />

      <ArticleShell href="/privacy">
        <Prose>
          <p>{privacy.intro}</p>
          {privacy.sections.map((section) => (
            <section key={section.id}>
              <h2 id={section.id}>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </Prose>
      </ArticleShell>
    </>
  );
}
