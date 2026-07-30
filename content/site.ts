/**
 * 회사 정보 단일 진실원천(§7).
 * 사업자정보·연락처를 여기 외의 곳에 적지 않는다.
 */
export const site = {
  name: "DevFirm",
  nameKo: "데브펌",
  legalName: "주식회사 씨엠닉스",
  legalNameEn: "CMNYX Inc.",
  /**
   * 푸터에 크게 표시하는 이름.
   *
   * 법인명(legalName)과 분리해 둔다. 푸터에서는 사업 단위인 "데브펌 CIC"를
   * 앞세우지만, JSON-LD 의 Organization 과 사업자정보 고지는 법인명을 써야 한다.
   * 하나로 합치면 구조화 데이터에 사업 단위명이 들어가 버린다.
   */
  footerBrand: "데브펌 CIC",
  /** 사업자등록번호 아래에 병기하는 실제 사업자 */
  businessEntity: "CMNYX Inc. (주)씨엠닉스",
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
    postalCode: "06786",
    /**
     * 지도 좌표.
     *
     * 지도에 주소 문자열을 그대로 넘기면 "한양빌딩 2층" 때문에 지오코더가
     * 엉뚱한 상호에 핀을 꽂는다. 좌표를 박아 두면 어떤 지도 제공자를 쓰든
     * 같은 지점을 가리킨다. (출처: OpenStreetMap, 강남대로6길 59-1 / 06786)
     */
    geo: { lat: 37.4682917, lng: 127.0438563 },
  },
  tel: "02-2058-0680",
  telHref: "tel:+82-2-2058-0680",
  /** 문의 수신 주소 — Phase 4 폼 발송 대상(O-1) */
  email: "contact@devfirm.co",
} as const;

export type Site = typeof site;
