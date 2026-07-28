#!/usr/bin/env node
/**
 * 선별된 SVG 일러스트의 PNG 파생본을 만든다(2x).
 *
 * 전부 굽지 않는다. 사이트는 SVG 만 쓰고, PNG 는 SVG 를 못 받는 곳
 * — 제안서·문서 첨부, 카카오맵 공유 미리보기, 인쇄 — 을 위한 것이다.
 * 23개를 다 구우면 저장소에 수 MB 가 쌓이고 그중 대부분은 아무도 쓰지 않는다.
 *
 * 실행: pnpm gen:png
 */
import { chromium } from "@playwright/test";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/images/png");

/** [SVG 경로, 논리 폭, 논리 높이] — PNG 는 2배로 굽는다 */
const TARGETS = [
  ["map/map-office.svg", 800, 500],
  ["agents/agent-construction.svg", 480, 360],
  ["agents/agent-content.svg", 480, 360],
  ["agents/agent-manufacturing.svg", 480, 360],
  ["agents/agent-distribution.svg", 480, 360],
  ["agents/agent-service.svg", 480, 360],
  ["agents/agent-safety.svg", 480, 360],
];

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

for (const [rel, width, height] of TARGETS) {
  const svg = readFileSync(join(ROOT, "public/images", rel), "utf8");
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  // 흰 배경을 깐다 — 투명 PNG 는 어두운 문서 배경에 얹으면 형태가 사라진다
  await page.setContent(
    `<body style="margin:0;background:#ffffff">${svg.replace(
      "<svg",
      `<svg width="${width}" height="${height}"`,
    )}</body>`,
  );
  const out = join(OUT, basename(rel, ".svg") + ".png");
  await page.screenshot({ path: out });
  await page.close();
  console.log(
    `✔ public/images/png/${basename(out)} (${width * 2}×${height * 2})`,
  );
}

await browser.close();
