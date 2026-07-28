import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Illustration } from "./illustration";
import type { IllustrationAsset } from "@/content/illustrations";
import { cn } from "@/lib/utils";

/**
 * 아이콘 + 제목 + 설명 카드(§6.3).
 * 설명은 3줄로 자른다 — 카드가 길어지면 그리드가 무너지고, 무엇보다
 * "정보 과밀"이 다시 시작된다(§12 리스크).
 *
 * `art` 를 주면 카드 상단에 일러스트가 붙는다. 제목·설명이 바로 아래에서
 * 같은 내용을 말하므로 장식으로 취급한다(스크린리더 중복 낭독 방지).
 */
export function FeatureCard({
  icon: Icon,
  art,
  title,
  desc,
  href,
  linkLabel,
  className,
}: {
  icon?: LucideIcon;
  art?: IllustrationAsset;
  title: string;
  desc: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  const body = (
    <>
      {art ? (
        <div className="bg-muted/60 border-border -mx-5 -mt-5 mb-5 border-b lg:-mx-6 lg:-mt-6 lg:mb-6">
          <Illustration
            src={art.src}
            width={art.width}
            height={art.height}
            decorative
          />
        </div>
      ) : null}
      {Icon ? (
        <Icon className="text-primary size-6" aria-hidden strokeWidth={1.75} />
      ) : null}
      <h3 className={cn("text-lg font-semibold break-keep", Icon && "mt-4")}>
        {title}
      </h3>
      <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed break-keep">
        {desc}
      </p>
      {href && linkLabel ? (
        <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden />
        </span>
      ) : null}
    </>
  );

  // overflow-hidden 이 필요한 이유: art 블록이 음수 마진으로 카드 가장자리까지
  // 나가므로, 없으면 둥근 모서리 밖으로 일러스트가 삐져나온다.
  const base =
    "border-border bg-card block h-full overflow-hidden rounded-lg border p-5 lg:p-6";

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          base,
          "hover:border-primary/30 focus-visible:ring-ring transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
      >
        {body}
      </Link>
    );
  }

  return <div className={cn(base, className)}>{body}</div>;
}
