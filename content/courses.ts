import type { Course } from "./_types";

/**
 * 아카데미 과정(§5.13).
 * O-7 결정에 따라 초안이며, 실제 기간·정원·커리큘럼은 검수 후 교체한다.
 */
export const coursesPage = {
  hero: {
    eyebrow: "과정 안내",
    title: "지금 열려 있는 과정",
    lead: "스쿨별로 나뉘어 있습니다. 기간과 대상을 확인하고 신청하세요.",
  },
  filterAll: "전체",
  fields: {
    duration: "기간",
    capacity: "정원",
    target: "대상",
    prerequisites: "선수 지식",
    curriculum: "커리큘럼",
    outcomes: "산출 프로젝트",
    careers: "수료 후 진로",
    week: "주차",
    topic: "주제",
    detail: "내용",
    apply: "수강 신청",
  },
  seoDescription: (course: Pick<Course, "title" | "summary">) =>
    `${course.title} — ${course.summary}`,
  cta: {
    title: "신청 전에 물어보셔도 됩니다",
    desc: "지금 수준으로 따라갈 수 있을지 먼저 확인해 드립니다.",
    primary: { label: "수강 신청", href: "/academy/apply" },
    secondary: { label: "문의하기", href: "/contact" },
  },
} as const;

export const courses = [
  {
    slug: "web-service-development",
    school: "solution",
    title: "웹 서비스 개발 과정",
    summary:
      "기획부터 배포까지, 실제로 접속 가능한 서비스를 하나 만들어 마칩니다.",
    duration: "16주",
    capacity: "20명",
    target: [
      "프로그래밍 기초 문법을 아는 분",
      "포트폴리오가 필요한 취업 준비생",
      "직접 서비스를 만들어 보고 싶은 직장인",
    ],
    prerequisites: ["기본 문법 수준의 프로그래밍 경험", "HTML·CSS 기초"],
    curriculum: [
      {
        week: "1~2",
        topic: "개발 환경과 협업 도구",
        detail: "Git 흐름, 이슈 관리, 코드 리뷰 규칙을 팀 규칙으로 정합니다.",
      },
      {
        week: "3~6",
        topic: "프론트엔드 기초",
        detail: "컴포넌트 구조와 상태 관리, 반응형 레이아웃을 다룹니다.",
      },
      {
        week: "7~10",
        topic: "백엔드와 데이터",
        detail: "API 설계, 데이터 모델링, 인증을 구현합니다.",
      },
      {
        week: "11~14",
        topic: "팀 프로젝트",
        detail: "기획한 서비스를 팀으로 만듭니다. 주 1회 리뷰를 받습니다.",
      },
      {
        week: "15~16",
        topic: "배포와 발표",
        detail: "실제 도메인에 배포하고 결과를 발표합니다.",
      },
    ],
    outcomes: [
      "접속 가능한 웹 서비스 1건",
      "저장소와 커밋 이력",
      "배포 문서와 README",
    ],
    careers: ["웹 개발자", "풀스택 주니어", "사내 서비스 담당자"],
  },
  {
    slug: "ai-agent-basics",
    school: "solution",
    title: "AI 에이전트 실무 과정",
    summary:
      "업무를 대신하는 에이전트를 직접 만들어 봅니다. 모델을 만드는 과정이 아니라 쓰는 과정입니다.",
    duration: "12주",
    capacity: "16명",
    target: [
      "업무 자동화를 맡게 된 개발자",
      "AI 도입을 검토 중인 실무자",
      "에이전트 구조를 이해하고 싶은 분",
    ],
    prerequisites: ["Python 또는 JavaScript 사용 경험", "API 호출 경험"],
    curriculum: [
      {
        week: "1~3",
        topic: "에이전트 구조",
        detail: "도구 호출, 검색 보강, 실패 처리의 기본 얼개를 잡습니다.",
      },
      {
        week: "4~7",
        topic: "업무 연결",
        detail: "문서·메일·시트를 읽고 쓰는 연동을 구현합니다.",
      },
      {
        week: "8~10",
        topic: "평가와 개선",
        detail: "결과를 측정하고 기준을 세워 반복 개선합니다.",
      },
      {
        week: "11~12",
        topic: "실무 적용 프로젝트",
        detail: "각자 회사 업무 하나를 골라 에이전트로 옮깁니다.",
      },
    ],
    outcomes: ["업무 자동화 에이전트 1건", "평가 기준 문서", "적용 보고서"],
    careers: ["AI 실무 담당", "자동화 엔지니어", "사내 AI 도입 리드"],
  },
  {
    slug: "office-automation",
    school: "office",
    title: "사무 자동화 과정",
    summary:
      "매일 반복하는 문서·표 작업을 도구로 줄입니다. 코드를 몰라도 시작할 수 있습니다.",
    duration: "8주",
    capacity: "24명",
    target: [
      "반복 사무 업무가 많은 직장인",
      "엑셀 작업에 시간을 많이 쓰는 분",
      "부서 업무를 정리하고 싶은 관리자",
    ],
    prerequisites: ["엑셀 기본 사용 경험"],
    curriculum: [
      {
        week: "1~2",
        topic: "업무 분해",
        detail: "지금 하는 일을 단계로 쪼개 자동화 가능한 지점을 찾습니다.",
      },
      {
        week: "3~5",
        topic: "문서·표 자동화",
        detail: "양식 채우기, 대조, 집계를 자동으로 처리합니다.",
      },
      {
        week: "6~7",
        topic: "AI 도구 활용",
        detail: "문서 판독과 요약을 업무 흐름에 붙입니다.",
      },
      {
        week: "8",
        topic: "적용과 공유",
        detail: "만든 것을 팀에 넘길 수 있게 정리합니다.",
      },
    ],
    outcomes: ["자동화한 업무 3건", "사용 안내 문서"],
    careers: ["사무 자동화 담당", "부서 업무 개선 담당"],
  },
  {
    slug: "project-management",
    school: "project",
    title: "프로젝트 진행 과정",
    summary:
      "일정과 범위를 관리하며 프로젝트를 끝내는 방법을 실제 사례로 익힙니다.",
    duration: "10주",
    capacity: "18명",
    target: [
      "처음 프로젝트를 맡게 된 분",
      "일정이 자꾸 밀리는 팀의 리더",
      "발주처와 조율해야 하는 담당자",
    ],
    prerequisites: ["팀으로 일해 본 경험"],
    curriculum: [
      {
        week: "1~2",
        topic: "범위 정의",
        detail: "무엇을 하지 않을지부터 정합니다.",
      },
      {
        week: "3~5",
        topic: "일정과 리스크",
        detail: "추정과 버퍼, 위험 목록을 만듭니다.",
      },
      {
        week: "6~8",
        topic: "실행과 조율",
        detail: "변경 요청과 이해관계자 소통을 다룹니다.",
      },
      {
        week: "9~10",
        topic: "종료와 회고",
        detail: "인수인계와 회고로 마무리합니다.",
      },
    ],
    outcomes: ["프로젝트 계획서 1건", "리스크 관리 문서", "회고 보고서"],
    careers: ["프로젝트 매니저", "팀 리드", "서비스 기획자"],
  },
] satisfies Course[];
