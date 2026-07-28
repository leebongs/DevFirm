import { NextResponse } from "next/server";
import { issueFormToken } from "@/lib/form-token";

/**
 * 폼 토큰 발급(§5.14).
 *
 * 폼 페이지는 전면 SSG 다. 토큰을 페이지 렌더 시점에 심으면 **빌드 시각**이
 * 서명되어 배포 30분 뒤부터 모든 제출이 만료로 거부된다. 그래서 토큰만
 * 동적으로 떼어내 폼이 마운트될 때 받아온다.
 *
 * 부수 효과로 스팸 비용도 올라간다 — 봇이 폼을 그대로 POST 하는 것으로는
 * 부족하고 이 엔드포인트를 먼저 호출해야 한다.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { token: issueFormToken(Date.now()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
