import Link from "next/link";
import { Container } from "./container";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { ui } from "@/content/ui";

/**
 * 전역 푸터(§5.18).
 *
 * 메가메뉴·드로어가 `ssr: false` 로 초기 HTML 에서 빠지므로(§6.4.1),
 * **사이트 전체 링크의 크롤 경로는 이 컴포넌트가 보증한다.** RSC 로 유지해야
 * 하는 이유가 그것이다.
 */
export function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground mt-auto">
      <Container className="py-14 lg:py-16">
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
                      href={item.href}
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
                {site.businessNumber}
                <span className="mt-0.5 block">{site.businessEntity}</span>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt>{ui.footer.addressLabel}</dt>
              <dd>{site.address.full}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt>{ui.footer.telLabel}</dt>
              <dd>
                <a href={site.telHref} className="hover:text-brand-foreground">
                  {site.tel}
                </a>
              </dd>
            </div>
          </dl>
          <p className="text-brand-foreground/60 mt-5 text-xs">
            © {site.founded} {site.legalNameEn}
          </p>
        </div>
      </Container>
    </footer>
  );
}
