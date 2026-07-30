/*
 * scripts/generate-logo.mjs 가 생성한 파일입니다. 직접 고치지 마세요.
 * 글리프를 바꾸려면 그 스크립트의 그리드 상수를 고치고 `pnpm gen:logo` 를 돌리세요.
 *
 * 인라인 SVG 인 이유: 헤더 로고는 첫 화면에 반드시 있어야 하는데 <img> 로 두면
 * 요청이 하나 더 나가고 그동안 자리가 빈다. 마크업에 박아 두면 문서와 함께 온다.
 * 워드마크가 currentColor 를 쓰므로 어두운 배경에서도 색만 바꿔 재사용할 수 있다.
 */
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** 워드마크 원본 좌표계 폭. 높이는 항상 100 이다. */
const WORDMARK_W = 377;
/** 표시 높이. 캡하이트가 70/100 이므로 대문자는 이 값의 0.7 배로 보인다. */
const WORDMARK_H = 23;

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* 엠블렘 — app/icon.svg 와 같은 조형 */}
      <svg
        viewBox="0 0 64 64"
        width="26"
        height="26"
        aria-hidden
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#162e50" />
        <g transform="translate(12 14) scale(0.4)" fill="#f6f9fc">
          <path d="M0,2 H17 A35,35 0 0 1 17,72 H0 Z M14,59.5 H17 A22.5,22.5 0 0 0 17,14.5 H14 Z" />
          <path
            transform="translate(60 0)"
            d="M0,2 H40 V14.5 H14 V33 H34 V45.5 H14 V72 H0 Z"
          />
        </g>
        <rect x="12" y="47" width="40" height="3" rx="1.5" fill="#00bbcb" />
      </svg>

      {/* 워드마크 */}
      <svg
        viewBox={`0 0 ${WORDMARK_W} 100`}
        height={WORDMARK_H}
        width={(WORDMARK_W / 100) * WORDMARK_H}
        fill="currentColor"
        role="img"
        aria-label={site.name}
        className="shrink-0"
      >
        {/* D */}
        <g transform="translate(0 0)">
          <path d="M0,2 H17 A35,35 0 0 1 17,72 H0 Z M14,59.5 H17 A22.5,22.5 0 0 0 17,14.5 H14 Z" />
        </g>
        {/* e */}
        <g transform="translate(62 0)">
          <circle
            cx="26.5"
            cy="47"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="13"
            strokeLinecap="butt"
            strokeDasharray="111 14.66"
            strokeDashoffset="104.72"
          />
          <path d="M8,40.75 H43 V53.25 H8 Z" />
        </g>
        {/* v */}
        <g transform="translate(125 0)">
          <path d="M0,22 H15 L24,59 L33,22 H48 L24,73.5 Z" />
        </g>
        {/* F */}
        <g transform="translate(187 0)">
          <path d="M0,2 H40 V14.5 H14 V33 H34 V45.5 H14 V72 H0 Z" />
        </g>
        {/* i */}
        <g transform="translate(237 0)">
          <path d="M0,22 H13.5 V72 H0 Z M0,2 H13.5 V16 H0 Z" />
        </g>
        {/* r */}
        <g transform="translate(260.5 0)">
          <path d="M0,72 V46 A24,24 0 0 1 24,22 V35.5 A10.5,10.5 0 0 0 13.5,46 V72 Z" />
        </g>
        {/* m */}
        <g transform="translate(294.5 0)">
          <path d="M0,72 V46 A24,24 0 0 1 41.25,29.31 A24,24 0 0 1 82.5,46 V72 H69 V46 A10.5,10.5 0 0 0 48,46 V72 H34.5 V46 A10.5,10.5 0 0 0 13.5,46 V72 Z" />
        </g>
      </svg>
    </span>
  );
}
