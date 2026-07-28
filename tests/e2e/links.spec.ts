import { test, expect } from "@playwright/test";
import { ROUTES } from "../routes";

/**
 * A3 링크 무결성 — 내부 404 = 0, 외부 링크는 rel="noopener".
 * A2 내비게이션 — 모든 사이트맵 경로가 3클릭 이내 도달.
 */
test.describe("링크", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  test("내부 링크에 404 가 없다", async ({ page, request, baseURL }) => {
    const internal = new Set<string>();

    for (const route of ROUTES) {
      await page.goto(route);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));

      for (const href of hrefs) {
        if (!href) continue;
        if (href.startsWith("/") && !href.startsWith("//")) {
          // 쿼리·해시를 떼고 경로만 본다
          internal.add(href.split("#")[0]?.split("?")[0] ?? "");
        }
      }
    }
    internal.delete("");

    const broken: string[] = [];
    for (const href of internal) {
      const response = await request.get(`${baseURL}${href}`);
      if (response.status() >= 400)
        broken.push(`${href} → ${response.status()}`);
    }

    expect(broken, "깨진 내부 링크").toEqual([]);
    expect(internal.size, "검사한 내부 링크 수").toBeGreaterThan(10);
  });

  test("외부 링크는 새 창에서 열리고 noopener 를 갖는다", async ({ page }) => {
    const offenders: string[] = [];

    for (const route of ROUTES) {
      await page.goto(route);
      const externals = await page
        .locator('a[href^="http"]')
        .evaluateAll((nodes) =>
          nodes.map((node) => ({
            href: node.getAttribute("href") ?? "",
            target: node.getAttribute("target"),
            rel: node.getAttribute("rel") ?? "",
          })),
        );

      for (const link of externals) {
        // 같은 사이트를 가리키는 절대 URL 은 외부가 아니다
        if (link.href.includes("cmnyx.com") || link.href.includes("devfirm"))
          continue;
        if (link.target !== "_blank" || !link.rel.includes("noopener")) {
          offenders.push(`${route} → ${link.href} (rel="${link.rel}")`);
        }
      }
    }

    expect(offenders, "target/rel 이 빠진 외부 링크").toEqual([]);
  });

  test("모든 사이트맵 경로가 헤더·푸터에서 도달 가능하다", async ({ page }) => {
    await page.goto("/");

    // 푸터는 RSC 라 초기 HTML 에 전체 링크가 들어 있다(§6.4.1).
    // 메가메뉴는 ssr:false 이므로 여기서 세면 안 된다.
    const footerHrefs = await page
      .locator("footer a[href^='/']")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));

    const reachable = new Set(footerHrefs.filter(Boolean) as string[]);
    const missing = ROUTES.filter(
      (route) => route !== "/" && !reachable.has(route),
    );

    expect(missing, "푸터에서 도달할 수 없는 경로").toEqual([]);
  });
});
