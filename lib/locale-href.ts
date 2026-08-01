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

/**
 * 경로에서 언어 접두사를 떼어 논리 경로로 되돌린다.
 *
 * 내비게이션 데이터의 키와 href 는 언어를 모르는 논리 경로(`/about`)인데
 * `usePathname()` 은 `/ko/about` 을 준다. 이 둘을 그대로 비교하면 활성 섹션
 * 판정이 전부 실패한다 — 섹션 탭이 통째로 사라지고 메뉴 강조가 안 붙는다.
 */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (!first || !isLocale(first)) return pathname;
  return rest.length ? `/${rest.join("/")}` : "/";
}

/** 경로가 가리키는 언어. 없으면 기본 언어. */
export function localeFromPath(pathname: string): Locale {
  const [, first] = pathname.split("/");
  return first && isLocale(first) ? first : DEFAULT_LOCALE;
}
