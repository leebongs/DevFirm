"use server";

import { applySchema, type FormState } from "@/lib/validations/forms";
import { verifyFormToken } from "@/lib/form-token";
import { formatBody, sendMail } from "@/lib/mail";
import { forms } from "@/content/forms";
import { courses } from "@/content/courses";

/** 수강 신청 처리(§5.14). 문의 폼과 같은 순서·같은 방어 장치를 쓴다. */
export async function submitApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const v = forms.validation;
  const raw = Object.fromEntries(formData) as Record<string, string>;

  if ((raw.website ?? "").length > 0) return { status: "success" };

  const verdict = verifyFormToken(raw.formToken ?? "", Date.now());
  if (verdict === "too-fast") return { status: "error", message: v.tooFast };
  if (verdict === "expired") return { status: "error", message: v.expired };
  if (verdict === "invalid") return { status: "error", message: v.serverError };

  const parsed = applySchema.safeParse({
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
    return { status: "error", message: forms.apply.error.desc, fieldErrors };
  }

  const data = parsed.data;
  const courseTitle =
    courses.find((course) => course.slug === data.course)?.title ?? data.course;
  const levelLabel =
    forms.apply.levels.find((item) => item.value === data.level)?.label ??
    data.level;
  const labels = forms.apply.labels;

  const result = await sendMail({
    subject: forms.apply.mailSubject(courseTitle, data.name),
    replyTo: data.email,
    text: formatBody([
      [labels.course, courseTitle],
      [labels.name, data.name],
      [labels.email, data.email],
      [labels.phone, data.phone],
      [labels.level, levelLabel],
      [labels.motivation, data.motivation],
    ]),
  });

  if (!result.delivered) {
    console.error("[submit-application] 발송 실패:", result);
    return { status: "error", message: forms.apply.error.desc };
  }

  return { status: "success" };
}
