/** AI 솔루션 허브와 두 축 페이지(§5.5~5.7). */
export const solutions = {
  hero: {
    eyebrow: "AI 솔루션",
    title: "산업현장엔 피지컬AI, 사무현장엔 최과장AI",
    lead: "현장이 다르면 필요한 판단도 다릅니다. 데브펌은 두 축으로 나눠 접근합니다.",
  },

  axes: [
    {
      eyebrow: "산업현장",
      name: "피지컬AI",
      desc: "카메라와 센서가 읽은 현장을 사람이 쓸 수 있는 판단으로 바꿉니다.",
      href: "/solutions/physical-ai",
      linkLabel: "피지컬AI 보기",
    },
    {
      eyebrow: "사무현장",
      name: "최과장AI",
      desc: "문서를 읽고 정리하고 보고서를 쓰는 반복 업무를 대신합니다.",
      href: "/solutions/office-ai",
      linkLabel: "최과장AI 보기",
    },
  ],

  agentsSection: {
    id: "agents",
    eyebrow: "산업별 에이전트",
    title: "여섯 개 산업, 여섯 가지 판단",
    lead: "같은 기반 위에 산업별 판단 기준을 얹었습니다. 현장의 언어로 말하는 에이전트가 됩니다.",
  },

  process: {
    id: "process",
    eyebrow: "도입 프로세스",
    title: "네 단계로 시작합니다",
    steps: [
      "현황 진단 · 데이터 점검",
      "판단 기준 합의",
      "시범 적용 4~8주",
      "운영 전환 · 확대",
    ],
  },

  faq: {
    id: "faq",
    eyebrow: "자주 묻는 질문",
    title: "도입 전에 많이 묻는 것들",
    items: [
      {
        q: "데이터가 정리되어 있지 않은데 시작할 수 있나요?",
        a: "대부분의 현장이 그렇습니다. 첫 단계가 데이터 점검인 이유입니다. 지금 쌓이고 있는 것만으로 어디까지 가능한지 먼저 확인하고, 부족한 부분은 수집 경로부터 만듭니다.",
      },
      {
        q: "얼마나 정확한가요?",
        a: "현장과 판단 항목에 따라 다릅니다. 그래서 계약 전에 시범 적용 구간을 두고 실제 데이터로 측정합니다. 목표 수치는 그 결과를 보고 함께 정합니다.",
      },
      {
        q: "기존 시스템을 바꿔야 하나요?",
        a: "대부분 바꾸지 않습니다. 기존 시스템에서 데이터를 읽고 결과를 돌려주는 형태로 붙입니다. 교체가 필요한 경우에는 그 이유를 먼저 설명드립니다.",
      },
      {
        q: "도입 후 운영은 누가 하나요?",
        a: "초기에는 데브펌이 맡고, 판단 기준이 안정되면 담당자에게 넘깁니다. 운영을 계속 위탁하는 방식도 가능합니다.",
      },
    ],
  },

  cta: {
    title: "어떤 판단을 자동화할지부터 함께 정합니다",
    desc: "현재 현장에서 사람이 반복하고 있는 판단을 알려주세요.",
    primary: { label: "문의하기", href: "/contact" },
  },
} as const;

/** 산업별 에이전트 상세 템플릿의 섹션 라벨(§5.8). 6개 페이지가 공유한다. */
export const agentPage = {
  problems: {
    id: "problems",
    eyebrow: "현장의 문제",
    title: "지금 이렇게 하고 계실 겁니다",
  },
  capabilities: {
    id: "capabilities",
    eyebrow: "하는 일",
    title: "에이전트가 맡는 부분",
  },
  outcomes: {
    id: "outcomes",
    eyebrow: "기대 효과",
    title: "무엇이 달라지나",
    note: "시범 적용 구간에서 실제 데이터로 측정한 뒤 목표치를 다시 정합니다.",
  },
  steps: {
    id: "steps",
    eyebrow: "도입 흐름",
    title: "네 단계로 들어갑니다",
  },
  siblings: {
    id: "siblings",
    eyebrow: "다른 산업",
    title: "다른 현장은 이렇게 씁니다",
  },
  cta: {
    title: "우리 현장에도 되는지 확인해 보세요",
    desc: "지금 쌓이고 있는 데이터만으로 어디까지 가능한지 먼저 봐 드립니다.",
    primary: { label: "문의하기", href: "/contact" },
    secondary: { label: "AI 솔루션 전체 보기", href: "/solutions" },
  },
} as const;

export const officeAi = {
  hero: {
    eyebrow: "최과장AI",
    title: "사무실의 반복은 사람이 할 일이 아닙니다",
    lead: "받은 문서를 읽고, 정리하고, 양식에 옮기고, 보고서를 쓰는 일. 최과장AI가 맡습니다.",
  },
  problem: {
    id: "problem",
    eyebrow: "문제",
    title: "정작 판단할 시간이 없습니다",
    items: [
      {
        title: "옮겨 적는 일",
        desc: "메일과 첨부에 온 내용을 사내 양식에 다시 입력합니다.",
      },
      {
        title: "찾아보는 일",
        desc: "지난 문서를 뒤져 근거를 확인하는 데 시간이 갑니다.",
      },
      {
        title: "맞춰보는 일",
        desc: "숫자가 맞는지 문서끼리 대조합니다.",
      },
      {
        title: "정리해 올리는 일",
        desc: "같은 내용을 보고 대상에 따라 다시 씁니다.",
      },
    ],
  },
  capabilities: {
    id: "capabilities",
    eyebrow: "하는 일",
    title: "문서에서 시작해 보고까지",
    items: [
      {
        title: "문서 판독",
        desc: "계약서·거래명세서·견적서에서 필요한 항목을 뽑아냅니다.",
      },
      {
        title: "사내 양식 작성",
        desc: "뽑아낸 항목을 회사 양식에 맞춰 채웁니다.",
      },
      {
        title: "근거 검색",
        desc: "지난 문서에서 관련 내용을 찾아 출처와 함께 제시합니다.",
      },
      {
        title: "대조 점검",
        desc: "문서 간 숫자와 조건이 어긋나는 지점을 짚어냅니다.",
      },
      {
        title: "보고서 초안",
        desc: "보고 대상에 맞춘 요약본을 만듭니다.",
      },
      {
        title: "후속 알림",
        desc: "기한이 다가온 건과 빠진 건을 챙깁니다.",
      },
    ],
  },
  physical: {
    id: "physical",
    eyebrow: "피지컬AI 접목",
    title: "사무와 현장이 끊기지 않게",
    lead: "현장에서 피지컬AI가 읽은 내용이 최과장AI의 보고서로 이어집니다. 현장 사진 한 장이 결재 문서까지 가는 경로를 하나로 만듭니다.",
  },
  cta: {
    title: "어떤 문서부터 맡길지 정해봅시다",
    desc: "가장 자주 처리하는 문서 한 종류만 알려주시면 됩니다.",
    primary: { label: "문의하기", href: "/contact" },
    secondary: { label: "산업별 에이전트 보기", href: "/solutions" },
  },
} as const;

export const physicalAi = {
  hero: {
    eyebrow: "피지컬AI",
    title: "현장을 읽는 눈을 붙입니다",
    lead: "사람이 계속 지켜볼 수 없는 것을 대신 봅니다. 본 것을 기록이 아니라 판단으로 남깁니다.",
  },
  problem: {
    id: "problem",
    eyebrow: "문제",
    title: "현장의 정보는 대부분 지나갑니다",
    items: [
      {
        title: "다 볼 수 없습니다",
        desc: "카메라는 많은데 보는 사람은 한정되어 있습니다.",
      },
      {
        title: "지나면 못 찾습니다",
        desc: "확인이 필요할 때 영상을 되감는 데 시간이 걸립니다.",
      },
      {
        title: "기준이 다릅니다",
        desc: "같은 장면을 보고도 담당자마다 다르게 판단합니다.",
      },
    ],
  },
  stack: {
    id: "stack",
    eyebrow: "기술 역량",
    title: "읽고, 판단하고, 넘깁니다",
    items: [
      {
        title: "영상 인식",
        desc: "사람·장비·상태를 구분하고 위험 패턴을 찾습니다.",
      },
      {
        title: "센서 시계열 분석",
        desc: "평소와 다른 흐름을 이상 신호로 잡아냅니다.",
      },
      {
        title: "현장 엣지 처리",
        desc: "네트워크가 불안정한 현장에서도 로컬에서 판단합니다.",
      },
      {
        title: "업무 시스템 연동",
        desc: "판단 결과를 결재·보고 흐름으로 넘깁니다.",
      },
    ],
  },
  industries: {
    id: "industries",
    eyebrow: "적용 산업",
    title: "여섯 개 현장에 들어가 있습니다",
  },
  cta: {
    title: "현장 한 곳부터 시작합니다",
    desc: "카메라와 센서가 이미 있다면 그것부터 씁니다.",
    primary: { label: "문의하기", href: "/contact" },
    secondary: { label: "최과장AI 보기", href: "/solutions/office-ai" },
  },
} as const;
