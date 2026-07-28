import type { MetadataRoute } from "next";
import { site } from "@/content/site";
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

  return all.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path.split("/").filter(Boolean).length === 1
          ? 0.8
          : 0.6,
  }));
}
