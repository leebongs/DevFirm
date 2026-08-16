import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CourseFilterTabs } from "@/components/content/course-filter-tabs";
import { CTASection } from "@/components/content/cta-section";
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
    ...t.seo.page.courses,
    path: "/academy/courses",
    lang: locale,
  });
}

export default async function CoursesPage({
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
        eyebrow={t.courses.page.hero.eyebrow}
        title={t.courses.page.hero.title}
        lead={t.courses.page.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/academy/courses" />
        <div className="mt-8">
          <CourseFilterTabs
            courses={t.courses.list}
            coursesPage={t.courses.page}
            SCHOOLS={t.academy.schools}
          />
        </div>
      </Container>

      <CTASection
        title={t.courses.page.cta.title}
        desc={t.courses.page.cta.desc}
        cta={t.courses.page.cta.primary}
        secondary={t.courses.page.cta.secondary}
      />
    </>
  );
}
