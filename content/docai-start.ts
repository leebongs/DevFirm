export type DocAiStartIcon =
  | "bell"
  | "clipboard"
  | "cloud-off"
  | "file-clock"
  | "folder-search"
  | "key"
  | "laptop"
  | "link"
  | "lock"
  | "mail"
  | "network"
  | "shield"
  | "user"
  | "user-check";

const PUBLIC_URL = "https://www.devfirm.co/solutions/docasi/start";

export const docAiStart = {
  publicUrl: PUBLIC_URL,
  seo: {
    title: "DocASI 팀 시작 안내 | DevFirm",
    description:
      "Mac HUB에서 팀을 만들고 Windows 팀멤버용 앱을 연결해 가입, 승인, 업무 폴더 감사까지 시작하는 방법을 안내합니다.",
    siteName: "DevFirm",
    locale: "ko_KR",
    twitterCard: "summary_large_image" as const,
    ogImage: {
      url: "https://www.devfirm.co/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "DevFirm — 사람과 기계가 같이 일하는 현장을 만듭니다",
    },
  },
  hero: {
    eyebrow: "DocASI Team Onboarding",
    title: "초대받은 팀에서 DocASI를 시작하세요",
    lead: "Mac HUB에서 팀을 만들고, Windows 앱을 연결하고, 관리자 승인을 받아 내 업무 폴더의 규정 감사를 시작하는 순서입니다.",
    memberAction: {
      label: "팀 멤버 시작하기",
      href: "#member-steps",
    },
    ownerAction: {
      label: "HUB 관리자 안내",
      href: "#hub-owner",
    },
    privacy: {
      icon: "cloud-off" as const satisfies DocAiStartIcon,
      title: "계정은 회사 Mac에 저장됩니다",
      description:
        "이 페이지 URL은 인증정보를 포함하지 않는 공개 안내서입니다. DevFirm 웹사이트는 팀 계정, 비밀번호, 문서, 장치 연결 정보 또는 1회용 초대 코드를 받거나 저장하지 않습니다.",
    },
  },
  breadcrumb: {
    label: "현재 위치",
    parent: "솔루션",
    parentHref: "/solutions",
    current: "DocASI 팀 시작 안내",
  },
  audiences: {
    owner: {
      id: "hub-owner",
      badge: "HUB 관리자",
      title: "팀을 처음 만드는 분",
      items: [
        "Mac에서 DocASI HUB를 열고 첫 관리자 계정을 만듭니다.",
        "설정 → 직원 앱 연결 → 링크로 연결에서 초대할 직원 이름 옆에 이메일을 입력하고 초대 링크를 만듭니다.",
        "링크가 만들어지면 ‘이메일 보내기’를 눌러 받는 사람, 제목과 안내 문구가 채워진 메일 작성 창을 엽니다.",
        "메일에는 이 공개 시작 안내 URL과 별도로 생성된 장치 연결 링크가 포함되는지 확인합니다.",
        "팀 계정 가입이 필요하면 별도의 1회용 팀 계정 초대 코드도 안전한 방식으로 전달합니다.",
        "가입 요청의 이름과 이메일을 확인한 뒤 멤버승인 또는 멤버중단을 선택합니다.",
        "필요한 규정집과 팀 권한을 설정하고 최소 권한만 부여합니다.",
      ],
    },
    member: {
      id: "member-steps",
      badge: "팀 멤버",
      title: "초대받아 참여하는 분",
      items: [
        "초대 메일에서 회사와 관리자, 내 이름과 이메일, 공개 시작 안내 URL을 확인합니다.",
        {
          steps: [
            "For Team Member 앱을 다운로드 받아 설치합니다.",
            "사내망·Tailscale 또는 SSH로 HUB 접속 경로를 엽니다.",
            "장치 연결 코드나 링크로 기기를 등록합니다.",
          ],
        },
        "팀 계정 가입용 1회용 초대 코드를 별도로 받았다면 정확한 이름·이메일, 사용할 비밀번호와 함께 입력합니다.",
        "승인 후 업무 폴더를 선택하고 내 문서의 알림과 감사기록을 확인합니다.",
      ],
    },
  },
  setup: {
    eyebrow: "Setup Guide",
    title: "팀 연결부터 첫 감사까지, 이 순서로 진행하세요",
    lead: "관리자와 팀 멤버가 번갈아 진행합니다. 각 단계의 상태가 앱에 표시되므로 승인 전에는 업무 폴더를 연결하지 않아도 됩니다.",
    steps: [
      {
        icon: "laptop" as const satisfies DocAiStartIcon,
        title: "Hub 관리자가 팀을 처음 만듭니다",
        description:
          "Mac의 DocASI HUB에서 최상위 관리자가 이름, 이메일, 비밀번호로 첫 계정을 만듭니다. 팀 정보와 계정은 해당 Mac에 보관됩니다.",
        audience: "Hub 관리자",
      },
      {
        icon: "mail" as const satisfies DocAiStartIcon,
        title: "이름과 이메일로 연결 초대를 받습니다",
        description:
          "관리자가 장치 연결 링크에 내 이름과 이메일을 지정한 뒤 ‘이메일 보내기’를 누르면, 메일 작성 창에 공개 안내 URL과 별도의 장치 연결 링크가 채워집니다.",
        audience: "팀 멤버",
      },
      {
        icon: "clipboard" as const satisfies DocAiStartIcon,
        title: "Windows 팀멤버용 앱을 설치합니다",
        description:
          "회사에서 제공한 공식 설치 파일로 ‘DocASI 팀멤버용 for Window’를 설치한 뒤 앱을 실행합니다.",
        audience: "팀 멤버",
      },
      {
        icon: "link" as const satisfies DocAiStartIcon,
        title: "HUB 접속 경로를 확인하고 기기를 등록합니다",
        description:
          "먼저 사내망·Tailscale 또는 SSH로 Mac HUB에 닿을 수 있게 한 뒤, 관리자가 전달한 장치 연결 코드나 링크 중 하나로 기기를 등록합니다. 팀 계정 초대 코드는 이 단계에서 사용하지 않습니다.",
        audience: "팀 멤버",
      },
      {
        icon: "user" as const satisfies DocAiStartIcon,
        title: "가입하거나 기존 계정으로 로그인합니다",
        description:
          "가입할 때 1회용 팀 계정 초대 코드, 초대에 적힌 정확한 이메일과 이름, 사용할 비밀번호를 입력합니다. 이미 이 팀 계정이 있으면 이메일과 비밀번호로 로그인하세요.",
        audience: "팀 멤버",
      },
      {
        icon: "user-check" as const satisfies DocAiStartIcon,
        title: "관리자 승인을 기다립니다",
        description:
          "가입 직후에는 승인 대기 상태입니다. 최상위 관리자가 이름과 역할을 확인하고 멤버승인을 누르면 업무 설정을 시작할 수 있습니다.",
        audience: "관리자 확인",
      },
      {
        icon: "folder-search" as const satisfies DocAiStartIcon,
        title: "업무 폴더를 선택합니다",
        description:
          "Windows 앱 설정에서 감사할 업무 폴더를 지정합니다. 필요한 폴더만 선택하고 개인 문서나 무관한 폴더는 제외하세요.",
        audience: "팀 멤버",
      },
      {
        icon: "bell" as const satisfies DocAiStartIcon,
        title: "내 알림과 감사기록을 확인합니다",
        description:
          "내가 등록한 문서의 규정 알림과 수정 권고만 확인할 수 있습니다. 근거 규정과 원문 위치를 검토한 뒤 문서를 수정하세요.",
        audience: "팀 멤버",
      },
    ],
  },
  connection: {
    eyebrow: "Hub Connection",
    title: "접속 경로를 연 뒤 코드나 링크로 등록합니다",
    lead: "먼저 같은 사무실 네트워크·회사 Tailscale 또는 SSH로 Windows PC에서 Mac HUB에 닿을 수 있어야 합니다. 그 위에서 장치 연결 코드나 링크 중 하나로 기기를 등록합니다. 이 정보는 팀 계정 가입용 1회용 초대 코드와 용도가 다릅니다.",
    recommended: "일반 사용자 추천",
    methods: [
      {
        icon: "key" as const satisfies DocAiStartIcon,
        title: "장치 연결 코드",
        description:
          "HUB 접속 경로를 연 뒤 관리자에게 받은 장치 연결 코드를 Windows 앱의 ‘Hub 연결’에 입력합니다. 팀 계정 가입에 쓰는 1회용 초대 코드와는 다른 정보입니다.",
      },
      {
        icon: "link" as const satisfies DocAiStartIcon,
        title: "장치 연결 링크",
        description:
          "HUB 접속 경로를 연 뒤 관리자가 직원 이름과 이메일을 지정해 만든 링크를 Windows PC에서 엽니다. Hub 정보가 자동으로 입력되며 공개 시작 안내 URL에는 연결 정보가 들어 있지 않습니다.",
      },
      {
        icon: "network" as const satisfies DocAiStartIcon,
        title: "SSH 접속 경로",
        description:
          "HUB에 직접 닿을 수 없을 때 관리자의 안내에 따라 SSH 접속 경로를 엽니다. SSH 설정 후에도 장치 연결 코드나 링크 중 하나로 기기를 등록해야 합니다.",
      },
    ],
  },
  safety: {
    icon: "shield" as const satisfies DocAiStartIcon,
    title: "비밀 코드와 장치 연결 정보를 안전하게 다루세요",
    lead: "1회용 팀 계정 초대 코드와 장치 연결 코드·링크는 회사 HUB에 접근할 수 있는 열쇠입니다. 공개 채널에 올리지 말고 초대받은 본인만 사용하세요.",
    items: [
      {
        icon: "mail" as const satisfies DocAiStartIcon,
        title: "공개 안내 URL과 비밀 정보를 구분하기",
        description: `이 시작 안내 URL(${PUBLIC_URL})에는 인증정보가 없습니다. 팀 가입 코드와 장치 연결 링크는 이메일 초안에 별도로 포함됩니다.`,
      },
      {
        icon: "lock" as const satisfies DocAiStartIcon,
        title: "초대 코드와 장치 연결 정보를 게시하지 않기",
        description:
          "메신저 공개방, 게시판, 화면 캡처에 1회용 초대 코드나 장치 연결 코드·링크가 노출되지 않게 합니다.",
      },
      {
        icon: "cloud-off" as const satisfies DocAiStartIcon,
        title: "이 사이트에는 계정 정보를 입력하지 않기",
        description:
          "가입과 로그인, 초대 코드 입력은 DocASI 앱에서만 진행합니다. 이 안내 페이지는 입력 폼을 제공하지 않습니다.",
      },
      {
        icon: "file-clock" as const satisfies DocAiStartIcon,
        title: "만료되거나 사용한 코드는 새로 발급받기",
        description:
          "가입이나 연결이 거부되면 반복해서 시도하지 말고 관리자에게 용도에 맞는 새 팀 초대 코드 또는 장치 연결 정보를 요청합니다.",
      },
    ],
  },
  cta: {
    title: "팀 환경에 맞는 DocASI 도입 방법이 궁금하신가요?",
    description:
      "규정집 구성, 팀 권한, Windows 업무 폴더 연결 범위를 DevFirm과 상담할 수 있습니다.",
    action: "도입 상담하기",
    href: "/contact",
  },
} as const;
