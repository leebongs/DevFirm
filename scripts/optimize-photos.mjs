#!/usr/bin/env node
/**
 * 생성 원본 사진을 웹 배포용으로 줄인다.
 *
 * 생성기(nano_banana_2, 2k)가 내놓는 PNG 는 장당 5~7MB 다. 그대로 두면
 * A7(Perf ≥ 95)·LCP 가 무너지고 저장소도 40MB 가까이 불어난다.
 *
 * next/image 가 요청 시점에 변환해 주긴 하지만, 그건 **원본이 합리적인
 * 크기일 때** 이야기다. 원본을 먼저 줄여 두고 그 위에 반응형 변환을 얹는다.
 *
 * 원본 PNG 는 저장소에 남기지 않는다(scripts 로 언제든 재생성 가능).
 *
 * 실행: pnpm gen:photo
 */
import sharp from "sharp";
import { readdirSync, statSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "assets/photo-src");
const OUT = join(ROOT, "public/images/photo");

/**
 * 표시 폭 기준. 전폭으로 깔리는 히어로 배너만 크게 간다.
 * 이름이 `-hero` 로 끝나면 페이지 히어로 배너로 본다.
 */
const WIDTHS = {
  "hero-office": 2400,
  hero: 2400,
  default: 1600,
};
const widthFor = (name) =>
  WIDTHS[name] ?? (name.endsWith("-hero") ? WIDTHS.hero : WIDTHS.default);

if (!existsSync(SRC)) {
  console.error(`원본 디렉터리가 없습니다: assets/photo-src`);
  process.exit(1);
}
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

/*
 * 인자를 주면 그 이름들만 굽는다: `node scripts/optimize-photos.mjs academy-project`
 *
 * 인자가 없으면 전부 다시 굽는데, 그것이 위험한 이유는 삭제가 아니라 **재인코딩**이다.
 * 원본은 gitignore 라 로컬에만 있고, sharp/libavif 버전이 커밋 당시와 다르면
 * 손대지 않은 사진의 바이트가 달라져 PR 에 바이너리 diff 가 무더기로 붙는다.
 * 산출 치수까지 달라지면 content/photos.ts 와 어긋나 **다른 페이지에서 CLS 가 난다.**
 * 사진 한 장을 추가할 때는 그 한 장만 지목해야 한다.
 */
const only = new Set(process.argv.slice(2));
const files = readdirSync(SRC)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .filter((f) => only.size === 0 || only.has(basename(f, extname(f))));

if (only.size > 0 && files.length !== only.size) {
  const found = new Set(files.map((f) => basename(f, extname(f))));
  const missing = [...only].filter((n) => !found.has(n));
  console.error(`원본을 찾지 못했습니다: ${missing.join(", ")}`);
  process.exit(1);
}
if (files.length === 0) {
  console.error("원본 사진이 없습니다.");
  process.exit(1);
}

let before = 0;
let after = 0;

for (const file of files) {
  const name = basename(file, file.slice(file.lastIndexOf(".")));
  const width = widthFor(name);
  const srcPath = join(SRC, file);
  before += statSync(srcPath).size;

  const base = sharp(srcPath).resize({ width, withoutEnlargement: true });

  // AVIF 가 가장 작지만 구형 브라우저가 못 읽는다. WebP 를 함께 굽고
  // <picture> 가 고르게 한다. JPEG 폴백까지 두면 용량만 늘어 실익이 없다 —
  // WebP 는 2017년 이후 브라우저에서 사실상 보편적이다.
  const avifPath = join(OUT, `${name}.avif`);
  const webpPath = join(OUT, `${name}.webp`);

  await base.clone().avif({ quality: 52, effort: 6 }).toFile(avifPath);
  await base.clone().webp({ quality: 74 }).toFile(webpPath);

  const meta = await sharp(avifPath).metadata();
  const a = statSync(avifPath).size;
  const w = statSync(webpPath).size;
  after += a + w;

  console.log(
    `✔ ${name.padEnd(22)} ${String(meta.width).padStart(4)}×${String(meta.height).padEnd(4)}  avif ${(a / 1024).toFixed(0).padStart(4)}KB  webp ${(w / 1024).toFixed(0).padStart(4)}KB`,
  );
}

console.log(
  `\n원본 ${(before / 1024 / 1024).toFixed(1)}MB → 배포본 ${(after / 1024 / 1024).toFixed(1)}MB`,
);

// 임시 원본 정리 여부는 호출 측에서 결정한다
if (process.argv.includes("--clean-src")) {
  rmSync(SRC, { recursive: true, force: true });
  console.log("원본 디렉터리 삭제됨");
}
