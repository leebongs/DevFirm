import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/typography/page-hero";
import { SectionHeading } from "@/components/typography/section-heading";
import { Prose } from "@/components/typography/prose";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { styleguideSamples as s } from "@/content/styleguide";

/**
 * 내부 확인용 페이지(§Phase 1). 프로덕션에서 색인되지 않는다.
 * 토큰·타이포 스케일·컴포넌트를 한 화면에 모아 320px 과 1920px 양극단에서
 * 눈으로 확인하는 용도다.
 */
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const COLOR_TOKENS = [
  ["background", "bg-background border"],
  ["foreground", "bg-foreground"],
  ["brand", "bg-brand"],
  ["primary", "bg-primary"],
  ["highlight", "bg-highlight"],
  ["muted", "bg-muted border"],
  ["accent", "bg-accent border"],
  ["destructive", "bg-destructive"],
  ["border", "bg-border"],
  ["input", "bg-input"],
] as const;

const TYPE_SCALE = [
  [
    "Display",
    "text-[2.25rem] leading-[1.25] lg:text-[4rem] lg:leading-[1.1] font-bold",
  ],
  [
    "H1",
    "text-[1.75rem] leading-[1.3] lg:text-[2.75rem] lg:leading-[1.15] font-bold",
  ],
  [
    "H2",
    "text-[1.375rem] leading-[1.35] lg:text-[2rem] lg:leading-[1.25] font-semibold",
  ],
  ["H3", "text-[1.125rem] leading-[1.4] lg:text-[1.25rem] font-semibold"],
  ["Body", "text-base leading-[1.75] lg:text-[1.0625rem] lg:leading-[1.8]"],
  ["Body-sm", "text-sm leading-[1.7]"],
  ["Overline", "text-xs tracking-[0.08em] uppercase font-semibold"],
] as const;

const BREAKPOINTS = [
  ["xs", "360px"],
  ["sm", "480px"],
  ["md", "768px"],
  ["lg", "1024px — nav switch"],
  ["xl", "1280px — TOC appears"],
  ["2xl", "1536px"],
  ["3xl", "1920px"],
] as const;

export default function StyleguidePage() {
  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Styleguide"
        lead="Design tokens, type scale and component inventory. Not indexed."
      />

      <Section>
        <SectionHeading eyebrow="Color" title="Tokens" />
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLOR_TOKENS.map(([name, cls]) => (
            <li key={name}>
              <div className={`border-border h-16 rounded-lg ${cls}`} />
              <p className="mt-2 font-mono text-xs">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="muted">
        <SectionHeading eyebrow="Typography" title="Scale" />
        <div className="mt-8 space-y-6">
          {TYPE_SCALE.map(([name, cls]) => (
            <div key={name}>
              <p className="text-muted-foreground font-mono text-xs">{name}</p>
              <p className={`mt-1 ${cls}`}>{s.display}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Korean typesetting"
          title="A13 fixtures"
          lead="Check at 320px: no mid-word breaks, no horizontal overflow."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="border-border rounded-lg border p-4">
            <p className="text-muted-foreground font-mono text-xs">keep-all</p>
            <p className="mt-2 leading-[1.75] break-keep">{s.keepAll}</p>
          </div>
          <div className="border-border rounded-lg border p-4">
            <p className="text-muted-foreground font-mono text-xs">long url</p>
            <p className="mt-2 leading-[1.75]">{s.longUrl}</p>
          </div>
          <div className="border-border rounded-lg border p-4">
            <p className="text-muted-foreground font-mono text-xs">mixed</p>
            <p className="mt-2 leading-[1.75] break-keep">{s.mixed}</p>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading eyebrow="Layout" title="Breakpoints" />
        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {BREAKPOINTS.map(([name, px]) => (
            <li
              key={name}
              className="border-border bg-background rounded-lg border p-3"
            >
              <span className="font-mono text-sm font-semibold">{name}</span>
              <span className="text-muted-foreground ml-2 text-xs">{px}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Components" title="Inventory" />
        <div className="mt-8 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <span className="bg-highlight/15 text-foreground ring-highlight/40 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1">
              Highlight
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Card key={n}>
                <CardHeader>
                  <CardTitle>Card {n}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed break-keep">
                    {s.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Prose>
            <h2 id="prose-sample">Prose</h2>
            <p>{s.body}</p>
            <ul>
              <li>{s.keepAll}</li>
              <li>{s.mixed}</li>
            </ul>
          </Prose>
        </div>
      </Section>

      <Section variant="brand">
        <SectionHeading eyebrow="Brand band" title={s.heading} />
      </Section>
    </>
  );
}
