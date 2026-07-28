import { site } from "./site";

/** 회사소개(§5.2). */
export const about = {
  hero: {
    eyebrow: "회사소개",
    title: "개발자들이 모인 개발법인",
    lead: "데브펌은 개발자가 개발에만 집중할 수 있는 구조를 만드는 회사입니다. 나머지는 회사가 맡습니다.",
  },

  metaphor: {
    id: "model",
    eyebrow: "데브펌 모델",
    title: "로펌의 구조를 개발에 옮겼습니다",
    lead: "변호사가 사무국의 지원을 받아 사건에만 집중하듯, 데브펌의 개발자는 경영지원부의 지원을 받아 개발에만 집중합니다.",
    comparison: {
      leftLabel: "로펌",
      rightLabel: "데브펌",
      rows: [
        { left: "변호사가 사건을 맡는다", right: "개발자가 프로젝트를 맡는다" },
        {
          left: "사무국이 행정을 처리한다",
          right: "경영지원부가 백오피스를 처리한다",
        },
        { left: "의뢰인은 법인과 계약한다", right: "발주처는 법인과 계약한다" },
        {
          left: "파트너가 되면 지분을 갖는다",
          right: "CIC 대표가 되면 사업을 갖는다",
        },
      ],
    },
  },

  backoffice: {
    id: "backoffice",
    eyebrow: "경영지원부",
    title: "개발자가 하지 않아도 되는 일",
    lead: "혼자 일하는 개발자가 가장 많은 시간을 뺏기는 항목들입니다. 데브펌에서는 이 일들이 개발자의 책상 위에 올라오지 않습니다.",
    items: [
      {
        title: "계약과 협상",
        desc: "표준 계약서와 검토 절차를 법인이 갖고 있습니다. 개발자가 독소 조항을 혼자 판단하지 않습니다.",
      },
      {
        title: "세무와 정산",
        desc: "세금계산서 발행, 원천징수, 부가세 신고를 회사가 처리합니다.",
      },
      {
        title: "대금 회수",
        desc: "미수금 관리와 독촉을 법인이 맡습니다. 개발자가 발주처와 돈 얘기로 얼굴을 붉힐 일이 없습니다.",
      },
      {
        title: "4대보험과 노무",
        desc: "고용 형태에 맞는 신고와 노무 관리를 회사가 합니다.",
      },
    ],
  },

  history: {
    id: "history",
    eyebrow: "연혁",
    title: `${site.founded}년부터`,
    items: [
      {
        year: `${site.founded}`,
        title: "법인 설립",
        desc: "소프트웨어 개발과 시스템 구축을 시작했습니다.",
      },
      {
        year: "2010s",
        title: "개발 인재파견 · 아웃소싱",
        desc: "상주와 프로젝트 단위 투입으로 서비스를 넓혔습니다.",
      },
      {
        year: "2020s",
        title: "사내독립기업(CIC) 도입",
        desc: "개발자가 회사 안에서 자기 사업을 운영하는 구조를 만들었습니다.",
      },
      {
        year: "현재",
        title: "AI 에이전트 사업",
        desc: "산업현장의 피지컬AI와 사무현장의 최과장AI로 사업을 재편했습니다.",
      },
    ],
  },

  profile: {
    id: "profile",
    eyebrow: "회사 개요",
    title: "기본 정보",
  },

  cta: {
    title: "데브펌과 일하는 방법은 세 가지입니다",
    desc: "발주처로 만나거나, 개발자로 합류하거나, 아카데미에서 시작하거나.",
    primary: { label: "문의하기", href: "/contact" },
    secondary: { label: "채용 보기", href: "/about/careers" },
  },
} as const;
