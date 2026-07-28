import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/typography/page-hero";
import { ArticleShell } from "@/components/layout/article-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { CTASection } from "@/components/content/cta-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildMetadata } from "@/lib/metadata";
import { courses, coursesPage } from "@/content/courses";
import { SCHOOLS } from "@/content/academy";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};

  return buildMetadata({
    title: course.title,
    description: coursesPage.seoDescription(course),
    path: `/academy/courses/${course.slug}`,
  });
}

const LIST_SECTIONS = [
  ["target", "target"],
  ["prerequisites", "prerequisites"],
  ["outcomes", "outcomes"],
  ["careers", "careers"],
] as const;

export default async function CoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();

  const school = SCHOOLS.find((item) => item.key === course.school);

  return (
    <>
      <PageHero
        eyebrow={school?.name}
        title={course.title}
        lead={course.summary}
      />

      <ArticleShell href="/academy/courses">
        <dl className="border-border divide-border grid divide-y rounded-lg border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="p-4">
            <dt className="text-muted-foreground text-xs">
              {coursesPage.fields.duration}
            </dt>
            <dd className="mt-1 font-semibold">{course.duration}</dd>
          </div>
          <div className="p-4">
            <dt className="text-muted-foreground text-xs">
              {coursesPage.fields.capacity}
            </dt>
            <dd className="mt-1 font-semibold">{course.capacity}</dd>
          </div>
        </dl>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id="curriculum"
            eyebrow={coursesPage.hero.eyebrow}
            title={coursesPage.fields.curriculum}
          />
          {/* 표는 좁은 화면에서 자기 영역 안에서만 가로 스크롤한다(A1) */}
          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">
                    {coursesPage.fields.week}
                  </TableHead>
                  <TableHead className="w-40">
                    {coursesPage.fields.topic}
                  </TableHead>
                  <TableHead>{coursesPage.fields.detail}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.curriculum.map((row) => (
                  <TableRow key={row.week}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      {row.week}
                    </TableCell>
                    <TableCell className="font-medium break-keep">
                      {row.topic}
                    </TableCell>
                    <TableCell className="text-muted-foreground break-keep">
                      {row.detail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {LIST_SECTIONS.map(([key]) => (
          <section key={key} className="mt-16 lg:mt-20">
            <SectionHeading id={key} title={coursesPage.fields[key]} />
            <ul className="border-border divide-border mt-6 divide-y rounded-lg border">
              {course[key].map((item) => (
                <li key={item} className="p-4 text-sm break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Link
          href={`/academy/apply?course=${course.slug}`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mt-10 inline-flex min-h-11 items-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
        >
          {coursesPage.fields.apply}
        </Link>
      </ArticleShell>

      <CTASection
        title={coursesPage.cta.title}
        desc={coursesPage.cta.desc}
        cta={coursesPage.cta.primary}
        secondary={coursesPage.cta.secondary}
      />
    </>
  );
}
