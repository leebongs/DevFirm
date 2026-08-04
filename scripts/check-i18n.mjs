#!/usr/bin/env node
/**
 * 번역 파일 대조 게이트.
 *
 * 번역은 기계가 하고, 기계는 조용히 틀린다 — 키를 하나 빠뜨리거나, 배열을
 * 줄이거나, URL 을 번역해 버린다. 어느 것도 화면에서는 티가 안 난다:
 * 빠진 키는 한국어로 폴백되어 "번역이 덜 됐나 보다"로 보이고, 번역된 URL 은
 * 404 가 되며, 짧아진 배열은 메뉴 항목을 통째로 없앤다.
 *
 * 그래서 사람 눈이 아니라 여기서 본다.
 *
 * 검사 항목
 *   1. JSON 파싱
 *   2. 키 구조 일치 — 누락·초과 0
 *   3. 배열 길이 일치
 *   4. 링크·식별자 불변 — href·src·slug·id 류는 원문과 바이트 동일해야 한다
 *   5. 미번역 잔존 — 한글이 그대로 남은 문자열 보고(경고)
 *
 * 실행: pnpm check:i18n
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DIR = join(ROOT, "content/i18n");
const SOURCE = join(DIR, "_source.json");

if (!existsSync(SOURCE)) {
  console.error(
    "✖ content/i18n/_source.json 이 없습니다. pnpm i18n:extract 먼저.",
  );
  process.exit(1);
}

const { locales, DEFAULT_LOCALE } = await import("../content/locales.ts");
const source = JSON.parse(readFileSync(SOURCE, "utf8"));

/**
 * 번역하면 안 되는 잎.
 *
 * **키 이름만으로 판정하지 않는다.** `email` 은 주소를 담는 키이기도 하고
 * 폼 필드 라벨("이메일")을 담는 키이기도 하다 — 앞은 그대로 둬야 하고
 * 뒤는 번역해야 한다. 키 이름으로 잡으면 라벨 번역을 결함으로 신고한다.
 * 실제로 영어 번역에서 그렇게 오탐이 났다.
 *
 * 그래서 구조 키(값이 절대 산문일 수 없는 것)만 이름으로 잡고,
 * 나머지는 **값의 모양**으로 판정한다.
 */
const LITERAL_KEYS = new Set(["href", "src", "base", "slug", "id", "code"]);

/** 경로·URL·mailto·tel, 그리고 실제 주소·전화번호·사업자번호의 모양 */
const LITERAL_VALUE =
  /^(\/|#|https?:|mailto:|tel:)|^[\w.+-]+@[\w-]+\.[\w.]+$|^[\d-]{9,}$/;

/** 잎 노드를 경로와 함께 평탄화한다 */
function* leaves(node, path = "", key = "") {
  if (node === null || node === undefined) return;
  if (Array.isArray(node)) {
    yield { path, kind: "array", length: node.length };
    for (let i = 0; i < node.length; i++)
      yield* leaves(node[i], `${path}[${i}]`, key);
    return;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node))
      yield* leaves(v, `${path}.${k}`, k);
    return;
  }
  yield { path, kind: "leaf", key, value: node };
}

const src = new Map();
for (const item of leaves(source)) src.set(item.path, item);

const hangul = /[가-힣]/;
let failed = false;
const rows = [];

for (const { code } of locales) {
  if (code === DEFAULT_LOCALE) continue;
  const file = join(DIR, `${code}.json`);

  if (!existsSync(file)) {
    rows.push({ code, status: "파일 없음", missing: src.size });
    failed = true;
    continue;
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    rows.push({ code, status: `JSON 파싱 실패 — ${error.message}` });
    failed = true;
    continue;
  }

  const tgt = new Map();
  for (const item of leaves(parsed)) tgt.set(item.path, item);

  const missing = [];
  const arrayMismatch = [];
  const literalChanged = [];
  const placeholderLost = [];
  const untranslated = [];

  for (const [path, s] of src) {
    const t = tgt.get(path);
    if (!t) {
      missing.push(path);
      continue;
    }
    if (s.kind === "array") {
      if (t.length !== s.length)
        arrayMismatch.push(`${path} 원본 ${s.length} → 번역 ${t.length}`);
      continue;
    }
    if (typeof s.value !== "string") continue;

    const mustMatch = LITERAL_KEYS.has(s.key) || LITERAL_VALUE.test(s.value);
    if (mustMatch && t.value !== s.value) {
      literalChanged.push(
        `${path}\n      원본 ${s.value}\n      번역 ${t.value}`,
      );
    } else if (!mustMatch && hangul.test(s.value) && t.value === s.value) {
      untranslated.push(path);
    }

    /*
     * 자리표시자 보존.
     *
     * `{team}` 을 번역기가 `{팀}` 으로 바꾸면 치환이 조용히 실패해 문장에
     * 중괄호가 그대로 노출된다. 화면에는 나오고 게이트도 통과하므로
     * 여기서 이름 집합을 대조한다.
     */
    if (typeof t.value === "string") {
      const names = (v) => (v.match(/\{\w+\}/g) ?? []).sort().join(",");
      if (names(s.value) !== names(t.value)) {
        placeholderLost.push(
          `${path}\n      원본 ${names(s.value) || "(없음)"}\n      번역 ${names(t.value) || "(없음)"}`,
        );
      }
    }
  }

  const extra = [...tgt.keys()].filter((p) => !src.has(p));
  const hard =
    missing.length +
    extra.length +
    arrayMismatch.length +
    literalChanged.length +
    placeholderLost.length;
  if (hard > 0) failed = true;

  rows.push({
    code,
    missing,
    extra,
    arrayMismatch,
    literalChanged,
    placeholderLost,
    untranslated,
    total: src.size,
  });
}

for (const r of rows) {
  if (r.status) {
    console.error(`✖ ${r.code.padEnd(6)} ${r.status}`);
    continue;
  }
  const hard =
    r.missing.length +
    r.extra.length +
    r.arrayMismatch.length +
    r.literalChanged.length +
    r.placeholderLost.length;
  const mark = hard === 0 ? "✔" : "✖";
  const warn = r.untranslated.length
    ? `  · 미번역 ${r.untranslated.length}`
    : "";
  console.log(
    `${mark} ${r.code.padEnd(6)} 누락 ${String(r.missing.length).padStart(4)}` +
      `  초과 ${String(r.extra.length).padStart(3)}` +
      `  배열 ${String(r.arrayMismatch.length).padStart(3)}` +
      `  링크변경 ${String(r.literalChanged.length).padStart(3)}` +
      `  자리표시자 ${String(r.placeholderLost.length).padStart(2)}${warn}`,
  );
  for (const p of r.missing.slice(0, 4)) console.error(`    누락 ${p}`);
  for (const p of r.extra.slice(0, 4)) console.error(`    초과 ${p}`);
  for (const p of r.arrayMismatch.slice(0, 4)) console.error(`    배열 ${p}`);
  for (const p of r.literalChanged.slice(0, 3)) console.error(`    링크 ${p}`);
  for (const p of r.placeholderLost.slice(0, 3))
    console.error(`    자리표시자 ${p}`);
}

if (failed) {
  console.error(
    "\n✖ 번역 파일 대조 실패. 누락·초과·배열길이·링크변경은 전부 차단 사유다.\n" +
      "  해당 언어만 다시 돌린다: bash scripts/i18n-translate.sh <code>",
  );
  process.exit(1);
}

console.log(`\n✔ 번역 대조 통과 (${rows.length}개 언어 × ${src.size} 항목)`);
