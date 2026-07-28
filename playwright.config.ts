import { defineConfig, devices } from "@playwright/test";

/**
 * 6 뷰포트 프로젝트(§9.1 A1, §4.5).
 *
 * 최소 지원 폭 320px 을 첫 프로젝트로 둔다. 접두사 없는 Tailwind 유틸리티가
 * 곧 320px 레이아웃이므로 여기서 깨지면 나머지도 믿을 수 없다.
 *
 * dev 서버가 아니라 프로덕션 빌드를 대상으로 돌린다. dev 오버레이와
 * 개발 전용 스크립트가 레이아웃·번들 측정을 오염시키기 때문이다.
 */
const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : [["list"]],

  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },

  projects: VIEWPORTS.map((viewport) => ({
    name: viewport.name,
    use: {
      ...devices["Desktop Chrome"],
      viewport: { width: viewport.width, height: viewport.height },
    },
  })),

  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "pnpm start --port 3100",
        url: "http://127.0.0.1:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
