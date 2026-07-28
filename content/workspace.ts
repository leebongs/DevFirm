import { site } from "./site";
import { illustrations } from "./illustrations";

/** 개발자 공유오피스(§5.15). */
export const workspace = {
  hero: {
    eyebrow: "공유오피스",
    title: "만드는 사람을 위한 공간",
    lead: "개발과 콘텐츠 제작이 한 건물 안에서 끝나는 업무공간입니다.",
  },

  concept: {
    id: "concept",
    eyebrow: "컨셉",
    title: "포스트프로덕션까지 되는 개발자 공간",
    lead: "코드만 쓰는 공간이 아닙니다. 녹음하고 편집해야 하는 작업이 생겼을 때 밖으로 나가지 않아도 되도록 만들었습니다.",
  },

  facilities: {
    id: "facilities",
    eyebrow: "시설",
    title: "무엇이 있나",
    items: [
      {
        title: "녹음 스튜디오",
        desc: "내레이션과 인터뷰 녹음이 가능한 방음 부스를 갖췄습니다.",
        art: illustrations.workspaceStudio,
      },
      {
        title: "콘텐츠 제작 인프라",
        desc: "영상 편집과 렌더링을 위한 장비와 저장 공간을 제공합니다.",
        art: illustrations.workspaceInfra,
      },
      {
        title: "업무 공간",
        desc: "고정석과 자유석, 소규모 회의실을 함께 씁니다.",
        art: illustrations.workspaceDesk,
      },
    ],
  },

  tenants: {
    id: "tenants",
    eyebrow: "입주 대상",
    title: "이런 분들이 씁니다",
    items: [
      "혼자 또는 소규모로 일하는 개발자",
      "영상·오디오 작업이 함께 필요한 팀",
      "데브펌 CIC 로 사업을 운영하는 팀",
    ],
  },

  pricing: {
    id: "pricing",
    eyebrow: "요금 · 문의",
    title: "이용 조건",
    note: "좌석 형태와 이용 기간에 따라 다릅니다. 스튜디오는 예약제로 운영합니다. 정확한 조건은 문의 주시면 안내해 드립니다.",
  },

  location: {
    id: "location",
    eyebrow: "오시는 길",
    title: "서울 서초구",
    address: site.address.full,
    /** O-4 확정: 외부 지도 SDK 없이 링크만 연결한다 */
    mapLinkLabel: "카카오맵에서 보기",
    mapHref: `https://map.kakao.com/?q=${encodeURIComponent(site.address.full)}`,
  },

  cta: {
    title: "한 번 보고 정하셔도 됩니다",
    desc: "방문 일정을 잡아드립니다.",
    primary: { label: "문의하기", href: "/contact" },
  },
} as const;
