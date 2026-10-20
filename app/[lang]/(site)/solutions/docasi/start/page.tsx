import type { Metadata } from "next";
import Link from "next/link";
import {
  BellRing,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  CloudOff,
  FileClock,
  FolderSearch,
  KeyRound,
  Laptop,
  Link2,
  LockKeyhole,
  MailCheck,
  Network,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { docAiStart, type DocAiStartIcon } from "@/content/docai-start";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { localeHref } from "@/lib/locale-href";

const icons = {
  bell: BellRing,
  clipboard: ClipboardCheck,
  "cloud-off": CloudOff,
  "file-clock": FileClock,
  "folder-search": FolderSearch,
  key: KeyRound,
  laptop: Laptop,
  link: Link2,
  lock: LockKeyhole,
  mail: MailCheck,
  network: Network,
  shield: ShieldCheck,
  user: CircleUserRound,
  "user-check": UserCheck,
} satisfies Record<DocAiStartIcon, typeof BellRing>;

export const metadata: Metadata = {
  title: docAiStart.seo.title,
  description: docAiStart.seo.description,
  alternates: { canonical: docAiStart.publicUrl },
  openGraph: {
    type: "website",
    siteName: docAiStart.seo.siteName,
    locale: docAiStart.seo.locale,
    title: docAiStart.seo.title,
    description: docAiStart.seo.description,
    url: docAiStart.publicUrl,
    images: [docAiStart.seo.ogImage],
  },
  twitter: {
    card: docAiStart.seo.twitterCard,
    title: docAiStart.seo.title,
    description: docAiStart.seo.description,
    images: [docAiStart.seo.ogImage],
  },
};

export default async function DocAiStartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const solutionsHref = localeHref(locale, docAiStart.breadcrumb.parentHref);
  const contactHref = localeHref(locale, docAiStart.cta.href);
  const PrivacyIcon = icons[docAiStart.hero.privacy.icon];
  const SafetyIcon = icons[docAiStart.safety.icon];

  return (
    <>
      <section className="bg-brand text-brand-foreground relative isolate overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_80%_12%,oklch(0.72_0.13_205_/_0.22),transparent_28%),radial-gradient(circle_at_12%_92%,oklch(0.49_0.17_254_/_0.26),transparent_34%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.045]"
          aria-hidden
        />

        <Container className="grid min-h-[34rem] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-24">
          <div>
            <p className="text-highlight text-xs font-semibold tracking-[0.12em] uppercase">
              {docAiStart.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[15ch] text-[2.35rem] leading-[1.17] font-bold tracking-[-0.035em] break-keep sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]">
              {docAiStart.hero.title}
            </h1>
            <p className="text-brand-foreground/80 mt-6 max-w-[62ch] text-base leading-[1.8] break-keep lg:text-lg">
              {docAiStart.hero.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={docAiStart.hero.memberAction.href}
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-brand-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {docAiStart.hero.memberAction.label}
                <ChevronRight className="size-4" aria-hidden />
              </a>
              <a
                href={docAiStart.hero.ownerAction.href}
                className="border-brand-foreground/30 bg-brand-foreground/5 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {docAiStart.hero.ownerAction.label}
              </a>
            </div>
          </div>

          <aside className="border-brand-foreground/18 bg-brand-foreground/[0.06] rounded-2xl border p-6 shadow-2xl shadow-black/20 backdrop-blur-sm lg:p-7">
            <div className="bg-highlight/14 text-highlight flex size-12 items-center justify-center rounded-xl">
              <PrivacyIcon className="size-6" aria-hidden />
            </div>
            <h2 className="mt-5 text-xl font-semibold">
              {docAiStart.hero.privacy.title}
            </h2>
            <p className="text-brand-foreground/72 mt-3 text-sm leading-7 break-keep">
              {docAiStart.hero.privacy.description}
            </p>
          </aside>
        </Container>
      </section>

      <Section className="py-12 md:py-14 lg:py-16">
        <nav
          aria-label={docAiStart.breadcrumb.label}
          className="text-muted-foreground text-sm"
        >
          <Link href={solutionsHref} className="hover:text-foreground">
            {docAiStart.breadcrumb.parent}
          </Link>
          <ChevronRight className="mx-1.5 inline size-3.5" aria-hidden />
          <span className="text-foreground font-medium" aria-current="page">
            {docAiStart.breadcrumb.current}
          </span>
        </nav>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[docAiStart.audiences.owner, docAiStart.audiences.member].map(
            (audience, index) => (
              <article
                key={audience.id}
                id={audience.id}
                className={
                  index === 0
                    ? "border-border bg-card rounded-2xl border p-6 lg:p-8"
                    : "border-border bg-muted/50 rounded-2xl border p-6 lg:p-8"
                }
              >
                <span
                  className={
                    index === 0
                      ? "bg-primary/10 text-primary inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      : "bg-highlight/18 text-highlight-foreground inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                  }
                >
                  {audience.badge}
                </span>
                <h2 className="mt-5 text-2xl font-bold">{audience.title}</h2>
                <ul className="mt-6 space-y-4">
                  {audience.items.map((item) =>
                    typeof item === "string" ? (
                      <li key={item} className="flex gap-3 text-sm leading-7">
                        <CheckCircle2
                          className="text-primary mt-1 size-4 shrink-0"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ) : (
                      <li
                        key={item.steps[0]}
                        className="flex gap-3 text-sm leading-7"
                      >
                        <CheckCircle2
                          className="text-primary mt-1 size-4 shrink-0"
                          aria-hidden
                        />
                        <ol className="space-y-2">
                          {item.steps.map((step, stepIndex) => (
                            <li key={step} className="flex gap-2.5">
                              <span
                                className="border-primary/40 text-primary mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold"
                                aria-hidden
                              >
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </li>
                    ),
                  )}
                </ul>
              </article>
            ),
          )}
        </div>
      </Section>

      <Section variant="muted" className="py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-primary text-xs font-semibold tracking-[0.1em] uppercase">
            {docAiStart.setup.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold break-keep lg:text-4xl">
            {docAiStart.setup.title}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-[65ch] leading-8 break-keep">
            {docAiStart.setup.lead}
          </p>
        </div>

        {/* 절차 타임라인 — 번호 노드가 진행 레일 위에 놓여 순서가 한눈에 읽힌다.
            노드 톤 3단(채움=Hub 관리자, 외곽=팀 멤버, 소프트=관리자 확인)으로
            "관리자와 팀 멤버가 번갈아 진행" 리듬을 시각화한다. */}
        <ol className="relative mt-12 max-w-3xl">
          <div
            className="bg-border absolute top-5 bottom-5 left-[21px] w-px"
            aria-hidden
          />
          {docAiStart.setup.steps.map((step, index) => {
            const Icon = icons[step.icon];
            const isLast = index === docAiStart.setup.steps.length - 1;
            const nodeTone =
              step.audience === "Hub 관리자"
                ? "border-primary bg-primary text-primary-foreground"
                : step.audience === "관리자 확인"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-primary/50 bg-background text-primary";
            return (
              <li
                key={step.title}
                className={`relative pl-16 ${isLast ? "" : "pb-6"}`}
              >
                <span
                  className={`absolute top-6 left-0 flex size-[42px] items-center justify-center rounded-full border font-mono text-xs font-bold ${nodeTone}`}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="border-border bg-background rounded-2xl border p-6 lg:p-7">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <p className="text-primary text-xs font-semibold">
                      {step.audience}
                    </p>
                  </div>
                  <h3 className="mt-4 text-lg font-bold break-keep">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-7 break-keep">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.1em] uppercase">
              {docAiStart.connection.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold break-keep">
              {docAiStart.connection.title}
            </h2>
            <p className="text-muted-foreground mt-5 leading-8 break-keep">
              {docAiStart.connection.lead}
            </p>
          </div>

          <div className="space-y-4">
            {docAiStart.connection.methods.map((method, index) => {
              const Icon = icons[method.icon];
              return (
                <article
                  key={method.title}
                  className="border-border flex gap-4 rounded-2xl border p-5 sm:gap-5 sm:p-6"
                >
                  <div className="bg-muted text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">{method.title}</h3>
                      {index === 0 ? (
                        <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold">
                          {docAiStart.connection.recommended}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-7 break-keep">
                      {method.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section variant="brand" className="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          <div>
            <div className="bg-highlight/15 text-highlight flex size-12 items-center justify-center rounded-xl">
              <SafetyIcon className="size-6" aria-hidden />
            </div>
            <h2 className="mt-5 text-3xl font-bold">
              {docAiStart.safety.title}
            </h2>
            <p className="text-brand-foreground/72 mt-4 leading-8 break-keep">
              {docAiStart.safety.lead}
            </p>
          </div>

          <ul className="border-brand-foreground/15 divide-brand-foreground/15 divide-y overflow-hidden rounded-2xl border">
            {docAiStart.safety.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="flex gap-4 p-5 sm:p-6">
                  <Icon
                    className="text-highlight mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-brand-foreground/68 mt-1.5 text-sm leading-7 break-keep">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section className="py-14 lg:py-16">
        <div className="border-border bg-muted/50 flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div>
            <h2 className="text-xl font-bold">{docAiStart.cta.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-7 break-keep">
              {docAiStart.cta.description}
            </p>
          </div>
          <Link
            href={contactHref}
            className="border-input hover:bg-accent focus-visible:ring-ring bg-background inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
          >
            {docAiStart.cta.action}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}
