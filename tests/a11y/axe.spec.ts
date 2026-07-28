import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES } from "../routes";

/**
 * A5 접근성 — axe critical/serious 위반 0.
 *
 * 모바일(390)과 데스크탑(1440) 두 구간에서 돌린다. 내비게이션 구현이
 * lg 를 경계로 완전히 갈리므로(드로어 ↔ 메가메뉴) 한쪽만 보면 절반을 놓친다.
 */
const SCANNED_WIDTHS = [390, 1440];

test.describe("접근성", () => {
  test.skip(
    ({ viewport }) => !SCANNED_WIDTHS.includes(viewport?.width ?? 0),
    "390 · 1440 프로젝트에서만 실행",
  );

  for (const route of ROUTES) {
    test(`axe 위반 없음: ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const blocking = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(
        blocking.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => node.target).slice(0, 3),
        })),
        `${route} 의 critical/serious 위반`,
      ).toEqual([]);
    });
  }
});
