import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

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
  variant = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: React.ReactNode;
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
      <Container>
        {eyebrow ? (
          <p
            className={cn(
              "text-xs font-semibold tracking-[0.08em] uppercase",
              variant === "brand" ? "text-brand-foreground/70" : "text-primary",
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
      </Container>
    </div>
  );
}
