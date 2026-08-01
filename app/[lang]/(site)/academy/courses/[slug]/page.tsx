import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
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
import { CourseJsonLd } from "@/components/seo/json-ld";
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
import { courses } from "@/content/courses";
type Params = { lang: string; slug: string };

/**
 * 언어 × 슬러그. 언어를 곱하지 않으면 기본 언어판만 굳고
 * 나머지는 dynamicParams=false 에 걸려 404 가 된다.
 */
export function generateStaticParams(): Params[] {
  return localeCodes.flatMap((lang) =>
    courses
      .map((course) => ({ slug: course.slug }))
      .map((p) => ({ lang, ...p })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const course = t.courses.list.find((item) => item.slug === slug);
  if (!course) return {};

  return buildMetadata({
    title: course.title,
    description: t.courses.page.seoDescription(course),
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
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const course = t.courses.list.find((item) => item.slug === slug);
  if (!course) notFound();

  const school = t.academy.schools.find((item) => item.key === course.school);

  return (
    <>
      <CourseJsonLd
        name={course.title}
        description={course.summary}
        path={`/academy/courses/${course.slug}`}
      />
      <PageHero
        photo={photos.academyHero}
        eyebrow={school?.name}
        title={course.title}
        lead={course.summary}
      />

      <ArticleShell href="/academy/courses">
        <dl className="border-border divide-border grid divide-y rounded-lg border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="p-4">
            <dt className="text-muted-foreground text-xs">
              {t.courses.page.fields.duration}
            </dt>
            <dd className="mt-1 font-semibold">{course.duration}</dd>
          </div>
          <div className="p-4">
            <dt className="text-muted-foreground text-xs">
              {t.courses.page.fields.capacity}
            </dt>
            <dd className="mt-1 font-semibold">{course.capacity}</dd>
          </div>
        </dl>

        <section className="mt-16 lg:mt-20">
          <SectionHeading
            id="curriculum"
            eyebrow={t.courses.page.hero.eyebrow}
            title={t.courses.page.fields.curriculum}
          />
          {/* 표는 좁은 화면에서 자기 영역 안에서만 가로 스크롤한다(A1) */}
          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">
                    {t.courses.page.fields.week}
                  </TableHead>
                  <TableHead className="w-40">
                    {t.courses.page.fields.topic}
                  </TableHead>
                  <TableHead>{t.courses.page.fields.detail}</TableHead>
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
            <SectionHeading id={key} title={t.courses.page.fields[key]} />
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
          {t.courses.page.fields.apply}
        </Link>
      </ArticleShell>

      <CTASection
        title={t.courses.page.cta.title}
        desc={t.courses.page.cta.desc}
        cta={t.courses.page.cta.primary}
        secondary={t.courses.page.cta.secondary}
      />
    </>
  );
}
