import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { DEFAULT_LOCALE } from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-href";

/**
 * 404. (site) 셸을 상속받지 못하므로 헤더·푸터를 직접 조립한다.
 * 막다른 길이 되지 않도록 주요 섹션 링크를 함께 제공한다.
 *
 * **언어는 기본 언어로 고정한다.** Next 의 not-found 규약은 `params` 를 받지
 * 않는다 — 어느 경로에서 왔는지 알 수 없으므로 언어도 알 수 없다. 잘못된
 * 언어로 추측하느니 원문 언어로 내고, 헤더의 선택기로 옮겨 가게 한다.
 */
export default async function NotFound() {
  const lang = DEFAULT_LOCALE;
  const t = await getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} nav={t.nav} ui={t.ui} siteName={t.site.nameKo} />
      <main id="main" className="flex-1">
        <Container className="py-24 lg:py-32">
          <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
            404
          </p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.3] font-bold lg:text-[2.75rem] lg:leading-[1.15]">
            {t.ui.error.notFoundTitle}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-[68ch] leading-[1.75]">
            {t.ui.error.notFoundBody}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.nav.mainNav.map((node) => (
              <li key={node.href}>
                <Link
                  href={localeHref(lang, node.href)}
                  className="border-border hover:border-primary/40 hover:bg-muted focus-visible:ring-ring block rounded-lg border p-4 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="text-sm font-semibold">{node.label}</span>
                  {node.description ? (
                    <span className="text-muted-foreground mt-1 block text-xs leading-relaxed break-keep">
                      {node.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <SiteFooter lang={lang} nav={t.nav.footerNav} site={t.site} ui={t.ui} />
    </>
  );
}
