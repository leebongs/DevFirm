"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/submit-contact";
import { Field, inputClass } from "./field";
import { useFormToken } from "@/lib/use-form-token";
import { forms } from "@/content/forms";
import type { FormState } from "@/lib/validations/forms";

const INITIAL: FormState = { status: "idle" };

/**
 * 문의 폼(§5.16).
 *
 * react-hook-form 대신 서버 액션 + 서버 zod 로 간다(§12.1 D-11).
 * JS 없이도 제출이 되고, 클라이언트 번들에 폼 라이브러리를 싣지 않아
 * A8 예산에도 유리하다. 검증의 단일 진실원천은 서버 스키마다.
 *
 * 성공 시 별도 페이지로 보내지 않고 인라인 상태로 바꾼다. aria-live 로
 * 스크린리더에도 결과가 전달된다(Phase 4 DoD).
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  const token = useFormToken();
  const t = forms.contact;
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-border bg-muted rounded-lg border p-6"
      >
        <p className="font-semibold">{t.success.title}</p>
        <p className="text-muted-foreground mt-2 text-sm break-keep">
          {t.success.desc}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="formToken" value={token} />

      {/* honeypot — 사람에게 보이지 않지만 스크린리더에도 잡히지 않아야 한다 */}
      <div className="hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field id="contact-type" label={t.labels.type} required>
        {(props) => (
          <select {...props} name="type" className={inputClass} defaultValue="">
            <option value="" disabled />
            {t.types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        id="contact-name"
        label={t.labels.name}
        error={errors.name}
        required
      >
        {(props) => (
          <input
            {...props}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.placeholders.name}
            className={inputClass}
          />
        )}
      </Field>

      <Field id="contact-company" label={t.labels.company}>
        {(props) => (
          <input
            {...props}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={t.placeholders.company}
            className={inputClass}
          />
        )}
      </Field>

      <Field
        id="contact-email"
        label={t.labels.email}
        error={errors.email}
        required
      >
        {(props) => (
          <input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.placeholders.email}
            className={inputClass}
          />
        )}
      </Field>

      <Field id="contact-phone" label={t.labels.phone} error={errors.phone}>
        {(props) => (
          <input
            {...props}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t.placeholders.phone}
            className={inputClass}
          />
        )}
      </Field>

      <Field
        id="contact-message"
        label={t.labels.message}
        error={errors.message}
        required
      >
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={6}
            placeholder={t.placeholders.message}
            className={inputClass}
          />
        )}
      </Field>

      <div className="space-y-2">
        <label
          htmlFor="contact-consent"
          className="flex items-start gap-3 text-sm"
        >
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-describedby="contact-consent-note"
            aria-invalid={errors.consent ? true : undefined}
            className="border-input accent-primary mt-0.5 size-4 rounded"
          />
          <span className="break-keep">{t.labels.consent}</span>
        </label>
        <p
          id="contact-consent-note"
          className="text-muted-foreground text-xs break-keep"
        >
          {t.consentNote}
        </p>
        {errors.consent ? (
          <p className="text-destructive text-xs">{errors.consent}</p>
        ) : null}
      </div>

      {/* 서버 오류·검증 실패의 요약. 필드 에러와 별개로 한 번 더 알린다 */}
      <div aria-live="assertive">
        {state.status === "error" ? (
          <div className="border-destructive/30 bg-destructive/5 rounded-md border p-4">
            <p className="text-destructive text-sm font-medium">
              {t.error.title}
            </p>
            <p className="text-muted-foreground mt-1 text-xs break-keep">
              {state.message}
            </p>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex min-h-11 w-full items-center justify-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60 sm:w-auto"
      >
        {pending ? t.labels.submitting : t.labels.submit}
      </button>
    </form>
  );
}
