/** 개발 서비스(§5.9~5.11). */
export const services = {
  hero: {
    eyebrow: "개발 서비스",
    title: "만드는 일과 만드는 사람을 함께 제공합니다",
    lead: "프로젝트를 통째로 맡기셔도, 인력만 필요하셔도 됩니다. 계약 상대는 개인이 아니라 법인입니다.",
  },

  cards: [
    {
      title: "종합 소프트웨어 개발",
      desc: "요구사항 정리부터 배포·운영까지 맡습니다.",
      href: "/services/software",
      linkLabel: "개발 서비스 보기",
    },
    {
      title: "개발 인재파견 · 아웃소싱",
      desc: "상주·원격·프로젝트 단위로 개발자를 투입합니다.",
      href: "/services/staffing",
      linkLabel: "인재파견 보기",
    },
  ],

  collaboration: {
    id: "collaboration",
    eyebrow: "협업 방식",
    title: "발주처의 관리 부담을 줄이는 쪽으로",
    items: [
      {
        title: "단일 창구",
        desc: "여러 개발자와 각각 소통하지 않습니다. 담당 창구 하나로 정리합니다.",
      },
      {
        title: "법인 계약",
        desc: "계약·세금계산서·하자보수 책임을 법인이 집니다.",
      },
      {
        title: "인수인계 문서",
        desc: "프로젝트 종료 시 운영에 필요한 문서를 함께 넘깁니다.",
      },
    ],
  },

  domains: {
    id: "domains",
    eyebrow: "기술 영역",
    title: "다루는 범위",
    items: [
      "웹 서비스 · 관리자 시스템",
      "모바일 앱",
      "AI 에이전트 · 데이터 파이프라인",
      "사내 시스템 연동 · 마이그레이션",
    ],
  },

  cta: {
    title: "어떤 형태가 맞을지 모르시겠다면",
    desc: "상황을 알려주시면 통으로 맡기는 게 나을지, 인력만 붙이는 게 나을지부터 정리해 드립니다.",
    primary: { label: "문의하기", href: "/contact" },
  },
} as const;

export const software = {
  hero: {
    eyebrow: "종합 소프트웨어 개발",
    title: "요구사항 정리부터 운영까지",
    lead: "무엇을 만들지 정하는 단계부터 참여합니다. 만들고 끝나는 것이 아니라 넘길 수 있는 상태로 마칩니다.",
  },
  areas: {
    id: "areas",
    eyebrow: "개발 영역",
    title: "네 가지 영역",
    items: [
      {
        title: "웹 서비스",
        desc: "고객용 서비스와 내부 관리자 시스템을 함께 설계합니다.",
      },
      {
        title: "모바일 앱",
        desc: "필요한 범위에 따라 네이티브와 크로스플랫폼을 고릅니다.",
      },
      {
        title: "AI · 데이터",
        desc: "판단이 필요한 지점에 에이전트를 붙이고 데이터 흐름을 정리합니다.",
      },
      {
        title: "시스템 연동",
        desc: "이미 쓰고 있는 시스템과 끊기지 않게 잇습니다.",
      },
    ],
  },
  process: {
    id: "process",
    eyebrow: "진행 프로세스",
    title: "다섯 단계",
    steps: [
      "요구사항 정리",
      "범위·일정 확정",
      "설계 · 개발",
      "검수 · 배포",
      "인수인계 · 운영",
    ],
  },
  quality: {
    id: "quality",
    eyebrow: "산출물 · 품질 기준",
    title: "무엇을 받게 되는지 미리 정합니다",
    items: [
      "소스코드와 저장소 접근 권한",
      "배포 절차 문서와 실행 가능한 배포 스크립트",
      "API 명세와 데이터 구조 문서",
      "인수인계 회의와 운영 담당자 교육",
    ],
    note: "품질 기준은 계약 전에 문서로 합의합니다. 검수 시점에 서로 다른 기준을 꺼내는 일을 막기 위해서입니다.",
  },
  cta: {
    title: "만들 것이 정해지지 않아도 됩니다",
    desc: "해결하고 싶은 문제만 알려주시면 범위부터 함께 좁힙니다.",
    primary: { label: "문의하기", href: "/contact" },
  },
} as const;

export const staffing = {
  hero: {
    eyebrow: "인재파견 · 아웃소싱",
    title: "개발자를 붙이되, 관리는 법인이 합니다",
    lead: "인력이 필요한 기간만큼 투입합니다. 계약과 노무는 데브펌이 처리합니다.",
  },
  difference: {
    id: "difference",
    eyebrow: "차이",
    title: "프리랜서 직접 계약과 무엇이 다른가",
    lead: "발주처가 개인과 직접 계약할 때 생기는 위험을 법인이 흡수합니다.",
    items: [
      {
        title: "계약 주체가 법인",
        desc: "중도 이탈이나 분쟁 시 법인이 책임지고 대체 인력을 투입합니다.",
      },
      {
        title: "세무·노무 처리",
        desc: "원천징수와 4대보험 판단을 발주처가 하지 않습니다.",
      },
      {
        title: "검증된 인력 풀",
        desc: "함께 프로젝트를 해 본 개발자 중에서 배정합니다.",
      },
      {
        title: "백오피스 지원",
        desc: "투입 개발자의 정산·근태를 데브펌 경영지원부가 관리합니다.",
      },
    ],
  },
  formats: {
    id: "formats",
    eyebrow: "투입 형태",
    title: "세 가지 중에서 고릅니다",
    items: [
      {
        title: "상주",
        desc: "발주처 사무실에 출근해 팀에 합류합니다.",
      },
      {
        title: "원격",
        desc: "데브펌 사무실이나 공유오피스에서 작업합니다.",
      },
      {
        title: "프로젝트 단위",
        desc: "기간과 산출물을 정해 결과로 정산합니다.",
      },
    ],
  },
  process: {
    id: "process",
    eyebrow: "진행 절차",
    title: "네 단계",
    steps: ["필요 역량 정리", "후보 제안", "인터뷰 · 확정", "투입 · 정기 점검"],
  },
  cta: {
    title: "필요한 역량을 알려주세요",
    desc: "기간과 투입 형태에 맞춰 후보를 정리해 드립니다.",
    primary: { label: "문의하기", href: "/contact" },
  },
} as const;
