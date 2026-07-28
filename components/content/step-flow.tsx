import { cn } from "@/lib/utils";

/**
 * 번호 붙은 프로세스(§6.3).
 * 좁은 화면에서는 세로로 쌓고, lg 이상에서 가로로 편다.
 */
export function StepFlow({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-4 lg:grid-cols-4", className)}>
      {steps.map((step, index) => (
        <li
          key={step}
          className="border-border bg-card relative rounded-lg border p-5"
        >
          <span className="bg-primary/10 text-primary inline-flex size-7 items-center justify-center rounded-full text-xs font-bold">
            {index + 1}
          </span>
          <p className="mt-3 text-sm font-medium break-keep">{step}</p>
        </li>
      ))}
    </ol>
  );
}
