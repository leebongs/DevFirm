import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CTASection } from "@/components/content/cta-section";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";
import { careersPage, jobs } from "@/content/careers";
import { pageSeo } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.careers,
  path: "/about/careers",
});

export default function CareersPage() {
  const openJobs = jobs.filter((job) => job.status === "open");

  return (
    <>
      <PageHero
        photo={photos.aboutHero}
        eyebrow={careersPage.hero.eyebrow}
        title={careersPage.hero.title}
        lead={careersPage.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <Breadcrumb href="/about/careers" />

        {openJobs.length === 0 ? (
          <p className="text-muted-foreground mt-8 break-keep">
            {careersPage.emptyState}
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/about/careers/${job.slug}`}
                  className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring group flex h-full flex-col rounded-lg border p-5 transition-colors hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none lg:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={job.status === "open" ? "default" : "secondary"}
                    >
                      {careersPage.statusLabel[job.status]}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {job.team} · {job.employmentType}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold break-keep">
                    {job.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 line-clamp-2 flex-1 text-sm leading-relaxed break-keep">
                    {job.responsibilities[0]}
                  </p>
                  <span className="text-muted-foreground mt-4 flex items-center gap-1 text-xs">
                    {careersPage.fields.deadline} · {job.deadline}
                    <ArrowRight
                      className="text-primary ml-auto size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>

      <CTASection
        title={careersPage.cta.title}
        desc={careersPage.cta.desc}
        cta={careersPage.cta.primary}
        secondary={careersPage.cta.secondary}
      />
    </>
  );
}
