import type { NavNode } from "./_types";

/**
 * IA 단일 진실원천(§2.2, ADR-002).
 *
 * 불변식(A14 단위 테스트로 고정):
 *  - 최상위 항목 ≤ 6
 *  - URL depth ≤ 3 (`/a/b/c` 까지)
 *
 * 동적 세그먼트(`/about/careers/[slug]`, `/academy/courses/[slug]`,
 * `/solutions/agents/[industry]`)는 여기 두지 않는다. 목록 페이지가 부모이고
 * 상세는 데이터에서 파생되므로 sitemap.ts 가 콘텐츠 배열에서 직접 생성한다.
 */
export const mainNav = [
  {
    label: "회사소개",
    href: "/about",
    description: "개발자들이 모인 개발법인이 일하는 방식",
    children: [
      {
        label: "데브펌이란",
        href: "/about",
        description: "로펌처럼 일하는 개발법인 모델",
      },
      {
        label: "사내독립기업(CIC)",
        href: "/about/cic",
        description: "개발자가 자기 사업을 운영하는 구조",
      },
      {
        label: "개발자 채용",
        href: "/about/careers",
        description: "현재 모집 중인 포지션",
      },
    ],
  },
  {
    label: "AI 솔루션",
    href: "/solutions",
    description: "산업현장엔 피지컬AI, 사무현장엔 최과장AI",
    children: [
      {
        label: "최과장AI",
        href: "/solutions/office-ai",
        description: "사무현장 반복업무를 대신하는 에이전트",
      },
      {
        label: "피지컬AI",
        href: "/solutions/physical-ai",
        description: "산업현장에서 보고 판단하는 에이전트",
      },
      {
        label: "건설공사 AI",
        href: "/solutions/agents/construction",
        description: "공정·안전·자재 관리 자동화",
      },
      {
        label: "콘텐츠 AI",
        href: "/solutions/agents/content",
        description: "기획·제작·후반작업 보조",
      },
      {
        label: "제조공정 AI",
        href: "/solutions/agents/manufacturing",
        description: "설비·품질·수율 모니터링",
      },
      {
        label: "유통관리 AI",
        href: "/solutions/agents/distribution",
        description: "재고·물류·수요예측",
      },
      {
        label: "용역서비스 AI",
        href: "/solutions/agents/service",
        description: "인력 배치·근태·정산",
      },
      {
        label: "범죄예방 AI",
        href: "/solutions/agents/safety",
        description: "영상 분석 기반 이상징후 감지",
      },
    ],
  },
  {
    label: "개발 서비스",
    href: "/services",
    description: "만드는 일과 사람을 함께 제공한다",
    children: [
      {
        label: "종합 소프트웨어 개발",
        href: "/services/software",
        description: "웹·앱·AI·시스템 구축",
      },
      {
        label: "개발 인재파견",
        href: "/services/staffing",
        description: "상주·원격·프로젝트 단위 투입",
      },
    ],
  },
  {
    label: "아카데미",
    href: "/academy",
    description: "NCS 커리큘럼 기반 프로젝트 학습(PBL)",
    children: [
      {
        label: "과정 안내",
        href: "/academy/courses",
        description: "3개 스쿨의 과정 목록",
      },
      {
        label: "수강 신청",
        href: "/academy/apply",
        description: "과정 지원서 접수",
      },
    ],
  },
  {
    label: "공유오피스",
    href: "/workspace",
    description: "포스트프로덕션 특화 개발자 업무공간",
  },
] satisfies NavNode[];

/** 헤더 우측 고정 CTA — mainNav 개수(≤6) 계산에 포함하지 않는다 */
export const primaryCta = {
  label: "문의하기",
  href: "/contact",
} satisfies NavNode;

export const footerNav = [
  {
    label: "회사",
    href: "/about",
    children: [
      { label: "데브펌이란", href: "/about" },
      { label: "사내독립기업(CIC)", href: "/about/cic" },
      { label: "개발자 채용", href: "/about/careers" },
    ],
  },
  {
    label: "AI 솔루션",
    href: "/solutions",
    children: [
      { label: "최과장AI", href: "/solutions/office-ai" },
      { label: "피지컬AI", href: "/solutions/physical-ai" },
      { label: "건설공사 AI", href: "/solutions/agents/construction" },
      { label: "콘텐츠 AI", href: "/solutions/agents/content" },
      { label: "제조공정 AI", href: "/solutions/agents/manufacturing" },
      { label: "유통관리 AI", href: "/solutions/agents/distribution" },
      { label: "용역서비스 AI", href: "/solutions/agents/service" },
      { label: "범죄예방 AI", href: "/solutions/agents/safety" },
    ],
  },
  {
    label: "서비스 · 교육",
    href: "/services",
    children: [
      { label: "종합 소프트웨어 개발", href: "/services/software" },
      { label: "개발 인재파견", href: "/services/staffing" },
      { label: "PBL 아카데미", href: "/academy" },
      { label: "과정 안내", href: "/academy/courses" },
      { label: "공유오피스", href: "/workspace" },
    ],
  },
  {
    label: "문의 · 약관",
    href: "/contact",
    children: [
      { label: "문의하기", href: "/contact" },
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "이용약관", href: "/terms" },
    ],
  },
] satisfies NavNode[];

/**
 * 섹션 로컬 내비(SectionNav)가 쓰는 형제 목록.
 * 최상위 경로 → 그 섹션에서 가로 탭으로 노출할 노드.
 *
 * mainNav 를 위치 인덱스가 아니라 href 로 조회해 파생시킨다.
 * 메뉴 순서를 바꿔도 깨지지 않고, 형제 목록의 출처가 mainNav 하나로 유지된다.
 */
export const sectionNav: Record<string, NavNode[]> = Object.fromEntries(
  mainNav
    .filter((node) => node.children && node.children.length > 0)
    .map((node) => [node.href, node.children ?? []]),
);
