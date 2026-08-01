"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";
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

  /** 같은 언어를 두 번 당기지 않는다 */
  const prefetched = useRef<Set<string>>(new Set());

  /**
   * 드롭다운에 손이 닿으면 다른 언어판을 미리 당겨온다.
   *
   * 17개 언어판이 전부 빌드 시점에 굳어 있으므로 전환은 원래도 전체
   * 새로고침이 아니라 RSC 페이로드 교체다. 그래도 그 페이로드를 **고르기 전에**
   * 받아두면 선택하는 순간 이미 손에 있다 — 체감이 즉시 전환과 같아진다.
   *
   * 여는 동작(포인터 진입·포커스)에 걸어야 의미가 있다. 첫 렌더에 17개를
   * 전부 당기면 언어를 바꿀 생각도 없는 방문자에게 16개 언어판을 떠넘기는
   * 꼴이고, 그건 URL 방식을 택한 이유를 스스로 무너뜨린다.
   */
  const warm = useCallback(() => {
    const rest = segments.slice(2).join("/");
    for (const locale of locales) {
      if (locale.code === current || prefetched.current.has(locale.code))
        continue;
      prefetched.current.add(locale.code);
      router.prefetch(`/${locale.code}${rest ? `/${rest}` : ""}`);
    }
  }, [current, router, segments]);

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
    <div
      className={cn("relative inline-flex items-center", className)}
      onPointerEnter={warm}
      onFocusCapture={warm}
    >
      <Globe
        className="text-muted-foreground pointer-events-none absolute start-2.5 size-4"
        aria-hidden
      />
      <select
        aria-label={label}
        value={current}
        disabled={pending}
        onPointerDown={warm}
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
