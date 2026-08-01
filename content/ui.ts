/**
 * UI 마이크로카피 — 버튼 라벨·aria 값·상태 문구.
 *
 * A10(콘텐츠 분리)의 예외 목록(scripts/i18n-allowlist.json)에 문자열을 쌓는 대신
 * 여기로 모은다. 예외 목록이 비어 있어야 규칙이 규칙으로 작동한다.
 */
export const ui = {
  nav: {
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    mainNavLabel: "주요 메뉴",
    sectionNavLabel: "섹션 메뉴",
    breadcrumbLabel: "현재 위치",
    home: "홈",
    skipToContent: "본문으로 건너뛰기",
    externalLink: "새 창에서 열림",
    /** 언어 선택기의 스크린리더용 이름 */
    language: "언어 선택",
  },
  toc: {
    title: "이 페이지의 내용",
  },
  error: {
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody:
      "주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 원하는 곳으로 이동하세요.",
    errorTitle: "문제가 발생했습니다",
    errorBody:
      "잠시 후 다시 시도해 주세요. 문제가 계속되면 문의하기로 알려주세요.",
    retry: "다시 시도",
    goHome: "홈으로",
  },
  footer: {
    businessNumberLabel: "사업자등록번호",
    addressLabel: "주소",
    telLabel: "전화",
  },
} as const;
