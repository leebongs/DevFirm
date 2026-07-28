"use client";

import { useActionState, useEffect, useState } from "react";
import { submitApplication } from "@/app/actions/submit-application";
import { Field, inputClass } from "./field";
import { useFormToken } from "@/lib/use-form-token";
import { forms } from "@/content/forms";
import { courses } from "@/content/courses";
import type { FormState } from "@/lib/validations/forms";

const INITIAL: FormState = { status: "idle" };

/** 수강 신청 폼(§5.14). 구조는 ContactForm 과 동일하다. */
export function ApplyForm() {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    INITIAL,
  );
  const token = useFormToken();
  const t = forms.apply;
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  // 과정 상세에서 `?course=` 를 달고 들어오면 해당 과정을 미리 골라준다.
  // useSearchParams 대신 마운트 후 URL 을 읽는다 — 이 페이지를 SSG 로 두면서
  // Suspense 경계를 추가하지 않기 위해서다(P5 정적 우선).
  const [course, setCourse] = useState("");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("course");
    if (requested && courses.some((item) => item.slug === requested)) {
      setCourse(requested);
    }
  }, []);

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

      <div className="hidden" aria-hidden>
        <label htmlFor="apply-website">Website</label>
        <input
          id="apply-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        id="apply-course"
        label={t.labels.course}
        error={errors.course}
        required
      >
        {(props) => (
          <select
            {...props}
            name="course"
            className={inputClass}
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          >
            <option value="" disabled />
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="apply-name" label={t.labels.name} error={errors.name} required>
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

      <Field
        id="apply-email"
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

      <Field
        id="apply-phone"
        label={t.labels.phone}
        error={errors.phone}
        required
      >
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
        id="apply-level"
        label={t.labels.level}
        error={errors.level}
        required
      >
        {(props) => (
          <select
            {...props}
            name="level"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled />
            {t.levels.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        id="apply-motivation"
        label={t.labels.motivation}
        error={errors.motivation}
        required
      >
        {(props) => (
          <textarea
            {...props}
            name="motivation"
            rows={6}
            placeholder={t.placeholders.motivation}
            className={inputClass}
          />
        )}
      </Field>

      <div className="space-y-2">
        <label
          htmlFor="apply-consent"
          className="flex items-start gap-3 text-sm"
        >
          <input
            id="apply-consent"
            name="consent"
            type="checkbox"
            required
            aria-describedby="apply-consent-note"
            aria-invalid={errors.consent ? true : undefined}
            className="border-input accent-primary mt-0.5 size-4 rounded"
          />
          <span className="break-keep">{t.labels.consent}</span>
        </label>
        <p
          id="apply-consent-note"
          className="text-muted-foreground text-xs break-keep"
        >
          {t.consentNote}
        </p>
        {errors.consent ? (
          <p className="text-destructive text-xs">{errors.consent}</p>
        ) : null}
      </div>

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
