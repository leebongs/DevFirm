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
    /*
     * Radix 의 공유 viewport 를 쓴다(viewport={false} 로 끄지 않는다).
     *
     * 끄면 각 패널이 자기 트리거 바로 아래에 붙는데, 오른쪽 끝 메뉴에서는
     * 34rem 패널이 컨테이너 밖으로 밀려나 내용이 잘린다. 공유 viewport 는
     * 메뉴 전체를 기준으로 배치되므로 화면 폭이 줄어도 잘리지 않는다.
     *
     * 다만 shadcn 기본값은 그 viewport 를 메뉴 루트의 **왼쪽**(left-0)에
     * 물린다. 메뉴 루트는 헤더 오른쪽에 붙어 있으므로 거기서 34rem 을
     * 오른쪽으로 펼치면 그대로 컨테이너 밖으로 나간다. 앵커를 오른쪽으로
     * 뒤집어 패널의 오른쪽 모서리가 메뉴 루트의 오른쪽 모서리에 맞게 한다.
     * 메뉴 루트는 항상 컨테이너 안에 있으므로 이 배치는 폭과 무관하게
     * 컨테이너를 넘지 않는다.
     */
    <NavigationMenu className="hidden lg:flex [&_[data-slot=navigation-menu-viewport-wrapper]]:right-0 [&_[data-slot=navigation-menu-viewport-wrapper]]:left-auto [&_[data-slot=navigation-menu-viewport-wrapper]]:justify-end">
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
                {/* 폭을 뷰포트에 물려 클램프한다. 1024px 에서도 좌우 여백이 남는다 */}
                <div className="w-[min(34rem,calc(100vw-3rem))] p-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href={node.href}
                      className="hover:bg-accent focus-visible:ring-ring flex flex-col items-start gap-0 rounded-md p-3 focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <span className="text-sm font-semibold [overflow-wrap:normal]">
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
                            className="hover:bg-accent focus-visible:ring-ring flex flex-col items-start gap-0 rounded-md p-3 focus-visible:ring-2 focus-visible:outline-none"
                          >
                            {/*
                              overflow-wrap:anywhere 를 라벨에서만 해제한다.
                              body 전역값은 긴 URL 대응용인데, 라벨에 그대로
                              걸리면 폭이 좁아졌을 때 "최과장AI" 를
                              "최과장A / I" 로 쪼갠다. 라벨은 정당한 경계에서만
                              줄바꿈해야 한다.
                            */}
                            <span className="text-sm font-medium [overflow-wrap:normal]">
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
