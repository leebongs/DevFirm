import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { mainNav } from "@/content/navigation";
import { ui } from "@/content/ui";

/**
 * 404. 루트에 있어 (site) 셸을 상속받지 못하므로 헤더·푸터를 직접 조립한다.
 * 막다른 길이 되지 않도록 주요 섹션 링크를 함께 제공한다.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Container className="py-24 lg:py-32">
          <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
            404
          </p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.3] font-bold lg:text-[2.75rem] lg:leading-[1.15]">
            {ui.error.notFoundTitle}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-[68ch] leading-[1.75]">
            {ui.error.notFoundBody}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mainNav.map((node) => (
              <li key={node.href}>
                <Link
                  href={node.href}
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
      <SiteFooter />
    </>
  );
}
