import type { Locale } from "@/content/locales";

/**
 * 다운로드 섹션의 한시 운영 공지.
 *
 * 사전(dictionary)에 넣지 않는다 — 릴리스 상태(0.2.x 마이그레이션 경로,
 * 공증·코드 서명 미적용)에 묶인 문구라 수명이 짧고, 그때마다 17개 로케일
 * 번역을 강제할 가치가 없다. 한국어 외에는 영어로 낸다. 서명·공증이
 * 적용되는 시점에 이 모듈째 지우면 된다.
 */
export function getDocasiMacMigrationGuidance(locale: Locale) {
  return locale === "ko"
    ? {
        title: "기존 DocAI Mac Hub를 사용 중인가요?",
        items: [
          "로그인 상태를 보존하려면 앱의 설정 › OTA 소프트웨어 업데이트에서 0.2.2 → 0.2.6 → 0.2.7 → 0.2.9 순서로 업데이트하는 방법을 권장합니다.",
          "설치 파일을 직접 내려받아 수동으로 설치하면 다시 로그인해야 할 수 있지만, 기존 데이터는 유지됩니다.",
          "DocASI에서 기존 데이터가 정상적으로 보이는지 확인한 뒤, 예전 DocAI 앱을 완전히 종료하고 응용 프로그램의 DocAI 앱 번들만 삭제하세요. Documents 폴더와 그 안의 데이터는 삭제하지 마세요.",
        ],
      }
    : {
        title: "Already using the DocAI Mac Hub?",
        items: [
          "To preserve your signed-in session, use Settings › OTA Software Update and update in order: 0.2.2 → 0.2.6 → 0.2.7 → 0.2.9.",
          "A manual installation may ask you to sign in again, but your existing data is retained.",
          "After confirming that your existing data appears in DocASI, fully quit the old DocAI app and remove only its app bundle from Applications. Never delete your Documents folder or its data.",
        ],
      };
}

export function getDocasiBuildSecurityNotice(locale: Locale) {
  return locale === "ko"
    ? {
        title: "현재 빌드의 운영체제 보안 경고",
        body: "현재 다운로드 빌드는 Apple 공증과 Windows 게시자 코드 서명이 적용되지 않아 macOS 또는 Windows가 실행 전 경고를 표시하거나 실행을 차단할 수 있습니다. 업데이트 파일의 ECDSA 서명과 SHA-256 검증은 별도의 무결성 검사이며, Apple 공증이나 Windows 신뢰 게시자 서명을 대신하지 않습니다.",
      }
    : {
        title: "Operating system security notice for this build",
        body: "The current downloads are not Apple-notarized and do not have Windows publisher code signing, so macOS or Windows may warn you or block the app from launching. The updater's ECDSA signature and SHA-256 verification are separate integrity checks; they do not replace Apple notarization or a trusted Windows publisher signature.",
      };
}
