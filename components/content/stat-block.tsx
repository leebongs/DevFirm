import { cn } from "@/lib/utils";

/**
 * 지표 숫자 + 라벨(§6.3). 신뢰 지표와 기대 효과에서 쓴다.
 *
 * 부모가 <dl> 이므로 실제로 <dt>/<dd> 를 낸다. div+p 로 감싸면 정의 목록
 * 구조가 깨져 axe 의 definition-list 규칙에 걸린다(스크린리더가 항목과 값의
 * 짝을 읽지 못한다).
 *
 * DOM 순서는 dt(라벨) → dd(값) 이어야 하지만 화면에서는 값이 먼저 와야 해서
 * flex-col-reverse 로 뒤집는다. 시각 순서를 위해 마크업을 어기지 않는다.
 */
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
    <div
      className={cn(
        "border-border flex flex-col-reverse border-t pt-4",
        className,
      )}
    >
      <dt className="text-muted-foreground mt-1 text-sm break-keep">{label}</dt>
      <dd className="text-2xl font-bold tracking-[-0.02em] lg:text-3xl">
        {value}
      </dd>
    </div>
  );
}
