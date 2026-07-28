import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Illustration } from "./illustration";
import type { IndustryAgent } from "@/content/_types";
import { agentIllustrations } from "@/content/illustrations";
import { cn } from "@/lib/utils";

/**
 * 산업별 6종 그리드 카드(§6.3). 홈과 /solutions 허브, 형제 목록이 공유한다.
 *
 * 일러스트는 카드 상단에 놓고 `decorative` 로 둔다 — 바로 아래에 산업명과
 * 태그라인이 같은 내용을 글로 말하고 있어, alt 를 붙이면 스크린리더가 같은
 * 정보를 두 번 읽는다.
 */
export function IndustryAgentCard({
  agent,
  className,
}: {
  agent: Pick<IndustryAgent, "slug" | "name" | "tagline" | "icon">;
  className?: string;
}) {
  const Icon = agent.icon;
  const art = agentIllustrations[agent.slug];

  return (
    <Link
      href={`/solutions/agents/${agent.slug}`}
      className={cn(
        "border-border bg-card hover:border-primary/30 focus-visible:ring-ring group flex h-full flex-col overflow-hidden rounded-lg border transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      {art ? (
        <div className="bg-muted/60 border-border border-b">
          <Illustration
            src={art.src}
            width={art.width}
            height={art.height}
            decorative
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex items-center gap-2.5">
          <span className="bg-highlight/15 ring-highlight/30 inline-flex size-8 shrink-0 items-center justify-center rounded-md ring-1">
            <Icon className="size-4" aria-hidden strokeWidth={1.75} />
          </span>
          <h3 className="font-semibold break-keep">{agent.name}</h3>
        </div>
        <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed break-keep">
          {agent.tagline}
        </p>
        <ArrowRight
          className="text-primary mt-4 size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden
        />
      </div>
    </Link>
  );
}
