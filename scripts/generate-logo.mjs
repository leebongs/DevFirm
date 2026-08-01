#!/usr/bin/env node
/**
 * DevFirm 로고타이프 생성기.
 *
 * 워드마크·엠블렘·파비콘을 **하나의 그리드 상수 집합**에서 뽑는다. 셋을 각각
 * 손으로 그리면 나중에 한쪽만 고쳐져 서로 어긋난다 — 파비콘의 D 와 헤더 D 가
 * 미묘하게 다른 로고는 그 방식으로 생긴다. 여기서는 같은 함수가 같은 패스를
 * 내므로 어긋날 수가 없다.
 *
 * 글자는 폰트가 아니라 기하로 그린다. SVG 파비콘은 폰트를 로드하지 않고,
 * 헤더 로고도 Pretendard 가 늦게 오면 모양이 바뀐다. 로고는 그러면 안 된다.
 *
 * 산출물
 *   assets/logo/wordmark.svg          — 워드마크 원본(문서용)
 *   app/icon.svg                      — 파비콘(엠블렘)
 *   components/layout/brand-logo.tsx  — 헤더용 인라인 컴포넌트
 *
 * 실행: pnpm gen:logo   (PNG 아이콘은 이어서 pnpm gen:icons)
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── 그리드 ────────────────────────────────────────────────────────────────
// y 는 아래로 증가한다. 모든 수치는 이 좌표계의 단위다.
const BASE = 72; // 베이스라인
const CAP = 2; // 대문자 상단 (캡하이트 70)
const XL = 22; // 소문자 상단 (엑스하이트 50)
const CAP_STEM = 14; // 대문자 세로 획
const LC_STEM = 13.5; // 소문자 세로 획
const ARM = 12.5; // 가로 획 — 세로보다 얇아야 시각적으로 같아 보인다
const RING = 13; // 원형 글자(e)의 획
const OVER = 1.5; // 오버슛. 둥근 글자와 뾰족한 꼭짓점은 평평한 글자보다 더 나가야
//                   같은 크기로 보인다.

const r2 = (n) => +n.toFixed(2);

// ── 글리프 ────────────────────────────────────────────────────────────────
// 각 글리프는 { w, el } — 잉크 폭과 SVG 엘리먼트 목록.
//
// 왜 글리프마다 엘리먼트를 나누는가: 하나의 <path> 안에 서브패스를 겹쳐 놓으면
// 결과가 fill-rule 과 감기 방향에 좌우된다. 엘리먼트를 나누면 겹침이 그냥
// 합집합이 되어 규칙과 무관하게 항상 같은 모양이 나온다.
// 구멍이 필요한 D 만 한 패스 안에 카운터를 두되, 서로 겹치지 않게 그린다.

/** D — 왼쪽 스템 + 반원 보울. 카운터는 반대 방향으로 감아 구멍이 된다. */
function glyphD() {
  const w = 52;
  const rOut = (BASE - CAP) / 2; // 35
  const cx = w - rOut; // 17
  const cy = (CAP + BASE) / 2; // 37
  const rIn = rOut - ARM; // 22.5
  return {
    w,
    d:
      `M0,${CAP} H${cx} A${rOut},${rOut} 0 0 1 ${cx},${BASE} H0 Z ` +
      `M${CAP_STEM},${r2(cy + rIn)} H${cx} A${rIn},${rIn} 0 0 0 ${cx},${r2(cy - rIn)} H${CAP_STEM} Z`,
  };
}

/** F — 스템 + 상단 팔 + 짧은 중간 팔 */
function glyphF() {
  const w = 40;
  const midTop = 33;
  return {
    w,
    d:
      `M0,${CAP} H${w} V${CAP + ARM} H${CAP_STEM} V${midTop} H${w - 6} ` +
      `V${midTop + ARM} H${CAP_STEM} V${BASE} H0 Z`,
  };
}

/**
 * e — 링 + 크로스바.
 *
 * 링을 채움(fill)이 아니라 **획(stroke)** 으로 그린다. 개구부를 "구멍을 뚫는
 * 서브패스"로 만들면 그 도형이 링 바깥으로 삐져나간 부분이 오히려 칠해진다 —
 * nonzero 든 evenodd 든 마찬가지다. dasharray 로 획을 끊으면 그 문제가 아예
 * 생기지 않고, butt 캡이 종단을 반지름 방향으로 반듯하게 잘라 준다.
 *
 * 크로스바는 별도 엘리먼트다. 같은 패스의 서브패스가 아니므로 링과 겹쳐도
 * XOR 되지 않는다.
 */
function glyphE() {
  const rOut = (BASE - XL) / 2 + OVER; // 26.5
  const cx = rOut;
  const cy = (XL + BASE) / 2; // 47
  const rMid = rOut - RING / 2; // 획 중심선 반지름
  const rIn = rOut - RING;
  const circumference = 2 * Math.PI * rMid;

  // 개구부.
  //
  // 크로스바는 3시 방향에서 링과 만난다(±13.6°). 개구부를 거기서부터 열면
  // 크로스바 접합부가 잘려 뾰족한 가시처럼 남는다. 접합부 아래에서 시작한다.
  const deg = (d) => (d / 360) * circumference;
  const gapStart = deg(18);
  const gapLen = deg(42);
  const dash = circumference - gapLen;
  // 패턴은 (거리 + dashoffset) 기준으로 반복된다. 간격이 gapStart 에서
  // 시작하도록 역산한다.
  const dashoffset = r2(dash - gapStart);

  const barTop = cy - ARM / 2;
  const barLeft = 8;
  // 오른쪽 링 **안으로** 3 만큼 밀어 넣는다. 링 안쪽 모서리에 딱 맞추면
  // 반올림 한 번에 실틈이 벌어져 크로스바가 떠 보인다.
  const barRight = r2(cx + rIn + 3);

  return {
    w: rOut * 2,
    el: [
      `<circle cx="${cx}" cy="${cy}" r="${rMid}" fill="none" stroke="currentColor" stroke-width="${RING}" stroke-linecap="butt" stroke-dasharray="${r2(dash)} ${r2(gapLen)}" stroke-dashoffset="${dashoffset}"/>`,
      `<path d="M${barLeft},${barTop} H${barRight} V${barTop + ARM} H${barLeft} Z"/>`,
    ],
  };
}

/** v — 두 사선, 바닥은 뾰족하게. 상단 종단은 수평으로 자른다. */
function glyphV() {
  const w = 48;
  const t = 15; // 사선의 가로 두께 — 세로 획보다 굵어야 같아 보인다
  const apexX = w / 2;
  const apexY = BASE + OVER;
  const innerY = 59;
  return {
    w,
    d: `M0,${XL} H${t} L${apexX},${innerY} L${w - t},${XL} H${w} L${apexX},${apexY} Z`,
  };
}

/** i — 스템 + 사각 점 */
function glyphI() {
  const w = LC_STEM;
  return {
    w,
    d: `M0,${XL} H${w} V${BASE} H0 Z M0,${CAP} H${w} V16 H0 Z`,
  };
}

/**
 * 어깨(shoulder) 반지름. r 과 m 이 같은 값을 써야 두 글자가 한 벌로 보인다.
 * 바깥 반지름이 곧 아치의 절반 폭이다.
 */
const SH_OUT = 24;
const SH_IN = SH_OUT - LC_STEM;
const SH_CY = XL + SH_OUT; // 아치 꼭대기가 정확히 엑스하이트에 닿는 높이

/** r — 스템 + 어깨. 종단은 꼭대기에서 수직으로 자른다. */
function glyphR() {
  const w = SH_OUT;
  return {
    w,
    d:
      `M0,${BASE} V${SH_CY} A${SH_OUT},${SH_OUT} 0 0 1 ${SH_OUT},${XL} ` +
      `V${r2(SH_CY - SH_IN)} A${SH_IN},${SH_IN} 0 0 0 ${LC_STEM},${SH_CY} V${BASE} Z`,
  };
}

/**
 * m — 스템 셋 + 어깨 둘.
 *
 * 카운터를 별도 서브패스로 두지 않고 **하나의 컨투어**로 아치 안쪽까지 되짚는다.
 * 그래야 fill-rule 이 무엇이든 항상 같은 모양이 나온다.
 */
function glyphM() {
  const c1 = SH_OUT; // 첫 아치 중심 x
  const stem2L = c1 + SH_IN; // 34.5
  const stem2R = c1 + SH_OUT; // 48
  const c2 = stem2L + SH_OUT; // 58.5
  const w = c2 + SH_OUT; // 82.5
  const stem3L = c2 + SH_IN;
  // 두 바깥 원이 만나는 점 — 아치 사이의 골
  const midX = (c1 + c2) / 2;
  const midY = r2(SH_CY - Math.sqrt(SH_OUT ** 2 - ((c2 - c1) / 2) ** 2));
  return {
    w,
    d:
      `M0,${BASE} V${SH_CY} A${SH_OUT},${SH_OUT} 0 0 1 ${midX},${midY} ` +
      `A${SH_OUT},${SH_OUT} 0 0 1 ${w},${SH_CY} V${BASE} H${stem3L} V${SH_CY} ` +
      `A${SH_IN},${SH_IN} 0 0 0 ${stem2R},${SH_CY} V${BASE} H${stem2L} V${SH_CY} ` +
      `A${SH_IN},${SH_IN} 0 0 0 ${LC_STEM},${SH_CY} V${BASE} Z`,
  };
}

// ── 조판 ──────────────────────────────────────────────────────────────────
const TRACK = 10; // 글자 사이 기본 간격
/** v 다음 F 는 사선과 세로획이 만나 틈이 벌어져 보인다 — 붙이지 말고 더 벌린다 */
const KERN = { vF: 4 };

/** { w, d } 로 온 글리프도 { w, el } 로 통일한다 */
const norm = (g) => ({ w: g.w, el: g.el ?? [`<path d="${g.d}"/>`] });

const LETTERS = [
  ["D", norm(glyphD())],
  ["e", norm(glyphE())],
  ["v", norm(glyphV())],
  ["F", norm(glyphF())],
  ["i", norm(glyphI())],
  ["r", norm(glyphR())],
  ["m", norm(glyphM())],
];

let cursor = 0;
const placed = [];
for (let i = 0; i < LETTERS.length; i++) {
  const [ch, g] = LETTERS[i];
  placed.push({ ch, x: r2(cursor), el: g.el });
  cursor += g.w + TRACK;
  const pair = ch + (LETTERS[i + 1]?.[0] ?? "");
  cursor += KERN[pair] ?? 0;
}
const WORDMARK_W = r2(cursor - TRACK);

/** SVG 속성명을 JSX 프로퍼티명으로 바꾼다 */
const toJsx = (markup) =>
  markup.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/\/>$/, " />");

const glyphGroups = (jsx) =>
  placed
    .map(({ ch, x, el }) => {
      const body = el.map((e) => `    ${jsx ? toJsx(e) : e}`).join("\n");
      const open = jsx
        ? `  {/* ${ch} */}\n  <g transform="translate(${x} 0)">`
        : `  <!-- ${ch} -->\n  <g transform="translate(${x} 0)">`;
      return `${open}\n${body}\n  </g>`;
    })
    .join("\n");

// ── 산출 ──────────────────────────────────────────────────────────────────
mkdirSync(join(ROOT, "assets/logo"), { recursive: true });

writeFileSync(
  join(ROOT, "assets/logo/wordmark.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WORDMARK_W} 100" fill="currentColor" role="img" aria-label="DevFirm">
${glyphGroups(false)}
</svg>
`,
);

/**
 * 마크 — 워드마크의 D·F 를 그대로 축소해 쓴다.
 *
 * 두 벌이 필요하다.
 *
 *  1. `plain` — 타일 없이 레터폼만. **브라우저 탭 파비콘용.**
 *     타일을 씌우면 헤더 워드마크와 다른 물건처럼 보인다. 배경이 없으므로
 *     어두운 탭에서 잉크색 글자가 묻히는데, SVG 파비콘은 자기 안에서
 *     `prefers-color-scheme` 을 볼 수 있으므로 거기서 색을 뒤집는다.
 *
 *  2. `tile` — 네이비 라운드 사각형 위에. **애플 터치 아이콘·헤더 엠블렘용.**
 *     iOS 는 투명 PNG 를 검정 위에 합성하므로 홈화면 아이콘은 반드시 불투명해야
 *     한다. 타일을 벗기면 글자가 그대로 사라진다.
 */
const D = glyphD();
const F = glyphF();
const DF_GAP = 8;
const dfW = D.w + DF_GAP + F.w; // 100
const TILE = 64;

/** DF 글리프 두 개를 한 <g> 로 묶어 낸다 */
const dfGroup = (x, y, scale, fill) =>
  `  <g transform="translate(${x} ${y}) scale(${scale})" fill="${fill}">
    <path d="${D.d}"/>
    <path transform="translate(${D.w + DF_GAP} 0)" d="${F.d}"/>
  </g>`;

// ── 타일 버전 (애플 아이콘·헤더 엠블렘) ────────────────────────────────
const TILE_MARK_W = 40;
const tileScale = r2(TILE_MARK_W / dfW);
const tileX = (TILE - TILE_MARK_W) / 2;
const emblemTile = `  <rect width="${TILE}" height="${TILE}" rx="14" fill="#162e50"/>
${dfGroup(tileX, 14, tileScale, "#f6f9fc")}
  <rect x="${tileX}" y="47" width="${TILE_MARK_W}" height="3" rx="1.5" fill="#00bbcb"/>`;

// ── 타일 없는 버전 (파비콘) ───────────────────────────────────────────
// 배경이 없으므로 글자를 상자에 꽉 채운다. 타일 버전(40/64)보다 1.5배 크다.
const PLAIN_MARK_W = 60;
const plainScale = r2(PLAIN_MARK_W / dfW); // 0.6
const plainX = (TILE - PLAIN_MARK_W) / 2; // 2
// 글리프 캡 상단이 y=2 이므로, 화면상 y=6 에 오려면 translate y 는 6 - 2*scale
const plainY = r2(6 - CAP * plainScale);
const emblemPlain = `  <style>
    /* 밝은 탭에서는 잉크색, 어두운 탭에서는 밝은색. 파비콘은 배경을 갖지
       않으므로 이 전환이 없으면 둘 중 한쪽에서 마크가 사라진다. */
    .mark { fill: #0f1926 }
    @media (prefers-color-scheme: dark) { .mark { fill: #f6f9fc } }
  </style>
${dfGroup(plainX, plainY, plainScale, "currentColor").replace('fill="currentColor"', 'class="mark"')}
  <rect x="${plainX}" y="52" width="${PLAIN_MARK_W}" height="4" rx="2" fill="#00bbcb"/>`;

writeFileSync(
  join(ROOT, "app/icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}" role="img" aria-label="DevFirm">
  <!--
    scripts/generate-logo.mjs 가 생성합니다. 직접 고치지 마세요 —
    헤더 워드마크와 같은 레터폼을 공유해야 하므로 그리드 상수를 고쳐야 합니다.

    브라우저 탭 파비콘. 타일 없이 레터폼만 쓴다 — 타일을 씌우면 헤더 로고와
    다른 물건처럼 보인다. 애플 터치 아이콘(app/apple-icon.png)은 반대로
    타일 버전을 쓴다. iOS 가 투명 PNG 를 검정 위에 합성하기 때문이다.

    색은 사이트 CSS 토큰과 같은 값(oklch → sRGB):
      #0f1926 = foreground (Ink)
      #f6f9fc = brand-foreground
      #00bbcb = highlight (Circuit Cyan)

    토큰 이름 앞의 이중 하이픈은 일부러 뺐다. XML 주석 안에는 하이픈 두 개를
    연달아 쓸 수 없고, 그것 하나로 문서가 well-formed 를 잃는다. 그러면
    브라우저가 파비콘 렌더를 통째로 거부하고 탭에 기본 지구본을 띄운다.
    scripts/check-svg.mjs 가 이 부류를 잡는다.
  -->
${emblemPlain}
</svg>
`,
);

/** 애플 터치 아이콘 원본 — generate-icons.mjs 가 이 파일을 PNG 로 굽는다 */
writeFileSync(
  join(ROOT, "assets/logo/emblem-tile.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}" role="img" aria-label="DevFirm">
  <!-- scripts/generate-logo.mjs 생성물. 애플 터치 아이콘 전용(불투명 필수). -->
${emblemTile}
</svg>
`,
);

const tsx = `/*
 * scripts/generate-logo.mjs 가 생성한 파일입니다. 직접 고치지 마세요.
 * 글리프를 바꾸려면 그 스크립트의 그리드 상수를 고치고 \`pnpm gen:logo\` 를 돌리세요.
 *
 * 인라인 SVG 인 이유: 헤더 로고는 첫 화면에 반드시 있어야 하는데 <img> 로 두면
 * 요청이 하나 더 나가고 그동안 자리가 빈다. 마크업에 박아 두면 문서와 함께 온다.
 * 워드마크가 currentColor 를 쓰므로 어두운 배경에서도 색만 바꿔 재사용할 수 있다.
 */
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** 워드마크 원본 좌표계 폭. 높이는 항상 100 이다. */
const WORDMARK_W = ${WORDMARK_W};
/** 표시 높이. 캡하이트가 70/100 이므로 대문자는 이 값의 0.7 배로 보인다. */
const WORDMARK_H = 23;

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* 엠블렘 — app/icon.svg 와 같은 조형 */}
      <svg viewBox="0 0 ${TILE} ${TILE}" width="26" height="26" aria-hidden className="shrink-0">
${emblemTile
  .split("\n")
  .map((l) => "  " + toJsx(l.trimEnd()))
  .join("\n")}
      </svg>

      {/* 워드마크 */}
      <svg
        viewBox={\`0 0 \${WORDMARK_W} 100\`}
        height={WORDMARK_H}
        width={(WORDMARK_W / 100) * WORDMARK_H}
        fill="currentColor"
        role="img"
        aria-label={site.name}
        className="shrink-0"
      >
${glyphGroups(true)
  .split("\n")
  .map((l) => "      " + l)
  .join("\n")}
      </svg>
    </span>
  );
}
`;
writeFileSync(join(ROOT, "components/layout/brand-logo.tsx"), tsx);

console.log(
  `✔ assets/logo/wordmark.svg           (viewBox 0 0 ${WORDMARK_W} 100)`,
);
console.log(`✔ app/icon.svg                       (${TILE}×${TILE})`);
console.log(`✔ components/layout/brand-logo.tsx`);
console.log(`  글리프 폭: ${LETTERS.map(([c, g]) => `${c}=${g.w}`).join(" ")}`);
