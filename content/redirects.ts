/**
 * 기존 → 신규 경로 매핑(§2.3).
 *
 * 이 표가 곧 A4 테스트 케이스다. 항목을 추가하면 테스트가 자동으로 늘어난다.
 * 리다이렉트 누락은 기존 검색 유입을 그대로 잃는 일이라 표와 검증을
 * 한 파일에서 파생시킨다.
 *
 * `permanent: true` 는 **308** 을 낸다(301 아님, §12.1 D-2).
 * 308 은 메서드를 보존하는 영구 리다이렉트로 검색엔진은 301과 동등하게 다룬다.
 */
export const legacyRedirects = [
  { from: "/welcome", to: "/about" },
  { from: "/development-in-company", to: "/about/cic" },
  { from: "/requests", to: "/about/careers" },
  { from: "/ai-agent", to: "/solutions" },
  { from: "/construction-ai", to: "/solutions/agents/construction" },
  { from: "/contentai-agent", to: "/solutions/agents/content" },
  { from: "/solution-development", to: "/services/software" },
  { from: "/computing-academy", to: "/academy" },
  // /solution-academy 는 /computing-academy 와 중복이었다. 과정 목록으로 병합한다.
  { from: "/solution-academy", to: "/academy/courses" },
  { from: "/academy-application", to: "/academy/apply" },
  { from: "/shared-office", to: "/workspace" },
  // DocASI 리브랜딩(2026-10): 구 DocAI 경로. 시작 안내 구 URL은 배포된 앱 초대 메일에도 박혀 있다.
  { from: "/solutions/docai", to: "/solutions/docasi" },
  { from: "/solutions/docai/start", to: "/solutions/docasi/start" },
] as const;
