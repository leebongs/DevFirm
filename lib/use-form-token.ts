import { useEffect, useState } from "react";

/**
 * 폼이 마운트되면 서명된 토큰을 받아온다(§5.14).
 *
 * 페이지가 SSG 라 토큰을 정적 HTML 에 심을 수 없다. 자세한 이유는
 * app/api/form-token/route.ts 주석 참조.
 *
 * 훅 파일에 "use client" 를 붙이지 않는다 — 클라이언트 컴포넌트가 import 하면
 * 그쪽 경계에 포함된다. 지시문을 남발하면 A11 화이트리스트가 의미를 잃는다.
 */
export function useFormToken(): string {
  const [token, setToken] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/form-token")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { token?: string } | null) => {
        if (!cancelled && data?.token) setToken(data.token);
      })
      .catch(() => {
        // 토큰을 못 받으면 서버가 제출을 거부한다. 화면에는 일반 오류로 보인다.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return token;
}
