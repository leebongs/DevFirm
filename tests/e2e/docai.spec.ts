import { test, expect } from "@playwright/test";

test.describe("DocASI 카탈로그", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "상태 전환은 뷰포트 독립 — 1440 프로젝트에서 한 번만 검증",
  );

  test("업무 분야와 검색어로 문서팩을 좁히고 초기화한다", async ({ page }) => {
    await page.goto("/ko/solutions/docasi");

    const cards = page.locator("article[aria-labelledby^='pack-']");
    const search = page.getByRole("searchbox", { name: "문서팩 검색" });

    await expect(cards).toHaveCount(8);

    await page.getByRole("button", { name: "재무·증빙" }).click();
    await expect(cards).toHaveCount(2);
    await expect(
      page.getByRole("heading", { name: "세금계산서·거래명세 대조" }),
    ).toBeVisible();

    await search.fill("입찰");
    await expect(
      page.getByRole("heading", {
        name: "조건에 맞는 문서팩이 없습니다",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "필터 초기화" }).click();
    await expect(search).toHaveValue("");
    await expect(cards).toHaveCount(8);

    await search.fill("입찰");
    await expect(cards).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "입찰공고·제안요청서 분석" }),
    ).toBeVisible();
  });
});
