/**
 * 일러스트 자산 레지스트리(경로 · 치수 · 대체 텍스트).
 *
 * 경로와 치수를 페이지마다 반복해 적으면 한 곳만 바뀌어도 어긋난다.
 * `content/navigation.ts` 가 IA 의 단일 진실원천이듯, 이 파일이 이미지의
 * 단일 진실원천이다. 치수는 SVG 의 viewBox 와 반드시 같아야 한다(CLS 0).
 *
 * alt 는 한국어 문장이라 여기(content/)에 있어야 한다(A10).
 * 옆 텍스트가 같은 내용을 이미 말하는 장식용에는 alt 를 두지 않고
 * 소비처에서 `decorative` 를 쓴다.
 */
export type IllustrationAsset = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export const illustrations = {
  // ── 구조 다이어그램 ──────────────────────────────────────────────
  lawfirmModel: {
    src: "/images/model/model-lawfirm.svg",
    width: 960,
    height: 420,
    alt: "로펌에서 변호사들이 사무국 위에 서듯, 데브펌에서는 개발자들이 경영지원부 위에 서는 동일한 구조를 좌우로 대비한 그림",
  },
  backoffice: {
    src: "/images/model/model-backoffice.svg",
    width: 800,
    height: 420,
    alt: "개발자에게서 계약·세무·정산·노무 네 가지 업무가 분리되어 법인으로 넘어가는 그림",
  },
  cic: {
    src: "/images/model/model-cic.svg",
    width: 800,
    height: 420,
    alt: "법인이라는 큰 틀 안에 독립된 사업 단위 세 곳이 각자 팀을 꾸리고, 아래로 공통 백오피스를 공유하는 구조도",
  },

  // ── 공유오피스 시설 ──────────────────────────────────────────────
  workspaceStudio: {
    src: "/images/workspace/workspace-studio.svg",
    width: 640,
    height: 420,
    alt: "방음 패널과 마이크, 믹싱 콘솔을 갖춘 녹음 스튜디오",
  },
  workspaceInfra: {
    src: "/images/workspace/workspace-infra.svg",
    width: 640,
    height: 420,
    alt: "워크스테이션과 스토리지·렌더 노드 랙을 갖춘 콘텐츠 제작 인프라 공간",
  },
  workspaceDesk: {
    src: "/images/workspace/workspace-desk.svg",
    width: 640,
    height: 420,
    alt: "고정석과 자유석, 소회의실이 있는 공유 업무 공간",
  },

  // ── 약도 ────────────────────────────────────────────────────────
  map: {
    src: "/images/map/map-office.svg",
    width: 800,
    height: 500,
    alt: "강남대로에서 강남대로6길로 들어와 한양빌딩에 이르는 약도. 지하철 출입구에서 도보 경로가 표시되어 있다",
  },

  // ── 개념 히어로 ─────────────────────────────────────────────────
  physicalAi: {
    src: "/images/hero/hero-physical-ai.svg",
    width: 560,
    height: 420,
    alt: "카메라와 센서가 산업현장을 읽어 판단 결과로 바꾸는 흐름",
  },
  officeAi: {
    src: "/images/hero/hero-office-ai.svg",
    width: 560,
    height: 420,
    alt: "흩어진 문서 더미가 정리된 보고서 한 장으로 바뀌는 흐름",
  },
  academy: {
    src: "/images/hero/hero-academy.svg",
    width: 560,
    height: 420,
    alt: "세 사람이 탁자에 둘러앉아 모듈을 조립하며 함께 결과물을 만드는 모습",
  },
  home: {
    src: "/images/hero/hero-home.svg",
    width: 620,
    height: 520,
  },

  // ── 소형 카드 ───────────────────────────────────────────────────
  audienceClient: {
    src: "/images/cards/audience-client.svg",
    width: 240,
    height: 180,
  },
  audienceLearner: {
    src: "/images/cards/audience-learner.svg",
    width: 240,
    height: 180,
  },
  audienceDeveloper: {
    src: "/images/cards/audience-developer.svg",
    width: 240,
    height: 180,
  },
  schoolSolution: {
    src: "/images/cards/school-solution.svg",
    width: 240,
    height: 180,
  },
  schoolOffice: {
    src: "/images/cards/school-office.svg",
    width: 240,
    height: 180,
  },
  schoolProject: {
    src: "/images/cards/school-project.svg",
    width: 240,
    height: 180,
  },
} as const satisfies Record<string, IllustrationAsset>;

/** 산업별 에이전트 일러스트 — slug 로 조회한다(§5.8 단일 템플릿) */
export const agentIllustrations: Record<string, IllustrationAsset> = {
  construction: {
    src: "/images/agents/agent-construction.svg",
    width: 480,
    height: 360,
  },
  content: {
    src: "/images/agents/agent-content.svg",
    width: 480,
    height: 360,
  },
  manufacturing: {
    src: "/images/agents/agent-manufacturing.svg",
    width: 480,
    height: 360,
  },
  distribution: {
    src: "/images/agents/agent-distribution.svg",
    width: 480,
    height: 360,
  },
  service: {
    src: "/images/agents/agent-service.svg",
    width: 480,
    height: 360,
  },
  safety: {
    src: "/images/agents/agent-safety.svg",
    width: 480,
    height: 360,
  },
};
