"use server";

import { contactSchema, type FormState } from "@/lib/validations/forms";
import { verifyFormToken } from "@/lib/form-token";
import { formatBody, sendMail } from "@/lib/mail";
import { forms } from "@/content/forms";

/**
 * 문의 폼 처리(§5.14).
 *
 * 순서가 중요하다: 스팸 판정을 먼저 하고 그 다음에 값 검증을 한다.
 * 봇에게 어떤 필드가 왜 틀렸는지 알려줄 이유가 없다.
 */
export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const v = forms.validation;
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // 1) honeypot — 사람에게 보이지 않는 필드가 채워졌다면 봇이다.
  //    성공한 것처럼 응답해 봇이 재시도하지 않게 한다.
  if ((raw.website ?? "").length > 0) return { status: "success" };

  // 2) 시간 기반 서명 토큰
  const verdict = verifyFormToken(raw.formToken ?? "", Date.now());
  if (verdict === "too-fast") return { status: "error", message: v.tooFast };
  if (verdict === "expired") return { status: "error", message: v.expired };
  if (verdict === "invalid") return { status: "error", message: v.serverError };

  // 3) 값 검증
  const parsed = contactSchema.safeParse({
    ...raw,
    consent: raw.consent === "on" || raw.consent === "true",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", message: forms.contact.error.desc, fieldErrors };
  }

  const data = parsed.data;
  const typeLabel =
    forms.contact.types.find((item) => item.value === data.type)?.label ??
    data.type;
  const labels = forms.contact.labels;

  const result = await sendMail({
    subject: forms.contact.mailSubject(typeLabel, data.name),
    replyTo: data.email,
    text: formatBody([
      [labels.type, typeLabel],
      [labels.name, data.name],
      [labels.company, data.company ?? ""],
      [labels.email, data.email],
      [labels.phone, data.phone ?? ""],
      [labels.message, data.message],
    ]),
  });

  // 공급자 미설정은 사용자 잘못이 아니다. 화면이 mailto 폴백을 안내하므로
  // 여기서는 오류로 알리고 원인은 로그에 남긴다.
  if (!result.delivered) {
    console.error("[submit-contact] 발송 실패:", result);
    return { status: "error", message: forms.contact.error.desc };
  }

  return { status: "success" };
}
