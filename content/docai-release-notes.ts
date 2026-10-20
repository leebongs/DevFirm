export const DOC_AI_RELEASE_NOTES_PATH = "/solution/DocAI/releasenote";
export const DOC_AI_RELEASE_NOTES_URL =
  "https://www.devfirm.co/solution/DocAI/releasenote";

export type DocAiReleaseGroup = {
  heading: string;
  subheading: string;
  entries: readonly string[];
};

export type DocAiRelease = {
  version: `${number}.${number}.${number}`;
  title: string;
  publishedAt: string;
  displayDate: string;
  groups: readonly DocAiReleaseGroup[];
};

export const docAiReleases = [
  {
    version: "0.2.2",
    title: "Windows 업데이트 연결 호환성 개선",
    publishedAt: "2026-10-20T06:57:30Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "Windows 업데이트 연결",
        subheading:
          "Windows 팀원 앱에서 공개 업데이트 정보를 더 안정적으로 확인합니다.",
        entries: [
          "업데이트 요청은 HTTP/2 연결을 우선 사용하며, 지원하지 않는 환경에서는 HTTP/1.1로 연결합니다.",
          "업데이트 요청에 DocAI 앱 정보를 명시해 연결 호환성을 개선했습니다.",
          "Windows 0.2.0·0.2.1에서 업데이트 확인이 차단되는 경우, 0.2.2 설치 파일을 직접 내려받아 한 번 설치해야 합니다.",
          "서명·파일 크기·SHA-256 검증은 유지하며, 웹사이트 전체의 방화벽 설정은 변경하지 않았습니다.",
        ],
      },
      {
        heading: "간결한 프로필 사진 관리 유지",
        subheading:
          "0.2.1에서 개선한 프로필 사진 조작을 Mac Hub와 Windows 팀원 앱에서 계속 사용합니다.",
        entries: [
          "사진이나 카메라를 눌러 바로 추가·변경하고, 사진이 있을 때만 아래의 작은 삭제 버튼을 사용합니다.",
          "사진은 별도 저장 버튼 없이 자동 저장하며, 작성 중인 이름과 업무 설명은 유지합니다.",
        ],
      },
    ],
  },
  {
    version: "0.2.1",
    title: "간결한 프로필 사진 관리",
    publishedAt: "2026-10-20T06:41:00Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "프로필 사진을 한곳에서 관리",
        subheading:
          "Mac Hub와 Windows 팀원 앱에서 사진을 눌러 바로 추가하거나 변경합니다.",
        entries: [
          "프로필 사진이나 카메라를 누르면 사진을 바로 추가하거나 변경할 수 있습니다. 사진이 있을 때만 사진 아래에 작은 삭제 버튼을 표시합니다.",
          "별도의 프로필 사진 설정 영역과 저장 버튼 없이 사진만 자동 저장합니다. 안내와 저장 상태는 사진 아래에서 확인하며, 작성 중인 이름과 업무 설명은 그대로 유지합니다.",
        ],
      },
      {
        heading: "사진 파일 기준과 개인정보 보호",
        subheading:
          "사진을 선택하면 크기와 해상도를 확인하고 작은 PNG로 저장합니다.",
        entries: [
          "JPG와 PNG 파일을 지원하며, 원본 파일 크기는 최대 5 MiB입니다.",
          "가로와 세로는 각각 128px 이상, 8192px 이하여야 하며 전체 해상도는 20MP 이하여야 합니다. 512 × 512px 정사각형 사진을 권장합니다.",
          "저장하는 사진은 가로·세로 최대 256px, 최대 256 KiB의 PNG로 변환합니다.",
          "원본 파일과 사진 메타데이터는 저장하지 않습니다.",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    title: "안전한 OTA 업데이트와 팀 알림 개선",
    publishedAt: "2026-10-20T06:18:54Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "OTA 소프트웨어 업데이트",
        subheading:
          "Mac Hub와 Windows 팀원 앱에서 새 버전을 안전하게 확인하고 설치합니다.",
        entries: [
          "Windows 팀원 앱의 설치 후 실행 파일명은 DocAI-forTeamMemebr.exe로 통일했습니다.",
          "자동 업데이트는 기본으로 켜지며, 업무 중 앱을 종료하지 않고 다음 정상 종료 뒤 설치합니다.",
          "설정에서 현재 버전, 최신 버전, 마지막 확인 시각과 업데이트 상태를 한눈에 확인할 수 있습니다.",
          "업데이트 확인, 다운로드, 지금 설치를 상태에 맞는 하나의 버튼으로 진행할 수 있습니다.",
          "다운로드 파일은 서명, 크기와 SHA-256을 모두 확인한 뒤에만 설치합니다.",
        ],
      },
      {
        heading: "문서 사진 첨부",
        subheading:
          "Mac Hub와 Windows 팀원 앱 모두에서 감사 대상 문서의 사진을 관리합니다.",
        entries: [
          "Mac Hub와 Windows 팀원 앱에서 문서 사진을 새로 첨부할 수 있습니다.",
          "첨부한 사진을 다른 사진으로 변경하거나 문서에서 제거할 수 있습니다.",
          "Mac에서는 상단 사진과 카메라 버튼으로 사진을 바꾸고 가까운 저장 버튼으로 반영합니다. Windows에서는 사진 옆 저장 버튼과 저장 대기 안내를 확인할 수 있습니다.",
        ],
      },
      {
        heading: "6단계 위험도 표시",
        subheading:
          "감사 결과의 위험 수준을 글자와 도장 형태로 함께 구분합니다.",
        entries: [
          "위험도를 최저, 저, 중, 필수확인, 고, 최고리스크의 6단계로 표시합니다.",
          "각 위험도는 기울어진 사각형 도장 배지로 표시해 문서에서 빠르게 알아볼 수 있습니다.",
        ],
      },
      {
        heading: "Windows 화면 테마",
        subheading:
          "Windows 팀원 앱의 화면 분위기를 업무 환경에 맞게 선택합니다.",
        entries: [
          "각 테마는 라이트와 다크 모드를 지원하며, 기본값은 Notion 테마입니다.",
          "Notion, Blueprint, Adobe에서 영감을 받은 그라디언트, Aqua Glass, 선명한 Kakao Yellow, 여백을 넓게 둔 Spotify Green의 6개 테마를 제공합니다.",
          "카드, 버튼과 입력 영역에 일관된 둥근 모서리를 적용했습니다.",
        ],
      },
      {
        heading: "팀과 장치 연결",
        subheading:
          "관리자와 팀원이 초대, 연결, 승인 상태를 더 분명하게 확인합니다.",
        entries: [
          "관리자는 직원 이름과 이메일을 지정해 장치 연결 링크가 포함된 초대 메일을 작성할 수 있습니다.",
          "장치 연결 코드·링크와 팀 계정 초대 코드를 구분해 안내합니다.",
          "팀 관리에서 최상위 관리자, 역할, 권한과 멤버 승인·중단 상태를 관리할 수 있습니다.",
        ],
      },
      {
        heading: "문서 감사와 알림",
        subheading:
          "규정 위반 가능성을 더 일찍 발견하고 근거와 수정 방향을 확인합니다.",
        entries: [
          "추가공사, 설계변경과 구두 지시의 문서화 누락 가능성을 탐지해 알립니다.",
          "폴더별로 연결된 AI 제공사와 모델을 선택하고 감사 결과를 기록합니다.",
          "알림과 감사 기록에서 근거 규정, 대상 문서와 수정 권고를 확인할 수 있습니다.",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    title: "DocAI 초기 기준 버전",
    publishedAt: "2026-10-20T00:00:00Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "Mac Hub",
        subheading:
          "규정집과 업무 문서를 한곳에서 관리하는 기본 Hub 환경을 제공합니다.",
        entries: [
          "규정집, 문서함과 수정본 폴더를 지정하고 변경 사항을 감지합니다.",
          "감사 기록과 규정 알림을 확인하는 기본 화면을 제공합니다.",
        ],
      },
      {
        heading: "Windows 팀원 앱",
        subheading:
          "직원이 지정한 업무 폴더를 Hub와 연결하는 첫 번째 클라이언트를 제공합니다.",
        entries: [
          "장치 연결 코드 또는 링크로 회사 Hub에 등록할 수 있습니다.",
          "팀 계정으로 로그인하고 관리자의 승인을 기다릴 수 있습니다.",
        ],
      },
    ],
  },
] as const satisfies readonly DocAiRelease[];

export const latestDocAiRelease = docAiReleases[0];

export const docAiReleaseNotes = {
  publicUrl: DOC_AI_RELEASE_NOTES_URL,
  seo: {
    title: "DocASI 릴리스 노트 | DevFirm",
    description:
      "DocASI(도카시) Mac Hub와 Windows 팀원 앱의 최신 버전, 새 기능과 개선 사항을 확인하세요.",
    siteName: "DevFirm",
    locale: "ko_KR",
    ogImage: {
      url: "https://www.devfirm.co/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "DevFirm DocASI 릴리스 노트",
    },
  },
  breadcrumb: {
    label: "현재 위치",
    parent: "DocASI 팀 시작 안내",
    parentHref: "/solutions/docasi/start",
    current: "릴리스 노트",
  },
  hero: {
    eyebrow: "DOCASI RELEASE NOTES",
    title: "DocASI 릴리스 노트",
    lead: "Mac Hub와 Windows 팀원 앱의 새 기능, 개선 사항과 업데이트 내용을 버전별로 확인하세요.",
    latestLabel: "최신 안정 버전",
  },
  releasesLabel: "버전별 변경 사항",
  detailsHint: "버전을 선택하면 자세한 변경 사항을 볼 수 있습니다.",
} as const;
