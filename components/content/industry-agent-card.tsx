import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IndustryAgent } from "@/content/_types";
import { cn } from "@/lib/utils";

/** 산업별 6종 그리드 카드(§6.3). 홈과 /solutions 허브가 공유한다. */
export function IndustryAgentCard({
  agent,
  className,
}: {
  agent: Pick<IndustryAgent, "slug" | "name" | "tagline" | "icon">;
  className?: string;
}) {
  const Icon = agent.icon;
  return (
    <Link
      href={`/solutions/agents/${agent.slug}`}
      className={cn(
        "border-border bg-card hover:border-primary/30 focus-visible:ring-ring group flex h-full flex-col rounded-lg border p-5 transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none lg:p-6",
        className,
      )}
    >
      <span className="bg-highlight/15 ring-highlight/30 inline-flex size-10 items-center justify-center rounded-lg ring-1">
        <Icon className="size-5" aria-hidden strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 font-semibold break-keep">{agent.name}</h3>
      <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed break-keep">
        {agent.tagline}
      </p>
      <ArrowRight
        className="text-primary mt-4 size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden
      />
    </Link>
  );
}
