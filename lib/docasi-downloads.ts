import "server-only";
import feed from "@/public/updates/docai/stable.json";

/**
 * DocASI 앱 다운로드 링크의 단일 출처.
 *
 * 다운로드 버튼이 가리킬 URL·버전·크기를 OTA 업데이트 피드
 * `public/updates/docai/stable.json` 에서 빌드 시점에 읽는다. 릴리스 절차가
 * 이 저장소의 피드를 갱신하므로, 버튼은 설치된 앱이 자동 업데이트로 받는
 * 버전과 항상 같은 곳을 가리킨다 — 콘텐츠에 URL 을 다시 적어 두 곳이
 * 어긋나는 일을 만들지 않는다.
 *
 * payload 는 ECDSA 서명된 base64 JSON 이지만 이 사이트가 발행자 본인이므로
 * 여기서는 서명 검증 없이 디코드만 한다. 검증은 앱 쪽 몫이다.
 */
type FeedPayload = {
  version: string;
  assets: Record<
    "macos-universal" | "windows-x64",
    { url: string; size: number }
  >;
};

const payload: FeedPayload = JSON.parse(
  new TextDecoder().decode(
    Uint8Array.from(atob(feed.payload), (c) => c.charCodeAt(0)),
  ),
);

const toMB = (bytes: number) => `${Math.round(bytes / 1e6)}MB`;

/**
 * 웹 버튼은 구 브랜드 설치 파일 대신 같은 릴리스에 올린 DocASI 사본을
 * 가리킨다. 피드 payload 자체는 설치된 구버전 앱들이 서명 검증하므로
 * 구 파일명 그대로 두고, 여기서 마지막 경로 세그먼트의 파일명만 바꾼다
 * (레포 이름 DocAI-releases 를 건드리지 않도록 끝 세그먼트에 한정).
 * 사본은 원본과 바이트 동일 — sha256 대조 후 업로드했다.
 */
const toDocasiAsset = (url: string) =>
  url.replace(/\/DocAI-([^/]+)$/, "/DocASI-$1");

export const docasiDownloads = {
  /** 섹션으로 바로 안착하는 공유 주소 — 리다이렉트가 방문자 locale 의 #download 로 보낸다 */
  shareUrl: "https://www.devfirm.co/solutions/docasi/download",
  version: `v${payload.version}`,
  mac: {
    href: toDocasiAsset(payload.assets["macos-universal"].url),
    size: toMB(payload.assets["macos-universal"].size),
  },
  win: {
    href: toDocasiAsset(payload.assets["windows-x64"].url),
    size: toMB(payload.assets["windows-x64"].size),
  },
} as const;
