"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { localeFromPath, localeHref } from "@/lib/locale-href";
import type { Dictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

/**
 * 스쿨별 과정 필터(§5.13).
 *
 * 클라이언트에서 거르는 이유는 SSG 를 지키기 위해서다. searchParams 로
 * 서버 필터링을 하면 이 페이지가 동적 렌더링으로 바뀐다(P5 정적 우선).
 * 과정 수가 적어 전량을 내려도 부담이 없다.
 */
export function CourseFilterTabs({
  courses,
  coursesPage,
  SCHOOLS,
}: {
  courses: Dictionary["courses"]["list"];
  coursesPage: Dictionary["courses"]["page"];
  SCHOOLS: Dictionary["academy"]["schools"];
}) {
  // 경로가 이미 언어를 담고 있으므로 프롭으로 더 받지 않는다
  const lang = localeFromPath(usePathname());
  const [school, setSchool] = useState<string>("all");
  const visible =
    school === "all"
      ? courses
      : courses.filter((course) => course.school === school);

  const tabs = [
    { key: "all", name: coursesPage.filterAll },
    ...SCHOOLS.map((item) => ({ key: item.key, name: item.name })),
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label={coursesPage.hero.eyebrow}
        className="border-border flex flex-wrap gap-1 border-b"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={school === tab.key}
            onClick={() => setSchool(tab.key)}
            className={cn(
              "focus-visible:ring-ring -mb-px min-h-11 border-b-2 px-3 text-sm whitespace-nowrap focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
              school === tab.key
                ? "border-primary text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-5 lg:grid-cols-2">
        {visible.map((course) => (
          <li key={course.slug}>
            <Link
              href={localeHref(lang, `/academy/courses/${course.slug}`)}
              className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring flex h-full flex-col rounded-lg border p-5 transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none lg:p-6"
            >
              <p className="text-primary text-xs font-semibold">
                {SCHOOLS.find((item) => item.key === course.school)?.name}
              </p>
              <h3 className="mt-2 text-lg font-semibold break-keep">
                {course.title}
              </h3>
              <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed break-keep">
                {course.summary}
              </p>
              <p className="text-muted-foreground mt-4 text-xs">
                {coursesPage.fields.duration} {course.duration} ·{" "}
                {coursesPage.fields.capacity} {course.capacity}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
