#!/usr/bin/env node
/**
 * SVG 원본에서 PNG 아이콘을 만든다.
 *
 * 왜 next/og(Satori)가 아니라 Playwright 인가:
 *   Satori 는 SVG path 와 fill-rule 지원이 제한적이라 DF 모노그램의 D 카운터가
 *   메워진다. Playwright 는 실제 Chromium 이라 브라우저가 보는 그대로 굽는다.
 *   결과물을 정적 파일로 커밋하므로 런타임 비용도 0 이다.
 *
 * 한국어 텍스트가 들어가는 OG 카드는 Pretendard 를 써야 한다. about:blank 는
 * file:// 폰트를 못 읽으므로 page.route 로 폰트 요청을 디스크에서 가로채 채운다.
 *
 * 실행: pnpm gen:icons
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const site = {
  title: "개발자들이 모인 개발법인, 데브펌",
  sub: "산업현장엔 피지컬AI, 사무현장엔 최과장AI",
  domain: "DevFirm · CMNYX",
};

/** 폰트 요청을 로컬 파일로 채운다 */
async function serveFonts(page) {
  await page.route("**/fonts/pretendard/*.woff2", (route) => {
    const name = route.request().url().split("/").pop();
    try {
      route.fulfill({
        status: 200,
        contentType: "font/woff2",
        body: readFileSync(join(ROOT, "public/fonts/pretendard", name)),
      });
    } catch {
      route.abort();
    }
  });
}

const fontCss = read("app/fonts.css").replace(
  /url\(\/fonts\/pretendard\//g,
  "url(https://local.fonts/fonts/pretendard/",
);

async function renderSvg(browser, { svg, width, height, out, scale = 1 }) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });
  await page.setContent(
    `<body style="margin:0">${svg.replace("<svg", `<svg width="${width}" height="${height}"`)}</body>`,
  );
  await page.screenshot({ path: join(ROOT, out), omitBackground: false });
  await page.close();
  console.log(`✔ ${out} (${width * scale}×${height * scale})`);
}

async function renderOg(browser) {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
  });
  await serveFonts(page);
  await page.setContent(
    `<html><head><style>
       ${fontCss}
       body{margin:0;width:1200px;height:630px;position:relative;
            font-family:"Pretendard Variable",system-ui,sans-serif;
            word-break:keep-all;letter-spacing:-0.02em}
       .bg{position:absolute;inset:0}
       .copy{position:absolute;left:80px;top:300px;width:840px;color:#f6f9fc}
       h1{margin:0;font-size:66px;line-height:1.18;font-weight:700}
       p{margin:22px 0 0;font-size:30px;line-height:1.5;font-weight:400;color:rgba(246,249,252,.72)}
       .domain{position:absolute;left:80px;top:556px;font-size:22px;font-weight:600;
               letter-spacing:.08em;text-transform:uppercase;color:rgba(246,249,252,.55)}
     </style></head><body>
       <div class="bg">${read("assets/og-image.svg")}</div>
       <div class="copy"><h1>${site.title}</h1><p>${site.sub}</p></div>
       <div class="domain">${site.domain}</div>
     </body></html>`,
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(ROOT, "app/opengraph-image.png") });
  await page.close();
  console.log("✔ app/opengraph-image.png (1200×630)");
}

const browser = await chromium.launch();
const icon = read("app/icon.svg");

// Apple 터치 아이콘은 SVG 를 받지 않는다. 180×180 PNG 가 필요하다.
await renderSvg(browser, {
  svg: icon,
  width: 180,
  height: 180,
  out: "app/apple-icon.png",
});

await renderOg(browser);
await browser.close();

// OG 는 트위터 카드에서도 같은 파일을 쓴다
writeFileSync(
  join(ROOT, "app/twitter-image.png"),
  readFileSync(join(ROOT, "app/opengraph-image.png")),
);
console.log("✔ app/twitter-image.png (1200×630)");
