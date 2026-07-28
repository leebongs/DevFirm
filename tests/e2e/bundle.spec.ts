import { test, expect } from "@playwright/test";
import { ROUTES } from "../routes";

/**
 * A8 번들 — 초기 JS ≤ 130KB gzip / 페이지.
 *
 * Next 16 은 `next build` 출력에서 size·First Load JS 열을 없앴다(§12.1 D-1).
 * RSC 구조에서 부정확하다는 이유인데, 그렇다고 예산을 포기할 이유는 없다.
 * 대신 실제로 문서를 로드하며 내려온 JS 응답 바이트를 합산한다 —
 * 빌드 산출물 추정이 아니라 브라우저가 실제로 받은 양이다.
 */
const BUDGET_BYTES = 130 * 1024;

test.describe("번들 예산", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  for (const route of ROUTES) {
    test(`초기 JS ≤ 130KB: ${route}`, async ({ page }) => {
      let jsBytes = 0;

      page.on("response", (response) => {
        const url = response.url();
        const type = response.headers()["content-type"] ?? "";
        if (!url.includes("/_next/static/")) return;
        if (!type.includes("javascript") && !url.endsWith(".js")) return;

        const encoded = response.headers()["content-length"];
        if (encoded) jsBytes += Number(encoded);
      });

      await page.goto(route, { waitUntil: "networkidle" });

      expect(
        jsBytes,
        `${route} 초기 JS ${(jsBytes / 1024).toFixed(1)}KB (예산 130KB)`,
      ).toBeLessThanOrEqual(BUDGET_BYTES);
    });
  }
});
