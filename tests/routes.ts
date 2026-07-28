/**
 * 테스트가 도는 경로 목록.
 *
 * navigation.ts 에서 파생시켜 페이지가 늘어나도 테스트 목록을 따로 손보지
 * 않게 한다 — 목록이 어긋나면 "전 페이지 통과"라는 말이 거짓이 된다.
 */
import { mainNav, footerNav } from "../content/navigation";
import type { NavNode } from "../content/_types";

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

export const ROUTES = [...new Set([...EXTRA, ...fromNav])].sort();
