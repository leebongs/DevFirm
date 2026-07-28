import { mainNav } from "@/content/navigation";
import type { NavNode } from "@/content/_types";

/**
 * 경로에 해당하는 조상 체인을 navigation.ts 에서 찾는다.
 * Breadcrumb·sitemap 이 경로 문자열을 스스로 쪼개지 않도록 여기서만 해석한다.
 */
export function findTrail(href: string, nodes: NavNode[] = mainNav): NavNode[] {
  for (const node of nodes) {
    if (node.href === href) return [node];
    if (node.children) {
      const rest = findTrail(href, node.children);
      if (rest.length > 0) {
        // 자식 목록에 부모 자신이 개요 항목으로 다시 들어있는 경우 중복을 없앤다
        return rest[0]?.href === node.href ? rest : [node, ...rest];
      }
    }
  }
  return [];
}

/** navigation.ts 전체를 평탄화한다(sitemap 생성용). */
export function flattenNav(nodes: NavNode[] = mainNav): NavNode[] {
  const out: NavNode[] = [];
  const visit = (list: NavNode[]) => {
    for (const node of list) {
      if (!node.external && !node.excludeFromSitemap) out.push(node);
      if (node.children) visit(node.children);
    }
  };
  visit(nodes);
  // 개요 항목이 부모와 중복되므로 href 기준으로 정리한다
  return [...new Map(out.map((node) => [node.href, node])).values()];
}

/** URL depth(`/a/b/c` → 3). A14 단위 테스트가 쓴다. */
export function depthOf(href: string): number {
  return href.split("/").filter(Boolean).length;
}
