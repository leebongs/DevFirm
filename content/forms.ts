/**
 * 폼 라벨·안내·검증 메시지(§5.14, §5.16).
 *
 * 검증 메시지까지 여기 두는 이유는 zod 스키마와 화면이 같은 문구를 쓰게 하기
 * 위해서다. 서버와 클라이언트가 다른 말을 하면 사용자가 혼란스럽다.
 */
export const forms = {
  contact: {
    hero: {
      eyebrow: "문의",
      title: "무엇을 도와드릴까요",
      lead: "어떤 일인지 짧게만 적어주셔도 됩니다. 담당자가 확인 후 연락드립니다.",
    },
    types: [
      { value: "solution", label: "AI 솔루션 도입" },
      { value: "development", label: "개발 의뢰" },
      { value: "staffing", label: "인재파견" },
      { value: "academy", label: "아카데미" },
      { value: "workspace", label: "공유오피스 입주" },
      { value: "etc", label: "기타" },
    ],
    labels: {
      type: "문의 유형",
      name: "이름",
      company: "회사 · 소속",
      email: "이메일",
      phone: "연락처",
      message: "문의 내용",
      consent: "개인정보 수집·이용에 동의합니다",
      submit: "문의 보내기",
      submitting: "보내는 중",
    },
    placeholders: {
      name: "홍길동",
      company: "회사명 (선택)",
      email: "name@example.com",
      phone: "010-0000-0000 (선택)",
      message: "어떤 상황인지, 무엇이 필요한지 알려주세요.",
    },
    consentNote:
      "문의 처리와 답변을 위해 이름·연락처·이메일·문의 내용을 수집합니다. 처리 완료 후 3년간 보관하고 파기합니다.",
    mailSubject: (type: string, name: string) => `[문의] ${type} — ${name}`,
    success: {
      title: "문의를 받았습니다",
      desc: "영업일 기준 1~2일 안에 연락드립니다.",
    },
    error: {
      title: "보내지 못했습니다",
      desc: "잠시 후 다시 시도해 주세요. 계속 안 되면 아래 전화나 메일로 연락 주세요.",
    },
  },

  apply: {
    hero: {
      eyebrow: "수강 신청",
      title: "아카데미 과정 신청서",
      lead: "지금 수준에 맞는 과정인지 함께 확인한 뒤 배정합니다.",
    },
    levels: [
      { value: "none", label: "처음입니다" },
      { value: "basic", label: "기초는 알고 있습니다" },
      { value: "practical", label: "실무 경험이 있습니다" },
    ],
    labels: {
      name: "이름",
      email: "이메일",
      phone: "연락처",
      course: "희망 과정",
      level: "경력 수준",
      motivation: "지원 동기",
      consent: "개인정보 수집·이용에 동의합니다",
      submit: "신청서 보내기",
      submitting: "보내는 중",
    },
    placeholders: {
      name: "홍길동",
      email: "name@example.com",
      phone: "010-0000-0000",
      motivation: "무엇을 만들고 싶은지, 왜 배우려는지 적어주세요.",
    },
    consentNote:
      "수강 상담과 배정을 위해 이름·연락처·이메일·지원 내용을 수집합니다. 상담 종료 후 1년간 보관하고 파기합니다.",
    mailSubject: (course: string, name: string) =>
      `[수강신청] ${course} — ${name}`,
    success: {
      title: "신청서를 받았습니다",
      desc: "담당자가 확인 후 상담 일정을 안내드립니다.",
    },
    error: {
      title: "보내지 못했습니다",
      desc: "잠시 후 다시 시도해 주세요.",
    },
  },

  /** zod 스키마와 화면이 공유하는 검증 메시지 */
  validation: {
    required: "필수 입력입니다",
    nameTooShort: "이름을 입력해 주세요",
    emailInvalid: "이메일 형식이 올바르지 않습니다",
    phoneInvalid: "연락처 형식이 올바르지 않습니다",
    messageTooShort: "10자 이상 입력해 주세요",
    consentRequired: "동의해야 제출할 수 있습니다",
    tooFast: "잠시 후 다시 시도해 주세요",
    expired: "입력 시간이 만료되었습니다. 새로고침 후 다시 시도해 주세요",
    serverError: "처리 중 문제가 발생했습니다",
  },
} as const;
