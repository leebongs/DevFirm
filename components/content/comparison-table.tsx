import { cn } from "@/lib/utils";

/**
 * 2열 대조표(§6.3). 로펌 vs 데브펌 비유를 나란히 보여주는 데 쓴다.
 *
 * 좁은 화면에서 표를 가로 스크롤시키지 않고 행마다 위아래로 쌓는다.
 * 320px 가로 스크롤 0(A1)이 표 하나 때문에 깨지는 일을 막기 위해서다.
 */
export function ComparisonTable({
  leftLabel,
  rightLabel,
  rows,
  className,
}: {
  leftLabel: string;
  rightLabel: string;
  rows: readonly { left: string; right: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-lg border",
        className,
      )}
    >
      <div className="bg-muted hidden grid-cols-2 md:grid">
        <p className="text-muted-foreground border-border border-r px-5 py-3 text-xs font-semibold tracking-[0.08em] uppercase">
          {leftLabel}
        </p>
        <p className="text-primary px-5 py-3 text-xs font-semibold tracking-[0.08em] uppercase">
          {rightLabel}
        </p>
      </div>

      <ul className="divide-border divide-y">
        {rows.map((row) => (
          <li key={row.left} className="md:grid md:grid-cols-2">
            <div className="border-border px-5 py-4 md:border-r">
              <span className="text-muted-foreground text-xs md:hidden">
                {leftLabel}
              </span>
              <p className="text-muted-foreground text-sm break-keep md:text-base">
                {row.left}
              </p>
            </div>
            <div className="border-border border-t px-5 py-4 md:border-t-0">
              <span className="text-primary text-xs md:hidden">
                {rightLabel}
              </span>
              <p className="text-sm font-medium break-keep md:text-base">
                {row.right}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
