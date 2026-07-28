import { cn } from "@/lib/utils";

/**
 * 장문 산문 래퍼(§4.3). 본문 측정폭 68ch 상한과 한국어 조판을 강제한다.
 * 약관·개인정보처리방침(T7)과 상세 설명 블록에서 쓴다.
 */
export function Prose({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-base leading-[1.75] break-keep lg:text-[1.0625rem] lg:leading-[1.8]",
        "[&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-semibold lg:[&_h2]:text-2xl",
        "[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold",
        "[&_p]:mt-4",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
