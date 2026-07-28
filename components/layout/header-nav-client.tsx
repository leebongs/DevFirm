"use client";

import dynamic from "next/dynamic";

/**
 * 메가메뉴·모바일 드로어의 로딩 경계(§6.4.1).
 *
 * `next/dynamic` 의 `ssr: false` 는 **클라이언트 컴포넌트 안에서만** 동작한다.
 * SiteHeader 는 RSC 이므로 거기서 직접 호출하면 무효가 되어, 이 얇은 래퍼를
 * 하나 두고 여기서 호출한다(계획 §12.1 D-3).
 *
 * 두 컴포넌트는 (site)/layout.tsx 에 있어 모든 페이지의 First Load JS 에
 * 합산되지만 초기 화면에서 열려 있지 않다. 정적 셸(로고·메뉴 텍스트·CTA)은
 * SiteHeader 가 이미 렌더하므로 SSR 을 건너뛰어도 SEO 손실이 없고,
 * 아래 placeholder 가 같은 높이를 예약해 CLS 도 발생하지 않는다.
 */
const MegaMenu = dynamic(() => import("./mega-menu").then((m) => m.MegaMenu), {
  ssr: false,
  loading: () => <div className="hidden h-11 lg:block" aria-hidden />,
});

const MobileNavDrawer = dynamic(
  () => import("./mobile-nav-drawer").then((m) => m.MobileNavDrawer),
  {
    ssr: false,
    loading: () => <div className="size-11 lg:hidden" aria-hidden />,
  },
);

export function HeaderNavClient() {
  return (
    <>
      <MegaMenu />
      <MobileNavDrawer />
    </>
  );
}
