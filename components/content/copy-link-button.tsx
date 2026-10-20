"use client";

import { useRef, useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

/**
 * 섹션 공유 주소를 클립보드에 복사하는 아이콘 버튼.
 *
 * 주소는 서버에서 prop 으로 받는다 — 현재 탭의 locale 경로가 아니라
 * 리다이렉트가 방문자 언어로 안착시키는 고정 공유 주소를 복사해야
 * 받은 사람 누구에게나 올바른 언어로 열린다.
 */
export function CopyLinkButton({
  url,
  label,
  copiedLabel,
}: {
  url: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // 클립보드가 막힌 환경(권한 거부 등)에서는 조용히 포기한다.
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className="border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/40 focus-visible:ring-ring inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold focus-visible:ring-2 focus-visible:outline-none"
    >
      {copied ? (
        <>
          <Check className="text-primary size-4" aria-hidden />
          <span className="text-primary">{copiedLabel}</span>
        </>
      ) : (
        <LinkIcon className="size-4" aria-hidden />
      )}
    </button>
  );
}
