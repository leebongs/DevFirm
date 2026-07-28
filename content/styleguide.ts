/**
 * /styleguide 전용 샘플 텍스트.
 *
 * 한국어 조판(A13)을 눈으로 확인하려면 실제 한국어 문장이 필요한데,
 * 컴포넌트에 직접 쓰면 A10 위반이다. 검증용 픽스처를 여기 둔다.
 */
export const styleguideSamples = {
  display: "개발자들이 모인 개발법인, 데브펌",
  heading: "산업현장엔 피지컬AI, 사무현장엔 최과장AI",
  body: "데브펌은 개발자가 자기 이름으로 일할 수 있는 구조를 만듭니다. 경영지원부가 계약과 정산을 맡고, 개발자는 만드는 일에 집중합니다. 로펌의 변호사가 사건에 집중하듯이.",
  /** word-break: keep-all 검증 — 단어 중간에서 줄이 바뀌면 안 된다 */
  keepAll:
    "프로젝트기반학습으로 진행되는 솔루션개발스쿨은 현업에서 바로 쓰이는 결과물을 만들어냅니다.",
  /** overflow-wrap: anywhere 검증 — 긴 URL 이 컨테이너를 넘으면 안 된다 */
  longUrl:
    "https://www.example.com/very/long/path/that/should/not/overflow/the/container/at/320px/width",
  /** 한영 혼용 검증 */
  mixed:
    "Next.js App Router와 React Server Components 기반으로 SSG 렌더링하며 Lighthouse 95점을 목표로 합니다.",
} as const;
