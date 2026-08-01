"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ui } from "@/content/ui";

/**
 * 런타임 오류 경계.
 *
 * Next 의 error.tsx 는 규약상 반드시 클라이언트 컴포넌트여야 한다(reset 콜백을
 * 받는다). §6.4 화이트리스트는 프로젝트 소유 컴포넌트에 대한 규칙이고 이것은
 * 프레임워크 파일 규약이므로, 검사 스크립트는 app/ 의 error.tsx 를 예외로 둔다.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex-1 py-24 lg:py-32">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold lg:text-[2.75rem] lg:leading-[1.15]">
        {ui.error.errorTitle}
      </h1>
      <p className="text-muted-foreground mt-5 max-w-[68ch] leading-[1.75]">
        {ui.error.errorBody}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex min-h-11 items-center rounded-md px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
        >
          {ui.error.retry}
        </button>
        <Link
          href="/"
          className="border-border hover:bg-muted focus-visible:ring-ring inline-flex min-h-11 items-center rounded-md border px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
        >
          {ui.error.goHome}
        </Link>
      </div>
    </Container>
  );
}
