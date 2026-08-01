import { site } from "./site";
import { ui } from "./ui";
import { mainNav, footerNav, sectionNav, primaryCta } from "./navigation";
import { home } from "./home";
import { about } from "./about";
import { cic } from "./cic";
import { careersPage, jobs } from "./careers";
import { solutions, physicalAi, officeAi, agentPage } from "./solutions";
import { agents } from "./agents";
import { services, software, staffing } from "./services";
import { academy, SCHOOLS } from "./academy";
import { courses, coursesPage } from "./courses";
import { workspace } from "./workspace";
import { forms } from "./forms";
import { legalUi, privacy, terms, legalUpdatedAt } from "./legal";
import { homeSeo, pageSeo, ogImageAlt } from "./seo";

/**
 * 번역 대상 콘텐츠 전체를 한 객체로 모은다.
 *
 * 왜 모으는가: 언어별 번역 파일이 이 모양을 그대로 따르면 **키 대조가 기계
 * 판정이 된다.** 파일이 스무 개로 흩어져 있으면 어느 언어에서 무엇이 빠졌는지
 * 사람이 세어야 하고, 그러면 반드시 빠진다.
 *
 * 여기에 넣지 않는 것 — 번역 대상이 아니다:
 *   illustrations·photos   자산 경로와 치수. alt 만 번역 대상이라 별도로 뺀다.
 *   legacyRedirects        URL 매핑.
 *   agentBySlug            파생 조회 테이블.
 *   site.businessNumber 등 사업자정보. 법적 식별자라 번역하지 않는다.
 *
 * 한국어가 원문이자 타입 원천이다. 번역본은 이 구조의 부분집합일 수 있고,
 * 빠진 키는 `lib/i18n.ts` 가 한국어로 메운다.
 */
export const dictionary = {
  /** 회사 정보 중 **문장인 것만**. 주소·번호·이메일은 번역 대상이 아니다. */
  site: {
    nameKo: site.nameKo,
    legalName: site.legalName,
    footerBrand: site.footerBrand,
    brand: site.brand,
    tagline: site.tagline,
    addressFull: site.address.full,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
  },
  ui,
  nav: { mainNav, footerNav, sectionNav, primaryCta },
  home,
  about,
  cic,
  careers: { page: careersPage, jobs },
  solutions: { hub: solutions, physicalAi, officeAi, agentPage },
  agents,
  services: { hub: services, software, staffing },
  academy: { page: academy, schools: SCHOOLS },
  courses: { list: courses, page: coursesPage },
  workspace,
  forms,
  legal: { ui: legalUi, privacy, terms, updatedAt: legalUpdatedAt },
  seo: { home: homeSeo, page: pageSeo, ogImageAlt },
} as const;

/** 번역본이 맞춰야 하는 모양. 한국어 원문이 곧 스키마다. */
export type Dictionary = typeof dictionary;
