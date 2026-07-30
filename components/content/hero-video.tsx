"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 히어로 배경 영상.
 *
 * **LCP 를 지키는 방식**: 이 컴포넌트는 서버에서 아무것도 렌더하지 않는다.
 * 초기 HTML 에는 아래에 깔린 히어로 사진(AVIF 30KB)만 존재하므로 LCP 후보는
 * 그대로 사진이고, 영상은 하이드레이션 이후 그 위에 얹힌다.
 *
 * **로드하지 않는 조건** — 배경 영상은 장식이다. 비용을 치를 이유가 없는
 * 상황에서는 아예 내려받지 않는다:
 *   - lg 미만: 모바일 데이터로 수 MB 를 쓰지 않는다. 사진만으로 충분하다.
 *   - prefers-reduced-motion: 움직임에 민감한 사용자에게 자동 재생은 해롭다.
 *   - Save-Data / 2g·3g: 사용자가 이미 아끼겠다고 선언했다.
 * 어느 하나라도 해당하면 null 을 반환하고 사진이 그대로 남는다.
 *
 * `<source media>` 로 선언적으로 처리하지 않은 이유: 브라우저가 video 의
 * source 에서 media 속성을 신뢰성 있게 존중하지 않는다(picture 와 다르다).
 * 조건이 맞을 때만 요소를 만드는 편이 확실하다.
 */
export function HeroVideo({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    const calm = window.matchMedia("(prefers-reduced-motion: no-preference)");

    // 저속 회선·데이터 절약 모드에서는 받지 않는다
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const thrifty =
      conn?.saveData === true ||
      (conn?.effectiveType ? /2g/.test(conn.effectiveType) : false);

    const decide = () => setEnabled(wide.matches && calm.matches && !thrifty);
    decide();

    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  // 첫 프레임을 그릴 수 있을 때 페이드인한다. 바로 보이게 하면
  // 사진 → 검은 화면 → 영상 순으로 깜빡인다.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onReady = () => setVisible(true);
    el.addEventListener("canplay", onReady);
    if (el.readyState >= 3) onReady();
    return () => el.removeEventListener("canplay", onReady);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className={`h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
    >
      <source src="/video/hero.webm" type="video/webm" />
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
