import type { JobPost } from "./_types";

/**
 * 채용 공고(§5.4).
 *
 * O-7 결정에 따라 기존 사이트 문구 기반 초안이다. 오픈 전 검수 대상이며,
 * 마감일과 모집 상태는 실제 값으로 교체해야 한다.
 */
export const careersPage = {
  hero: {
    eyebrow: "채용",
    title: "함께 만들 개발자를 찾습니다",
    lead: "데브펌은 개발자가 개발에 집중할 수 있는 구조를 만드는 회사입니다. 그 구조를 함께 쓸 사람을 찾습니다.",
  },
  emptyState:
    "현재 모집 중인 공고가 없습니다. 상시 지원은 문의하기로 받습니다.",
  statusLabel: { open: "모집중", closed: "마감" },
  fields: {
    responsibilities: "담당업무",
    requirements: "자격요건",
    preferred: "우대사항",
    conditions: "근무조건",
    deadline: "마감",
    apply: "지원하기",
  },
  /** 공고 상세 페이지의 SEO 설명문(A9 고유 description) */
  seoDescription: (job: Pick<JobPost, "team" | "title" | "responsibilities">) =>
    `${job.team} 팀 ${job.title} 포지션을 모집합니다. ${job.responsibilities[0] ?? ""}`,
  /** 지원 메일 제목 */
  applySubject: (title: string) => `[지원] ${title}`,
  cta: {
    title: "맞는 공고가 없더라도",
    desc: "어떤 일을 하고 싶은지 알려주시면 자리를 함께 찾아봅니다. CIC 로 시작하는 방법도 있습니다.",
    primary: { label: "문의하기", href: "/contact" },
    secondary: { label: "CIC 알아보기", href: "/about/cic" },
  },
} as const;

export const jobs = [
  {
    slug: "ai-engineer",
    title: "AI 에이전트 엔지니어",
    team: "AI 솔루션",
    employmentType: "정규직",
    status: "open",
    deadline: "상시",
    responsibilities: [
      "산업별 AI 에이전트의 판독·추론 파이프라인 설계와 구현",
      "현장 데이터 수집 경로 정리와 품질 검증",
      "도입 현장에서의 정확도 튜닝과 운영 이슈 대응",
    ],
    requirements: [
      "Python 기반 데이터·모델 파이프라인 실무 경험 3년 이상",
      "실제 서비스에 모델을 올려 운영해 본 경험",
      "현장 담당자와 기준을 합의해 본 경험",
    ],
    preferred: [
      "영상 인식 또는 시계열 이상 탐지 경험",
      "제조·건설·물류 도메인 이해",
      "LLM 에이전트 구성 경험",
    ],
    conditions: [
      "서울 서초구 사무실 · 협의 가능",
      "주 5일, 유연 출퇴근",
      "장비와 학습비 지원",
    ],
  },
  {
    slug: "fullstack-developer",
    title: "풀스택 개발자",
    team: "개발 서비스",
    employmentType: "정규직",
    status: "open",
    deadline: "상시",
    responsibilities: [
      "고객사 웹·앱 서비스의 설계부터 배포까지",
      "기존 시스템 개선과 마이그레이션",
      "요구사항 정리 단계부터 참여",
    ],
    requirements: [
      "웹 서비스 개발 경험 3년 이상",
      "TypeScript 또는 동등한 정적 타입 언어 숙련",
      "직접 배포하고 운영해 본 경험",
    ],
    preferred: [
      "Next.js App Router 경험",
      "클라우드 인프라 구성 경험",
      "발주처와 직접 소통해 본 경험",
    ],
    conditions: [
      "서울 서초구 사무실 · 프로젝트에 따라 상주 가능",
      "주 5일, 유연 출퇴근",
      "공유오피스 이용 가능",
    ],
  },
  {
    slug: "cic-lead",
    title: "사내독립기업(CIC) 대표",
    team: "CIC",
    employmentType: "계약직",
    status: "open",
    deadline: "상시",
    responsibilities: [
      "담당 도메인의 사업 기획과 수주",
      "팀 구성과 프로젝트 운영",
      "도메인 에이전트 제품화 방향 설정",
    ],
    requirements: [
      "특정 도메인에서 스스로 일을 만들어 본 경험",
      "팀을 꾸려 프로젝트를 끝내 본 경험",
      "사업 성과에 책임을 지는 태도",
    ],
    preferred: [
      "기존 고객 네트워크 보유",
      "AI 도입 프로젝트 경험",
      "창업 또는 사업 운영 경험",
    ],
    conditions: [
      "성과 기반 정산 · 조건은 사업 성격에 따라 협의",
      "법인 신용과 백오피스 전면 지원",
      "근무 형태 자율",
    ],
  },
] satisfies JobPost[];
