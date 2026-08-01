import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CTASection } from "@/components/content/cta-section";
import { Badge } from "@/components/ui/badge";
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
    ...t.seo.page.careers,
    path: "/about/careers",
    lang: locale,
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  const openJobs = t.careers.jobs.filter((job) => job.status === "open");

  return (
    <>
      <PageHero
        photo={photos.aboutHero}
        eyebrow={t.careers.page.hero.eyebrow}
        title={t.careers.page.hero.title}
        lead={t.careers.page.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/about/careers" />

        {openJobs.length === 0 ? (
          <p className="text-muted-foreground mt-8 break-keep">
            {t.careers.page.emptyState}
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {t.careers.jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/about/careers/${job.slug}`}
                  className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring group flex h-full flex-col rounded-lg border p-5 transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none lg:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={job.status === "open" ? "default" : "secondary"}
                    >
                      {t.careers.page.statusLabel[job.status]}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {job.team} · {job.employmentType}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold break-keep">
                    {job.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 line-clamp-2 flex-1 text-sm leading-relaxed break-keep">
                    {job.responsibilities[0]}
                  </p>
                  <span className="text-muted-foreground mt-4 flex items-center gap-1 text-xs">
                    {t.careers.page.fields.deadline} · {job.deadline}
                    <ArrowRight
                      className="text-primary ml-auto size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>

      <CTASection
        title={t.careers.page.cta.title}
        desc={t.careers.page.cta.desc}
        cta={t.careers.page.cta.primary}
        secondary={t.careers.page.cta.secondary}
      />
    </>
  );
}
