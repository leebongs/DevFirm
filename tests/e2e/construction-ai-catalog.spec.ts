import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test, expect, type Locator, type Page } from "@playwright/test";

const CONSTRUCTION_ROUTE = "/ko/solutions/agents/construction";
const SECTION_ID = "construction-ai-catalog";
const DOWNLOAD_LABEL = "건설AI 솔루션 카탈로그 PDF 내려 받기";
const PDF_HREF = "/catalogs/construction-ai-catalog-v3.pdf";
const PDF_FILENAME = "devfirm-construction-ai-catalog-v3.pdf";
const PDF_BYTES = 5_792_663;
const PDF_SHA256 =
  "33bf44b81900b44c7d74c067a5846faff1a7476ef808376f288147978902bd02";

const AREA_TITLES = [
  "도급계약·법적 리스크",
  "설계변경·추가 공사비",
  "물가변동(ESC)·계약금액",
  "공정스케줄·공기관리(CPM)",
  "기성·자금 수지",
  "클레임·분쟁 예방",
  "품질·준공 승인",
  "안전보건관리체계",
  "공사 기록·서무 자동화",
] as const;

const VIEWPOINTS = [
  "비용 보전",
  "안전 확보",
  "손실 방지",
  "효율 향상",
  "법리 안정",
] as const;

const FLOW_STEPS = [
  "현장 문서 입력",
  "계약·법규·업무 기준 대조",
  "검토 리포트",
] as const;

function sha256(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function catalogSection(page: Page): Locator {
  return page.locator(`#${SECTION_ID}`).locator("xpath=ancestor::section[1]");
}

async function gotoCatalog(page: Page): Promise<void> {
  const response = await page.goto(CONSTRUCTION_ROUTE);
  expect(response?.status(), "한국어 건설 페이지 응답 상태").toBeLessThan(400);
}

test.describe("건설AI 카탈로그", () => {
  test.describe("뷰포트 독립 계약", () => {
    test.skip(
      ({ viewport }) => viewport?.width !== 1440,
      "콘텐츠와 다운로드 계약은 1440 프로젝트에서 한 번만 검증",
    );

    test("9개 지원 업무를 각각 h3 제목으로 표시한다", async ({ page }) => {
      await gotoCatalog(page);
      const headings = catalogSection(page).getByRole("heading", { level: 3 });

      await expect(headings).toHaveCount(AREA_TITLES.length);
      await expect(headings).toHaveText([...AREA_TITLES]);
    });

    test("5개 검토 관점을 빠짐없이 표시한다", async ({ page }) => {
      await gotoCatalog(page);
      const section = catalogSection(page);

      for (const viewpoint of VIEWPOINTS) {
        await expect(section.getByText(viewpoint, { exact: true })).toHaveCount(
          1,
        );
      }
    });

    test("처리 흐름의 세 단계를 정해진 순서로 표시한다", async ({ page }) => {
      await gotoCatalog(page);
      const flow = catalogSection(page)
        .locator("ol")
        .filter({ hasText: FLOW_STEPS[0] });
      const items = flow.locator(":scope > li");

      await expect(items).toHaveCount(FLOW_STEPS.length);
      for (const [index, title] of FLOW_STEPS.entries()) {
        await expect(
          items.nth(index).getByText(title, { exact: true }),
        ).toHaveCount(1);
      }
      await expect(items.nth(2)).toContainText("근거");
      await expect(items.nth(2)).toContainText("보완사항");
    });

    test("데이터 경계와 사람 검수 및 비보장 책임을 고지한다", async ({
      page,
    }) => {
      await gotoCatalog(page);
      const text = (await catalogSection(page).textContent()) ?? "";

      expect(text).toMatch(/고객사[\s\S]*지정[\s\S]*Mac/);
      expect(text).toMatch(/외부 LLM 벤더 API/);
      expect(text).toMatch(/담당자와 전문가[\s\S]*원문[\s\S]*확인/);
      expect(text).toMatch(
        /권리 성립[\s\S]*비용 보전[\s\S]*분쟁 결과[\s\S]*보장하지 않/,
      );
    });

    test("기존 역량과 기대 효과 사이에 카탈로그를 배치한다", async ({
      page,
    }) => {
      await gotoCatalog(page);
      const order = await page
        .locator("#capabilities, #construction-ai-catalog, #outcomes")
        .evaluateAll((nodes) => nodes.map((node) => node.id));

      expect(order).toEqual(["capabilities", SECTION_ID, "outcomes"]);
    });

    test("영문 건설 페이지에는 한국어 카탈로그를 표시하지 않는다", async ({
      page,
    }) => {
      await page.goto("/en/solutions/agents/construction");

      await expect(page.locator(`#${SECTION_ID}`)).toHaveCount(0);
      await expect(
        page.getByRole("link", { name: DOWNLOAD_LABEL }),
      ).toHaveCount(0);
    });

    test("한국어 콘텐츠 산업 페이지에는 건설 카탈로그를 표시하지 않는다", async ({
      page,
    }) => {
      await page.goto("/ko/solutions/agents/content");

      await expect(page.locator(`#${SECTION_ID}`)).toHaveCount(0);
      await expect(
        page.getByRole("link", { name: DOWNLOAD_LABEL }),
      ).toHaveCount(0);
    });

    test("데스크톱 목차에 카탈로그 링크를 정확히 한 번만 추가한다", async ({
      page,
    }) => {
      await gotoCatalog(page);
      const toc = page.getByRole("navigation", { name: "이 페이지의 내용" });

      await expect(toc).toBeVisible();
      await expect(toc.locator("a")).toHaveCount(6);
      await expect(toc.locator(`a[href='#${SECTION_ID}']`)).toHaveCount(1);
      for (const title of AREA_TITLES) {
        await expect(
          toc.getByRole("link", { name: title, exact: true }),
        ).toHaveCount(0);
      }
    });

    test("PDF 링크가 고정 경로와 다운로드 파일명을 제공한다", async ({
      page,
    }) => {
      await gotoCatalog(page);
      const link = page.getByRole("link", {
        name: DOWNLOAD_LABEL,
        exact: true,
      });

      await expect(link).toHaveAttribute("href", PDF_HREF);
      await expect(link).toHaveAttribute("download", PDF_FILENAME);
    });

    test("브라우저 다운로드 파일이 기준 PDF와 일치한다", async ({ page }) => {
      await gotoCatalog(page);
      const link = page.getByRole("link", {
        name: DOWNLOAD_LABEL,
        exact: true,
      });
      const downloadPromise = page.waitForEvent("download");

      await link.click();
      const download = await downloadPromise;
      const path = await download.path();

      expect(download.suggestedFilename()).toBe(PDF_FILENAME);
      expect(path, "다운로드된 임시 파일 경로").not.toBeNull();

      const data = await readFile(path!);
      expect(data.subarray(0, 5).toString("ascii")).toBe("%PDF-");
      expect(data.byteLength).toBe(PDF_BYTES);
      expect(sha256(data)).toBe(PDF_SHA256);
    });

    test("PDF 직접 응답이 원본 바이트를 반환한다", async ({
      request,
      baseURL,
    }) => {
      const response = await request.get(new URL(PDF_HREF, baseURL).toString());
      const data = await response.body();

      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/pdf");
      expect(data.subarray(0, 5).toString("ascii")).toBe("%PDF-");
      expect(data.byteLength).toBe(PDF_BYTES);
      expect(sha256(data)).toBe(PDF_SHA256);
    });
  });

  test("PDF CTA 터치 영역은 최소 44px이다", async ({ page }) => {
    await gotoCatalog(page);

    const link = page.getByRole("link", {
      name: DOWNLOAD_LABEL,
      exact: true,
    });
    const box = await link.boundingBox();

    expect(box, "PDF CTA 경계 상자").not.toBeNull();
    expect(box!.width, "PDF CTA 너비").toBeGreaterThanOrEqual(44);
    expect(box!.height, "PDF CTA 높이").toBeGreaterThanOrEqual(44);
  });
});
