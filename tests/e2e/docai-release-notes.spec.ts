import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  DOC_AI_RELEASE_NOTES_PATH,
  DOC_AI_RELEASE_NOTES_URL,
  LEGACY_DOC_AI_RELEASE_NOTES_PATH,
  docAiReleases,
  latestDocAiRelease,
} from "../../content/docai-release-notes";

test.describe("DocASI 릴리스 노트", () => {
  test("DocASI 공개 주소와 구 DocAI 호환 주소가 열리고 canonical은 DocASI를 유지한다", async ({
    page,
    request,
  }) => {
    const directResponse = await request.get(DOC_AI_RELEASE_NOTES_PATH, {
      maxRedirects: 0,
    });

    expect(directResponse.status()).toBe(200);

    const legacyResponse = await request.get(LEGACY_DOC_AI_RELEASE_NOTES_PATH, {
      maxRedirects: 0,
    });
    expect(legacyResponse.status()).toBe(200);

    const response = await page.goto(DOC_AI_RELEASE_NOTES_PATH);
    expect(response?.status()).toBe(200);
    expect(response?.request().redirectedFrom()).toBeNull();
    expect(new URL(page.url()).pathname).toBe(DOC_AI_RELEASE_NOTES_PATH);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      DOC_AI_RELEASE_NOTES_URL,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      DOC_AI_RELEASE_NOTES_URL,
    );
  });

  test("최신 버전과 이전 기준 버전의 제목·날짜·변경 항목을 표시한다", async ({
    page,
  }) => {
    await page.goto(DOC_AI_RELEASE_NOTES_PATH);

    await expect(
      page.getByRole("heading", { level: 1, name: "DocASI 릴리스 노트" }),
    ).toBeVisible();

    const releases = page.locator("details");
    await expect(releases).toHaveCount(docAiReleases.length);
    await expect(releases.first()).toHaveAttribute("open", "");
    await expect(releases.nth(1)).not.toHaveAttribute("open", "");

    for (const release of docAiReleases) {
      const row = page.locator(
        `#release-${release.version.replaceAll(".", "-")}`,
      );
      await expect(
        row.getByText(`v${release.version}`, { exact: true }),
      ).toBeVisible();
      await expect(row.getByText(release.title, { exact: true })).toBeVisible();
      await expect(row.locator("time")).toHaveAttribute(
        "datetime",
        release.publishedAt,
      );
    }

    const otaRelease = page.locator("#release-0-2-9");
    await expect(
      otaRelease.getByRole("heading", { name: "Mac Hub 로그인 세션 유지" }),
    ).toBeVisible();
    await expect(
      otaRelease.getByText(/암호화 desktop-session을 복호화/),
    ).toBeVisible();
    await expect(
      otaRelease.getByText(/0\.2\.6 전환 브리지를 거쳐야/),
    ).toBeVisible();
    await expect(
      otaRelease.getByRole("heading", { name: "OTA 재시작 실패 복구" }),
    ).toBeVisible();
    await expect(otaRelease.getByText(/완전히 끝났는지 확인/)).toBeVisible();
    await expect(
      otaRelease.getByText(/기존 연결 설정과 계정 데이터를 유지/),
    ).toBeVisible();

    const workspaceRelease = page.locator("#release-0-2-8");
    await workspaceRelease.locator("summary").click();
    await expect(
      workspaceRelease.getByText("DocASI-0.2.8-universal.dmg", {
        exact: false,
      }),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByText(
        "DocASI-forTeamMemebr-Setup-0.2.8-win-x64.exe",
        { exact: false },
      ),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByRole("heading", {
        name: "Mac 워크스페이스 ROOT 이전",
      }),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByText(
        /~\/Documents\/DocAI 전체를 ~\/Documents\/DocASI/,
      ),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByText(/\.docai 내부 데이터를 그대로 보존/),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByText(/자동 병합하지 않고 두 경로를 안내/),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByText(/Dock에 표시되는 이름은 DocASI Hub/),
    ).toBeVisible();
    await expect(
      workspaceRelease.getByText(/내부 앱 이름은 DocASI를 유지/),
    ).toBeVisible();

    const canonicalRelease = page.locator("#release-0-2-7");
    await canonicalRelease.locator("summary").click();
    await expect(
      canonicalRelease.getByText("DocASI-0.2.7-universal.dmg", {
        exact: false,
      }),
    ).toBeVisible();
    await expect(
      canonicalRelease.getByText(
        "DocASI-forTeamMemebr-Setup-0.2.7-win-x64.exe",
        { exact: false },
      ),
    ).toBeVisible();
    await expect(
      canonicalRelease.getByRole("heading", {
        name: "기존 Mac Hub 업데이트 방법",
      }),
    ).toBeVisible();
    await expect(
      canonicalRelease.getByText(/0\.2\.2 → 0\.2\.6 → 0\.2\.7/),
    ).toBeVisible();
    await expect(
      canonicalRelease.getByText(
        /수동으로 설치하면 다시 로그인해야 할 수 있지만/,
      ),
    ).toBeVisible();
    await expect(
      canonicalRelease.getByText(/Documents 폴더.*삭제하지 마세요/),
    ).toBeVisible();

    const bridgeRelease = page.locator("#release-0-2-6");
    await bridgeRelease.locator("summary").click();
    await expect(
      bridgeRelease.getByRole("heading", {
        name: "기존 Mac Hub를 위한 전환 브리지",
      }),
    ).toBeVisible();

    const compatibilityRelease = page.locator("#release-0-2-2");
    await compatibilityRelease.locator("summary").click();

    await expect(
      page.getByRole("heading", { name: "Windows 업데이트 연결", exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/HTTP\/2 연결을 우선 사용/)).toBeVisible();
    await expect(
      page.getByText(/웹사이트 전체의 방화벽 설정은 변경하지 않았습니다/),
    ).toBeVisible();
    await page.locator("#release-0-2-1 summary").click();

    await expect(
      page.getByRole("heading", { name: "프로필 사진을 한곳에서 관리" }),
    ).toBeVisible();
    await expect(
      page.getByText(/저장 버튼 없이 사진만 자동 저장/),
    ).toBeVisible();
    await expect(
      page.getByText(/프로필 사진이나 카메라를 누르면/),
    ).toBeVisible();
    await expect(
      page.getByText(/사진이 있을 때만 사진 아래에 작은 삭제 버튼/),
    ).toBeVisible();
    await expect(page.getByText(/원본 파일 크기는 최대 5 MiB/)).toBeVisible();
    await expect(page.getByText(/전체 해상도는 20MP 이하/)).toBeVisible();
    await expect(page.getByText(/최대 256 KiB의 PNG/)).toBeVisible();
    await expect(
      page.getByText(/원본 파일과 사진 메타데이터는 저장하지 않습니다/),
    ).toBeVisible();
    const previousStableRelease = page.locator("#release-0-2-0");
    await expect(previousStableRelease).toBeVisible();
    await previousStableRelease.locator("summary").click();

    await expect(
      page.getByRole("heading", { name: "OTA 소프트웨어 업데이트" }),
    ).toBeVisible();
    await expect(
      page.getByText(/서명, 크기와 SHA-256을 모두 확인한 뒤에만 설치/),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Windows 팀원 앱의 설치 후 실행 파일명은 DocAI-forTeamMemebr.exe로 통일했습니다.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "문서 사진 첨부" }),
    ).toBeVisible();
    await expect(
      page.getByText(/사진을 다른 사진으로 변경하거나 문서에서 제거/),
    ).toBeVisible();
    await expect(
      page.getByText(/최저, 저, 중, 필수확인, 고, 최고리스크의 6단계/),
    ).toBeVisible();
    await expect(page.getByText(/기울어진 사각형 도장 배지/)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Windows 화면 테마" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        /각 테마는 라이트와 다크 모드를 지원하며, 기본값은 Notion/,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /Notion, Blueprint, Adobe에서 영감을 받은 그라디언트, Aqua Glass, 선명한 Kakao Yellow, 여백을 넓게 둔 Spotify Green의 6개 테마/,
      ),
    ).toBeVisible();
    await expect(page.getByText(/일관된 둥근 모서리/)).toBeVisible();
    await expect(
      page.getByText(`v${latestDocAiRelease.version}`, { exact: true }),
    ).toHaveCount(2);
  });

  test("summary를 키보드로 열고 닫을 수 있다", async ({ page }) => {
    await page.goto(DOC_AI_RELEASE_NOTES_PATH);

    const previousRelease = page.locator("details").nth(1);
    const summary = previousRelease.locator("summary");

    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(previousRelease).toHaveAttribute("open", "");

    await page.keyboard.press("Space");
    await expect(previousRelease).not.toHaveAttribute("open", "");
  });

  test("공통 푸터에서 릴리스 노트를 찾을 수 있다", async ({ page }) => {
    await page.goto("/ko");

    const link = page.getByRole("link", { name: "릴리스 노트", exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", DOC_AI_RELEASE_NOTES_PATH);
  });

  test("모바일과 데스크탑에서 중대한 접근성 위반이 없다", async ({
    page,
    viewport,
  }) => {
    test.skip(
      ![390, 1440].includes(viewport?.width ?? 0),
      "릴리스 노트의 모바일과 데스크탑 구조에서 검증",
    );

    await page.goto(DOC_AI_RELEASE_NOTES_PATH);
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
