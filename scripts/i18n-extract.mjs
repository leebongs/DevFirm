#!/usr/bin/env node
/**
 * 번역 원본 추출.
 *
 * `content/dictionary.ts`(한국어 원문)를 JSON 으로 굳혀
 * `content/i18n/_source.json` 에 쓴다. 번역기는 TS 가 아니라 이 JSON 을 받는다 —
 * TS 를 그대로 넘기면 번역기가 코드까지 건드려 타입이 깨지고, 무엇보다
 * **키 구조가 보존됐는지 기계로 대조할 수 없다.**
 *
 * 실행: pnpm i18n:extract
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { dictionary } from "../content/dictionary.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "content/i18n");
mkdirSync(OUT_DIR, { recursive: true });

const json = JSON.stringify(dictionary, null, 2);
writeFileSync(join(OUT_DIR, "_source.json"), json + "\n");

/** 번역해야 하는 잎 노드(문자열) 수를 센다 — 진행률과 대조의 기준값 */
function countLeaves(node) {
  if (typeof node === "string") return 1;
  if (Array.isArray(node)) return node.reduce((n, v) => n + countLeaves(v), 0);
  if (node && typeof node === "object")
    return Object.values(node).reduce((n, v) => n + countLeaves(v), 0);
  return 0;
}

console.log(
  `✔ content/i18n/_source.json  (${(json.length / 1024).toFixed(0)}KB · 문자열 ${countLeaves(dictionary)}개)`,
);
