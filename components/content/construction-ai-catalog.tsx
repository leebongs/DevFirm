import {
  BadgeCheck,
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  Download,
  FileCheck2,
  FileText,
  HardHat,
  PencilRuler,
  Scale,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/typography/section-heading";
import { buttonVariants } from "@/components/ui/button";
import type { ConstructionAiCatalog } from "@/content/construction-ai";
import { cn } from "@/lib/utils";

type AreaIcon = ConstructionAiCatalog["areas"][number]["icon"];

const areaIcons: Record<AreaIcon, LucideIcon> = {
  contract: FileCheck2,
  change: PencilRuler,
  price: TrendingUp,
  schedule: CalendarClock,
  payment: CircleDollarSign,
  claim: Scale,
  quality: BadgeCheck,
  safety: HardHat,
  records: ClipboardList,
};

export function ConstructionAiCatalogSection({
  catalog,
}: {
  catalog: ConstructionAiCatalog;
}) {
  return (
    <section aria-labelledby={catalog.section.id} className="mt-16 lg:mt-20">
      <SectionHeading
        id={catalog.section.id}
        eyebrow={catalog.section.eyebrow}
        title={catalog.section.title}
        lead={catalog.section.lead}
      />

      <div className="border-border bg-muted/50 mt-8 rounded-xl border p-5 lg:p-6">
        <p className="text-sm font-semibold">{catalog.viewpointsLabel}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {catalog.viewpoints.map((viewpoint) => (
            <li
              key={viewpoint}
              className="border-primary/20 bg-background text-primary rounded-full border px-3 py-1.5 text-sm font-medium"
            >
              {viewpoint}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 text-sm font-semibold">{catalog.areasLabel}</p>
      <ol className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {catalog.areas.map((area, index) => {
          const Icon = areaIcons[area.icon];

          return (
            <li key={area.title} className="h-full">
              <article className="border-border bg-card flex h-full flex-col rounded-xl border p-5 lg:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-primary/10 text-primary inline-flex size-9 items-center justify-center rounded-lg text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className="text-primary size-6"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mt-5 text-lg leading-snug font-semibold break-keep">
                  {area.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed break-keep">
                  {area.description}
                </p>
                <div className="border-border mt-auto border-t pt-4">
                  <p className="text-muted-foreground text-xs font-medium">
                    {catalog.evidenceLabel}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed break-keep">
                    {area.evidence}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="bg-brand text-brand-foreground mt-10 rounded-xl p-5 lg:p-8">
        <p className="text-highlight text-xs font-semibold tracking-[0.08em] uppercase">
          {catalog.flow.label}
        </p>
        <p className="mt-3 text-xl font-semibold lg:text-2xl">
          {catalog.flow.title}
        </p>
        <ol className="mt-6 grid gap-4 lg:grid-cols-3">
          {catalog.flow.steps.map((step, index) => (
            <li
              key={step.title}
              className="border-brand-foreground/20 bg-brand-foreground/5 rounded-lg border p-4"
            >
              <span className="bg-highlight text-highlight-foreground inline-flex size-7 items-center justify-center rounded-full text-xs font-bold">
                {index + 1}
              </span>
              <p className="mt-3 font-semibold break-keep">{step.title}</p>
              <p className="text-brand-foreground/75 mt-2 text-sm leading-relaxed break-keep">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-border mt-6 rounded-xl border p-5 lg:p-6">
        <div className="flex items-start gap-3">
          <FileText
            className="text-primary mt-0.5 size-5 shrink-0"
            aria-hidden
            strokeWidth={1.75}
          />
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.08em] uppercase">
              {catalog.boundary.label}
            </p>
            <p className="mt-2 text-lg font-semibold break-keep">
              {catalog.boundary.title}
            </p>
          </div>
        </div>
        <ul className="text-muted-foreground mt-5 grid gap-3 text-sm leading-relaxed md:grid-cols-2">
          {catalog.boundary.items.map((item) => (
            <li key={item} className="flex gap-2 break-keep">
              <span
                className="bg-primary mt-[0.65em] size-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-border bg-muted/40 mt-6 flex flex-col items-start gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6">
        <div>
          <p className="font-semibold break-keep">{catalog.download.label}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {catalog.download.meta}
          </p>
        </div>
        <a
          href={catalog.download.href}
          download={catalog.download.filename}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "min-h-11 w-full px-5 py-3 whitespace-normal sm:w-auto",
          )}
        >
          <Download aria-hidden />
          {catalog.download.label}
        </a>
      </div>
    </section>
  );
}
