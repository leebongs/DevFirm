import { test, expect } from "@playwright/test";
import { DEFAULT_LOCALE } from "../../content/locales";
import { mainNav } from "../../content/navigation";

/**
 * 메가메뉴 드롭다운이 헤더 컨테이너 안에 머무는지 검사한다.
 *
 * 회귀 이력: shadcn 의 NavigationMenuViewport 는 메뉴 루트의 **왼쪽**(left-0)에
 * 붙는다. 메뉴 루트는 헤더 오른쪽 끝에 있으므로 34rem 패널이 그대로 화면 밖으로
 * 밀려나 오른쪽 열의 하위 항목이 잘렸다. 좁은 폭일수록 심했다.
 *
 * 함께 보는 것: 패널 안 라벨이 두 줄로 쪼개지지 않아야 한다. body 전역
 * `overflow-wrap: anywhere`(긴 URL 대응)가 라벨까지 먹으면 "최과장AI" 가
 * "최과장A / I" 로 갈라진다. 눈으로는 놓치기 쉬운 회귀라 여기서 잡는다.
 *
 * lg(1024px) 미만에서는 메가메뉴 대신 드로어가 뜨므로 건너뛴다.
 */
const TRIGGERS = mainNav.filter((n) => n.children?.length).map((n) => n.label);

test.describe("메가메뉴", () => {
  test.skip(
    ({ viewport }) => (viewport?.width ?? 0) < 1024,
    "lg 미만은 드로어를 쓴다",
  );

  for (const label of TRIGGERS) {
    test(`드롭다운이 컨테이너를 넘지 않는다: ${label}`, async ({ page }) => {
      await page.goto(`/${DEFAULT_LOCALE}`);

      // ssr:false 로 로드되므로 하이드레이션을 기다린다
      const trigger = page
        .locator("[data-slot=navigation-menu-trigger]", { hasText: label })
        .first();
      await trigger.waitFor({ state: "visible" });
      await trigger.hover();

      const panel = page.locator("[data-slot=navigation-menu-viewport]");
      await expect(panel).toBeVisible();

      const box = await panel.boundingBox();
      const inner = await page.evaluate(() => {
        const el = document.querySelector("header .mx-auto");
        if (!el) throw new Error("헤더 컨테이너를 찾지 못했습니다");
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          left: r.left + parseFloat(cs.paddingLeft),
          right: r.right - parseFloat(cs.paddingRight),
        };
      });

      if (!box) throw new Error("패널 박스를 측정하지 못했습니다");

      // 서브픽셀 반올림 여유 0.5px
      expect(
        box.x + box.width,
        `패널 오른쪽 ${(box.x + box.width).toFixed(1)} > 컨테이너 ${inner.right.toFixed(1)}`,
      ).toBeLessThanOrEqual(inner.right + 0.5);
      expect(
        box.x,
        `패널 왼쪽 ${box.x.toFixed(1)} < 컨테이너 ${inner.left.toFixed(1)}`,
      ).toBeGreaterThanOrEqual(inner.left - 0.5);

      // 라벨은 한 줄이어야 한다. 줄 수 = getClientRects().length
      const wrapped = await panel.evaluate((el) =>
        [...el.querySelectorAll("a > span:first-child")]
          .filter((s) => s.getClientRects().length > 1)
          .map((s) => s.textContent?.trim() ?? ""),
      );
      expect(wrapped, `두 줄로 쪼개진 라벨: ${wrapped.join(", ")}`).toEqual([]);
    });
  }
});
