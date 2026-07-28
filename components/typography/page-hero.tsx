import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Illustration } from "@/components/content/illustration";
import type { IllustrationAsset } from "@/content/illustrations";

/**
 * 페이지 상단 히어로(§3.3 T2/T3/T5/T6/T7 공용).
 *
 * LCP 대상은 이미지가 아니라 이 제목 텍스트다. 배경 이미지를 넣지 않는 것이
 * LCP < 2.5s(A7)를 확보하는 가장 확실한 방법이다.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  art,
  variant = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: React.ReactNode;
  /** lg 이상에서만 제목 오른쪽에 붙는다. LCP 요소가 되지 않게 하기 위함 */
  art?: IllustrationAsset;
  variant?: "default" | "brand";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border border-b py-14 md:py-20 lg:py-24",
        variant === "brand"
          ? "bg-brand text-brand-foreground border-transparent"
          : "bg-background",
        className,
      )}
    >
      <Container
        className={cn(
          art &&
            "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12",
        )}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-semibold tracking-[0.08em] uppercase",
                variant === "brand"
                  ? "text-brand-foreground/70"
                  : "text-primary",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "max-w-[24ch] text-[1.75rem] leading-[1.3] font-bold lg:text-[2.75rem] lg:leading-[1.15]",
              eyebrow && "mt-3",
            )}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className={cn(
                "mt-5 max-w-[68ch] text-base leading-[1.75] lg:text-[1.0625rem] lg:leading-[1.8]",
                variant === "brand"
                  ? "text-brand-foreground/80"
                  : "text-muted-foreground",
              )}
            >
              {lead}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {actions}
            </div>
          ) : null}
        </div>

        {art ? (
          <div className="mt-10 hidden w-[22rem] lg:mt-0 lg:block xl:w-[26rem]">
            <Illustration
              src={art.src}
              width={art.width}
              height={art.height}
              decorative
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
