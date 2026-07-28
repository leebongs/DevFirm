import { test, expect } from "@playwright/test";
import { legacyRedirects } from "../../content/redirects";

/**
 * A4 리다이렉트 — §2.3 표를 그대로 테스트 케이스로 옮긴 것.
 *
 * `permanent: true` 는 308 을 낸다(301 아님, §12.1 D-2).
 * 홉 수까지 보는 이유는 체인이 생기면 SEO 신호가 희석되기 때문이다.
 */
test.describe("레거시 경로 리다이렉트", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  for (const { from, to } of legacyRedirects) {
    test(`${from} → ${to} (단일 홉 308)`, async ({ request, baseURL }) => {
      const response = await request.get(`${baseURL}${from}`, {
        maxRedirects: 0,
      });

      expect(response.status(), `${from} 상태 코드`).toBe(308);
      expect(response.headers()["location"], `${from} location`).toBe(to);
    });
  }

  test("리다이렉트를 따라가면 실제로 200 에 도달한다", async ({
    request,
    baseURL,
  }) => {
    for (const { from } of legacyRedirects) {
      const response = await request.get(`${baseURL}${from}`);
      expect(response.status(), `${from} 최종 상태`).toBe(200);
    }
  });
});
