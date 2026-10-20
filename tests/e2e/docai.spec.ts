import { test, expect } from "@playwright/test";

test.describe("DocASI 카탈로그", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "상태 전환은 뷰포트 독립 — 1440 프로젝트에서 한 번만 검증",
  );

  test("locale 접두가 붙은 구 docai 경로는 같은 locale 의 docasi 로 308 이동한다", async ({
    page,
    request,
  }) => {
    const redirect = await request.get("/ko/solutions/docai", {
      maxRedirects: 0,
    });
    expect(redirect.status()).toBe(308);
    expect(
      new URL(redirect.headers()["location"] ?? "", "http://x").pathname,
    ).toBe("/ko/solutions/docasi");

    const startRedirect = await request.get("/en/solutions/docai/start", {
      maxRedirects: 0,
    });
    expect(startRedirect.status()).toBe(308);
    expect(
      new URL(startRedirect.headers()["location"] ?? "", "http://x").pathname,
    ).toBe("/en/solutions/docasi/start");

    const landed = await page.goto("/ko/solutions/docai");
    expect(landed?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/ko/solutions/docasi");
  });

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

test("영문 히어로의 제품 카피와 행동 카피 순서를 유지한다", async ({
  page,
}) => {
  await page.goto("/en/solutions/docasi");

  const eyebrow = page.getByText("Upload a document. Move work forward.", {
    exact: true,
  });
  const headline = page.getByRole("heading", {
    level: 1,
    name: "Superintelligence for Document Compliance",
  });

  await expect(eyebrow).toBeVisible();
  await expect(headline).toBeVisible();
  await expect
    .poll(async () =>
      eyebrow.evaluate(
        (element, target) =>
          element.compareDocumentPosition(target) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        await headline.elementHandle(),
      ),
    )
    .toBeTruthy();
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
});
