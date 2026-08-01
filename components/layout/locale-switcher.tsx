"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { locales, isLocale, DEFAULT_LOCALE } from "@/content/locales";
import { cn } from "@/lib/utils";

/**
 * 언어 선택기.
 *
 * 네이티브 `<select>` 를 쓴다. 커스텀 드롭다운으로 만들면 17개 항목을 위한
 * 팝오버·키보드 순회·스크롤 가둠을 직접 구현해야 하고, 모바일에서는 OS 의
 * 휠 피커를 잃는다. `<select>` 는 그 전부를 공짜로 주고 번들도 늘리지 않는다.
 *
 * 선택은 **경로를 바꾼다**(쿠키만 세우지 않는다). 언어마다 URL 이 달라야
 * 검색엔진이 각 언어를 따로 수집하고 사용자가 링크를 공유할 수 있다.
 * 쿠키는 다음 방문에서 접두사 없는 주소로 들어왔을 때 판정에만 쓴다.
 *
 * 라벨은 그 언어 사용자가 읽는 이름이다 — 한국어 표기로 적으면 정작
 * 그 언어 사용자가 자기 언어를 못 찾는다.
 */
export function LocaleSwitcher({
  label,
  className,
}: {
  /** 스크린리더용 이름. 한국어 문자열이므로 content 에서 온다(A10) */
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const segments = pathname.split("/");
  const current = isLocale(segments[1] ?? "") ? segments[1]! : DEFAULT_LOCALE;

  function switchTo(next: string) {
    if (next === current) return;

    // 현재 보고 있는 페이지의 같은 자리로 간다. 홈으로 떨어뜨리면
    // 읽던 문서를 잃는다.
    const rest = segments.slice(2).join("/");
    const target = `/${next}${rest ? `/${rest}` : ""}`;

    // 다음 방문에 접두사 없이 들어와도 이 선택을 기억한다(proxy.ts 가 읽는다).
    // 1년, SameSite=Lax — 언어 취향은 민감정보가 아니고 CSRF 표면도 아니다.
    document.cookie = `devfirm_locale=${next}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => router.push(target));
  }

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Globe
        className="text-muted-foreground pointer-events-none absolute start-2.5 size-4"
        aria-hidden
      />
      <select
        aria-label={label}
        value={current}
        disabled={pending}
        onChange={(event) => switchTo(event.target.value)}
        className={cn(
          "border-input bg-background focus-visible:ring-ring h-9 cursor-pointer appearance-none",
          // 아이콘 자리를 논리 속성으로 비운다 — rtl(우르두어)에서 뒤집혀야 한다
          "rounded-md border ps-8 pe-7 text-sm",
          "focus-visible:ring-2 focus-visible:outline-none",
          pending && "opacity-60",
        )}
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.label}
          </option>
        ))}
      </select>
      {/* 기본 화살표를 지웠으므로 직접 그린다 */}
      <svg
        className="text-muted-foreground pointer-events-none absolute end-2.5 size-3"
        viewBox="0 0 12 12"
        aria-hidden
      >
        <path
          d="M2 4.5 6 8.5 10 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
