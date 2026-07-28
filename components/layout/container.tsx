import { cn } from "@/lib/utils";

/**
 * 가로 폭과 좌우 패딩의 단일 규칙(§4.4).
 * 와이드 모니터에서 글줄이 무한정 길어지지 않도록 1440px 상한을 둔다(P4).
 */
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
