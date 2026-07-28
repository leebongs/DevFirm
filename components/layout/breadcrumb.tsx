import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { findTrail } from "@/lib/nav";
import { ui } from "@/content/ui";

/**
 * 현재 위치 표시(ADR-001).
 *
 * 방향 감각의 **주 수단은 SectionNav** 이고 이것은 보조 수단이다. 그럼에도
 * 남겨두는 이유는 breadcrumb 고유의 가치 — 스크린리더 위치 고지와
 * BreadcrumbList 구조화 데이터 — 가 SectionNav 로 대체되지 않기 때문이다.
 *
 * RSC 로 유지하려고 pathname 훅 대신 페이지가 자기 href 를 넘긴다.
 * 전 페이지 SSG 라 경로는 빌드 시점에 이미 확정되어 있다.
 */
export function Breadcrumb({ href }: { href: string }) {
  const trail = findTrail(href);
  if (trail.length === 0) return null;

  return (
    <nav aria-label={ui.nav.breadcrumbLabel}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-1 text-xs">
        <li className="flex items-center gap-1">
          <Link href="/" className="hover:text-foreground">
            {ui.nav.home}
          </Link>
          <ChevronRight className="size-3" aria-hidden />
        </li>
        {trail.map((node, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={node.href} className="flex items-center gap-1">
              {isLast ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {node.label}
                </span>
              ) : (
                <>
                  <Link href={node.href} className="hover:text-foreground">
                    {node.label}
                  </Link>
                  <ChevronRight className="size-3" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
