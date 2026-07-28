import { cn } from "@/lib/utils";

/** 연혁(§6.3). */
export function TimelineList({
  items,
  className,
}: {
  items: readonly { year: string; title: string; desc?: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("border-border border-l", className)}>
      {items.map((item) => (
        <li key={`${item.year}-${item.title}`} className="relative py-5 pl-6">
          <span
            className="bg-primary absolute top-7 -left-[4.5px] size-2 rounded-full"
            aria-hidden
          />
          <p className="text-primary font-mono text-sm font-semibold">
            {item.year}
          </p>
          <p className="mt-1 font-medium break-keep">{item.title}</p>
          {item.desc ? (
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed break-keep">
              {item.desc}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
