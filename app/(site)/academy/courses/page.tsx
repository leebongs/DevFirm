import type { Metadata } from "next";
import { PageHero } from "@/components/typography/page-hero";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CourseFilterTabs } from "@/components/content/course-filter-tabs";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { coursesPage } from "@/content/courses";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.courses,
  path: "/academy/courses",
});

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow={coursesPage.hero.eyebrow}
        title={coursesPage.hero.title}
        lead={coursesPage.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/academy/courses" />
        <div className="mt-8">
          <CourseFilterTabs />
        </div>
      </Container>

      <CTASection
        title={coursesPage.cta.title}
        desc={coursesPage.cta.desc}
        cta={coursesPage.cta.primary}
        secondary={coursesPage.cta.secondary}
      />
    </>
  );
}
