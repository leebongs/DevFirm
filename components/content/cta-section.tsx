import Link from "next/link";
import { Container } from "@/components/layout/container";

/** 하단 전환 밴드(§6.3). 모든 페이지의 마지막 블록. */
export function CTASection({
  title,
  desc,
  cta,
  secondary,
}: {
  title: string;
  desc?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-brand text-brand-foreground py-16 md:py-20 lg:py-24">
      <Container>
        <h2 className="max-w-[24ch] text-[1.375rem] leading-[1.35] font-semibold break-keep lg:text-[2rem] lg:leading-[1.25]">
          {title}
        </h2>
        {desc ? (
          <p className="text-brand-foreground/80 mt-4 max-w-[68ch] leading-[1.75] break-keep">
            {desc}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={cta.href}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center rounded-md px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
          >
            {cta.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="border-brand-foreground/30 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground inline-flex min-h-11 items-center justify-center rounded-md border px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
