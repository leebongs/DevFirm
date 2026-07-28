import { test, expect } from "@playwright/test";
import { ROUTES } from "../routes";
import { agents } from "../../content/agents";

/**
 * A9 SEO — 전 페이지 고유 title/description/canonical.
 * 뷰포트와 무관하므로 한 프로젝트에서만 돌린다.
 */
test.describe("SEO", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  test("전 페이지 title·description 이 존재하고 서로 겹치지 않는다", async ({
    page,
  }) => {
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();

    for (const route of ROUTES) {
      await page.goto(route);

      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");

      expect(title, `${route} title`).toBeTruthy();
      expect(description, `${route} description`).toBeTruthy();

      const duplicateTitle = [...titles.entries()].find(
        ([, value]) => value === title,
      );
      expect(
        duplicateTitle,
        `${route} 의 title 이 ${duplicateTitle?.[0]} 와 같습니다`,
      ).toBeUndefined();

      const duplicateDesc = [...descriptions.entries()].find(
        ([, value]) => value === description,
      );
      expect(
        duplicateDesc,
        `${route} 의 description 이 ${duplicateDesc?.[0]} 와 같습니다`,
      ).toBeUndefined();

      titles.set(route, title);
      descriptions.set(route, description ?? "");
    }
  });

  test("전 페이지 canonical 이 자기 경로를 가리킨다", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical, `${route} canonical`).toBeTruthy();
      const path = new URL(canonical ?? "").pathname;
      expect(path === "" ? "/" : path, `${route} canonical 경로`).toBe(route);
    }
  });
});

/**
 * §5.8 DoD — 형제 산업 링크가 자기 자신을 제외하고 5개 노출.
 * 템플릿 하나가 6개 경로를 만들기 때문에 이 규칙이 깨져도 눈에 잘 안 띈다.
 */
test.describe("산업별 에이전트 템플릿", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  for (const agent of agents) {
    test(`형제 산업 링크 5개, 자기 자신 제외: ${agent.slug}`, async ({
      page,
    }) => {
      await page.goto(`/solutions/agents/${agent.slug}`);

      // 본문 안의 산업별 링크만 센다. 헤더 메가메뉴에는 6개가 모두 있으므로
      // main 밖을 포함하면 이 규칙을 검증할 수 없다.
      const hrefs = await page
        .locator('main a[href^="/solutions/agents/"]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
      const unique = [...new Set(hrefs)];

      expect(unique, `${agent.slug} 형제 링크 목록`).toHaveLength(5);
      expect(
        unique,
        `${agent.slug} 페이지가 자기 자신을 형제로 링크함`,
      ).not.toContain(`/solutions/agents/${agent.slug}`);
    });
  }
});
