import "server-only";
import { site } from "@/content/site";

/**
 * 메일 발송 어댑터(O-1 확정: Resend + mailto 폴백).
 *
 * 공급자를 여기서만 안다. Resend SDK 대신 REST 를 직접 호출하는 이유는
 * 의존성을 하나 줄이고 공급자 교체 지점을 이 파일 안에 가두기 위해서다.
 *
 * **발송 도메인 주의**: SPF/DKIM 은 O-6 에서 정한 신규 devfirm 도메인에
 * 걸어야 한다. 도메인 확보 전에는 RESEND_API_KEY 를 두지 않고 mailto 폴백으로
 * 운영한다 — 인증되지 않은 도메인으로 보내면 스팸함으로 직행한다.
 */

export type MailPayload = {
  subject: string;
  /** 사람이 읽을 본문. 폼 입력을 라벨과 함께 나열한 것 */
  text: string;
  /** 답장 대상(문의자 이메일) */
  replyTo?: string;
};

export type MailResult =
  | { delivered: true }
  | { delivered: false; reason: "not-configured" }
  | { delivered: false; reason: "provider-error"; detail: string };

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

export async function sendMail(payload: MailPayload): Promise<MailResult> {
  // E2E 전용 모드. 실제 발송 없이 성공 경로를 검증한다(§9.2 "메일 발송은 목킹").
  // 프로덕션에서 켜지지 않도록 값이 정확히 "mock" 일 때만 동작한다.
  if (process.env.MAIL_TRANSPORT === "mock") {
    console.info("[mail:mock]", payload.subject);
    return { delivered: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;

  if (!apiKey || !from) return { delivered: false, reason: "not-configured" };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [process.env.MAIL_TO ?? site.email],
      subject: payload.subject,
      text: payload.text,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    return {
      delivered: false,
      reason: "provider-error",
      detail: `${response.status} ${await response.text()}`,
    };
  }

  return { delivered: true };
}

/** 라벨과 값을 사람이 읽을 수 있는 본문으로 만든다 */
export function formatBody(entries: [string, string][]): string {
  return entries
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}
