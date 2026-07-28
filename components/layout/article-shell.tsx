import { Container } from "./container";
import { OnThisPage } from "./on-this-page";
import { Breadcrumb } from "./breadcrumb";
import { cn } from "@/lib/utils";

/**
 * T3 Long-form 페이지 껍데기(§3.3).
 *
 * xl 이상에서 본문 옆에 앵커 TOC 를 세우고, 그 미만에서는 본문 위로 접이식을
 * 올린다. 페이지마다 이 그리드를 다시 쓰지 않도록 한 곳에 가둔다.
 */
export function ArticleShell({
  href,
  children,
  className,
}: {
  /** Breadcrumb 이 조상 체인을 찾는 데 쓰는 현재 경로 */
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Container className={cn("py-12 lg:py-16", className)}>
      <Breadcrumb href={href} />
      <div className="mt-6 xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-12">
        <div className="min-w-0">
          <OnThisPage className="mb-8 xl:hidden" />
          {children}
        </div>
        <div className="hidden xl:block">
          <OnThisPage />
        </div>
      </div>
    </Container>
  );
}
