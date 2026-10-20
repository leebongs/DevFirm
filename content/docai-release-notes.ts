export const DOC_AI_RELEASE_NOTES_PATH = "/solution/DocASI/releasenote";
export const LEGACY_DOC_AI_RELEASE_NOTES_PATH = "/solution/DocAI/releasenote";
export const DOC_AI_RELEASE_NOTES_URL =
  "https://www.devfirm.co/solution/DocASI/releasenote";

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
    version: "0.2.9",
    title: "기존 로그인 유지와 OTA 재시작 안정성 개선",
    publishedAt: "2026-10-20T13:45:00Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "Mac Hub 로그인 세션 유지",
        subheading:
          "일반 DocASI 업데이트에서도 검증된 로그인 상태를 그대로 이어서 사용합니다.",
        entries: [
          "기존 암호화 desktop-session을 복호화하고 팀 멤버 인증까지 검증한 뒤 같은 세션 데이터를 유지합니다.",
          "브랜드 전환용 로그인 이전 정보가 없는 0.2.7 이후 DocASI 업데이트도 정상적으로 시작합니다.",
          "복호화할 수 없는 구형 암호문은 기존 0.2.6 전환 브리지를 거쳐야 하며, 검증되지 않은 세션을 임의로 사용하지 않습니다.",
        ],
      },
      {
        heading: "OTA 재시작 실패 복구",
        subheading:
          "새 앱 시작에 실패해도 업데이트 절차가 멈추지 않고 기존 앱으로 안전하게 돌아갑니다.",
        entries: [
          "업데이트 뒤 시작 실패는 차단 대화상자로 프로세스를 붙잡지 않고 즉시 종료해 기존 앱 복구를 진행합니다.",
          "업데이트 도우미가 시작한 하위 프로세스에는 먼저 종료를 요청하고, 응답하지 않으면 강제 종료한 뒤 완전히 끝났는지 확인합니다.",
          "새 앱 프로세스가 종료된 사실을 확인한 뒤에만 앱 번들을 원래 버전으로 되돌립니다.",
        ],
      },
      {
        heading: "플랫폼 버전 동기화",
        subheading:
          "Mac Hub와 Windows 팀원 앱을 같은 0.2.9 버전으로 제공합니다.",
        entries: [
          "Mac은 DocASI Hub 표시와 DocASI 기본 워크스페이스 이전을 유지하며 팀·TLS·클라이언트 정보를 보존합니다.",
          "Windows 연결 화면은 연결 방식 선택 상태와 초대 링크 입력 정보를 일관되게 반영하며, 기존 연결 설정과 계정 데이터를 유지합니다.",
          "OTA 파일은 ECDSA 서명과 SHA-256으로 검증합니다. Apple 공증과 Windows 게시자 코드 서명은 아직 포함되지 않아 운영체제 경고가 나타날 수 있습니다.",
        ],
      },
    ],
  },
  {
    version: "0.2.8",
    title: "Mac 워크스페이스 이전과 Hub 표시 개선",
    publishedAt: "2026-10-20T13:20:00Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "Mac 워크스페이스 ROOT 이전",
        subheading:
          "기존 DocAI 기본 워크스페이스를 DocASI 경로로 옮기고 앱 전체가 새 ROOT를 사용하도록 정리했습니다.",
        entries: [
          "기존 기본 폴더만 있으면 ~/Documents/DocAI 전체를 ~/Documents/DocASI로 옮기고 새 경로를 workspace-root.json에 기록합니다.",
          "규정집·문서함·수정본, 규칙 캐시, 감사 기록, 팀 상태와 TLS 인증서 등 .docai 내부 데이터를 그대로 보존합니다.",
          "저장된 폴더·문서·인증서 경로와 문서 스레드·알림 참조를 새 ROOT에 맞추며, 외부 사용자 지정 폴더는 변경하지 않습니다.",
        ],
      },
      {
        heading: "충돌 방지와 실패 원복",
        subheading:
          "데이터가 불완전하게 합쳐지거나 원본이 사라지지 않도록 이전 단계를 검증합니다.",
        entries: [
          "기존 DocAI와 DocASI 기본 폴더가 모두 있으면 자동 병합하지 않고 두 경로를 안내해 사용자가 확인하도록 합니다.",
          "설정 교체나 폴더 이동이 실패하면 원본 파일과 권한을 복원하고, 원복까지 실패하면 복구 파일의 위치를 명확히 안내합니다.",
          "이전이 끝난 뒤 watcher, Store, Pipeline과 Hub가 새 DocASI 경로를 사용해 예전 폴더를 다시 만들지 않도록 했습니다.",
        ],
      },
      {
        heading: "Mac Dock 표시 이름",
        subheading:
          "Hub 역할을 바로 구분할 수 있도록 macOS Dock 표시 이름을 정리했습니다.",
        entries: [
          "Mac Dock에 표시되는 이름은 DocASI Hub이며, 내부 앱 이름은 DocASI를 유지합니다.",
          "제품 식별자 co.devfirm.docasi와 설치 파일 DocASI-0.2.8-universal.dmg는 정식 DocASI 계약을 유지합니다.",
          "Windows 팀원 앱은 DocASI-forTeamMemebr-Setup-0.2.8-win-x64.exe 이름으로 함께 배포됩니다.",
        ],
      },
    ],
  },
  {
    version: "0.2.7",
    title: "DocASI 리브랜딩과 안전한 데이터 이전",
    publishedAt: "2026-10-20T12:21:00Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "DocASI 정식 제품 전환",
        subheading:
          "설치 파일부터 실행 중인 앱까지 DocASI 명칭과 제품 식별자를 일관되게 사용합니다.",
        entries: [
          "Mac 설치 파일은 DocASI-0.2.7-universal.dmg, Windows 설치 파일은 DocASI-forTeamMemebr-Setup-0.2.7-win-x64.exe 이름을 사용합니다.",
          "Mac 앱 번들, 실행 파일과 Windows 앱 표시 이름·실행 파일·설치 정보에 DocASI 브랜드를 적용했습니다.",
          "업데이트 제품 ID는 co.devfirm.docasi, 공개 업데이트 주소는 /updates/docasi/stable.json으로 전환했습니다.",
        ],
      },
      {
        heading: "기존 데이터의 안전한 이전",
        subheading:
          "기존 DocAI 설치를 발견하면 사용자 설정과 연결 정보를 잃지 않도록 검증하며 옮깁니다.",
        entries: [
          "Mac Hub와 Windows 팀원 앱은 기존 저장 위치를 인식하고 정식 DocASI 저장 위치로 이전합니다.",
          "이전 작업은 경로와 파일 유형을 확인한 뒤 진행하며, 실패하면 기존 앱과 데이터를 보존해 다시 실행할 수 있습니다.",
          "기존 연결 토큰, 팀 설정과 사용자가 지정한 업무 폴더를 유지하도록 마이그레이션 회귀 검사를 추가했습니다.",
        ],
      },
      {
        heading: "기존 Mac Hub 업데이트 방법",
        subheading:
          "로그인 상태와 기존 데이터를 안전하게 이어 가려면 앱 안의 OTA 업데이트를 사용하세요.",
        entries: [
          "기존 DocAI 사용자는 설정의 OTA 소프트웨어 업데이트에서 0.2.2 → 0.2.6 → 0.2.7 순서로 업데이트하는 방법을 권장합니다. 이 경로는 로그인 상태 보존을 지원합니다.",
          "설치 파일을 직접 내려받아 수동으로 설치하면 다시 로그인해야 할 수 있지만, 기존 데이터는 유지됩니다.",
          "DocASI에서 기존 데이터가 정상적으로 보이는지 확인한 뒤 예전 DocAI 앱을 완전히 종료하고 응용 프로그램의 DocAI 앱 번들만 삭제하세요. Documents 폴더와 그 안의 데이터는 삭제하지 마세요.",
        ],
      },
      {
        heading: "다른 장치와 네트워크에서의 연결 안정성",
        subheading:
          "특정 Mac이나 Windows PC 이름에 의존하지 않고 새 장치에서도 연결 절차를 완료할 수 있게 했습니다.",
        entries: [
          "팀·기관 이름을 Hub에서 관리하고 Windows 팀원 앱의 연결 확인과 완료 안내에 표시합니다.",
          "새 Windows PC에서 SSH 키를 안전하게 만들고, 공백이 있는 사용자 경로에서도 엄격한 호스트 키 검증을 유지합니다.",
          "Mac 업데이트 통신은 운영체제의 프록시와 PAC 설정을 따르며 서명, 크기와 SHA-256 검증을 계속 적용합니다.",
        ],
      },
    ],
  },
  {
    version: "0.2.6",
    title: "DocASI 전환 준비 및 연결 안정성 개선",
    publishedAt: "2026-10-20T12:20:00Z",
    displayDate: "2026. 10. 20.",
    groups: [
      {
        heading: "기존 Mac Hub를 위한 전환 브리지",
        subheading:
          "설치된 DocAI Hub가 정식 DocASI 버전으로 안전하게 넘어가기 위한 한 번의 호환 업데이트입니다.",
        entries: [
          "0.2.6은 기존 앱이 검증할 수 있는 DocAI 제품 ID와 설치 파일명을 유지하는 마지막 브리지 버전입니다.",
          "화면에는 DocASI 브랜드를 표시하지만 앱 번들과 데이터 위치는 이 단계에서 이동하지 않습니다.",
          "브리지 설치 뒤 정식 DocASI 업데이트 주소에서 0.2.7을 확인하고, 다음 설치 단계에서 제품 식별자와 데이터를 이전합니다.",
        ],
      },
      {
        heading: "업데이트 계약 분리",
        subheading:
          "구버전 호환 파일과 정식 DocASI 파일이 한 릴리스에서 섞이지 않도록 발행 절차를 강화했습니다.",
        entries: [
          "0.2.6 브리지와 0.2.7 이후 정식 릴리스의 제품 ID, 파일명과 릴리스 노트 주소를 각각 엄격하게 검사합니다.",
          "기존 업데이트 서명 키를 유지해 브리지와 정식 버전 모두 같은 신뢰 체인으로 검증합니다.",
        ],
      },
    ],
  },
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
