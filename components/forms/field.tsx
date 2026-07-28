import { cn } from "@/lib/utils";

/**
 * 폼 필드 껍데기.
 *
 * 라벨·에러·설명의 연결(aria-describedby)을 한 곳에서 처리한다.
 * 이 연결이 빠지면 스크린리더 사용자는 어떤 필드가 왜 틀렸는지 알 수 없다
 * (Phase 4 DoD).
 *
 * "use client" 를 붙이지 않는다 — 클라이언트 폼이 import 하면 그 경계에
 * 포함되고, 상태를 갖지 않으므로 지시문이 필요 없다.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    required?: boolean;
  }) => React.ReactNode;
  className?: string;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-destructive ml-1" aria-hidden>
            *
          </span>
        ) : null}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })}

      {hint ? (
        <p id={hintId} className="text-muted-foreground text-xs break-keep">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-destructive text-xs break-keep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "border-input focus-visible:ring-ring aria-invalid:border-destructive w-full rounded-md border bg-background px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none";
