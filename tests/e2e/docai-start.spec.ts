import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("DocASI 팀 시작 안내", () => {
  test("공개 주소가 리다이렉트 없이 열리고 DevFirm 주소를 canonical로 사용한다", async ({
    page,
    request,
  }) => {
    const directResponse = await request.get("/solutions/docasi/start", {
      maxRedirects: 0,
    });

    expect(directResponse.status()).toBe(200);

    const response = await page.goto("/solutions/docasi/start");
    expect(response?.status()).toBe(200);
    expect(response?.request().redirectedFrom()).toBeNull();
    expect(new URL(page.url()).pathname).toBe("/solutions/docasi/start");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.devfirm.co/solutions/docasi/start",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://www.devfirm.co/solutions/docasi/start",
    );

    const legacyResponse = await page.goto("/ko/solutions/docasi/start");
    expect(legacyResponse?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.devfirm.co/solutions/docasi/start",
    );
  });

  test("가입 순서와 로컬 계정 보안 원칙을 안내한다", async ({ page }) => {
    const response = await page.goto("/solutions/docasi/start");

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "초대받은 팀에서 DocASI를 시작하세요",
      }),
    ).toBeVisible();

    await expect(page.getByText("계정은 회사 Mac에 저장됩니다")).toBeVisible();
    await expect(
      page.getByText(/이 페이지 URL은 인증정보를 포함하지 않는 공개 안내서/),
    ).toBeVisible();
    await expect(
      page.getByText(
        /1회용 팀 계정 초대 코드, 초대에 적힌 정확한 이메일과 이름/,
      ),
    ).toBeVisible();

    const steps = page.locator("ol > li");
    await expect(steps).toHaveCount(9);
    await expect(
      page.getByRole("heading", { name: "검사받을 문서를 폴더에 넣습니다" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "지정한 문서 폴더에 리스크 검사 받고, 규정 검사 받고 싶은 문서를 넣습니다.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "관리자 승인을 기다립니다" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "업무 폴더를 선택합니다" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "내 알림과 감사기록을 확인합니다",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "접속 경로를 연 뒤 코드나 링크로 등록합니다",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("장치 연결 코드", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("장치 연결 링크", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("SSH 접속 경로", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/공개 시작 안내 URL과 별도로 생성된 장치 연결 링크/),
    ).toBeVisible();
    await expect(
      page.getByText(
        /설정 → 직원 앱 연결 → 링크로 연결에서 초대할 직원 이름 옆에 이메일을 입력하고 초대 링크를 만듭니다/,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(/SSH 설정 후에도 장치 연결 코드나 링크 중 하나로/),
    ).toBeVisible();
    await expect(
      page.getByText(
        /‘이메일 보내기’를 눌러 받는 사람, 제목과 안내 문구가 채워진/,
      ),
    ).toBeVisible();
    await expect(
      page.getByText("https://www.devfirm.co/solutions/docasi/start"),
    ).toBeVisible();

    await expect(page.locator("input")).toHaveCount(0);
    await expect(page.locator("form")).toHaveCount(0);
  });

  test("모바일과 데스크탑에서 중대한 접근성 위반이 없다", async ({
    page,
    viewport,
  }) => {
    test.skip(
      ![390, 1440].includes(viewport?.width ?? 0),
      "내비게이션 구조가 바뀌는 모바일과 데스크탑에서 검증",
    );

    await page.goto("/solutions/docasi/start");
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
    ).toEqual([]);
  });
});
