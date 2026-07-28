import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * 페이지 메타데이터 생성기(§7).
 *
 * canonical 을 여기서만 만든다. O-6 로 도메인이 바뀌므로 절대 URL 의 출처를
 * 한 곳(site.url)으로 묶어두면 Phase 5 의 도메인 이전이 환경변수 하나로 끝난다.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** 사이트 루트 기준 경로. 예: "/about/cic" */
  path: string;
}): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "ko_KR",
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
