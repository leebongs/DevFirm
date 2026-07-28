import {
  Clapperboard,
  Factory,
  HardHat,
  ShieldAlert,
  Truck,
  Wrench,
} from "lucide-react";
import type { IndustryAgent } from "./_types";

/**
 * 산업별 AI 에이전트 6종(§5.8).
 *
 * 페이지는 단일 템플릿 하나뿐이고 이 배열이 6개 경로를 만든다.
 * 필드를 빠뜨리면 `satisfies` 가 빌드 타임에 잡는다 — MDX 로는 얻을 수 없는
 * 보장이라 콘텐츠를 TS 모듈로 둔 이유이기도 하다(ADR-003).
 *
 * O-7 결정에 따라 초안이며, 오픈 전 검수 대상이다.
 */
export const agents = [
  {
    slug: "construction",
    name: "건설공사 AI",
    tagline: "도면과 현장 사이의 거리를 줄입니다.",
    icon: HardHat,
    problems: [
      "공정률 보고가 사람마다 다르게 집계된다",
      "안전 점검 기록이 종이와 메신저에 흩어진다",
      "자재 반입과 실제 소요량이 맞지 않는다",
    ],
    capabilities: [
      {
        title: "공정 진행 판독",
        desc: "현장 사진과 작업일보를 대조해 공정률을 매일 같은 기준으로 산출합니다.",
      },
      {
        title: "안전 위험 감지",
        desc: "CCTV 영상에서 보호구 미착용과 위험구역 진입을 감지해 즉시 알립니다.",
      },
      {
        title: "자재 수불 정리",
        desc: "반입 전표와 시공 물량을 맞춰 과부족을 주 단위로 보고합니다.",
      },
      {
        title: "일일 보고서 작성",
        desc: "흩어진 기록을 모아 발주처 양식에 맞춘 보고서를 자동으로 만듭니다.",
      },
    ],
    outcomes: [
      { label: "일일 보고 작성 시간", value: "-70%" },
      { label: "안전 점검 누락", value: "0건" },
      { label: "자재 오차 파악", value: "주 1회" },
    ],
    steps: [
      "현장 데이터 점검",
      "판독 기준 합의",
      "시범 적용 4주",
      "전 현장 확대",
    ],
    seo: {
      title: "건설공사 AI",
      description:
        "현장 사진과 작업일보로 공정률을 매일 같은 기준으로 산출하고, 안전 점검과 자재 수불을 자동으로 정리하는 건설 현장용 AI 에이전트입니다.",
    },
  },
  {
    slug: "content",
    name: "콘텐츠 AI",
    tagline: "만드는 시간을 만드는 데 씁니다.",
    icon: Clapperboard,
    problems: [
      "촬영 원본에서 쓸 장면을 찾는 데 시간이 다 간다",
      "자막과 썸네일 같은 반복 작업이 제작 일정을 밀어낸다",
      "채널별 규격에 맞춰 다시 만드는 일이 끝나지 않는다",
    ],
    capabilities: [
      {
        title: "원본 색인",
        desc: "촬영 원본을 인물·장소·대사 기준으로 색인해 필요한 장면을 바로 찾습니다.",
      },
      {
        title: "자막·번역 초안",
        desc: "음성을 받아쓰고 채널 톤에 맞춘 자막 초안을 만듭니다.",
      },
      {
        title: "채널별 재구성",
        desc: "하나의 원본에서 채널 규격에 맞는 편집본을 파생시킵니다.",
      },
      {
        title: "메타데이터 정리",
        desc: "제목·태그·설명을 검색에 맞게 정리해 업로드 준비를 끝냅니다.",
      },
    ],
    outcomes: [
      { label: "장면 검색 시간", value: "-80%" },
      { label: "자막 초안 작성", value: "즉시" },
      { label: "채널 파생본", value: "1→N" },
    ],
    steps: ["원본 자산 연결", "톤 기준 학습", "파일럿 제작", "제작 라인 편입"],
    seo: {
      title: "콘텐츠 AI",
      description:
        "촬영 원본 색인, 자막 초안, 채널별 재구성으로 콘텐츠 제작의 반복 작업을 줄이는 AI 에이전트입니다.",
    },
  },
  {
    slug: "manufacturing",
    name: "제조공정 AI",
    tagline: "불량이 나기 전에 신호를 읽습니다.",
    icon: Factory,
    problems: [
      "설비 이상을 멈춘 뒤에야 알게 된다",
      "검사 기준이 검사자마다 다르다",
      "수율이 떨어진 원인을 사후에도 특정하지 못한다",
    ],
    capabilities: [
      {
        title: "설비 이상 예측",
        desc: "센서 추이에서 평소와 다른 패턴을 찾아 정지 전에 알립니다.",
      },
      {
        title: "외관 검사",
        desc: "영상으로 결함을 판정해 검사자 간 편차를 없앱니다.",
      },
      {
        title: "수율 원인 추적",
        desc: "공정 변수와 불량률을 연결해 어떤 조건에서 나빠졌는지 짚어냅니다.",
      },
      {
        title: "작업 표준 점검",
        desc: "표준 작업과 실제 작업의 차이를 기록해 개선 지점을 남깁니다.",
      },
    ],
    outcomes: [
      { label: "비계획 정지", value: "-40%" },
      { label: "검사 편차", value: "해소" },
      { label: "원인 특정", value: "당일" },
    ],
    steps: ["설비 데이터 연동", "정상 범위 학습", "1개 라인 검증", "라인 확대"],
    seo: {
      title: "제조공정 AI",
      description:
        "설비 이상 예측, 영상 외관 검사, 수율 원인 추적으로 제조 현장의 손실을 줄이는 AI 에이전트입니다.",
    },
  },
  {
    slug: "distribution",
    name: "유통관리 AI",
    tagline: "재고는 줄이고 결품은 막습니다.",
    icon: Truck,
    problems: [
      "잘 나가는 상품이 먼저 떨어진다",
      "안 나가는 재고가 창고를 차지한다",
      "발주 판단이 담당자 경험에 달려 있다",
    ],
    capabilities: [
      {
        title: "수요 예측",
        desc: "판매 추이와 계절성을 반영해 품목별 수요를 예측합니다.",
      },
      {
        title: "발주 제안",
        desc: "리드타임과 안전재고를 계산해 발주 수량을 제안합니다.",
      },
      {
        title: "재고 건전성 점검",
        desc: "회전이 멈춘 재고를 찾아 처분 시점을 알립니다.",
      },
      {
        title: "물류 경로 정리",
        desc: "배송 이력에서 지연 구간을 찾아 경로를 다시 짭니다.",
      },
    ],
    outcomes: [
      { label: "결품률", value: "-50%" },
      { label: "재고 보유일", value: "-25%" },
      { label: "발주 판단", value: "근거 기반" },
    ],
    steps: [
      "판매 데이터 연동",
      "예측 정확도 검증",
      "일부 품목 적용",
      "전 품목",
    ],
    seo: {
      title: "유통관리 AI",
      description:
        "수요 예측과 발주 제안으로 결품과 과잉 재고를 동시에 줄이는 유통 현장용 AI 에이전트입니다.",
    },
  },
  {
    slug: "service",
    name: "용역서비스 AI",
    tagline: "사람을 배치하는 일에도 근거가 필요합니다.",
    icon: Wrench,
    problems: [
      "현장별 필요 인원이 감으로 정해진다",
      "근태 확인과 정산에 매달 며칠이 든다",
      "계약 조건이 현장마다 달라 실수가 난다",
    ],
    capabilities: [
      {
        title: "인력 배치 제안",
        desc: "현장 규모와 과거 소요 시간을 근거로 필요 인원을 계산합니다.",
      },
      {
        title: "근태 자동 집계",
        desc: "출퇴근 기록을 계약 조건에 맞춰 집계하고 예외만 사람에게 남깁니다.",
      },
      {
        title: "정산서 작성",
        desc: "현장별 단가와 근무 내역을 맞춰 정산서 초안을 만듭니다.",
      },
      {
        title: "계약 조건 점검",
        desc: "현장별 조건과 실제 운영의 어긋남을 찾아 알립니다.",
      },
    ],
    outcomes: [
      { label: "정산 소요", value: "-60%" },
      { label: "배치 근거", value: "수치화" },
      { label: "조건 위반", value: "사전 감지" },
    ],
    steps: ["계약 조건 정리", "근태 시스템 연동", "1개 현장 시범", "전 현장"],
    seo: {
      title: "용역서비스 AI",
      description:
        "인력 배치 산정, 근태 집계, 정산서 작성을 자동화해 용역 운영의 반복 업무를 줄이는 AI 에이전트입니다.",
    },
  },
  {
    slug: "safety",
    name: "범죄예방 AI",
    tagline: "사건이 되기 전의 신호를 봅니다.",
    icon: ShieldAlert,
    problems: [
      "관제 인력이 모든 화면을 동시에 볼 수 없다",
      "사후 영상 확인에 시간이 오래 걸린다",
      "위험 판단 기준이 관제사마다 다르다",
    ],
    capabilities: [
      {
        title: "이상 행동 감지",
        desc: "배회·침입·쓰러짐 같은 패턴을 실시간으로 찾아 알립니다.",
      },
      {
        title: "구간 검색",
        desc: "사람·차량·시간 조건으로 영상 구간을 즉시 찾아냅니다.",
      },
      {
        title: "우선순위 관제",
        desc: "위험도가 높은 화면을 관제사 앞으로 올립니다.",
      },
      {
        title: "사건 기록 정리",
        desc: "감지부터 조치까지의 경과를 자동으로 기록에 남깁니다.",
      },
    ],
    outcomes: [
      { label: "영상 검색", value: "분 단위" },
      { label: "감지 누락", value: "감소" },
      { label: "판단 기준", value: "통일" },
    ],
    steps: ["카메라 연동", "감지 기준 조정", "야간 시범 운영", "전 구역 확대"],
    seo: {
      title: "범죄예방 AI",
      description:
        "이상 행동 감지와 조건 기반 영상 검색으로 관제 인력의 판단을 돕는 범죄예방 AI 에이전트입니다.",
    },
  },
] satisfies IndustryAgent[];

export const agentBySlug = Object.fromEntries(
  agents.map((agent) => [agent.slug, agent]),
) as Record<IndustryAgent["slug"], (typeof agents)[number]>;
