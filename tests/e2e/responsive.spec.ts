import { test, expect } from "@playwright/test";
import { ROUTES } from "../routes";

/**
 * A1 반응형 무결성 — 가로 스크롤 0, 요소 잘림 0.
 *
 * 계획서가 "320 / 390 / 768 / 1024 / 1440 / 1920 에서 가로 스크롤 0" 을
 * acceptance 로 못 박았으므로(§9.1), 그 문장을 그대로 assert 로 옮긴다.
 */
for (const route of ROUTES) {
  test(`가로 스크롤 없음: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status(), `${route} 응답 상태`).toBeLessThan(400);

    // 폰트 로딩 후 레이아웃이 정착할 때까지 기다린다
    await page.evaluate(() => document.fonts.ready);

    const overflow = await page.evaluate(() => {
      const doc = document.scrollingElement ?? document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        innerWidth: window.innerWidth,
      };
    });

    expect(
      overflow.scrollWidth,
      `${route} — 문서 폭 ${overflow.scrollWidth}px 이 뷰포트 ${overflow.innerWidth}px 를 넘음`,
    ).toBeLessThanOrEqual(overflow.innerWidth);
  });
}

test("sticky 헤더와 섹션 내비 합산 높이가 112px 이하", async ({
  page,
  viewport,
}) => {
  // 계획서 DoD 는 이 상한을 "모바일 실측" 으로 한정한다. 세로 공간이 귀한
  // 좁은 화면의 제약이며, lg 이상에서는 헤더가 72px 로 커지는 것이 설계다.
  test.skip(
    (viewport?.width ?? 0) >= 1024,
    "112px 상한은 모바일 구간에만 적용된다",
  );

  // 섹션 내비가 실제로 나타나는 경로에서 잰다
  await page.goto("/about/cic");
  await page.evaluate(() => document.fonts.ready);

  const total = await page.evaluate(() => {
    const header = document.querySelector("header");
    const subnav = header?.nextElementSibling;
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const subnavHeight =
      subnav && getComputedStyle(subnav).position === "sticky"
        ? subnav.getBoundingClientRect().height
        : 0;
    return headerHeight + subnavHeight;
  });

  expect(
    total,
    `뷰포트 ${viewport?.width}px 에서 sticky 총 높이`,
  ).toBeLessThanOrEqual(112);
});
