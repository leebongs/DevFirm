/**
 * 사진 자산 레지스트리.
 *
 * 일러스트(content/illustrations.ts)와 분리한 이유: 사진은 래스터라
 * 포맷 폴백(avif → webp)과 원본 픽셀 치수를 함께 들고 다녀야 하고,
 * 교체 주기도 다르다(O-2 에 따라 실사진이 확보되면 이 파일만 갈아끼운다).
 *
 * 치수는 scripts/optimize-photos.mjs 가 출력한 실제 값이다. 틀리면 CLS 가 난다.
 */
export type PhotoAsset = {
  /** 확장자 없는 기준 경로. Photo 컴포넌트가 .avif/.webp 를 붙인다. */
  base: string;
  width: number;
  height: number;
  alt?: string;
};

export const photos = {
  /** 홈 히어로 전면 배경. 좌측 1/3 이 의도적으로 비어 있어 헤드라인이 앉는다. */
  heroOffice: {
    base: "/images/photo/hero-office",
    width: 2400,
    height: 1018,
  },

  aboutTeam: {
    base: "/images/photo/about-team",
    width: 1600,
    height: 1073,
    alt: "개발자들이 벽면 디스플레이 앞에 모여 시스템 구조를 논의하는 모습",
  },
  aboutSpace: {
    base: "/images/photo/about-space",
    width: 1600,
    height: 1073,
    alt: "큰 창으로 자연광이 들어오는 정돈된 사무 공간",
  },
  aboutBackoffice: {
    base: "/images/photo/about-backoffice",
    width: 1600,
    height: 1073,
    alt: "책상 위 서류와 노트북을 놓고 계약 문서를 검토하는 모습",
  },

  /**
   * 페이지 히어로 배너 8종.
   *
   * 전부 21:9 로 생성해 2400×1018 로 굽는다. 히어로는 전폭으로 깔리므로
   * 세로가 짧아야 스크롤 없이 제목과 함께 잡힌다.
   *
   * alt 를 주지 않는 것은 의도다 — 배경 장식이고, 그 자리의 의미는 바로 위
   * h1 이 이미 말한다. alt 를 채우면 스크린리더가 제목을 두 번 읽는 꼴이 된다.
   */
  aboutHero: { base: "/images/photo/about-hero", width: 2400, height: 1018 },
  solutionsHero: {
    base: "/images/photo/solutions-hero",
    width: 2400,
    height: 1018,
  },
  servicesHero: {
    base: "/images/photo/services-hero",
    width: 2400,
    height: 1018,
  },
  servicesSoftwareHero: {
    base: "/images/photo/services-software-hero",
    width: 2400,
    height: 1018,
  },
  servicesStaffingHero: {
    base: "/images/photo/services-staffing-hero",
    width: 2400,
    height: 1018,
  },
  academyHero: {
    base: "/images/photo/academy-hero",
    width: 2400,
    height: 1018,
  },
  workspaceHero: {
    base: "/images/photo/workspace-hero",
    width: 2400,
    height: 1018,
  },
  contactHero: {
    base: "/images/photo/contact-hero",
    width: 2400,
    height: 1018,
  },

  /**
   * 아카데미 학습 장면. 사이트에서 학습자가 찍힌 유일한 사진이다 —
   * 나머지 13장은 전부 사무·산업·시설이라 개인 수강생이 자기를 대입할 그림이 없었다.
   */
  academyProject: {
    base: "/images/photo/academy-project",
    width: 1600,
    height: 1073,
    alt: "학습자들이 화면과 벽면 메모를 보며 프로젝트 역할을 나누는 스튜디오",
  },

  solutionsIndustrial: {
    base: "/images/photo/solutions-industrial",
    width: 1600,
    height: 1073,
    alt: "생산 라인 위에 설치된 검사 카메라가 공정을 내려다보는 산업 현장",
  },
  solutionsDesk: {
    base: "/images/photo/solutions-desk",
    width: 1600,
    height: 1073,
    alt: "모니터에 지표 대시보드가 떠 있는 사무 책상과 정리된 서류 더미",
  },
} as const satisfies Record<string, PhotoAsset>;
