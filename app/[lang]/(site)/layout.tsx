import { SiteHeader } from "@/components/layout/site-header";
import { SectionNav } from "@/components/layout/section-nav";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * 공통 셸(§7). 라우트 그룹이라 URL 에 (site) 가 드러나지 않으며, 후일
 * `/[locale]/` 를 끼워 넣을 자리를 남겨둔다(§1.3).
 *
 * SectionNav 는 섹션별 layout 마다 두지 않고 여기 한 번만 둔다. 자신이 어느
 * 섹션에 있는지 pathname 으로 판단해 해당 없으면 null 을 반환하므로,
 * 섹션이 늘어나도 layout 파일을 추가할 필요가 없다.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <SectionNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
