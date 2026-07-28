import { Building2, GraduationCap, Code2 } from "lucide-react";
import { illustrations } from "./illustrations";

/**
 * 홈 문구(§5.1).
 *
 * P1(컨셉 우선): 첫 화면에서 "개발법인"이라는 정체성이 3초 안에 전달되어야
 * 한다. 그래서 히어로 카피는 사업 영역 나열이 아니라 회사의 성격을 말한다.
 * LCP 대상은 이 제목 텍스트다 — 배경 이미지를 쓰지 않는다.
 */
export const home = {
  hero: {
    eyebrow: "DevFirm",
    title: "개발자들이 모인 개발법인, 데브펌",
    lead: "로펌에 변호사가 모여 사건을 맡듯, 데브펌에는 개발자가 모여 개발을 맡습니다. 계약과 정산은 회사가 하고, 개발자는 만드는 일에 집중합니다.",
    primaryCta: { label: "문의하기", href: "/contact" },
    secondaryCta: { label: "AI 솔루션 보기", href: "/solutions" },
  },

  slogan: {
    title: "현장이 다르면 필요한 AI도 다릅니다",
    left: {
      eyebrow: "산업현장",
      name: "피지컬AI",
      desc: "보고 판단해야 하는 곳에서 씁니다. 카메라와 센서가 읽은 것을 사람이 쓸 수 있는 판단으로 바꿉니다.",
      href: "/solutions/physical-ai",
    },
    right: {
      eyebrow: "사무현장",
      name: "최과장AI",
      desc: "반복되는 사무 업무를 대신합니다. 문서를 읽고 정리하고 보고서를 만드는 일까지 맡습니다.",
      href: "/solutions/office-ai",
    },
  },

  /** I-A(고객군 기준 IA)의 장점을 흡수하는 분기 블록(§2.4) */
  audience: {
    eyebrow: "어떻게 오셨나요",
    title: "찾으시는 것부터 보여드립니다",
    cards: [
      {
        icon: Building2,
        art: illustrations.audienceClient,
        title: "기업 고객",
        desc: "AI 도입이나 개발 인력이 필요하신 경우",
        href: "/solutions",
        linkLabel: "AI 솔루션 보기",
      },
      {
        icon: GraduationCap,
        art: illustrations.audienceLearner,
        title: "배우고 싶은 분",
        desc: "프로젝트로 실무를 익히고 싶은 경우",
        href: "/academy",
        linkLabel: "아카데미 보기",
      },
      {
        icon: Code2,
        art: illustrations.audienceDeveloper,
        title: "함께 일할 개발자",
        desc: "입사하거나 사내독립기업을 운영하고 싶은 경우",
        href: "/about/careers",
        linkLabel: "채용 보기",
      },
    ],
  },

  agentsSection: {
    eyebrow: "산업별 AI 에이전트",
    title: "분야별 AI비서의 도움으로, 이제 결정만 내리세요",
    lead: "여섯 개 산업의 반복 판단을 에이전트가 먼저 정리합니다. 사람은 판단이 필요한 지점에만 개입합니다.",
  },

  model: {
    eyebrow: "데브펌 모델",
    title: "로펌이 변호사에게 하는 일을, 데브펌은 개발자에게 합니다",
    lead: "개발자는 영업·계약·정산·세무에 시간을 쓰는 대신 만드는 일에 씁니다. 발주처는 개인이 아니라 법인과 계약합니다.",
    comparison: {
      leftLabel: "로펌",
      rightLabel: "데브펌",
      rows: [
        { left: "변호사", right: "개발자" },
        { left: "사건 수임", right: "프로젝트 수주" },
        { left: "사무국이 행정을 맡음", right: "경영지원부가 백오피스를 맡음" },
        { left: "파트너 변호사", right: "사내독립기업(CIC) 대표" },
        { left: "의뢰인은 법인과 계약", right: "발주처는 법인과 계약" },
      ],
    },
    note: "발주처에게는 개인 프리랜서와 계약할 때 생기는 위험이 사라지고, 개발자에게는 혼자서는 감당하기 어려운 일이 사라집니다.",
  },

  bands: {
    academy: {
      eyebrow: "PBL 아카데미",
      title: "만들면서 배웁니다",
      desc: "NCS 커리큘럼을 프로젝트로 소화합니다. 수료 시점에 이력서에 쓸 결과물이 남습니다.",
      href: "/academy",
      linkLabel: "과정 보기",
    },
    workspace: {
      eyebrow: "공유오피스",
      title: "포스트프로덕션까지 되는 업무공간",
      desc: "녹음 스튜디오와 콘텐츠 제작 인프라를 갖춘 개발자 공유오피스입니다.",
      href: "/workspace",
      linkLabel: "공간 보기",
    },
  },

  trust: {
    eyebrow: "회사",
    title: "2007년부터",
    stats: [
      { value: "2007", label: "설립" },
      { value: "CIC", label: "사내독립기업 운영" },
      { value: "서울 서초", label: "강남대로 인근" },
    ],
  },

  finalCta: {
    title: "무엇을 만들지 정하지 않으셨어도 괜찮습니다",
    desc: "현재 상황을 알려주시면 어디서부터 손대야 하는지부터 함께 정리합니다.",
    cta: { label: "문의하기", href: "/contact" },
  },
} as const;
