"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  FileText,
  Landmark,
  ReceiptText,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { Locale } from "@/content/locales";
import type { DocAiCategory, DocAiPack } from "@/content/docai";
import { localeHref } from "@/lib/locale-href";
import { cn } from "@/lib/utils";

const categoryIcons = {
  legal: FileCheck2,
  finance: ReceiptText,
  operations: BriefcaseBusiness,
  public: Landmark,
  field: Building2,
} as const;

const categoryTones = {
  legal: "bg-blue-50 text-blue-700 border-blue-100",
  finance: "bg-emerald-50 text-emerald-700 border-emerald-100",
  operations: "bg-violet-50 text-violet-700 border-violet-100",
  public: "bg-amber-50 text-amber-800 border-amber-100",
  field: "bg-cyan-50 text-cyan-800 border-cyan-100",
} as const;

export function DocAiCatalog({
  lang,
  packs,
  content,
}: {
  lang: Locale;
  packs: readonly DocAiPack[];
  content: {
    searchLabel: string;
    searchPlaceholder: string;
    clearSearch: string;
    filterLabel: string;
    resultSuffix: string;
    categories: readonly { key: DocAiCategory; label: string }[];
    featuredLabel: string;
    card: {
      fieldLabel: string;
      outputLabel: string;
      action: string;
    };
    empty: {
      title: string;
      body: string;
      reset: string;
    };
  };
}) {
  const [category, setCategory] = useState<DocAiCategory>("all");
  const [query, setQuery] = useState("");

  const visiblePacks = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ko");

    return packs.filter((pack) => {
      const inCategory = category === "all" || pack.category === category;
      const haystack = [
        pack.title,
        pack.summary,
        pack.output,
        ...pack.files,
        ...pack.tags,
      ]
        .join(" ")
        .toLocaleLowerCase("ko");

      return inCategory && (!needle || haystack.includes(needle));
    });
  }, [category, packs, query]);

  const reset = () => {
    setCategory("all");
    setQuery("");
  };

  return (
    <div>
      <div className="border-border bg-background sticky top-[6.75rem] z-30 -mx-5 border-y px-5 py-4 md:static md:mx-0 md:rounded-xl md:border md:p-4 lg:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="docai-search" className="sr-only">
              {content.searchLabel}
            </label>
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
              aria-hidden
            />
            <input
              id="docai-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={content.searchPlaceholder}
              className="border-input bg-background focus-visible:ring-ring h-12 w-full rounded-lg border pr-11 pl-11 text-sm outline-none focus-visible:ring-2"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-1.5 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
                aria-label={content.clearSearch}
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div
            className="flex scrollbar-none gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end lg:pb-0"
            role="group"
            aria-label={content.filterLabel}
          >
            {content.categories.map((item) => {
              const active = item.key === category;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item.key)}
                  className={cn(
                    "focus-visible:ring-ring min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    active
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm" aria-live="polite">
          <span className="text-foreground font-semibold">
            {visiblePacks.length}
          </span>
          {content.resultSuffix}
        </p>
      </div>

      {visiblePacks.length ? (
        <ul className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visiblePacks.map((pack) => {
            const Icon = categoryIcons[pack.category];
            const categoryName = content.categories.find(
              (item) => item.key === pack.category,
            )?.label;

            return (
              <li key={pack.id}>
                <article
                  aria-labelledby={`pack-${pack.id}`}
                  className="border-border bg-card group hover:border-primary/30 relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-28px_oklch(0.3_0.07_258_/_0.35)] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div className="bg-muted/55 border-border relative h-36 overflow-hidden border-b p-5">
                    <div
                      className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent)] [background-size:24px_24px] opacity-60"
                      aria-hidden
                    />
                    <div className="relative mx-auto w-[72%] translate-y-2 rounded-t-lg border border-white/80 bg-white p-3 shadow-[0_18px_35px_-18px_oklch(0.3_0.07_258_/_0.38)] transition-transform duration-200 group-hover:translate-y-0 motion-reduce:transition-none">
                      <div className="flex items-center justify-between">
                        <div className="bg-brand/12 text-brand flex size-8 items-center justify-center rounded-md">
                          <FileText className="size-4" aria-hidden />
                        </div>
                        <span className="text-muted-foreground font-mono text-[0.58rem] tracking-wider uppercase">
                          {pack.files[0]}
                        </span>
                      </div>
                      <div className="mt-4 space-y-2" aria-hidden>
                        <div className="bg-foreground/15 h-1.5 w-4/5 rounded-full" />
                        <div className="bg-foreground/10 h-1.5 w-full rounded-full" />
                        <div className="flex gap-2 pt-1">
                          <div className="bg-primary/18 h-5 flex-1 rounded-sm" />
                          <div className="bg-highlight/25 h-5 w-1/3 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold",
                          categoryTones[pack.category],
                        )}
                      >
                        <Icon className="size-3.5" aria-hidden />
                        {categoryName}
                      </span>
                      {pack.featured ? (
                        <span className="text-primary inline-flex items-center gap-1 text-xs font-semibold">
                          <Sparkles className="size-3.5" aria-hidden />
                          {content.featuredLabel}
                        </span>
                      ) : null}
                    </div>

                    <h3
                      id={`pack-${pack.id}`}
                      className="mt-4 text-xl leading-snug font-bold break-keep"
                    >
                      {pack.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed break-keep">
                      {pack.summary}
                    </p>

                    <div className="border-border mt-5 grid grid-cols-2 gap-3 border-y py-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">
                          {content.card.fieldLabel}
                        </p>
                        <p className="mt-1 font-semibold">{pack.fields}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          {content.card.outputLabel}
                        </p>
                        <p className="mt-1 font-semibold break-keep">
                          {pack.output}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pack.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-[0.6875rem]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-5">
                      <Link
                        href={localeHref(lang, "/contact")}
                        className="text-primary focus-visible:ring-ring inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
                      >
                        {content.card.action}
                        <ArrowUpRight
                          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                          aria-hidden
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border-border bg-muted/40 mt-5 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center">
          <div className="bg-background text-muted-foreground flex size-12 items-center justify-center rounded-full border shadow-sm">
            <Search className="size-5" aria-hidden />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{content.empty.title}</h3>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            {content.empty.body}
          </p>
          <button
            type="button"
            onClick={reset}
            className="border-border bg-background hover:bg-accent focus-visible:ring-ring mt-5 min-h-11 rounded-md border px-4 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
          >
            {content.empty.reset}
          </button>
        </div>
      )}
    </div>
  );
}
