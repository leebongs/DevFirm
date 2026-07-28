import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { legacyRedirects } from "./content/redirects";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/**
 * O-6 도메인 이전용 구 호스트.
 *
 * 값이 있으면 그 호스트로 들어온 **모든** 요청을 신규 도메인으로 넘긴다.
 * 도메인 TLD 가 확정되기 전에는 두 값 모두 비어 있고, 경로 리다이렉트만
 * 동작한다 — 같은 도메인 안에서의 경로 변경은 지금도 유효하기 때문이다.
 */
const legacyHost = process.env.LEGACY_HOST;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const nextConfig: NextConfig = {
  // 상위 디렉터리(~/Dev)에 pnpm-lock.yaml 이 있어 Turbopack 이 워크스페이스 루트를
  // 잘못 추론한다. 이 프로젝트 디렉터리로 고정한다.
  turbopack: {
    root: projectRoot,
  },

  images: {
    // Next 16 기본값은 [75] 단일. 갤러리·히어로에서 화질 단계를 쓰려면 명시 필요(§5.15)
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    const crossDomain = Boolean(legacyHost && siteUrl);

    /*
     * A4 는 "단일 홉으로 최종 경로 도달" 을 요구한다.
     *
     * 구 호스트 catch-all 을 먼저 두면 cmnyx.com/welcome 이
     *   → 신규도메인/welcome → 신규도메인/about
     * 로 두 홉을 탄다. 그래서 구 호스트에서는 경로까지 합쳐 한 번에 보낸다.
     *
     * 규칙 순서:
     *   1. 구 호스트 + 구 경로 → 신규 도메인의 신규 경로 (한 홉)
     *   2. 구 호스트의 나머지 경로 → 신규 도메인의 같은 경로
     *   3. 신규 도메인으로 들어온 구 경로 → 신규 경로
     */
    const hostAwarePathRedirects = crossDomain
      ? legacyRedirects.map(({ from, to }) => ({
          source: from,
          has: [{ type: "host" as const, value: legacyHost! }],
          destination: `${siteUrl}${to}`,
          permanent: true,
        }))
      : [];

    const hostCatchAll = crossDomain
      ? [
          {
            source: "/:path*",
            has: [{ type: "host" as const, value: legacyHost! }],
            destination: `${siteUrl}/:path*`,
            permanent: true,
          },
        ]
      : [];

    const samePathRedirects = legacyRedirects.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));

    return [...hostAwarePathRedirects, ...hostCatchAll, ...samePathRedirects];
  },
};

export default nextConfig;
