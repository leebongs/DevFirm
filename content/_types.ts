import type { LucideIcon } from "lucide-react";

/**
 * 내비게이션 노드 — IA의 단일 진실원천(§6.5).
 *
 * 소비처: SiteHeader / MegaMenu / MobileNavDrawer / SectionNav / Breadcrumb /
 * SiteFooter / app/sitemap.ts. 이 목록 밖에서 경로 문자열을 하드코딩하지 않는다.
 */
export type NavNode = {
  /** 메뉴에 노출되는 라벨 (한국어) */
  label: string;
  /** 내부 경로('/about') 또는 외부 URL('https://...') */
  href: string;
  /** 메가메뉴·드로어·SectionNav 에서 쓰는 1줄 설명 */
  description?: string;
  /** 하위 노드. depth ≤ 3 강제(A14 단위 테스트) */
  children?: NavNode[];
  /** true 면 target=_blank + rel=noopener + 외부 아이콘 */
  external?: boolean;
  /** sitemap.ts 제외 여부 (예: /styleguide) */
  excludeFromSitemap?: boolean;
};

/** 산업별 AI 에이전트 6종 — 단일 템플릿에 주입되는 데이터(§5.8) */
export type IndustryAgentSlug =
  | "construction"
  | "content"
  | "manufacturing"
  | "distribution"
  | "service"
  | "safety";

export type IndustryAgent = {
  slug: IndustryAgentSlug;
  name: string;
  tagline: string;
  icon: LucideIcon;
  /** 현장의 문제 3항목 */
  problems: string[];
  /** AI 에이전트가 하는 일 4~6 */
  capabilities: { title: string; desc: string }[];
  /** 기대 효과 지표 3 */
  outcomes: { label: string; value: string }[];
  /** 도입 흐름 4스텝 */
  steps: string[];
  seo: { title: string; description: string };
};

/** 아카데미 과정(§5.13) */
export type Course = {
  slug: string;
  school: "solution" | "office" | "project";
  title: string;
  summary: string;
  duration: string;
  capacity: string;
  target: string[];
  prerequisites: string[];
  curriculum: { week: string; topic: string; detail: string }[];
  outcomes: string[];
  careers: string[];
};

/** 채용 공고(§5.4) */
export type JobPost = {
  slug: string;
  title: string;
  team: string;
  employmentType: "정규직" | "계약직" | "인턴" | "프리랜서";
  status: "open" | "closed";
  deadline: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  conditions: string[];
};

/** 페이지 공통 SEO 입력 */
export type PageSeo = {
  title: string;
  description: string;
};
