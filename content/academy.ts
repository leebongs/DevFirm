import { illustrations } from "./illustrations";

/** PBL 아카데미 허브(§5.12). */
export const academy = {
  hero: {
    eyebrow: "PBL 아카데미",
    title: "만들면서 배웁니다",
    lead: "강의를 듣고 끝나는 교육이 아닙니다. NCS 커리큘럼을 프로젝트로 소화하고, 수료 시점에 이력서에 쓸 결과물을 들고 나갑니다.",
  },

  pbl: {
    id: "pbl",
    eyebrow: "PBL 이란",
    title: "프로젝트가 커리큘럼입니다",
    lead: "Project Based Learning. 배울 내용을 먼저 나열하지 않고, 만들어야 할 것을 먼저 정합니다. 필요한 지식은 만드는 과정에서 채웁니다.",
    items: [
      {
        title: "결과물이 남습니다",
        desc: "수료증이 아니라 동작하는 프로젝트가 남습니다.",
      },
      {
        title: "협업을 겪습니다",
        desc: "혼자 하는 과제가 아니라 팀으로 일정과 역할을 나눕니다.",
      },
      {
        title: "현업 기준으로 봅니다",
        desc: "실제 프로젝트를 하는 개발자가 코드와 결과를 리뷰합니다.",
      },
    ],
  },

  schools: {
    id: "schools",
    eyebrow: "3개 스쿨",
    title: "무엇을 만들고 싶은지에 따라 고릅니다",
  },

  external: {
    id: "external",
    eyebrow: "연계",
    title: "포스트프로덕션 과정",
    desc: "영상 후반작업 과정은 서울필름아카데미와 연계해 운영합니다.",
    href: "https://www.seoulfilmacademy.com",
    linkLabel: "서울필름아카데미",
  },

  process: {
    id: "process",
    eyebrow: "수강 절차",
    title: "네 단계",
    steps: ["과정 선택 · 신청", "상담 · 배정", "프로젝트 수행", "발표 · 수료"],
  },

  cta: {
    title: "어떤 과정이 맞을지 모르시겠다면",
    desc: "지금 할 수 있는 것과 하고 싶은 것을 알려주시면 과정을 추천해 드립니다.",
    primary: { label: "수강 신청", href: "/academy/apply" },
    secondary: { label: "과정 보기", href: "/academy/courses" },
  },
} as const;

export const SCHOOLS = [
  {
    key: "solution",
    name: "솔루션 개발스쿨",
    desc: "서비스를 처음부터 끝까지 만들어 봅니다.",
    art: illustrations.schoolSolution,
  },
  {
    key: "office",
    name: "공통사무 업무스쿨",
    desc: "사무 업무를 도구로 자동화하는 법을 익힙니다.",
    art: illustrations.schoolOffice,
  },
  {
    key: "project",
    name: "프로젝트 업무스쿨",
    desc: "기획과 일정 관리를 포함한 프로젝트 진행을 배웁니다.",
    art: illustrations.schoolProject,
  },
] as const;
