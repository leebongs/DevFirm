"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * 데스크탑(lg+) 메가메뉴(§3.2, ADR-001).
 *
 * Radix NavigationMenu 를 쓰는 이유는 키보드 순회·Esc 닫힘·포커스 관리가
 * 이미 구현되어 있기 때문이다(Phase 1 DoD의 키보드 항목).
 * 라벨과 경로는 전부 content/navigation.ts 에서만 온다.
 */
export function MegaMenu() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <NavigationMenu className="hidden lg:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        {mainNav.map((node) => {
          const active = isActive(node.href);

          if (!node.children?.length) {
            return (
              <NavigationMenuItem key={node.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent",
                    active && "text-primary font-semibold",
                  )}
                >
                  <Link href={node.href}>{node.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={node.href}>
              <NavigationMenuTrigger
                className={cn(
                  "bg-transparent",
                  active && "text-primary font-semibold",
                )}
              >
                {node.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[34rem] p-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href={node.href}
                      className="hover:bg-accent focus-visible:ring-ring block rounded-md p-3 focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <span className="text-sm font-semibold">
                        {node.label}
                      </span>
                      {node.description ? (
                        <span className="text-muted-foreground mt-1 block text-sm leading-relaxed break-keep">
                          {node.description}
                        </span>
                      ) : null}
                    </Link>
                  </NavigationMenuLink>

                  <ul className="mt-1 grid grid-cols-2 gap-0.5">
                    {node.children.map((child) => (
                      <li key={child.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.href}
                            className="hover:bg-accent focus-visible:ring-ring block rounded-md p-3 focus-visible:ring-2 focus-visible:outline-none"
                          >
                            <span className="text-sm font-medium">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="text-muted-foreground mt-1 block text-xs leading-relaxed break-keep">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
