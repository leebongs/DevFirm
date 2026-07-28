import { cn } from "@/lib/utils";

/**
 * 자체 제작 SVG 일러스트 렌더러.
 *
 * `next/image` 를 쓰지 않는다. SVG 는 최적화할 래스터가 없고, next/image 로
 * 통과시키려면 `dangerouslyAllowSVG` 를 켜야 하는데 그 스위치는 신뢰할 수 없는
 * 외부 SVG 를 다룰 때의 위험을 감수하겠다는 선언이다. 자체 자산에는 불필요하다.
 *
 * 대신 이 래퍼가 두 가지를 강제한다:
 *   1. width/height 필수 → 브라우저가 종횡비를 미리 알아 CLS 가 0 이 된다.
 *   2. alt 또는 decorative 둘 중 하나 필수 → axe 위반(A5)을 타입 단계에서 막는다.
 */
type Base = {
  src: string;
  /** SVG 의 viewBox 와 같은 값. 실제 표시 크기는 CSS 가 정한다. */
  width: number;
  height: number;
  className?: string;
  /** 접힘 위 첫 화면에 보이는 이미지에만 준다 */
  priority?: boolean;
};

type Props = Base &
  (
    | { alt: string; decorative?: false }
    /** 옆의 텍스트가 이미 같은 내용을 말하는 장식용 */
    | { decorative: true; alt?: never }
  );

export function Illustration({
  src,
  width,
  height,
  className,
  priority,
  ...rest
}: Props) {
  const decorative = "decorative" in rest && rest.decorative === true;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- 위 주석 참조: 정적 SVG 는 최적화 대상이 아니다
    <img
      src={src}
      width={width}
      height={height}
      alt={decorative ? "" : ((rest as { alt: string }).alt ?? "")}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("h-auto w-full", className)}
    />
  );
}
