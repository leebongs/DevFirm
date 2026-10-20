import { expect, test, type Page } from "@playwright/test";
import { DOC_AI_START_HREF } from "../../content/docai-entry";

async function expectEntryAndArrival(
  page: Page,
  route: string,
  scope: "footer" | "main",
  label: string,
) {
  await page.goto(route);
  const entry = page.locator(scope).getByRole("link", { name: label });

  await expect(entry).toBeVisible();
  await expect(entry).toHaveAttribute("href", DOC_AI_START_HREF);

  const response = await page.goto(DOC_AI_START_HREF);
  expect(response?.status()).toBe(200);
  expect(response?.request().redirectedFrom()).toBeNull();
  expect(new URL(page.url()).pathname).toBe(DOC_AI_START_HREF);
}

test.describe("DocASI 시작 안내 진입 링크", () => {
  test("공통 푸터에서 일반 사용자가 안내를 찾을 수 있다", async ({ page }) => {
    await expectEntryAndArrival(page, "/ko", "footer", "DocASI 팀 시작 안내");
  });

  test("솔루션 설명 페이지 하단에서 안내로 이동한다", async ({ page }) => {
    await expectEntryAndArrival(
      page,
      "/ko/solutions",
      "main",
      "DocASI 팀 시작 안내",
    );
  });

  test("최과장AI Hero에서 안내로 이동한다", async ({ page }) => {
    await expectEntryAndArrival(
      page,
      "/ko/solutions/office-ai",
      "main",
      "DocASI 팀 시작 안내",
    );
  });
});
