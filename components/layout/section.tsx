import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionVariant = "default" | "muted" | "brand";

const VARIANT_CLASS: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  brand: "bg-brand text-brand-foreground",
};

/**
 * 섹션 수직 리듬과 배경 교대(§4.4).
 * 페이지가 밴드를 쌓아 만들어지므로 여백 규칙을 여기 한 곳에 가둔다.
 */
export function Section({
  variant = "default",
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  variant?: SectionVariant;
  containerClassName?: string;
}) {
  return (
    <section
      className={cn(
        "py-16 md:py-20 lg:py-28",
        VARIANT_CLASS[variant],
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
