export type DocAiCategory =
  "all" | "legal" | "finance" | "operations" | "public" | "field";

export type DocAiPack = {
  id: string;
  category: Exclude<DocAiCategory, "all">;
  title: string;
  summary: string;
  files: string[];
  fields: string;
  output: string;
  tags: string[];
  featured?: boolean;
};

/**
 * DocAI 카탈로그 1차 콘텐츠.
 *
 * 실제 판매 범위가 확정되기 전까지는 정확도나 처리 속도처럼 환경에 따라 달라지는
 * 수치를 쓰지 않는다. 사용자가 비교할 수 있는 지원 형식·필드·산출물만 적는다.
 */
export const docAi = {
  seo: {
    title: "DocASI 카탈로그 — 업무별 문서 자동화",
    description:
      "계약서, 세금계산서, 회의록, 입찰공고, 현장 보고서를 읽고 구조화하는 DocASI(도카시) 문서팩을 업무별로 찾아보세요.",
  },
  hero: {
    eyebrow: "Superintelligence for Document Compliance",
    title: "문서를 올리면, 업무가 움직입니다",
    lead: "서류를 읽는 데서 멈추지 않습니다. 필요한 항목을 찾고, 서로 대조하고, 다음 업무가 시작될 수 있는 형태로 넘깁니다.",
    primary: { label: "문서팩 찾아보기", href: "#catalog" },
    secondary: { label: "우리 문서로 상담하기", href: "/contact" },
    preview: {
      label: "처리 중인 문서",
      fileName: "공급계약서_최종.pdf",
      status: "검수 준비 완료",
      fields: [
        { label: "계약 기간", value: "2026.09 — 2027.08" },
        { label: "자동 갱신", value: "30일 전 통지" },
        { label: "지급 조건", value: "검수 후 30일" },
      ],
    },
    stats: [
      { value: "8", label: "업무별 문서팩" },
      { value: "5", label: "실무 카테고리" },
      { value: "4", label: "연결 산출 형식" },
    ],
  },
  catalog: {
    id: "catalog",
    eyebrow: "DOC PACK CATALOG",
    title: "지금 처리하는 문서부터 고르세요",
    lead: "문서팩은 입력 형식, 추출 항목, 다음 시스템으로 넘길 산출물을 한 묶음으로 설계한 업무 단위입니다.",
    searchLabel: "문서팩 검색",
    searchPlaceholder: "문서명, 업무, 추출 항목 검색",
    clearSearch: "검색어 지우기",
    filterLabel: "업무 분야 필터",
    resultSuffix: "개의 문서팩",
    categories: [
      { key: "all", label: "전체" },
      { key: "legal", label: "계약·법무" },
      { key: "finance", label: "재무·증빙" },
      { key: "operations", label: "운영·인사" },
      { key: "public", label: "공공·입찰" },
      { key: "field", label: "현장·품질" },
    ] satisfies { key: DocAiCategory; label: string }[],
    featuredLabel: "추천",
    card: {
      fieldLabel: "설정 필드",
      outputLabel: "산출",
      action: "적용 범위 확인",
    },
    empty: {
      title: "조건에 맞는 문서팩이 없습니다",
      body: "검색어를 줄이거나 다른 업무 분야를 선택해 보세요.",
      reset: "필터 초기화",
    },
  },
  packs: [
    {
      id: "contract-review",
      category: "legal",
      title: "계약서 핵심조항 검토",
      summary:
        "계약 기간, 금액, 갱신, 해지, 손해배상 조항을 찾아 검수표로 정리합니다.",
      files: ["PDF", "DOCX", "HWP"],
      fields: "28개",
      output: "검수표 · 조항 요약",
      tags: ["위험 문구", "의무 기한", "조항 대조"],
      featured: true,
    },
    {
      id: "invoice-match",
      category: "finance",
      title: "세금계산서·거래명세 대조",
      summary:
        "공급가액, 세액, 품목, 거래처를 읽어 발주·입고 자료와 다른 지점을 표시합니다.",
      files: ["PDF", "JPG", "PNG"],
      fields: "24개",
      output: "대조표 · 예외 목록",
      tags: ["금액 검증", "거래처", "중복 탐지"],
      featured: true,
    },
    {
      id: "expense-evidence",
      category: "finance",
      title: "지출결의·영수증 정리",
      summary:
        "영수증과 결의서를 한 건으로 묶고 계정, 사용처, 일자, 금액을 표준 형식으로 만듭니다.",
      files: ["PDF", "JPG", "PNG"],
      fields: "18개",
      output: "XLSX · 회계 입력안",
      tags: ["증빙 묶음", "계정 추천", "누락 확인"],
    },
    {
      id: "resume-structure",
      category: "operations",
      title: "이력서·경력기술서 구조화",
      summary:
        "지원자마다 다른 양식에서 경력, 기술, 프로젝트, 학력을 같은 기준으로 정리합니다.",
      files: ["PDF", "DOCX", "HWP"],
      fields: "32개",
      output: "후보자 카드 · CSV",
      tags: ["경력 정규화", "기술 분류", "개인정보"],
    },
    {
      id: "meeting-actions",
      category: "operations",
      title: "회의록 액션아이템 추출",
      summary:
        "결정사항, 담당자, 기한, 보류 항목을 찾아 후속 업무 목록으로 바꿉니다.",
      files: ["DOCX", "HWP", "TXT"],
      fields: "16개",
      output: "업무 목록 · JSON",
      tags: ["결정사항", "담당자", "마감일"],
    },
    {
      id: "public-tender",
      category: "public",
      title: "입찰공고·제안요청서 분석",
      summary:
        "참가 자격, 제출 서류, 평가 기준, 일정을 찾아 제안 준비 체크리스트를 만듭니다.",
      files: ["PDF", "HWP", "XLSX"],
      fields: "36개",
      output: "일정표 · 제출 체크리스트",
      tags: ["자격 요건", "평가 기준", "제출 서류"],
      featured: true,
    },
    {
      id: "daily-site-report",
      category: "field",
      title: "건설 일일작업보고 정리",
      summary:
        "공종, 인원, 장비, 진척, 특이사항을 읽어 현장별 일일 현황으로 합칩니다.",
      files: ["PDF", "XLSX", "JPG"],
      fields: "30개",
      output: "일일 현황 · 누적표",
      tags: ["공정", "인원 장비", "특이사항"],
    },
    {
      id: "quality-certificate",
      category: "field",
      title: "검사성적서·품질문서 판독",
      summary:
        "시험 항목과 기준값, 측정값, 판정을 구조화하고 규격을 벗어난 건을 모읍니다.",
      files: ["PDF", "JPG", "PNG"],
      fields: "34개",
      output: "품질 이력 · 예외 목록",
      tags: ["시험값", "규격 대조", "LOT 추적"],
    },
  ] satisfies DocAiPack[],
  workflow: {
    eyebrow: "FROM FILE TO FLOW",
    title: "읽은 결과가 다음 업무로 이어집니다",
    lead: "문서마다 읽는 기준과 사람이 확인할 지점을 먼저 정합니다. 그다음 기존 업무 도구로 넘길 형식을 맞춥니다.",
    steps: [
      {
        step: "01",
        title: "문서 수집",
        desc: "메일, 폴더, 업무 시스템에서 원본과 메타데이터를 함께 받습니다.",
      },
      {
        step: "02",
        title: "항목 추출",
        desc: "문서팩의 필드 정의에 따라 필요한 값과 근거 위치를 찾습니다.",
      },
      {
        step: "03",
        title: "검수·대조",
        desc: "예외와 불확실한 항목만 사람이 확인할 수 있게 모읍니다.",
      },
      {
        step: "04",
        title: "업무 연결",
        desc: "XLSX, CSV, JSON 또는 API로 다음 시스템과 담당자에게 넘깁니다.",
      },
    ],
  },
  principles: {
    eyebrow: "OPERATION PRINCIPLES",
    title: "자동화보다 먼저 지키는 것",
    items: [
      {
        title: "원본과 근거를 함께",
        desc: "추출 값만 남기지 않고 어느 문서의 어느 위치에서 왔는지 연결합니다.",
      },
      {
        title: "예외는 숨기지 않게",
        desc: "판단이 모호하거나 서로 다른 값은 자동 확정하지 않고 검수 목록으로 보냅니다.",
      },
      {
        title: "기존 흐름 안으로",
        desc: "새 도구를 하나 더 배우게 하기보다 현재 쓰는 양식과 시스템에 맞춥니다.",
      },
    ],
  },
  download: {
    id: "download",
    eyebrow: "FREE DOWNLOAD",
    title: "지금 앱을 다운로드, 무료 버전 맛보기 체험 해 보세요.",
    lead: "리더용 허브 앱과 팀 멤버용 앱을 설치하면 무료 버전으로 바로 시작할 수 있습니다.",
    freeLabel: "무료 다운로드",
    specsLabel: "최소·권장 사양",
    apps: [
      {
        key: "mac",
        name: "DocASI HUB APP for Leader",
        platform: "macOS Universal",
        specs: [
          "macOS 11 Big Sur 이상 (Apple Silicon·Intel 공용)",
          "메모리 8GB 이상 (16GB 권장)",
          "디스크 여유 공간 2GB 이상",
          "인터넷 연결 필수",
        ],
      },
      {
        key: "win",
        name: "DocASI for Team Member",
        platform: "윈도우용",
        specs: [
          "Windows 10 64비트 또는 Windows 11 (x64)",
          "메모리 4GB 이상 (8GB 권장)",
          "디스크 여유 공간 1GB 이상",
          "인터넷 연결 필수",
        ],
      },
    ],
    notice: {
      title: "무료 버전·개발 버전 안내",
      items: [
        "무료 버전과 개발 버전은 예고 없는 업데이트로 앱이 꺼졌다 켜질 수 있습니다.",
        "무료 사용량에 따라 일부 기능이 제한될 수 있습니다.",
      ],
    },
  },
  cta: {
    title: "목록에 없는 문서도 문서팩으로 만들 수 있습니다",
    desc: "샘플 문서 3~5건과 지금 옮겨 적는 항목을 알려주시면 적용 범위를 먼저 정리해 드립니다.",
    primary: { label: "DocASI 도입 문의", href: "/contact" },
    secondary: { label: "최과장AI 보기", href: "/solutions/office-ai" },
  },
} as const;
