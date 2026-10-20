import { expect, test } from "@playwright/test";

/**
 * 다운로드 섹션은 문구(사전)와 링크(서명 피드)가 서로 다른 곳에서 온다.
 * 여기서는 둘이 한 화면에서 올바르게 합쳐졌는지를 본다 — 버튼이 릴리스
 * 저장소의 실제 자산 패턴을 가리키는지, 사양과 무료 버전 안내가 보이는지.
 */
test.describe("DocASI 다운로드 섹션", () => {
  test("현재 빌드의 OS 서명 상태를 다운로드 버튼보다 먼저 안내한다", async ({
    page,
  }) => {
    await page.goto("/ko/solutions/docasi#download");

    const notice = page.getByRole("note", {
      name: "현재 빌드의 운영체제 보안 경고",
    });
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(
      "Apple 공증과 Windows 게시자 코드 서명이 적용되지 않아",
    );
    await expect(notice).toContainText(
      "ECDSA 서명과 SHA-256 검증은 별도의 무결성 검사",
    );
    await expect(notice).toContainText(
      "Apple 공증이나 Windows 신뢰 게시자 서명을 대신하지 않습니다",
    );
    expect(
      await notice.evaluate((node) => {
        const download = document.querySelector(
          'a[href$="/DocASI-0.2.9-universal.dmg"]',
        );
        return Boolean(
          download &&
          (node.compareDocumentPosition(download) &
            Node.DOCUMENT_POSITION_FOLLOWING) !==
            0,
        );
      }),
    ).toBe(true);

    await page.goto("/en/solutions/docasi#download");
    const englishNotice = page.getByRole("note", {
      name: "Operating system security notice for this build",
    });
    await expect(englishNotice).toBeVisible();
    await expect(englishNotice).toContainText(
      "not Apple-notarized and do not have Windows publisher code signing",
    );
    await expect(englishNotice).toContainText(
      "do not replace Apple notarization or a trusted Windows publisher signature",
    );
  });

  test("무료 다운로드 버튼 두 개가 릴리스 자산을 가리킨다", async ({
    page,
  }) => {
    await page.goto("/ko/solutions/docasi");

    await expect(
      page.getByRole("heading", {
        name: "지금 앱을 다운로드, 무료 버전 맛보기 체험 해 보세요.",
      }),
    ).toBeVisible();

    const mac = page.getByRole("link", { name: /DocASI HUB APP for Leader/ });
    await expect(mac).toBeVisible();
    await expect(mac).toHaveAttribute(
      "href",
      "https://github.com/leebongs/DocAI-releases/releases/download/v0.2.9/DocASI-0.2.9-universal.dmg",
    );
    await expect(mac).toContainText("v0.2.9");

    const win = page.getByRole("link", { name: /DocASI for Team Member/ });
    await expect(win).toBeVisible();
    await expect(win).toHaveAttribute(
      "href",
      "https://github.com/leebongs/DocAI-releases/releases/download/v0.2.9/DocASI-forTeamMemebr-Setup-0.2.9-win-x64.exe",
    );
    await expect(win).toContainText("v0.2.9");
  });

  test("다운로드 공유 주소가 페이지 앵커로 308 이동한다", async ({
    request,
    baseURL,
  }) => {
    // locale 접두 변형은 proxy 가 같은 locale 의 앵커로 보낸다.
    const localized = await request.get(
      `${baseURL}/ko/solutions/docasi/download`,
      { maxRedirects: 0 },
    );
    expect(localized.status()).toBe(308);
    const location = new URL(localized.headers()["location"] ?? "", "http://x");
    expect(location.pathname).toBe("/ko/solutions/docasi");
    expect(location.hash).toBe("#download");
  });

  test("앵커 대상인 download 제목이 존재한다", async ({ page }) => {
    await page.goto("/ko/solutions/docasi");
    await expect(page.locator("h2#download")).toHaveText(
      "지금 앱을 다운로드, 무료 버전 맛보기 체험 해 보세요.",
    );
  });

  test("제목 옆 링크 버튼이 공유 주소를 클립보드에 복사한다", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ko/solutions/docasi");

    const button = page.getByRole("button", { name: "다운로드 링크 복사" });
    await button.scrollIntoViewIfNeeded();
    await button.click();

    await expect(page.getByText("링크가 복사되었습니다")).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe("https://www.devfirm.co/solutions/docasi/download");
  });

  test("최소·권장 사양과 무료 버전 안내가 보인다", async ({ page }) => {
    await page.goto("/ko/solutions/docasi");

    await expect(
      page.getByText("macOS 11 Big Sur 이상 (Apple Silicon·Intel 공용)"),
    ).toBeVisible();
    await expect(
      page.getByText("Windows 10 64비트 또는 Windows 11 (x64)"),
    ).toBeVisible();
    await expect(
      page.getByText(
        "무료 버전과 개발 버전은 예고 없는 업데이트로 앱이 꺼졌다 켜질 수 있습니다.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText("무료 사용량에 따라 일부 기능이 제한될 수 있습니다."),
    ).toBeVisible();
  });

  test("기존 Mac Hub 사용자의 안전한 OTA 전환 순서를 안내한다", async ({
    page,
  }) => {
    await page.goto("/ko/solutions/docasi#download");

    const guidance = page.getByRole("complementary").filter({
      has: page.getByRole("heading", {
        name: "기존 DocAI Mac Hub를 사용 중인가요?",
      }),
    });
    await expect(guidance).toBeVisible();
    await expect(
      guidance.getByText(/0\.2\.2 → 0\.2\.6 → 0\.2\.7 → 0\.2\.9/),
    ).toBeVisible();
    await expect(
      guidance.getByText(/다시 로그인해야 할 수 있지만/),
    ).toBeVisible();
    await expect(guidance.getByText(/DocAI 앱 번들만 삭제/)).toBeVisible();
    await expect(
      guidance.getByText(/Documents 폴더.*삭제하지 마세요/),
    ).toBeVisible();
  });
});
