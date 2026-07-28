import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 시간 기반 서명 토큰(§5.14).
 *
 * 폼을 렌더한 시각을 HMAC 으로 서명해 숨은 필드에 넣고, 제출 시 검증한다.
 *   - 3초 미만 제출 거부: 사람이 채울 수 없는 속도
 *   - 30분 초과 만료: 오래 열어둔 탭에서 재사용되는 것을 막는다
 *
 * **in-memory rate limit 을 두지 않는 이유**: Vercel 서버리스 함수는
 * 인스턴스 간 메모리를 공유하지 않는다. 카운터를 프로세스 메모리에 두면
 * 인스턴스가 늘어날수록 실효 한도가 그만큼 곱해져 사실상 없는 것과 같다.
 * IP·세션 단위의 실질적 제한이 필요하면 Upstash Redis 같은 외부 저장소가
 * 선행되어야 하며, 이는 Phase 6 범위다(§10 O-1).
 */

const MIN_AGE_MS = 3_000;
const MAX_AGE_MS = 30 * 60 * 1_000;

function secret(): string | null {
  return process.env.FORM_TOKEN_SECRET ?? null;
}

export function issueFormToken(now: number): string {
  const key = secret();
  const issuedAt = String(now);
  if (!key) return `${issuedAt}.`;
  const signature = createHmac("sha256", key).update(issuedAt).digest("hex");
  return `${issuedAt}.${signature}`;
}

export type TokenVerdict = "ok" | "too-fast" | "expired" | "invalid";

export function verifyFormToken(token: string, now: number): TokenVerdict {
  const key = secret();

  // 시크릿이 없으면 서명을 검증할 수 없다.
  // 개발 중에는 폼을 막지 않되(경고만), 프로덕션에서는 통과시키지 않는다.
  // 조용히 약해지는 것보다 눈에 띄게 실패하는 편이 낫다.
  if (!key) {
    if (process.env.NODE_ENV === "production") return "invalid";
    console.warn(
      "[form-token] FORM_TOKEN_SECRET 미설정 — 개발 환경이라 서명 검증을 건너뜁니다.",
    );
  }

  const [issuedAtRaw, signature] = token.split(".");
  if (!issuedAtRaw) return "invalid";

  if (key) {
    const expected = createHmac("sha256", key)
      .update(issuedAtRaw)
      .digest("hex");
    const given = signature ?? "";
    if (given.length !== expected.length) return "invalid";
    if (
      !timingSafeEqual(
        Buffer.from(given, "utf8"),
        Buffer.from(expected, "utf8"),
      )
    ) {
      return "invalid";
    }
  }

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt)) return "invalid";

  const age = now - issuedAt;
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}
