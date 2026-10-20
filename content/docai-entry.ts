import type { Locale } from "./locales";
import { DOC_AI_RELEASE_NOTES_PATH } from "./docai-release-notes";

export const DOC_AI_START_HREF = "/solutions/docasi/start";

const entries = {
  ko: {
    footer: {
      eyebrow: "DOCASI TEAM START",
      title: "DocASI를 처음 설정하시나요?",
      description:
        "관리자와 초대받은 팀원이 설치, 연결, 승인 순서를 한 번에 확인할 수 있습니다.",
      action: "DocASI 팀 시작 안내",
      releaseNotesAction: "릴리스 노트",
    },
    solutionsAction: "DocASI 팀 시작 안내",
    officeAiAction: "DocASI 팀 시작 안내",
    banner: {
      title: "DocASI — Superintelligence for Document Compliance",
      description:
        "규정집 기반으로 현장 문서를 감사하고 수정 제안까지 만듭니다. Mac 허브와 Windows 팀원 앱으로 시작합니다.",
      startLabel: "DocASI 팀 시작하기",
      catalogLabel: "카탈로그 보기",
    },
  },
  fallback: {
    footer: {
      eyebrow: "DOCASI TEAM START",
      title: "Setting up DocASI for the first time?",
      description:
        "Administrators and invited team members can follow the installation, connection, and approval steps in one guide.",
      action: "DocASI team start guide",
      releaseNotesAction: "Release notes",
    },
    solutionsAction: "DocASI team start guide",
    officeAiAction: "DocASI team start guide",
    banner: {
      title: "DocASI — Superintelligence for Document Compliance",
      description:
        "Audits worksite documents against your rulebook and drafts corrections. Starts with a Mac hub and the Windows team app.",
      startLabel: "Start with DocASI",
      catalogLabel: "View catalog",
    },
  },
} as const;

export function getDocAiEntry(locale: Locale) {
  const copy = locale === "ko" ? entries.ko : entries.fallback;

  return {
    href: DOC_AI_START_HREF,
    releaseNotesHref: DOC_AI_RELEASE_NOTES_PATH,
    ...copy,
  } as const;
}
