#!/usr/bin/env node
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "out");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", error => errors.push(String(error)));
page.on("requestfailed", request => errors.push(`requestfailed ${request.url()}`));

await page.goto(pathToFileURL(join(ROOT, "catalog.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: join(OUT, "DocASI-catalog-storytelling.pdf"),
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await page.emulateMedia({ media: "screen" });
const sheets = page.locator(".sheet");
const count = await sheets.count();
if (count !== 8) throw new Error(`Expected 8 sheets, found ${count}`);
const shots = [];
for (let index = 0; index < count; index += 1) {
  const sheet = sheets.nth(index);
  const overflow = await sheet.locator(".page-inner").evaluate(element => ({
    x: element.scrollWidth - element.clientWidth,
    y: element.scrollHeight - element.clientHeight,
  }));
  if (overflow.x > 1 || overflow.y > 1) errors.push(`sheet ${index + 1} overflow x=${overflow.x} y=${overflow.y}`);
  const shotPath = join(OUT, `page-${String(index + 1).padStart(2, "0")}.png`);
  await sheet.screenshot({ path: shotPath });
  shots.push(shotPath);
  console.log(`page ${index + 1}/${count}: overflow x=${overflow.x}, y=${overflow.y}`);
}

const cells = shots.map((path, index) => `
  <figure><img src="data:image/png;base64,${readFileSync(path).toString("base64")}"><figcaption>${String(index + 1).padStart(2, "0")}</figcaption></figure>
`).join("");
await page.setViewportSize({ width: 1800, height: 1400 });
await page.setContent(`<style>body{margin:0;padding:28px;background:#eaf1f4;display:grid;grid-template-columns:repeat(4,420px);gap:24px}figure{margin:0}img{display:block;width:420px;border-radius:3px;box-shadow:0 4px 18px rgba(16,42,67,.16)}figcaption{font:700 11px system-ui;color:#62788b;margin-top:7px}</style>${cells}`);
await page.screenshot({ path: join(OUT, "contact-sheet.png"), fullPage: true });

await browser.close();
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("OK: 8-page PDF, page previews, and contact sheet generated without page errors.");
}
