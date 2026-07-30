#!/usr/bin/env node
/**
 * 배경 영상 3편을 하나의 무한 루프 클립으로 합쳐 웹 배포용으로 압축한다.
 *
 * 배경 영상은 성능 예산을 가장 쉽게 무너뜨리는 자산이다. 다음 원칙으로 만든다:
 *
 *  1. 720p 로 충분하다. 화면에서는 스크림과 blur 아래 깔리고 텍스트가 주인공이다.
 *     1080p 는 파일만 두 배가 되고 눈에 띄는 차이는 없다.
 *  2. 오디오 트랙 제거. 배경 영상은 절대 소리를 내지 않으므로 순수한 낭비다.
 *  3. 크로스페이드로 잇고 **끝에서 처음으로도 페이드**시켜 이음매 없는 루프를 만든다.
 *     그러지 않으면 8초마다 화면이 툭 끊긴다.
 *  4. WebM(VP9) 과 MP4(H.264) 두 벌. VP9 가 더 작지만 구형 Safari 가 못 읽는다.
 *     **CRF 스케일은 두 코덱이 서로 다르다.** 같은 숫자를 주면 VP9 쪽이 오히려
 *     커진다(실측: x264 31 → 2.1MB vs VP9 40 → 2.7MB). VP9 는 더 높은 값이 필요하다.
 *
 * 실행: pnpm gen:video
 */
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync, mkdirSync, statSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "assets/video-src");
const OUT = join(ROOT, "public/video");
const TMP = join(ROOT, ".video-tmp");

/** 클립 사이 크로스페이드 길이(초) */
const FADE = 1.0;
const WIDTH = 1280;

/**
 * 브랜드 톤 보정.
 *
 * 생성된 클립은 편마다 채도와 색온도가 다르다. 특히 모니터 화면이 주황·보라·
 * 초록으로 뜨는 컷이 있어 §4.1 의 "다색 그라데이션 금지"와 충돌하고, 도시가
 * 통째로 시안으로 빛나는 컷은 액센트 5% 규칙을 넘는다.
 *
 * 사진에 네이비 오버레이를 씌운 것과 같은 원리를 인코딩 단계에서 적용한다:
 *   hue=s      채도를 절반 아래로 — 팔레트 밖 색을 눌러 세 편의 톤을 통일한다
 *   colorbalance  그림자·중간톤을 파랑 쪽으로 밀어 네이비로 수렴시킨다
 *   eq         살짝 어둡게. 위에 흰 텍스트가 올라가므로 밝으면 곤란하다
 */
const GRADE =
  "hue=s=0.42," +
  "colorbalance=rs=-0.06:gs=-0.02:bs=0.10:rm=-0.04:bm=0.06:rh=-0.03:bh=0.04," +
  "eq=brightness=-0.05:contrast=1.04:gamma=0.97";

const run = (args) =>
  execFileSync(
    "ffmpeg",
    ["-y", "-hide_banner", "-loglevel", "error", ...args],
    {
      stdio: ["ignore", "pipe", "inherit"],
    },
  );

const probe = (file) =>
  Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      file,
    ])
      .toString()
      .trim(),
  );

if (!existsSync(SRC)) {
  console.error("원본이 없습니다: assets/video-src");
  process.exit(1);
}
for (const dir of [OUT, TMP])
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const clips = readdirSync(SRC)
  .filter((f) => /\.(mp4|mov|webm)$/i.test(f))
  .sort()
  .map((f) => join(SRC, f));

if (clips.length === 0) {
  console.error("원본 클립이 없습니다.");
  process.exit(1);
}
console.log(`원본 ${clips.length}편`);

// 1) 규격 통일 — 해상도·fps·픽셀포맷을 맞춰야 xfade 가 동작한다
const normalized = clips.map((clip, i) => {
  const out = join(TMP, `n${i}.mp4`);
  run([
    "-i",
    clip,
    "-an",
    "-vf",
    `scale=${WIDTH}:-2:flags=lanczos,fps=24,${GRADE},format=yuv420p`,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "20",
    out,
  ]);
  console.log(`  정규화 ${i + 1}/${clips.length} (${probe(out).toFixed(1)}s)`);
  return out;
});

// 2) 크로스페이드로 연결
let current = normalized[0];
let acc = probe(current);
for (let i = 1; i < normalized.length; i++) {
  const next = normalized[i];
  const out = join(TMP, `x${i}.mp4`);
  const offset = (acc - FADE).toFixed(3);
  run([
    "-i",
    current,
    "-i",
    next,
    "-filter_complex",
    `[0:v][1:v]xfade=transition=fade:duration=${FADE}:offset=${offset},format=yuv420p[v]`,
    "-map",
    "[v]",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "20",
    out,
  ]);
  acc = acc + probe(next) - FADE;
  current = out;
  console.log(`  연결 ${i}/${normalized.length - 1} (${acc.toFixed(1)}s)`);
}

// 3) 끝 → 처음 크로스페이드. 앞부분 FADE 초를 잘라 뒤에 겹쳐 루프를 닫는다.
const head = join(TMP, "head.mp4");
run([
  "-i",
  current,
  "-t",
  String(FADE),
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "20",
  head,
]);
const looped = join(TMP, "looped.mp4");
run([
  "-i",
  current,
  "-i",
  head,
  "-filter_complex",
  `[0:v][1:v]xfade=transition=fade:duration=${FADE}:offset=${(acc - FADE).toFixed(3)},format=yuv420p[v]`,
  "-map",
  "[v]",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "20",
  looped,
]);
console.log(`  루프 마감 (${probe(looped).toFixed(1)}s)`);

// 4) 배포용 인코딩
const mp4 = join(OUT, "hero.mp4");
run([
  "-i",
  looped,
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "34",
  "-profile:v",
  "main",
  "-pix_fmt",
  "yuv420p",
  // faststart: 메타데이터를 앞으로 옮겨 다운로드 도중 재생을 시작할 수 있게 한다
  "-movflags",
  "+faststart",
  mp4,
]);

const webm = join(OUT, "hero.webm");
run([
  "-i",
  looped,
  "-an",
  "-c:v",
  "libvpx-vp9",
  "-crf",
  "50",
  "-b:v",
  "0",
  "-row-mt",
  "1",
  "-deadline",
  "good",
  "-cpu-used",
  "2",
  webm,
]);

rmSync(TMP, { recursive: true, force: true });

const kb = (f) => (statSync(f).size / 1024).toFixed(0);
console.log(
  `\n✔ public/video/hero.mp4   ${kb(mp4)}KB` +
    `\n✔ public/video/hero.webm  ${kb(webm)}KB` +
    `\n  길이 ${probe(mp4).toFixed(1)}s · ${WIDTH}px · 무음`,
);
