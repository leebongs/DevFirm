#!/usr/bin/env node
/**
 * A6 색 대비 검증 (§9.1)
 *
 * app/globals.css 의 :root 토큰을 파싱해 실제로 화면에서 만나는 조합의
 * WCAG 대비를 계산한다. 기준(§4.2):
 *   본문 텍스트 ≥ 7:1 (AAA 지향) / 보조·큰 텍스트 ≥ 4.5:1 (AA 필수)
 *   UI 경계·포커스 ≥ 3:1
 *
 * 다크 팔레트는 Phase 6 범위(O-3)이므로 검사 대상이 아니다.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

/**
 * 모든 :root { ... } 블록에서 --토큰: 값; 를 뽑는다.
 *
 * 블록이 여럿인 이유: 색 토큰과 글래스 토큰을 성격별로 나눠 선언했다.
 * 첫 블록만 읽던 초기 버전은 글래스 토큰을 놓쳐 "토큰 없음"으로 죽었다 —
 * 검사기가 검사 대상을 못 보는 상태였으므로 파서를 고치는 게 맞다.
 */
function parseRootTokens(source) {
  const tokens = {};
  let searchFrom = 0;
  let found = false;

  for (;;) {
    const start = source.indexOf(":root {", searchFrom);
    if (start === -1) break;
    found = true;

    let depth = 0;
    let i = source.indexOf("{", start);
    const from = i + 1;
    for (; i < source.length; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }

    for (const line of source.slice(from, i).split("\n")) {
      const m = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/);
      if (m && m[1] && m[2]) tokens[m[1]] = m[2].trim();
    }
    searchFrom = i + 1;
  }

  if (!found) throw new Error(":root 블록을 찾지 못했습니다");
  return tokens;
}

const tokens = parseRootTokens(css);

/** var(--x) 참조를 한 단계씩 끝까지 푼다 */
function resolve(name, seen = new Set()) {
  const raw = tokens[name];
  if (raw === undefined) throw new Error(`토큰 없음: ${name}`);
  const m = raw.match(/^var\((--[\w-]+)\)$/);
  if (!m || !m[1]) return raw;
  if (seen.has(name)) throw new Error(`순환 참조: ${name}`);
  seen.add(name);
  return resolve(m[1], seen);
}

/** "oklch(L C H)" → {L, C, H} (L은 0~1, 퍼센트도 허용) */
function parseOklch(value) {
  const m = value.match(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/,
  );
  if (!m || !m[1] || !m[2] || !m[3]) return null;
  const l = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  const alpha = m[4]
    ? m[4].endsWith("%")
      ? parseFloat(m[4]) / 100
      : parseFloat(m[4])
    : 1;
  return { L: l, C: parseFloat(m[2]), H: parseFloat(m[3]), alpha };
}

/** oklch → 감마 인코딩된 sRGB 0~1 (색역 밖은 클립: 실제 디스플레이 동작) */
function oklchToSrgb({ L, C, H }) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];

  return lin.map((v) => {
    const clipped = Math.min(1, Math.max(0, v));
    return clipped <= 0.0031308
      ? 12.92 * clipped
      : 1.055 * clipped ** (1 / 2.4) - 0.055;
  });
}

/** WCAG 상대 휘도 */
function luminance(srgb) {
  const [r, g, b] = srgb.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

/** 반투명 토큰(border 등)을 배경 위에 합성 */
function composite(fg, bg) {
  if (fg.alpha >= 1) return oklchToSrgb(fg);
  const f = oklchToSrgb(fg);
  const b = oklchToSrgb(bg);
  return f.map((v, i) => v * fg.alpha + (b[i] ?? 0) * (1 - fg.alpha));
}

function contrast(fgToken, bgToken) {
  const fg = parseOklch(resolve(fgToken));
  const bg = parseOklch(resolve(bgToken));
  if (!fg || !bg)
    throw new Error(`oklch 파싱 실패: ${fgToken} 또는 ${bgToken}`);
  const l1 = luminance(composite(fg, bg));
  const l2 = luminance(oklchToSrgb(bg));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * 반투명 레이어를 순서대로 base 위에 쌓는다.
 *
 * 유리면은 단일 색이 아니라 [사진] → [스크림] → [유리 틴트] 가 겹친 결과다.
 * 쌍 하나로는 계산할 수 없고, 실제로 눈에 보이는 면을 만들어야 한다.
 */
function stackOn(baseSrgb, layerTokens) {
  return layerTokens.reduce((bg, name) => {
    const layer = parseOklch(resolve(name));
    if (!layer) throw new Error(`레이어 파싱 실패: ${name}`);
    const f = oklchToSrgb(layer);
    return f.map((v, i) => v * layer.alpha + (bg[i] ?? 0) * (1 - layer.alpha));
  }, baseSrgb);
}

/** 임의의 sRGB 면 위에 놓인 토큰 색의 대비 */
function contrastOnSurface(fgToken, surfaceSrgb) {
  const fg = parseOklch(resolve(fgToken));
  if (!fg) throw new Error(`oklch 파싱 실패: ${fgToken}`);
  const l1 = luminance(oklchToSrgb(fg));
  const l2 = luminance(surfaceSrgb);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** 실제 사용 조합. min 은 §4.2 기준. */
const PAIRS = [
  ["--foreground", "--background", 7, "본문 / 페이지 배경"],
  ["--foreground", "--muted", 7, "본문 / 교대 섹션 배경"],
  ["--foreground", "--card", 7, "본문 / 카드"],
  ["--muted-foreground", "--background", 4.5, "보조 텍스트 / 배경"],
  ["--muted-foreground", "--muted", 4.5, "보조 텍스트 / 교대 배경"],
  ["--primary", "--background", 4.5, "링크·강조 텍스트 / 배경"],
  // eyebrow(12px)와 링크는 교대 배경·카드 위에도 그대로 올라간다.
  // 흰 배경만 검사했더니 axe 가 muted 배경에서 미달을 잡아냈다.
  ["--primary", "--muted", 4.5, "링크·강조 텍스트 / 교대 배경"],
  ["--primary", "--card", 4.5, "링크·강조 텍스트 / 카드"],
  ["--primary", "--accent", 4.5, "링크·강조 텍스트 / hover 면"],
  ["--primary-foreground", "--primary", 4.5, "CTA 버튼 라벨 / 버튼"],
  ["--brand-foreground", "--brand", 7, "브랜드 밴드 본문 / 네이비 면"],
  ["--highlight-foreground", "--highlight", 4.5, "배지 라벨 / Circuit Cyan"],
  ["--accent-foreground", "--accent", 7, "메뉴 항목 텍스트 / hover 면"],
  ["--secondary-foreground", "--secondary", 7, "보조 버튼 라벨 / 면"],
  ["--destructive", "--background", 4.5, "폼 에러 텍스트 / 배경"],
  ["--destructive-foreground", "--destructive", 4.5, "에러 버튼 라벨 / 면"],
  ["--input", "--background", 3, "인풋 테두리 / 배경 (컨트롤 경계)"],
  ["--ring", "--background", 3, "포커스 링 / 배경"],
];

/**
 * 참고용(게이트 아님).
 *
 * WCAG 1.4.11 Non-text Contrast 는 "UI 컴포넌트와 그 상태를 식별하는 데 필요한
 * 시각 정보"를 대상으로 한다. 카드 테두리와 구분선은 콘텐츠 자체가 경계를
 * 말해주므로 여기 해당하지 않는다. 3:1 을 강제하면 페이지 전체에 진한 선이
 * 깔려 §4.1 의 "조용한 정밀함"과 정면으로 충돌한다.
 * 반면 인풋 테두리는 컨트롤 경계를 알리는 유일한 수단이므로 위 게이트에 있다.
 */
const INFORMATIONAL = [
  ["--border", "--background", "카드·구분선 / 배경 (장식 — 1.4.11 비대상)"],
];

/**
 * 유리면 위 텍스트 (글래스모피즘 게이트).
 *
 * 유리는 단일 색이 아니라 [배경 사진] → [스크림] → [유리 틴트] 가 겹친 결과다.
 * 배경 사진은 통제할 수 없으므로 **최악의 경우 = 순백 픽셀**을 base 로 잡는다.
 * 사진이 아무리 밝아도 스크림이 눌러주는 값보다 밝아질 수 없으니, 이 계산을
 * 통과하면 어떤 사진을 깔아도 대비가 보장된다.
 *
 * 반대 방향(어두운 사진)은 면이 더 어두워질 뿐이라 흰 텍스트에 유리하다.
 */
const WORST_CASE_PHOTO = [1, 1, 1]; // 순백 픽셀

const GLASS_PAIRS = [
  // 유리 패널은 스크림 없이 사진 위에 직접 놓일 수도 있다. 그래서 스크림을
  // 빼고 유리만으로 대비가 성립하는지 본다 — 성립하면 어디에 놓든 안전하다.
  {
    fg: "--brand-foreground",
    layers: ["--glass-fill"],
    min: 7,
    label: "유리 위 본문 (스크림 없이, 최악: 순백 사진)",
  },
  // --glass-fill-subtle 은 장식 전용(텍스트 금지)이라 본문 기준을 적용하지
  // 않는다. 대신 그 면 위에 실수로 글자를 올리면 이 값이 낮다는 사실이
  // 아래 참고 출력에 남는다.
  {
    fg: "--brand-foreground",
    layers: ["--scrim-text"],
    min: 7,
    label: "헤드라인 / 텍스트측 스크림 (유리 없는 구간)",
  },
  {
    fg: "--highlight",
    layers: ["--glass-fill"],
    min: 4.5,
    label: "유리 위 시안 강조 텍스트",
  },
  {
    fg: "--glass-edge",
    layers: ["--glass-fill"],
    min: 1.2,
    label: "유리 테두리 가시성 (장식 수준)",
  },
];

let failed = 0;
const rows = PAIRS.map(([fg, bg, min, label]) => {
  const ratio = contrast(fg, bg);
  const ok = ratio >= min;
  if (!ok) failed++;
  return { fg, bg, min, label, ratio, ok };
});

const pad = (s, n) => String(s).padEnd(n);
console.log(
  `\n${pad("판정", 5)} ${pad("비율", 8)} ${pad("기준", 6)} 조합 (전경 / 배경)`,
);
console.log("-".repeat(78));
for (const r of rows) {
  console.log(
    `${pad(r.ok ? "  ✔" : "  ✖", 5)} ${pad(r.ratio.toFixed(2) + ":1", 8)} ${pad(
      "≥ " + r.min,
      6,
    )} ${r.label}\n      ${r.fg} / ${r.bg}`,
  );
}

console.log("\n유리면 (배경 사진이 순백일 때의 최악 조건)");
console.log("-".repeat(78));
for (const g of GLASS_PAIRS) {
  const surface = stackOn(WORST_CASE_PHOTO, g.layers);
  const ratio = contrastOnSurface(g.fg, surface);
  const ok = ratio >= g.min;
  if (!ok) failed++;
  console.log(
    `${pad(ok ? "  ✔" : "  ✖", 5)} ${pad(ratio.toFixed(2) + ":1", 8)} ${pad(
      "≥ " + g.min,
      6,
    )} ${g.label}\n      ${g.fg} / ${g.layers.join(" + ")}`,
  );
}

console.log("\n참고 (게이트 아님)");
console.log("-".repeat(78));
for (const [fg, bg, label] of INFORMATIONAL) {
  if (!fg || !bg) continue;
  console.log(
    `  ·   ${pad(contrast(fg, bg).toFixed(2) + ":1", 8)}        ${label}\n      ${fg} / ${bg}`,
  );
}

if (failed > 0) {
  console.error(
    `\n✖ A6 색 대비 ${failed}건 미달. 토큰을 조정하고 다시 검사하세요 — 색을 나중에 바꾸면 전 페이지 재검증 비용이 발생합니다.\n`,
  );
  process.exit(1);
}
console.log(`\n✔ A6 색 대비 전수 통과 (${rows.length}개 조합)\n`);
