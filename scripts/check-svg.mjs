#!/usr/bin/env node
/**
 * SVG 자산 게이트.
 *
 * 왜 필요한가 — 실제로 당한 결함:
 *   파비콘 주석에 CSS 토큰 이름을 적으면서 `--foreground` 라고 썼다.
 *   **XML 주석 안에는 하이픈 두 개를 연달아 쓸 수 없다.** 그 한 줄로 문서가
 *   well-formed 를 잃었고, 브라우저는 파비콘 렌더를 거부하고 탭에 기본
 *   지구본을 띄웠다. 저장소·배포·게이트 어디에서도 잡히지 않았다.
 *
 *   눈으로도 안 잡혔다. 검수 시트가 SVG 를 HTML 에 **인라인**해 그렸기 때문이다 —
 *   HTML 파서는 관대해서 그대로 그려진다. XML 파서를 타는 것은 `<img src>` 와
 *   파비콘 경로뿐이고, 사이트가 자산을 쓰는 방식이 정확히 그것이다.
 *
 * 그래서 두 단계로 본다.
 *   1. XML 파싱 — 위 부류를 잡는다. 빠르고 브라우저가 필요 없다.
 *   2. 실제 래스터 — `<img>` 로 불러 `naturalWidth > 0` 을 확인한다.
 *      파싱을 통과해도 브라우저가 거부하는 경우가 남기 때문이다.
 *
 * 실행: pnpm check:svg
 */
import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = process.cwd();
/** 사이트가 실제로 서빙하거나 굽는 SVG 가 있는 곳 */
const SCAN = ["public", "app", "assets"];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (extname(full) === ".svg") out.push(full);
  }
  return out;
}

const files = SCAN.flatMap((d) => walk(join(ROOT, d))).sort();
if (files.length === 0) {
  console.error("✖ 검사할 SVG 를 찾지 못했습니다.");
  process.exit(1);
}

const failures = [];

// ── 1단계: XML 파싱 ────────────────────────────────────────────────────────
// DOMParser 는 실패해도 예외를 던지지 않고 <parsererror> 를 심는다. 그것을 본다.
const browser = await chromium.launch();
const page = await browser.newPage();

for (const file of files) {
  const rel = relative(ROOT, file);
  const source = readFileSync(file, "utf8");

  const parseError = await page.evaluate((svg) => {
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
    const err = doc.querySelector("parsererror");
    return err ? err.textContent.trim().split("\n")[0] : null;
  }, source);

  if (parseError) {
    failures.push({ rel, stage: "XML 파싱", detail: parseError });
    continue;
  }

  // ── 2단계: 실제 래스터 ──────────────────────────────────────────────────
  // data URI 로 <img> 에 물려 브라우저가 그림으로 받아들이는지 본다.
  const raster = await page.evaluate(async (svg) => {
    const uri =
      "data:image/svg+xml;base64," +
      btoa(String.fromCharCode(...new TextEncoder().encode(svg)));
    const img = new Image();
    img.src = uri;
    try {
      await img.decode();
    } catch {
      return { ok: false, w: 0, h: 0 };
    }
    return {
      ok: img.naturalWidth > 0,
      w: img.naturalWidth,
      h: img.naturalHeight,
    };
  }, source);

  if (!raster.ok) {
    failures.push({
      rel,
      stage: "래스터",
      detail: `브라우저가 이미지로 받아들이지 않음 (naturalWidth ${raster.w})`,
    });
  }
}

await browser.close();

if (failures.length) {
  console.error(`\n✖ SVG 자산 ${failures.length}건 실패\n`);
  for (const f of failures) {
    console.error(`  ${f.rel}\n    [${f.stage}] ${f.detail}`);
  }
  console.error(
    "\n  흔한 원인: XML 주석 안의 연속된 하이픈 두 개 · 이스케이프하지 않은 & 나 < ·\n" +
      "  닫히지 않은 태그. 주석에 CSS 커스텀 프로퍼티 이름을 적을 때 특히 조심할 것.",
  );
  process.exit(1);
}

console.log(`✔ SVG 자산 통과 (파싱·래스터 ${files.length}개)`);
