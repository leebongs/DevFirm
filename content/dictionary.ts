import { site } from "./site";
import { ui } from "./ui";
import { mainNav, footerNav, sectionNav, primaryCta } from "./navigation";
import { home } from "./home";
import { about } from "./about";
import { cic } from "./cic";
import { careersPage, jobs } from "./careers";

const { applySubject: _jobSubject, ...careersCopy } = careersPage;
import { solutions, physicalAi, officeAi, agentPage } from "./solutions";
import { docAi } from "./docai";
import { agents } from "./agents";
import { services, software, staffing } from "./services";
import { academy, SCHOOLS } from "./academy";
import { courses, coursesPage } from "./courses";
import { workspace } from "./workspace";
import { forms } from "./forms";

// 서버 액션 전용 함수를 떼어낸 폼 문구. 아래 dictionary 의 forms 주석 참고.
const { mailSubject: _contactSubject, ...contactCopy } = forms.contact;
const { mailSubject: _applySubject, ...applyCopy } = forms.apply;
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
  // applySubject 도 함수라 같은 이유로 뺀다(mailto 제목, 페이지가 직접 쓴다)
  careers: { page: careersCopy, jobs },
  solutions: { hub: solutions, physicalAi, officeAi, agentPage },
  // 문서팩 id·category·categories[].key 는 기계 키 — 번역 프롬프트와 체커가
  // 식별자 보존을 강제하고, 깨지면 해당 언어의 분야 필터가 빈 결과를 낸다.
  docai: docAi,
  agents,
  services: { hub: services, software, staffing },
  academy: { page: academy, schools: SCHOOLS },
  courses: { list: courses, page: coursesPage },
  workspace,
  /**
   * 폼 문구. **메일 제목 함수는 뺀다.**
   *
   * 두 가지 이유가 겹친다. 함수는 JSON 을 타지 못해 어차피 번역되지 않고
   * (회사로 오는 메일이라 한국어가 맞다), 폼 문구는 클라이언트 컴포넌트로
   * 넘어가는데 **함수는 서버→클라이언트 경계를 넘지 못해 빌드가 죽는다.**
   * 서버 액션은 content/forms.ts 에서 직접 가져다 쓴다.
   */
  forms: {
    contact: contactCopy,
    apply: applyCopy,
    // 검증 문구는 이미 16개 언어로 번역돼 있다. 액션이 아직 locale 을 받지
    // 않아 소비처는 없지만, 사전에서 빼면 extract 가 번역본을 고아로 만들어
    // check:i18n 이 초과 키로 실패한다.
    validation: forms.validation,
  },
  legal: { ui: legalUi, privacy, terms, updatedAt: legalUpdatedAt },
  seo: { home: homeSeo, page: pageSeo, ogImageAlt },
} as const;

/** 번역본이 맞춰야 하는 모양. 한국어 원문이 곧 스키마다. */
export type Dictionary = typeof dictionary;
