import Link from "next/link";
import { Container } from "./container";
import { HeaderNavClient } from "./header-nav-client";
import { BrandLogo } from "./brand-logo";
import { primaryCta } from "@/content/navigation";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

/**
 * 전역 헤더 셸(§3.1). RSC 로 남겨 로고·CTA 가 초기 HTML 에 들어가게 한다.
 * 상호작용이 필요한 메가메뉴·드로어만 HeaderNavClient 로 분리한다.
 *
 * 높이는 h-16 / lg:h-18 로 고정한다. SectionNav(h-12)와 합쳐 sticky 총합이
 * 112px 를 넘지 않아야 한다(Phase 1 DoD).
 *
 * 헤더는 홈에서 히어로 사진 위에 겹쳐 뜬다. 유리는 쓰되 **밝은 유리**다 —
 * 내부 글자가 어두운색이라 면이 밝아야 대비가 나온다. 사진이 아무리 어두워도
 * 흰 면 72% 아래로는 내려가지 않으므로 대비가 고정된다.
 * (히어로 안의 패널은 반대로 흰 글자라 어두운 유리를 쓴다.)
 */
export function SiteHeader() {
  return (
    <header className="bg-background/88 supports-[backdrop-filter]:bg-background/72 border-border sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150">
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm"
      >
        {ui.nav.skipToContent}
      </a>

      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link
          href="/"
          aria-label={site.name}
          className="focus-visible:ring-ring shrink-0 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-1 lg:gap-2">
          <HeaderNavClient />
          <Link
            href={primaryCta.href}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring hidden min-h-11 items-center rounded-md px-4 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none md:inline-flex"
          >
            {primaryCta.label}
          </Link>
        </div>
      </Container>
    </header>
  );
}
