"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, primaryCta } from "@/content/navigation";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

/**
 * lg 미만에서 쓰는 전체 메뉴 드로어(§3.2).
 *
 * 메가메뉴를 모바일에 그대로 쓸 수 없어 별도 구현이 필요하다(ADR-001 Cons 2).
 * 데이터 출처는 메가메뉴와 동일한 content/navigation.ts 이므로 두 벌 구현이어도
 * 메뉴 내용이 어긋날 일은 없다.
 */
export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={ui.nav.openMenu}
        className="hover:bg-accent focus-visible:ring-ring inline-flex size-11 items-center justify-center rounded-md focus-visible:ring-2 focus-visible:outline-none lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{ui.nav.mainNavLabel}</SheetTitle>
        </SheetHeader>

        <nav className="px-4 pb-8" aria-label={ui.nav.mainNavLabel}>
          <ul className="space-y-6">
            {mainNav.map((node) => {
              const active =
                node.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(node.href);
              return (
                <li key={node.href}>
                  <Link
                    href={node.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center text-base font-semibold",
                      active && "text-primary",
                    )}
                  >
                    {node.label}
                  </Link>

                  {node.children?.length ? (
                    <ul className="border-border mt-1 space-y-0.5 border-l pl-4">
                      {node.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "text-muted-foreground flex min-h-11 items-center text-sm",
                              pathname === child.href &&
                                "text-primary font-medium",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <Link
            href={primaryCta.href}
            onClick={() => setOpen(false)}
            className="bg-primary text-primary-foreground mt-8 flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold"
          >
            {primaryCta.label}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
