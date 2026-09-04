export const constructionAiCatalog = {
  section: {
    id: "construction-ai-catalog",
    eyebrow: "건설 특화 AI 업무 카탈로그",
    title: "계약부터 준공까지, 공사업무의 근거를 한 흐름으로 연결합니다",
    lead: "흩어진 계약서, 설계도서, 공정표와 현장 기록을 업무 기준에 맞춰 대조하고, 담당자가 확인할 근거와 보완사항을 구조화합니다.",
  },
  viewpointsLabel: "다섯 가지 검토 관점",
  viewpoints: ["비용 보전", "안전 확보", "손실 방지", "효율 향상", "법리 안정"],
  areasLabel: "지원하는 아홉 가지 공사업무",
  evidenceLabel: "함께 연결하는 근거",
  areas: [
    {
      icon: "contract",
      title: "도급계약·법적 리스크",
      description:
        "계약 조항과 표준양식을 대조해 권리·의무, 분쟁 쟁점과 대응 근거 정리를 지원합니다.",
      evidence: "도급계약서 · 특수조건 · 표준양식 · 관련 법규",
    },
    {
      icon: "change",
      title: "설계변경·추가 공사비",
      description:
        "설계도서 불일치, 현장 조건 차이와 내역 누락을 추적하고 변경 승인 검토용 증빙을 연결합니다.",
      evidence: "설계도서 · 내역서 · 지시서 · 현장 기록",
    },
    {
      icon: "price",
      title: "물가변동(ESC)·계약금액",
      description:
        "지수조정과 단품슬라이딩 검토에 필요한 비목군, 지수, 조정 시점과 산출 자료를 정리합니다.",
      evidence: "계약금액 · 물가지수 · 비목군 · 산출 내역",
    },
    {
      icon: "schedule",
      title: "공정스케줄·공기관리(CPM)",
      description:
        "주공정선, 지연 징후, 만회 대책과 자원 계획을 공기 관련 비용 검토 근거와 연결합니다.",
      evidence: "공정표 · 작업일보 · 지연 기록 · 자원 계획",
    },
    {
      icon: "payment",
      title: "기성·자금 수지",
      description:
        "공정률, 기성 청구, 사진과 측정 기록을 연결해 미기성·삭감 요구 대응 자료를 준비합니다.",
      evidence: "기성 내역 · 공정률 · 공사사진 · 측정 기록",
    },
    {
      icon: "claim",
      title: "클레임·분쟁 예방",
      description:
        "내용증명, 협상안, 일지와 회의록을 구조화해 중재·소송 검토용 입증 기반을 정리합니다.",
      evidence: "공문 · 내용증명 · 회의록 · 현장 일지",
    },
    {
      icon: "quality",
      title: "품질·준공 승인",
      description:
        "설계도서 준수, 미시공·오시공, 예비 준공검사와 인허가 요구 점검을 지원합니다.",
      evidence: "검측 기록 · 시공 사진 · 준공도서 · 인허가 기준",
    },
    {
      icon: "safety",
      title: "안전보건관리체계",
      description:
        "위험성평가, TBM과 안전보건 예산 기록을 연결해 예방 활동과 행정 대응 증빙을 강화합니다.",
      evidence: "위험성평가 · TBM · 안전 점검 · 예산 기록",
    },
    {
      icon: "records",
      title: "공사 기록·서무 자동화",
      description:
        "공사사진, 감리보고서와 작업일보를 구조화해 하자·추가 공정 증빙 검색과 반복 서무를 줄입니다.",
      evidence: "공사사진 · 감리보고서 · 작업일보 · 서무 문서",
    },
  ],
  flow: {
    label: "처리 흐름",
    title: "문서 입력부터 검토 리포트까지",
    steps: [
      {
        title: "현장 문서 입력",
        description:
          "계약서, 설계도서, 공정표와 현장 기록을 업무별로 모읍니다.",
      },
      {
        title: "계약·법규·업무 기준 대조",
        description:
          "문서 사이의 불일치와 누락을 찾아 적용 기준과 함께 연결합니다.",
      },
      {
        title: "검토 리포트",
        description: "판단에 필요한 근거, 확인할 쟁점과 보완사항을 표시합니다.",
      },
    ],
  },
  boundary: {
    label: "데이터와 책임의 경계",
    title: "자료는 지정 환경에 보관하고, 최종 판단은 사람이 확인합니다",
    items: [
      "원본 문서, 규정집과 리포트는 고객사가 지정한 Mac에 보관합니다.",
      "분석에 필요한 문서 본문과 가이드라인 발췌는 외부 LLM 벤더 API로 전송되며 해당 벤더의 정책이 적용됩니다.",
      "계약·법률·기술 판단, 대외 협상과 최종 확정은 담당자와 전문가가 원문을 확인해 수행합니다.",
      "AI 검토는 권리 성립, 비용 보전, 법 위반 여부, 분쟁 결과 또는 정확도를 보장하지 않습니다.",
    ],
  },
  download: {
    label: "건설AI 솔루션 카탈로그 PDF 내려 받기",
    href: "/catalogs/construction-ai-catalog-v3.pdf",
    filename: "devfirm-construction-ai-catalog-v3.pdf",
    meta: "PDF · 8쪽 · 약 5.5MB",
  },
} as const;

export type ConstructionAiCatalog = typeof constructionAiCatalog;
