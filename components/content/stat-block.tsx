import { cn } from "@/lib/utils";

/** 지표 숫자 + 라벨(§6.3). 신뢰 지표와 기대 효과에서 쓴다. */
export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("border-border border-t pt-4", className)}>
      <p className="text-2xl font-bold tracking-[-0.02em] lg:text-3xl">
        {value}
      </p>
      <p className="text-muted-foreground mt-1 text-sm break-keep">{label}</p>
    </div>
  );
}
