import type { Metadata } from "next";
import { site } from "@/content/site";
import {
  DEFAULT_LOCALE,
  hreflangOf,
  locales,
  type Locale,
} from "@/content/locales";
import { ogImageAlt } from "@/content/seo";

/**
 * OG 카드 이미지.
 *
 * app/opengraph-image.png 은 파일 규약이라 원래 자동 배선되지만, 페이지마다
 * openGraph 를 명시하면 그 자동 배선이 덮인다(빌드 산출물에서 og:image 누락으로
 * 확인). 그래서 여기서 직접 지정한다. metadataBase 가 있으므로 절대 URL 로 나간다.
 */
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: ogImageAlt,
} as const;

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
  lang = DEFAULT_LOCALE,
}: {
  title: string;
  description: string;
  /** 사이트 루트 기준 **논리** 경로. 예: "/about/cic". 언어 접두사는 여기서 붙인다. */
  path: string;
  lang?: Locale;
}): Metadata {
  const localized = (locale: Locale) =>
    `${site.url}/${locale}${path === "/" ? "" : path}`;
  const url = localized(lang);

  /*
   * hreflang.
   *
   * 같은 문서의 17개 언어판이 서로를 가리켜야 한다. 이걸 빼면 검색엔진이
   * 각 언어판을 **중복 문서**로 보고 하나만 남긴다 — 번역을 해 놓고도
   * 다른 언어권 검색에 안 걸리는 상태가 된다.
   *
   * x-default 는 언어 협상이 안 될 때의 기본이다. 접두사 없는 주소를 주면
   * proxy 가 방문자에 맞춰 보내주므로 그쪽이 정확하다.
   */
  const languages = Object.fromEntries(
    locales.map((l) => [hreflangOf(l.code), localized(l.code)]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": site.url },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang,
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
