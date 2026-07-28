"use client";

import { useEffect, useState } from "react";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

/**
 * 앵커 TOC + scrollspy (§3.1, ADR-001).
 *
 * 텍스트 과밀 페이지를 앵커로 스캔할 수 있게 해 D1(정보 과밀 해소)에 직접
 * 기여한다. xl 이상에서만 우측에 고정 노출하고, 그 미만에서는 상단 접이식으로
 * 내려간다(§3.2).
 *
 * 제목 목록은 서버에서 넘기지 않고 DOM 에서 읽는다. 페이지가 데이터로부터
 * 렌더되므로 제목이 늘거나 줄어도 TOC 를 따로 관리할 필요가 없다.
 */
export function OnThisPage({ className }: { className?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("main h2[id]"),
    );

    // effect 안에서 동기적으로 setState 하면 연쇄 렌더가 발생한다.
    // 다음 프레임으로 미루면 레이아웃이 정착한 뒤 한 번만 갱신된다.
    const frame = requestAnimationFrame(() => {
      setHeadings(
        nodes.map((node) => ({ id: node.id, text: node.textContent ?? "" })),
      );
    });

    if (nodes.length === 0) return () => cancelAnimationFrame(frame);

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면 상단에 가장 가까운, 보이는 제목을 현재 위치로 본다
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // sticky 헤더+서브내비(112px) 아래를 판정 영역으로 삼는다
        rootMargin: "-120px 0px -65% 0px",
        threshold: 0,
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (headings.length < 2) return null;

  return (
    <>
      {/* xl 미만: 상단 접이식 */}
      <details
        className={cn("border-border rounded-lg border xl:hidden", className)}
      >
        <summary className="min-h-11 cursor-pointer list-none px-4 py-3 text-sm font-semibold">
          {ui.toc.title}
        </summary>
        <ul className="space-y-1 px-4 pb-3">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className="text-muted-foreground hover:text-foreground flex min-h-9 items-center text-sm break-keep"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </details>

      {/* xl 이상: 우측 고정 */}
      <nav
        aria-label={ui.toc.title}
        className={cn(
          "sticky top-[calc(var(--spacing-header-lg)+var(--spacing-subnav)+1.5rem)] hidden max-h-[70vh] overflow-y-auto xl:block",
          className,
        )}
      >
        <p className="text-xs font-semibold tracking-[0.08em] uppercase">
          {ui.toc.title}
        </p>
        <ul className="border-border mt-3 space-y-1 border-l">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-3 text-sm break-keep",
                  activeId === heading.id
                    ? "border-primary text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground border-transparent",
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
