import { expect, test } from "@playwright/test";

/**
 * 다운로드 섹션은 문구(사전)와 링크(서명 피드)가 서로 다른 곳에서 온다.
 * 여기서는 둘이 한 화면에서 올바르게 합쳐졌는지를 본다 — 버튼이 릴리스
 * 저장소의 실제 자산 패턴을 가리키는지, 사양과 무료 버전 안내가 보이는지.
 */
test.describe("DocASI 다운로드 섹션", () => {
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
      /DocAI-releases\/releases\/download\/v[\d.]+\/DocAI-[\d.]+-universal\.dmg$/,
    );

    const win = page.getByRole("link", { name: /DocASI for Team Member/ });
    await expect(win).toBeVisible();
    await expect(win).toHaveAttribute(
      "href",
      /DocAI-releases\/releases\/download\/v[\d.]+\/DocAI-forTeamMemebr-Setup-[\d.]+-win-x64\.exe$/,
    );
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
});
