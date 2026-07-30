#!/usr/bin/env node
/**
 * 메가메뉴 오버플로 게이트.
 *
 * 드롭다운 패널이 헤더 컨테이너의 안쪽 폭(패딩 제외)을 좌우 어느 쪽으로도
 * 넘지 않아야 한다. 넘으면 좁은 화면에서 하위 메뉴가 잘려 클릭할 수 없다.
 *
 * 덤으로 패널 안 라벨이 두 줄로 쪼개지지 않는지도 본다. body 전역
 * `overflow-wrap: anywhere`(긴 URL 대응)가 라벨에까지 걸리면 "최과장AI" 가
 * "최과장A / I" 로 갈라지는데, 눈으로만 보면 놓치기 쉬운 회귀다.
 *
 * 사용: node scripts/check-menu-overflow.mjs [baseUrl]
 * 서버가 떠 있어야 한다(dev 든 start 든 무관).
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const SHOTS = process.env.MENU_SHOT_DIR;

/** lg(1024px) 이상에서만 메가메뉴가 뜬다. 그 경계부터 와이드까지 훑는다. */
const WIDTHS = [1024, 1120, 1280, 1440, 1680, 1920];
/** 하위 메뉴를 가진 트리거. content/navigation.ts 와 어긋나면 여기서 터진다. */
const TRIGGERS = ["회사소개", "AI 솔루션", "개발 서비스", "아카데미"];

if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();
const rows = [];

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  // 메가메뉴는 ssr:false 라 하이드레이션 뒤에야 DOM 에 들어온다
  await page.waitForSelector("[data-slot=navigation-menu-trigger]", {
    timeout: 20000,
  });

  for (const label of TRIGGERS) {
    // 트리거 textContent 는 "회사소개 " + chevron 이라 완전일치로는 못 잡는다
    const trigger = page
      .locator("[data-slot=navigation-menu-trigger]", { hasText: label })
      .first();
    await trigger.hover();
    // 뷰포트가 폭/높이를 애니메이션하므로 확정될 때까지 기다린다
    await page
      .locator("[data-slot=navigation-menu-viewport]")
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(() => {});
    await page.waitForTimeout(500);

    const r = await page.evaluate(() => {
      const panel = document.querySelector(
        "[data-slot=navigation-menu-viewport]",
      );
      const container = document.querySelector("header .mx-auto");
      if (!panel || !container) return { open: false };

      const p = panel.getBoundingClientRect();
      const c = container.getBoundingClientRect();
      const cs = getComputedStyle(container);
      const innerLeft = c.left + parseFloat(cs.paddingLeft);
      const innerRight = c.right - parseFloat(cs.paddingRight);

      // 각 링크의 첫 span 이 라벨. getClientRects().length 가 곧 줄 수다.
      const wrapped = [...panel.querySelectorAll("a > span:first-child")]
        .filter((el) => el.getClientRects().length > 1)
        .map((el) => el.textContent.trim());

      return {
        open: p.width > 0,
        overRight: +(p.right - innerRight).toFixed(1),
        overLeft: +(innerLeft - p.left).toFixed(1),
        panel: `${p.left.toFixed(0)}→${p.right.toFixed(0)}`,
        inner: `${innerLeft.toFixed(0)}→${innerRight.toFixed(0)}`,
        wrapped,
      };
    });

    // 서브픽셀 반올림 여유 0.5px
    const bad =
      !r.open || r.overRight > 0.5 || r.overLeft > 0.5 || r.wrapped.length > 0;
    if (bad && SHOTS) {
      await page.screenshot({ path: `${SHOTS}/FAIL-${width}-${label}.png` });
    }
    rows.push({ width, label, bad, ...r });
  }

  if (SHOTS) await page.screenshot({ path: `${SHOTS}/menu-${width}.png` });
  await page.close();
}
await browser.close();

const failed = rows.filter((r) => r.bad);
for (const r of rows) {
  const head = `${r.bad ? "✖" : "✔"} ${String(r.width).padStart(4)}px ${r.label.padEnd(7)}`;
  if (!r.open) {
    console.log(`${head} 패널이 열리지 않음`);
    continue;
  }
  console.log(
    `${head} 패널 ${r.panel}  컨테이너 ${r.inner}  초과(우 ${r.overRight} / 좌 ${r.overLeft})` +
      (r.wrapped.length ? `  줄바꿈: ${r.wrapped.join(", ")}` : ""),
  );
}

if (failed.length) {
  console.error(`\n✖ 메가메뉴 오버플로 ${failed.length}건`);
  process.exit(1);
}
console.log(
  `\n✔ 메가메뉴 오버플로 통과 (${WIDTHS.length}개 폭 × ${TRIGGERS.length}개 메뉴)`,
);
