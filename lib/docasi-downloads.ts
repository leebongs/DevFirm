import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * DocASI 앱 다운로드 링크의 단일 출처.
 *
 * 다운로드 버튼이 가리킬 URL·버전·크기를 OTA 업데이트 피드
 * 정식 `public/updates/docasi/stable.json` 이 배포되면 그것을 사용하고,
 * 그 전에는 구버전 앱용 `public/updates/docai/stable.json` 을 읽는다. 릴리스
 * 절차가 이 저장소의 피드를 갱신하므로 버튼과 앱의 업데이트 출처가
 * 어긋나지 않는다.
 *
 * payload 는 ECDSA 서명된 base64 JSON 이지만 이 사이트가 발행자 본인이므로
 * 여기서는 서명 검증 없이 디코드만 한다. 검증은 앱 쪽 몫이다.
 */
type FeedPayload = {
  productId: "co.devfirm.docai" | "co.devfirm.docasi";
  version: string;
  assets: Record<
    "macos-universal" | "windows-x64",
    { fileName: string; url: string; size: number; sha256: string }
  >;
};

type FeedEnvelope = { payload: string };

const canonicalFeedPath = path.join(
  process.cwd(),
  "public/updates/docasi/stable.json",
);
const legacyFeedPath = path.join(
  process.cwd(),
  "public/updates/docai/stable.json",
);
const usesCanonicalFeed = existsSync(canonicalFeedPath);
const feed = JSON.parse(
  readFileSync(usesCanonicalFeed ? canonicalFeedPath : legacyFeedPath, "utf8"),
) as FeedEnvelope;

function decodePayload(envelope: { payload: string }): FeedPayload {
  return JSON.parse(
    new TextDecoder().decode(
      Uint8Array.from(atob(envelope.payload), (c) => c.charCodeAt(0)),
    ),
  ) as FeedPayload;
}

const payload = decodePayload(feed);
const expectedProductId = usesCanonicalFeed
  ? "co.devfirm.docasi"
  : "co.devfirm.docai";
const expectedBrand = usesCanonicalFeed ? "DocASI" : "DocAI";

function validateAsset(
  platform: "macos-universal" | "windows-x64",
  expectedFileName: string,
) {
  const asset = payload.assets?.[platform];
  const expectedUrl = `https://github.com/leebongs/DocAI-releases/releases/download/v${payload.version}/${expectedFileName}`;
  if (
    !asset ||
    asset.fileName !== expectedFileName ||
    asset.url !== expectedUrl ||
    !Number.isSafeInteger(asset.size) ||
    asset.size <= 0 ||
    asset.size > 512 * 1024 * 1024 ||
    !/^[a-f0-9]{64}$/.test(asset.sha256)
  ) {
    throw new Error(`DocASI download feed has invalid ${platform} metadata`);
  }
  return asset;
}

if (
  payload.productId !== expectedProductId ||
  !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(payload.version)
) {
  throw new Error("DocASI download feed uses an incompatible product contract");
}
const mac = validateAsset(
  "macos-universal",
  `${expectedBrand}-${payload.version}-universal.dmg`,
);
const win = validateAsset(
  "windows-x64",
  `${expectedBrand}-forTeamMemebr-Setup-${payload.version}-win-x64.exe`,
);

const toMB = (bytes: number) => `${Math.round(bytes / 1e6)}MB`;

export const docasiDownloads = {
  /** 섹션으로 바로 안착하는 공유 주소 — 리다이렉트가 방문자 locale 의 #download 로 보낸다 */
  shareUrl: "https://www.devfirm.co/solutions/docasi/download",
  isCanonical: usesCanonicalFeed,
  version: `v${payload.version}`,
  mac: { href: mac.url, size: toMB(mac.size) },
  win: { href: win.url, size: toMB(win.size) },
} as const;
