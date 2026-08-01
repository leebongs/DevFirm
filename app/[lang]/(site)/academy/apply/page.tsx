import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ApplyForm } from "@/components/forms/apply-form";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  return buildMetadata({
    ...t.seo.page.apply,
    path: "/academy/apply",
    lang: locale,
  });
}

export default async function ApplyPage({
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
        photo={photos.academyHero}
        eyebrow={t.forms.apply.hero.eyebrow}
        title={t.forms.apply.hero.title}
        lead={t.forms.apply.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/academy/apply" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="max-w-[42rem] min-w-0">
            <ApplyForm />
          </div>

          <aside className="border-border h-fit rounded-lg border p-5">
            <p className="text-xs font-semibold tracking-[0.08em] uppercase">
              {t.academy.page.process.eyebrow}
            </p>
            <ol className="mt-4 space-y-3">
              {t.academy.page.process.steps.map((step, index) => (
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
