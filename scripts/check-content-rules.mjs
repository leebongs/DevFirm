#!/usr/bin/env node
/**
 * A10 · A11 정적 검사 (§9.1)
 *
 *  A10 콘텐츠 분리 — `app/`·`components/` 의 문자열 리터럴과 JSX 텍스트에
 *                    한국어 문장(한글 5자 이상)이 있으면 위반.
 *                    예외는 scripts/i18n-allowlist.json 에 등록된 문자열만.
 *  A11 클라이언트 경계 — "use client" 파일 집합이 §6.4 화이트리스트와 정확히 일치.
 *
 * 한국어 주석은 위반이 아니다. 따라서 정규식 한 방으로 훑지 않고 문자열/주석
 * 상태를 추적하는 스캐너로 리터럴과 JSX 텍스트만 뽑아낸다.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, basename, extname } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components"];

/** shadcn 생성물은 프로젝트 소유가 아니므로 두 규칙 모두에서 제외(§6.2) */
const VENDORED = ["components/ui"];

/** §6.4 클라이언트 컴포넌트 화이트리스트 */
const CLIENT_WHITELIST = [
  "MegaMenu",
  "MobileNavDrawer",
  "SectionNav",
  "OnThisPage",
  "FAQAccordion",
  "ContactForm",
  "ApplyForm",
  "GalleryLightbox",
  "CourseFilterTabs",
];

const allowlist = new Set(
  JSON.parse(readFileSync(join(ROOT, "scripts/i18n-allowlist.json"), "utf8"))
    .allowed,
);

const HANGUL = /[가-힣]/g;
/** 한글 5자 이상이면 "문장"으로 본다 */
const isKoreanSentence = (s) => (s.match(HANGUL) ?? []).length >= 5;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if ([".ts", ".tsx"].includes(extname(full))) {
      out.push(full);
    }
  }
  return out;
}

/**
 * 소스에서 (문자열 리터럴 | JSX 텍스트) 조각을 추출한다.
 * 주석 안의 내용은 버린다.
 */
function extractText(src) {
  const found = [];
  let i = 0;
  let line = 1;
  const n = src.length;
  // JSX 텍스트 후보: '>' 와 '<' 사이. 태그 밖 코드에서도 잡히므로
  // 한글 판정을 통과한 것만 최종 위반으로 본다(오탐이 아니라 미탐 방향으로 안전).
  let jsxBuf = "";
  let jsxLine = 1;

  const flushJsx = () => {
    const text = jsxBuf.trim();
    if (text) found.push({ text, line: jsxLine, kind: "jsx" });
    jsxBuf = "";
  };

  while (i < n) {
    const c = src[i];
    const next = src[i + 1];

    if (c === "\n") {
      line++;
      jsxBuf += c;
      i++;
      continue;
    }

    // 주석
    if (c === "/" && next === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && next === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") line++;
        i++;
      }
      i += 2;
      continue;
    }

    // 문자열 리터럴
    if (c === '"' || c === "'" || c === "`") {
      flushJsx();
      const quote = c;
      const startLine = line;
      let buf = "";
      i++;
      while (i < n && src[i] !== quote) {
        if (src[i] === "\\") {
          buf += src[i + 1] ?? "";
          i += 2;
          continue;
        }
        if (src[i] === "\n") line++;
        buf += src[i];
        i++;
      }
      i++;
      found.push({ text: buf, line: startLine, kind: "string" });
      continue;
    }

    if (c === ">") {
      jsxBuf = "";
      jsxLine = line;
      i++;
      continue;
    }
    if (c === "<") {
      flushJsx();
      i++;
      continue;
    }

    jsxBuf += c;
    i++;
  }
  flushJsx();
  return found;
}

function hasUseClient(src) {
  // 파일 선두 지시문만 인정(주석·빈 줄 허용)
  const head = src.slice(0, 400);
  return /^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*|\n)*\s*["']use client["']/.test(
    head,
  );
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
const violationsA10 = [];
const clientFiles = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  if (VENDORED.some((v) => rel.startsWith(v))) continue;
  const src = readFileSync(file, "utf8");

  if (hasUseClient(src)) {
    clientFiles.push({ rel, name: basename(file, extname(file)) });
  }

  for (const { text, line } of extractText(src)) {
    if (!isKoreanSentence(text)) continue;
    if (allowlist.has(text.trim())) continue;
    violationsA10.push({ rel, line, text: text.trim().slice(0, 60) });
  }
}

let failed = false;

if (violationsA10.length) {
  failed = true;
  console.error(
    `\n✖ A10 콘텐츠 분리 위반 ${violationsA10.length}건 — 한국어 문장은 content/*.ts 로 옮기거나 scripts/i18n-allowlist.json 에 사유와 함께 등록하세요.`,
  );
  for (const v of violationsA10) {
    console.error(`  ${v.rel}:${v.line}  "${v.text}"`);
  }
}

// A11: 화이트리스트와 정확히 일치해야 한다(누락도, 초과도 위반)
const clientNames = clientFiles.map((f) => f.name).sort();
const extra = clientFiles.filter((f) => !CLIENT_WHITELIST.includes(f.name));
if (extra.length) {
  failed = true;
  console.error(
    `\n✖ A11 클라이언트 경계 위반 — 화이트리스트에 없는 "use client" 파일:`,
  );
  for (const f of extra) console.error(`  ${f.rel}`);
  console.error(
    `  화이트리스트(§6.4): ${CLIENT_WHITELIST.join(", ")}\n  추가가 필요하면 PR에 사유를 명시하고 scripts/check-content-rules.mjs 의 CLIENT_WHITELIST 를 갱신하세요.`,
  );
}

if (failed) process.exit(1);

console.log(
  `✔ A10 콘텐츠 분리 통과 (검사 파일 ${files.length}개)\n✔ A11 클라이언트 경계 통과 (use client ${clientNames.length}개: ${clientNames.join(", ") || "없음"})`,
);
