import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, ChevronRight, PackageCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  docAiReleaseNotes,
  docAiReleases,
  latestDocAiRelease,
} from "@/content/docai-release-notes";

export const metadata: Metadata = {
  title: docAiReleaseNotes.seo.title,
  description: docAiReleaseNotes.seo.description,
  alternates: { canonical: docAiReleaseNotes.publicUrl },
  openGraph: {
    type: "website",
    siteName: docAiReleaseNotes.seo.siteName,
    locale: docAiReleaseNotes.seo.locale,
    title: docAiReleaseNotes.seo.title,
    description: docAiReleaseNotes.seo.description,
    url: docAiReleaseNotes.publicUrl,
    images: [docAiReleaseNotes.seo.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: docAiReleaseNotes.seo.title,
    description: docAiReleaseNotes.seo.description,
    images: [docAiReleaseNotes.seo.ogImage],
  },
};

export default function DocAiReleaseNotesPage() {
  return (
    <>
      <section className="bg-brand text-brand-foreground relative isolate overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_82%_8%,oklch(0.72_0.13_205_/_0.2),transparent_30%),radial-gradient(circle_at_10%_96%,oklch(0.49_0.17_254_/_0.25),transparent_35%)]"
          aria-hidden
        />
        <Container className="grid min-h-[28rem] items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-20">
          <div>
            <p className="text-highlight text-xs font-semibold tracking-[0.12em] uppercase">
              {docAiReleaseNotes.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-[2.35rem] leading-[1.15] font-bold tracking-[-0.035em] break-keep sm:text-5xl lg:text-[3.5rem]">
              {docAiReleaseNotes.hero.title}
            </h1>
            <p className="text-brand-foreground/80 mt-6 max-w-[62ch] text-base leading-[1.8] break-keep lg:text-lg">
              {docAiReleaseNotes.hero.lead}
            </p>
          </div>

          <aside className="border-brand-foreground/18 bg-brand-foreground/[0.06] rounded-2xl border p-6 shadow-2xl shadow-black/20 backdrop-blur-sm">
            <div className="bg-highlight/14 text-highlight flex size-11 items-center justify-center rounded-xl">
              <PackageCheck className="size-5" aria-hidden />
            </div>
            <p className="text-brand-foreground/65 mt-5 text-xs font-semibold tracking-[0.08em] uppercase">
              {docAiReleaseNotes.hero.latestLabel}
            </p>
            <p className="mt-2 text-3xl font-bold">
              v{latestDocAiRelease.version}
            </p>
            <p className="text-brand-foreground/75 mt-3 text-sm leading-6 break-keep">
              {latestDocAiRelease.title}
            </p>
            <time
              dateTime={latestDocAiRelease.publishedAt}
              className="text-brand-foreground/70 mt-4 block text-xs"
            >
              {latestDocAiRelease.displayDate}
            </time>
          </aside>
        </Container>
      </section>

      <Section className="py-12 md:py-16 lg:py-20">
        <nav
          aria-label={docAiReleaseNotes.breadcrumb.label}
          className="text-muted-foreground text-sm"
        >
          <Link
            href={docAiReleaseNotes.breadcrumb.parentHref}
            className="hover:text-foreground"
          >
            {docAiReleaseNotes.breadcrumb.parent}
          </Link>
          <ChevronRight className="mx-1.5 inline size-3.5" aria-hidden />
          <span className="text-foreground font-medium" aria-current="page">
            {docAiReleaseNotes.breadcrumb.current}
          </span>
        </nav>

        <div className="mt-10 max-w-4xl">
          <h2 className="text-3xl font-bold break-keep">
            {docAiReleaseNotes.releasesLabel}
          </h2>
          <p className="text-muted-foreground mt-3 leading-7 break-keep">
            {docAiReleaseNotes.detailsHint}
          </p>

          <div className="mt-8 space-y-4">
            {docAiReleases.map((release, index) => (
              <details
                key={release.version}
                id={`release-${release.version.replaceAll(".", "-")}`}
                open={index === 0}
                className="border-border bg-card group rounded-2xl border shadow-sm"
              >
                <summary className="focus-visible:ring-primary flex min-h-24 cursor-pointer list-none items-center gap-4 rounded-2xl px-5 py-5 focus-visible:ring-2 focus-visible:outline-none sm:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="bg-primary/10 text-primary inline-flex shrink-0 rounded-full px-3 py-1.5 font-mono text-sm font-semibold">
                    v{release.version}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold break-keep sm:text-lg">
                      {release.title}
                    </span>
                    <time
                      dateTime={release.publishedAt}
                      className="text-muted-foreground mt-1 block text-xs"
                    >
                      {release.displayDate}
                    </time>
                  </span>
                  <ChevronDown
                    className="text-muted-foreground size-5 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>

                <div className="border-border border-t px-5 py-6 sm:px-7 sm:py-8">
                  <div className="space-y-9">
                    {release.groups.map((group) => (
                      <section key={group.heading}>
                        <h3 className="text-xl font-bold break-keep">
                          {group.heading}
                        </h3>
                        <p className="text-muted-foreground mt-2 leading-7 break-keep">
                          {group.subheading}
                        </p>
                        <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 marker:text-[var(--color-primary)] sm:text-base">
                          {group.entries.map((entry) => (
                            <li key={entry} className="list-disc break-keep">
                              {entry}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
