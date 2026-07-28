import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 아이콘 + 제목 + 설명 카드(§6.3).
 * 설명은 3줄로 자른다 — 카드가 길어지면 그리드가 무너지고, 무엇보다
 * "정보 과밀"이 다시 시작된다(§12 리스크).
 */
export function FeatureCard({
  icon: Icon,
  title,
  desc,
  href,
  linkLabel,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  desc: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  const body = (
    <>
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

  const base =
    "border-border bg-card block h-full rounded-lg border p-5 lg:p-6";

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
