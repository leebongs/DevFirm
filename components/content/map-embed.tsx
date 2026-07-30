import { site } from "@/content/site";

/**
 * 실제 지도 임베드.
 *
 * O-4 에서는 성능을 이유로 지도를 넣지 않고 링크만 걸었다. 그 결정을 뒤집되
 * 성능 근거는 유지한다:
 *
 *  - `loading="lazy"` 로 뷰포트에 들어올 때까지 요청 자체가 나가지 않는다.
 *    지도는 contact·workspace 두 페이지의 하단에만 있어 초기 로드에 잡히지 않는다.
 *  - 비율을 CSS 로 고정해 iframe 이 늦게 채워져도 CLS 가 0 이다.
 *  - iframe 이라 서드파티 스크립트가 **우리 문서의 메인 스레드에 올라오지 않는다.**
 *    Kakao/Naver 처럼 페이지에 SDK `<script>` 를 심는 방식이었다면 TBT 가 흔들린다.
 *
 * 왜 Google 인가: 키 없이 동작하는 유일한 선택지다. Kakao·Naver 지도는 각각
 * JavaScript 앱키를 발급받아 도메인을 등록해야 하고, 키는 클라이언트에 노출되므로
 * 도메인 화이트리스트 설정까지 끝나야 운영에 올릴 수 있다. 키가 준비되면
 * 이 컴포넌트의 `src` 만 교체하면 된다 — 호출부는 그대로다.
 */
export function MapEmbed({
  /** iframe 은 접근성 이름이 없으면 스크린리더에서 "프레임"으로만 읽힌다 */
  title,
  zoom = 17,
  className,
}: {
  title: string;
  zoom?: number;
  className?: string;
}) {
  const { lat, lng } = site.address.geo;
  // 주소 문자열이 아니라 좌표로 찍는다 — 이유는 content/site.ts 의 geo 주석 참고
  const src =
    `https://www.google.com/maps?q=${lat},${lng}` +
    `&z=${zoom}&hl=ko&output=embed`;

  return (
    <div className={className}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        // 지도는 위치 권한도 결제도 필요 없다. 기본값으로 열어 둘 이유가 없다.
        allow=""
        referrerPolicy="no-referrer-when-downgrade"
        className="bg-muted/40 block aspect-[4/3] w-full border-0"
      />
    </div>
  );
}
