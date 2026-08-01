import { SiteHeader } from "@/components/layout/site-header";
import { SectionNav } from "@/components/layout/section-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";

/**
 * 공통 셸(§7). 라우트 그룹이라 URL 에 (site) 가 드러나지 않는다.
 *
 * 여기가 **번역 콘텐츠가 셸로 들어오는 유일한 지점**이다. 헤더·섹션내비·푸터는
 * 스스로 언어를 모르고, 필요한 조각만 프롭으로 받는다. 클라이언트 컴포넌트는
 * `getDictionary`(server-only)를 호출할 수 없으므로 이 방향이 강제된다.
 *
 * SectionNav 는 섹션별 layout 마다 두지 않고 여기 한 번만 둔다. 자신이 어느
 * 섹션에 있는지 pathname 으로 판단해 해당 없으면 null 을 반환하므로,
 * 섹션이 늘어나도 layout 파일을 추가할 필요가 없다.
 */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  return (
    <>
      <SiteHeader
        lang={locale}
        nav={t.nav}
        ui={t.ui}
        siteName={t.site.nameKo}
      />
      <SectionNav
        sectionNav={t.nav.sectionNav}
        label={t.ui.nav.sectionNavLabel}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter lang={locale} nav={t.nav.footerNav} site={t.site} ui={t.ui} />
    </>
  );
}
