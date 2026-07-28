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
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
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
      <h2
        id={id}
        className={cn(
          "text-[1.375rem] leading-[1.35] font-semibold lg:text-[2rem] lg:leading-[1.25]",
          eyebrow && "mt-3",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className="text-muted-foreground mt-4 text-base leading-[1.75] lg:text-[1.0625rem] lg:leading-[1.8]">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
