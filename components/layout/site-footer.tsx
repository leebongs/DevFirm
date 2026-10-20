import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { getDocAiEntry } from "@/content/docai-entry";
import { site as siteConst } from "@/content/site";
import { localeHref } from "@/lib/locale-href";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/content/locales";

/**
 * 전역 푸터(§5.18).
 *
 * 메가메뉴·드로어가 `ssr: false` 로 초기 HTML 에서 빠지므로(§6.4.1),
 * **사이트 전체 링크의 크롤 경로는 이 컴포넌트가 보증한다.** RSC 로 유지해야
 * 하는 이유가 그것이다.
 */
export function SiteFooter({
  lang,
  nav: footerNav,
  site,
  ui,
}: {
  lang: Locale;
  nav: Dictionary["nav"]["footerNav"];
  /** 번역되는 회사 표기만. 번호·주소 원문은 siteConst 에서 온다. */
  site: Dictionary["site"];
  ui: Dictionary["ui"];
}) {
  const docAiEntry = getDocAiEntry(lang);

  return (
    <footer className="bg-brand text-brand-foreground mt-auto">
      <Container className="py-14 lg:py-16">
        <div className="border-brand-foreground/15 bg-brand-foreground/[0.04] mb-12 flex flex-col gap-5 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6">
          <div>
            <p className="text-highlight text-xs font-semibold tracking-[0.08em] uppercase">
              {docAiEntry.footer.eyebrow}
            </p>
            <p className="mt-2 text-lg font-semibold break-keep">
              {docAiEntry.footer.title}
            </p>
            <p className="text-brand-foreground/70 mt-2 max-w-[64ch] text-sm leading-6 break-keep">
              {docAiEntry.footer.description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
            <Link
              href={docAiEntry.href}
              className="border-brand-foreground/30 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              {docAiEntry.footer.action}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={docAiEntry.releaseNotesHref}
              className="text-brand-foreground/75 hover:text-brand-foreground focus-visible:ring-brand-foreground self-center rounded-sm text-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none sm:self-auto"
            >
              {docAiEntry.footer.releaseNotesAction}
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.href} aria-labelledby={`footer-${group.href}`}>
              <p
                id={`footer-${group.href}`}
                className="text-brand-foreground/60 text-xs font-semibold tracking-[0.08em] uppercase"
              >
                {group.label}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.children?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localeHref(lang, item.href)}
                      className="text-brand-foreground/85 hover:text-brand-foreground text-sm break-keep"
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-brand-foreground/15 mt-12 border-t pt-8">
          <p className="text-base font-bold">{site.footerBrand}</p>
          <dl className="text-brand-foreground/70 mt-3 space-y-1 text-xs">
            <div className="flex flex-wrap gap-x-2">
              <dt>{ui.footer.businessNumberLabel}</dt>
              {/* 사업자등록번호와 그 번호를 가진 법인을 같은 항목으로 묶는다.
                  앞줄이 사업 단위명이라 실제 사업자를 여기서 밝혀야 한다. */}
              <dd>
                {siteConst.businessNumber}
                <span className="mt-0.5 block">{siteConst.businessEntity}</span>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt>{ui.footer.addressLabel}</dt>
              <dd>{site.addressFull}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt>{ui.footer.telLabel}</dt>
              <dd>
                <a
                  href={siteConst.telHref}
                  className="hover:text-brand-foreground"
                >
                  {siteConst.tel}
                </a>
              </dd>
            </div>
          </dl>
          <p className="text-brand-foreground/60 mt-5 text-xs">
            © {siteConst.founded} {siteConst.legalNameEn}
          </p>
        </div>
      </Container>
    </footer>
  );
}
