import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ApplyForm } from "@/components/forms/apply-form";
import { buildMetadata } from "@/lib/metadata";
import { forms } from "@/content/forms";
import { academy } from "@/content/academy";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.apply,
  path: "/academy/apply",
});

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow={forms.apply.hero.eyebrow}
        title={forms.apply.hero.title}
        lead={forms.apply.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/academy/apply" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="max-w-[42rem] min-w-0">
            <ApplyForm />
          </div>

          <aside className="border-border h-fit rounded-lg border p-5">
            <p className="text-xs font-semibold tracking-[0.08em] uppercase">
              {academy.process.eyebrow}
            </p>
            <ol className="mt-4 space-y-3">
              {academy.process.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm break-keep">
                  <span className="bg-primary/10 text-primary inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Container>
    </>
  );
}
