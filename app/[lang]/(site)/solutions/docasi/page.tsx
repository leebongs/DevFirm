import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Download,
  FileScan,
  GitCompareArrows,
  ScanText,
  ShieldCheck,
  TriangleAlert,
  Workflow,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CopyLinkButton } from "@/components/content/copy-link-button";
import { DocAiCatalog } from "@/components/content/docai-catalog";
import { CTASection } from "@/components/content/cta-section";
import { SectionHeading } from "@/components/typography/section-heading";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/locales";
import { docasiDownloads } from "@/lib/docasi-downloads";
import { getDictionary } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-href";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  return buildMetadata({
    ...t.docai.seo,
    path: "/solutions/docasi",
    lang: locale,
  });
}

export default async function DocAiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const existingMacGuidance =
    locale === "ko"
      ? {
          title: "기존 DocAI Mac Hub를 사용 중인가요?",
          items: [
            "로그인 상태를 보존하려면 앱의 설정 › OTA 소프트웨어 업데이트에서 0.2.2 → 0.2.6 → 0.2.7 → 0.2.9 순서로 업데이트하는 방법을 권장합니다.",
            "설치 파일을 직접 내려받아 수동으로 설치하면 다시 로그인해야 할 수 있지만, 기존 데이터는 유지됩니다.",
            "DocASI에서 기존 데이터가 정상적으로 보이는지 확인한 뒤, 예전 DocAI 앱을 완전히 종료하고 응용 프로그램의 DocAI 앱 번들만 삭제하세요. Documents 폴더와 그 안의 데이터는 삭제하지 마세요.",
          ],
        }
      : {
          title: "Already using the DocAI Mac Hub?",
          items: [
            "To preserve your signed-in session, use Settings › OTA Software Update and update in order: 0.2.2 → 0.2.6 → 0.2.7 → 0.2.9.",
            "A manual installation may ask you to sign in again, but your existing data is retained.",
            "After confirming that your existing data appears in DocASI, fully quit the old DocAI app and remove only its app bundle from Applications. Never delete your Documents folder or its data.",
          ],
        };
  const currentBuildSecurityNotice =
    locale === "ko"
      ? {
          title: "현재 빌드의 운영체제 보안 경고",
          body: "현재 다운로드 빌드는 Apple 공증과 Windows 게시자 코드 서명이 적용되지 않아 macOS 또는 Windows가 실행 전 경고를 표시하거나 실행을 차단할 수 있습니다. 업데이트 파일의 ECDSA 서명과 SHA-256 검증은 별도의 무결성 검사이며, Apple 공증이나 Windows 신뢰 게시자 서명을 대신하지 않습니다.",
        }
      : {
          title: "Operating system security notice for this build",
          body: "The current downloads are not Apple-notarized and do not have Windows publisher code signing, so macOS or Windows may warn you or block the app from launching. The updater's ECDSA signature and SHA-256 verification are separate integrity checks; they do not replace Apple notarization or a trusted Windows publisher signature.",
        };

  return (
    <>
      <section className="bg-brand text-brand-foreground relative isolate overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_82%_18%,oklch(0.72_0.13_205_/_0.2),transparent_25%),radial-gradient(circle_at_8%_86%,oklch(0.49_0.17_254_/_0.2),transparent_32%)] opacity-90"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] [background-size:44px_44px] opacity-[0.06]"
          aria-hidden
        />

        <Container className="grid min-h-[38rem] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,0.82fr)] lg:gap-20 lg:py-24">
          <div>
            {/* DocASI 워드마크 — docs/brand/docasi-wordmark-dark.svg 와 같은 조형.
                발음은 "도카시". DOC 아이보리 + ASI 호박색, 어두운 히어로 전용. */}
            <svg
              viewBox="0 0 572 124"
              role="img"
              aria-label="DocASI"
              className="h-10 w-auto"
            >
              <g
                fill="none"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g stroke="#F9F7EF">
                  <g transform="translate(0,12)">
                    <path d="M11 11V89M11 11H36A39 39 0 0 1 36 89H11" />
                  </g>
                  <g transform="translate(108,12)">
                    <circle cx="50" cy="50" r="39" />
                  </g>
                  <g transform="translate(230,12)">
                    <path d="M77.6 22.4A39 39 0 1 0 77.6 77.6" />
                  </g>
                </g>
                <g stroke="#F5B451">
                  <g transform="translate(341,12)">
                    <path d="M11 89V50A39 39 0 0 1 89 50V89M11 66H89" />
                  </g>
                  <g transform="translate(463,12)">
                    <path d="M54 11H36A19.5 19.5 0 0 0 36 50H34A19.5 19.5 0 0 1 34 89H16" />
                  </g>
                  <g transform="translate(550,12)">
                    <path d="M11 11V89" />
                  </g>
                </g>
              </g>
            </svg>
            <p className="text-highlight mt-5 text-xs font-semibold tracking-[0.12em] uppercase">
              {t.docai.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[13ch] text-[2.35rem] leading-[1.17] font-bold tracking-[-0.035em] break-keep sm:text-5xl lg:text-[4rem] lg:leading-[1.08]">
              {t.docai.hero.title}
            </h1>
            <p className="text-brand-foreground/78 mt-6 max-w-[54ch] text-base leading-[1.8] break-keep lg:text-lg">
              {t.docai.hero.lead}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={t.docai.hero.primary.href}
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-brand-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {t.docai.hero.primary.label}
                <ArrowDown className="size-4" aria-hidden />
              </Link>
              <Link
                href={localeHref(locale, t.docai.hero.secondary.href)}
                className="border-brand-foreground/25 bg-brand-foreground/5 hover:bg-brand-foreground/10 focus-visible:ring-brand-foreground inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
              >
                {t.docai.hero.secondary.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <dl className="border-brand-foreground/15 mt-12 grid max-w-xl grid-cols-3 border-t pt-6">
              {t.docai.hero.stats.map((stat) => (
                <div key={stat.label} className="min-w-0 pr-3">
                  <dt className="text-brand-foreground/58 mt-1 text-xs leading-snug break-keep">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-bold tracking-[-0.03em]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div
              className="bg-highlight/25 absolute -inset-6 rounded-full blur-3xl"
              aria-hidden
            />
            <div className="border-brand-foreground/18 bg-brand/75 relative overflow-hidden rounded-2xl border shadow-2xl shadow-black/25 backdrop-blur-xl">
              <div className="border-brand-foreground/12 flex items-center justify-between border-b px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="bg-highlight/15 text-highlight flex size-8 items-center justify-center rounded-lg">
                    <ScanText className="size-4" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold">
                    {t.docai.hero.preview.label}
                  </p>
                </div>
                <span className="bg-highlight/12 text-highlight rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold">
                  {t.docai.hero.preview.status}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="border-brand-foreground/12 bg-brand-foreground/[0.045] rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-foreground/8 flex size-11 items-center justify-center rounded-lg">
                      <FileScan
                        className="text-brand-foreground/80 size-5"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {t.docai.hero.preview.fileName}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="bg-brand-foreground/10 h-1.5 w-28 overflow-hidden rounded-full">
                          <div className="bg-highlight h-full w-full rounded-full" />
                        </div>
                        <span className="text-brand-foreground/50 text-[0.625rem]">
                          100%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {t.docai.hero.preview.fields.map((field, index) => (
                    <div
                      key={field.label}
                      className="border-brand-foreground/10 bg-brand-foreground/[0.035] flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="border-highlight/40 bg-highlight/10 text-highlight flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-[0.625rem]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-brand-foreground/60 text-xs">
                          {field.label}
                        </span>
                      </div>
                      <span className="truncate text-sm font-semibold">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-brand-foreground/12 mt-5 flex items-center justify-between border-t pt-4">
                  <span className="text-brand-foreground/55 flex items-center gap-2 text-xs">
                    <ShieldCheck className="size-4" aria-hidden />
                    {t.docai.principles.items[0].title}
                  </span>
                  <span className="text-highlight inline-flex items-center gap-1 text-xs font-semibold">
                    <CheckCircle2 className="size-4" aria-hidden />
                    {t.docai.hero.preview.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pt-10 md:pt-12 lg:pt-14">
        <Breadcrumb href="/solutions/docasi" />
        <SectionHeading
          id={t.docai.catalog.id}
          eyebrow={t.docai.catalog.eyebrow}
          title={t.docai.catalog.title}
          lead={t.docai.catalog.lead}
          className="mt-10"
        />
        <div className="mt-10">
          <DocAiCatalog
            lang={locale}
            packs={t.docai.packs}
            content={t.docai.catalog}
          />
        </div>
      </Section>

      <Section variant="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <SectionHeading
            eyebrow={t.docai.workflow.eyebrow}
            title={t.docai.workflow.title}
            lead={t.docai.workflow.lead}
          />
          <div className="bg-border grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2">
            {t.docai.workflow.steps.map((step, index) => {
              const icons = [FileScan, ScanText, GitCompareArrows, Workflow];
              const Icon = icons[index] ?? Workflow;
              return (
                <article key={step.step} className="bg-background p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-mono text-xs font-semibold">
                      {step.step}
                    </span>
                    <Icon
                      className="text-muted-foreground size-5"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed break-keep">
                    {step.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={t.docai.principles.eyebrow}
          title={t.docai.principles.title}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.docai.principles.items.map((item, index) => {
            const icons = [FileScan, ShieldCheck, Workflow];
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <article
                key={item.title}
                className="border-border bg-card rounded-2xl border p-6 lg:p-7"
              >
                <div className="bg-primary/8 text-primary flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed break-keep">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={t.docai.download.id}
          eyebrow={t.docai.download.eyebrow}
          title={t.docai.download.title}
          lead={t.docai.download.lead}
          action={
            <CopyLinkButton
              url={docasiDownloads.shareUrl}
              label={t.docai.download.copyLabel}
              copiedLabel={t.docai.download.copiedLabel}
            />
          }
        />
        <aside
          id="download-build-security-notice"
          role="note"
          aria-labelledby="download-build-security-notice-title"
          className="mt-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 lg:p-6"
        >
          <div className="flex items-start gap-3">
            <TriangleAlert
              className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden
            />
            <div>
              <h3
                id="download-build-security-notice-title"
                className="text-sm font-semibold"
              >
                {currentBuildSecurityNotice.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed break-keep">
                {currentBuildSecurityNotice.body}
              </p>
            </div>
          </div>
        </aside>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {t.docai.download.apps.map((app) => {
            const dl = docasiDownloads[app.key];
            const appName = docasiDownloads.isCanonical
              ? app.name
              : app.name.replace(/^DocASI/, "DocAI (이전 버전)");
            return (
              <article
                key={app.key}
                className="border-border bg-card flex flex-col rounded-2xl border p-6 lg:p-7"
              >
                {/* 버튼이 곧 앱의 이름표다 — 카드 제목을 따로 두지 않고
                    앱명·플랫폼·버전·용량을 전부 다운로드 링크 안에 싣는다. */}
                <a
                  href={dl.href}
                  className="group bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex items-center gap-4 rounded-xl p-4 pr-5 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="bg-primary-foreground/12 flex size-11 shrink-0 items-center justify-center rounded-lg">
                    <Download className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.6875rem] font-semibold tracking-wide opacity-85">
                      {t.docai.download.freeLabel} · {app.platform}
                    </span>
                    <span className="mt-0.5 block text-[1.0625rem] leading-snug font-bold break-keep">
                      {appName}
                    </span>
                  </span>
                  <span className="shrink-0 text-right font-mono text-[0.6875rem] leading-relaxed opacity-80">
                    {docasiDownloads.version}
                    <br />
                    {dl.size}
                  </span>
                </a>

                <div className="border-border mt-6 border-t pt-5">
                  <p className="text-sm font-semibold">
                    {t.docai.download.specsLabel}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {app.specs.map((spec) => (
                      <li
                        key={spec}
                        className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed break-keep"
                      >
                        <CheckCircle2
                          className="text-primary mt-0.5 size-4 shrink-0"
                          aria-hidden
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="border-primary/25 bg-primary/5 mt-6 rounded-2xl border p-5 lg:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="text-primary mt-0.5 size-5 shrink-0"
              aria-hidden
            />
            <div>
              <h3 className="text-sm font-semibold">
                {existingMacGuidance.title}
              </h3>
              <ol className="text-muted-foreground mt-3 space-y-2 pl-5 text-sm leading-relaxed break-keep">
                {existingMacGuidance.items.map((item) => (
                  <li key={item} className="list-decimal pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>

        <div className="mt-6 rounded-2xl border border-amber-500/35 bg-amber-500/10 p-5 lg:p-6">
          <div className="flex items-start gap-3">
            <TriangleAlert
              className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold">
                {t.docai.download.notice.title}
              </p>
              <ul className="text-muted-foreground mt-2 space-y-1.5 text-sm leading-relaxed break-keep">
                {t.docai.download.notice.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title={t.docai.cta.title}
        desc={t.docai.cta.desc}
        cta={t.docai.cta.primary}
        secondary={t.docai.cta.secondary}
      />
    </>
  );
}
