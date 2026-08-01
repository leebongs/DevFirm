import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";

/**
 * 논리 경로에 언어 접두사를 붙인다.
 *
 * `content/navigation.ts` 의 href 는 언어를 모르는 논리 경로(`/about`)다.
 * 언어를 모르는 채로 그대로 렌더하면 링크를 누를 때마다 proxy 가 307 로
 * 언어를 붙여 되돌려보낸다 — 동작은 하지만 클릭마다 왕복이 한 번 더 생기고,
 * 크롤러 눈에는 사이트의 모든 내부 링크가 리다이렉트로 보인다.
 *
 * 외부 URL·앵커·mailto·tel 은 건드리지 않는다.
 */
export function localeHref(lang: string, href: string): string {
  if (!/^\//.test(href)) return href;

  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;

  // 이미 접두사가 붙어 있으면 두 번 붙이지 않는다
  const [, first] = href.split("/");
  if (first && isLocale(first)) return href;

  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
