/**
 * 회사 정보 단일 진실원천(§7).
 * 사업자정보·연락처를 여기 외의 곳에 적지 않는다.
 */
export const site = {
  name: "DevFirm",
  nameKo: "데브펌",
  legalName: "주식회사 씨엠닉스",
  legalNameEn: "CMNYX Inc.",
  brand: "컴퓨팅매니지먼트",
  tagline: "개발자들이 모인 개발법인, 데브펌",

  /**
   * 정규(canonical) 도메인 — O-6 결정에 따라 devfirm 신규 도메인이 최종 주소.
   *
   * TLD가 아직 미확정이므로(§10.1 실무 확인 항목) 값을 이 상수 하나로 격리한다.
   * Phase 5에서 도메인 확보 후 NEXT_PUBLIC_SITE_URL 을 설정하면 canonical·sitemap·
   * OG·메일 발송 도메인이 한 번에 전환된다. 미설정 시에는 현재 운영 중인
   * cmnyx.com 을 사용해 잘못된 절대 URL이 생성되지 않게 한다.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cmnyx.com",

  founded: 2007,
  businessNumber: "206-86-18591",
  address: {
    full: "서울특별시 서초구 강남대로6길 59-1 한양빌딩 2층",
    locality: "서초구",
    region: "서울특별시",
    country: "KR",
  },
  tel: "02-2058-0680",
  telHref: "tel:+82-2-2058-0680",
  /** 문의 수신 주소 — Phase 4 폼 발송 대상(O-1). 실제 주소 확정 전까지 대표 주소 사용 */
  email: "contact@cmnyx.com",
} as const;

export type Site = typeof site;
