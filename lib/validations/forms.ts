import { z } from "zod";
import { forms } from "@/content/forms";
import { courses } from "@/content/courses";

const v = forms.validation;

/** 한국 휴대폰·유선번호를 느슨하게 받는다. 하이픈 유무는 따지지 않는다. */
const phone = z
  .string()
  .trim()
  .regex(/^0\d{1,2}-?\d{3,4}-?\d{4}$/, v.phoneInvalid);

const consent = z.literal(true, { message: v.consentRequired });

/** 봇이 채우면 값이 들어오는 숨은 필드. 사람에게는 보이지 않는다. */
const honeypot = z.string().max(0);

export const contactSchema = z.object({
  type: z.enum(
    forms.contact.types.map((item) => item.value) as [string, ...string[]],
  ),
  name: z.string().trim().min(2, v.nameTooShort),
  company: z.string().trim().optional(),
  email: z.email(v.emailInvalid),
  phone: phone.optional().or(z.literal("")),
  message: z.string().trim().min(10, v.messageTooShort),
  consent,
  formToken: z.string(),
  website: honeypot,
});

export const applySchema = z.object({
  name: z.string().trim().min(2, v.nameTooShort),
  email: z.email(v.emailInvalid),
  phone,
  course: z.enum(courses.map((course) => course.slug) as [string, ...string[]]),
  level: z.enum(
    forms.apply.levels.map((item) => item.value) as [string, ...string[]],
  ),
  motivation: z.string().trim().min(10, v.messageTooShort),
  consent,
  formToken: z.string(),
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ApplyInput = z.infer<typeof applySchema>;

/** 서버 액션이 클라이언트로 돌려주는 결과 모양 */
export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };
