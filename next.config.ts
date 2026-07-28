import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = dirname(fileURLToPath(import.meta.url));

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

  // §2.3 기존 → 신규 경로 리다이렉트는 Phase 5에서 전수 등록한다(A4).
};

export default nextConfig;
