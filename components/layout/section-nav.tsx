"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sectionNav } from "@/content/navigation";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

/**
 * 섹션 로컬 내비(ADR-001).
 *
 * 형제 페이지를 가로 탭으로 상시 노출해 "옆에 무엇이 있는가"를 알린다.
 * breadcrumb 로는 형제 이동이 부모 경유 2클릭이 되지만 여기서는 1클릭이다.
 *
 * 모바일 세로 공간 잠식을 막기 위해 스크롤을 내리면 숨고 올리면 복귀한다.
 * 다만 **키보드 포커스가 들어오면 숨은 상태에서도 즉시 노출**된다 —
 * 보이지 않는 곳으로 포커스가 사라지면 WCAG 2.4.3/2.4.11 위반이다.
 */
export function SectionNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      // 작은 흔들림으로 토글되지 않도록 임계값을 둔다
      if (Math.abs(delta) < 8) return;
      // 최상단 근처에서는 항상 보인다
      setHidden(delta > 0 && y > 120);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionRoot = Object.keys(sectionNav).find((root) =>
    pathname.startsWith(root),
  );
  const items = sectionRoot ? sectionNav[sectionRoot] : undefined;
  if (!items?.length) return null;

  const visible = !hidden || focusWithin;

  return (
    <div
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/80 border-border sticky z-40 border-b backdrop-blur",
        "top-16 lg:top-18",
        "transition-transform duration-200 motion-reduce:transition-none",
        !visible && "-translate-y-[calc(100%+1px)]",
      )}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusWithin(false);
        }
      }}
    >
      <nav
        aria-label={ui.nav.sectionNavLabel}
        className="mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-12"
      >
        {/* 항목이 많은 섹션(AI 솔루션 8개)은 좁은 화면에서 가로 스크롤된다 */}
        {/* 모바일에서는 h-11(44px). 헤더 64px + 각 1px 테두리를 더해도
            합산 sticky 높이가 110px 로 112px 상한 안에 들어온다. */}
        <ul className="flex h-11 scrollbar-none items-stretch gap-1 overflow-x-auto lg:h-12">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-visible:ring-ring flex h-11 items-center border-b-2 px-3 text-sm whitespace-nowrap focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset lg:h-12",
                    active
                      ? "border-primary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground border-transparent",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
