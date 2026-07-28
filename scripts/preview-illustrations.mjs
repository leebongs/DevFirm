#!/usr/bin/env node
/**
 * 생성된 일러스트를 한 장의 대조 시트로 굽는다.
 *
 * 세트 일관성(특히 산업 6종)은 파일을 하나씩 열어봐서는 판단할 수 없다.
 * 나란히 놓고 봐야 형식이 어긋난 것이 보인다. 흰 배경과 Mist 배경 두 줄로
 * 깔아 양쪽에서 형태가 살아남는지도 함께 확인한다(image-plan 검수 기준).
 *
 * 실행: node scripts/preview-illustrations.mjs [디렉터리...]
 */
import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, ".preview");
const dirs = process.argv.slice(2);
const targets = dirs.length
  ? dirs
  : ["model", "workspace", "map", "agents", "hero", "cards"];

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

for (const dir of targets) {
  const abs = join(ROOT, "public/images", dir);
  if (!existsSync(abs)) {
    console.log(`- ${dir}: 없음`);
    continue;
  }
  const files = readdirSync(abs).filter((f) => f.endsWith(".svg"));
  if (files.length === 0) {
    console.log(`- ${dir}: 비어 있음`);
    continue;
  }

  const cell = (f, bg) => {
    const svg = readFileSync(join(abs, f), "utf8");
    const kb = (Buffer.byteLength(svg) / 1024).toFixed(1);
    return `<figure style="margin:0;background:${bg};padding:14px;border-radius:10px;border:1px solid #d7dbe0">
      <div style="width:300px">${svg.replace("<svg", '<svg style="width:100%;height:auto;display:block"')}</div>
      <figcaption style="margin-top:8px;font:11px ui-monospace;color:#4c535e">${basename(f, ".svg")} · ${kb}KB</figcaption>
    </figure>`;
  };

  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setContent(
    `<body style="margin:0;padding:24px;background:#fff;font-family:system-ui">
       <h2 style="font:600 14px ui-monospace;color:#0f1926;margin:0 0 14px">${dir} — white</h2>
       <div style="display:flex;flex-wrap:wrap;gap:16px">${files.map((f) => cell(f, "#ffffff")).join("")}</div>
       <h2 style="font:600 14px ui-monospace;color:#0f1926;margin:28px 0 14px">${dir} — muted</h2>
       <div style="display:flex;flex-wrap:wrap;gap:16px">${files.map((f) => cell(f, "#f3f5f8")).join("")}</div>
     </body>`,
  );
  await page.screenshot({
    path: join(OUT, `${dir}.png`),
    fullPage: true,
  });
  await page.close();
  console.log(`✔ .preview/${dir}.png (${files.length}개)`);
}

await browser.close();
