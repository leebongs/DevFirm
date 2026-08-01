import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, type Locale } from "@/content/locales";
import { flattenNav } from "@/lib/nav";
import { footerNav } from "@/content/navigation";
import { agents } from "@/content/agents";
import { courses } from "@/content/courses";
import { jobs } from "@/content/careers";

/**
 * sitemap.xml (§Phase 5).
 *
 * 정적 경로는 navigation.ts 에서, 동적 경로는 콘텐츠 배열에서 파생시킨다.
 * 손으로 적은 목록을 두면 페이지가 늘어날 때 반드시 어긋난다.
 * `/styleguide` 는 excludeFromSitemap 로 걸러진다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = new Set<string>(["/"]);

  for (const node of flattenNav()) staticPaths.add(node.href);
  for (const node of flattenNav(footerNav)) staticPaths.add(node.href);
  staticPaths.add("/contact");
  staticPaths.delete("/styleguide");

  const dynamicPaths = [
    ...agents.map((agent) => `/solutions/agents/${agent.slug}`),
    ...courses.map((course) => `/academy/courses/${course.slug}`),
    ...jobs
      .filter((job) => job.status === "open")
      .map((job) => `/about/careers/${job.slug}`),
  ];

  const all = [...new Set([...staticPaths, ...dynamicPaths])].sort();

  /**
   * 언어 × 경로.
   *
   * 접두사 없는 주소를 실으면 크롤러가 받는 것은 문서가 아니라 307 이다 —
   * 사이트맵이 리다이렉트 목록이 되어 버린다. 실제 주소를 싣는다.
   *
   * 각 항목에 `alternates.languages` 를 달아 같은 문서의 다른 언어판을
   * 서로 묶는다. 이게 없으면 17개 언어판이 서로 무관한 중복 문서로 읽혀
   * 하나만 남고 나머지가 색인에서 빠진다.
   */
  const url = (locale: Locale, path: string) =>
    `${site.url}/${locale}${path === "/" ? "" : path}`;

  return locales.flatMap(({ code }) =>
    all.map((path) => ({
      url: url(code, path),
      changeFrequency:
        path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === "/"
          ? 1
          : path.split("/").filter(Boolean).length === 1
            ? 0.8
            : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l.code, url(l.code, path)]),
        ),
      },
    })),
  );
}
