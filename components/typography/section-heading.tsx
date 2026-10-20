import { cn } from "@/lib/utils";

/**
 * eyebrow + h2 + 리드문. 섹션 제목의 시각 위계를 한 곳에서 고정한다(§4.3).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  /** 제목 오른쪽에 붙는 보조 컨트롤(예: 섹션 링크 복사 버튼) */
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-4 gap-y-2",
          eyebrow && "mt-3",
          align === "center" && "justify-center",
        )}
      >
        <h2
          id={id}
          className="text-[1.375rem] leading-[1.35] font-semibold lg:text-[2rem] lg:leading-[1.25]"
        >
          {title}
        </h2>
        {action}
      </div>
      {lead ? (
        <p className="text-muted-foreground mt-4 text-base leading-[1.75] lg:text-[1.0625rem] lg:leading-[1.8]">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
