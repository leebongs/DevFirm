/**
 * 테스트가 도는 경로 목록.
 *
 * navigation.ts 에서 파생시켜 페이지가 늘어나도 테스트 목록을 따로 손보지
 * 않게 한다 — 목록이 어긋나면 "전 페이지 통과"라는 말이 거짓이 된다.
 */
import { mainNav, footerNav } from "../content/navigation";
import type { NavNode } from "../content/_types";
import { DEFAULT_LOCALE } from "../content/locales";

function collect(nodes: NavNode[], out = new Set<string>()) {
  for (const node of nodes) {
    if (!node.external && !node.excludeFromSitemap) out.add(node.href);
    if (node.children) collect(node.children, out);
  }
  return out;
}

const fromNav = collect([...mainNav, ...footerNav]);

/** 내비게이션 트리에 없지만 존재해야 하는 경로 */
const EXTRA = ["/"];

/**
 * 언어 접두사를 붙인다.
 *
 * navigation.ts 의 href 는 언어를 모르는 논리 경로다. 실제 URL 은 언제나
 * `/{lang}/...` 이고, 접두사 없는 주소는 proxy 가 307 로 언어를 붙여 보낸다.
 * 테스트가 접두사 없는 주소를 그대로 치면 매 요청이 리다이렉트를 한 번 더 타서
 * 무엇을 재고 있는지 흐려진다 — 기본 언어를 명시해 곧장 최종 주소로 간다.
 */
const withLocale = (href: string) =>
  `/${DEFAULT_LOCALE}${href === "/" ? "" : href}`;

export const ROUTES = [...new Set([...EXTRA, ...fromNav])]
  .sort()
  .map(withLocale);
