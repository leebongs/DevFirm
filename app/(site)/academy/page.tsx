import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/typography/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { Illustration } from "@/components/content/illustration";
import { Photo } from "@/components/content/photo";
import { StepFlow } from "@/components/content/step-flow";
import { CTASection } from "@/components/content/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { photos } from "@/content/photos";
import { academy, SCHOOLS } from "@/content/academy";
import { pageSeo } from "@/content/seo";
import { ui } from "@/content/ui";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.academy,
  path: "/academy",
});

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow={academy.hero.eyebrow}
        title={academy.hero.title}
        lead={academy.hero.lead}
        art={illustrations.academy}
      />

      <Section>
        <SectionHeading
          id={academy.pbl.id}
          eyebrow={academy.pbl.eyebrow}
          title={academy.pbl.title}
          lead={academy.pbl.lead}
        />
        {/*
          이 섹션의 주장은 *역전*이다 — 지식을 쌓고 과제로 끝나는 순서를 뒤집어
          과제를 먼저 놓는다. 역전은 두 방향을 나란히 놓아야만 보이므로
          문장이나 사진으로는 전달되지 않는다.
        */}
        <Illustration
          src={illustrations.pblInversion.src}
          width={illustrations.pblInversion.width}
          height={illustrations.pblInversion.height}
          alt={illustrations.pblInversion.alt}
          className="border-border bg-muted/40 mx-auto mt-10 max-w-[34rem] rounded-lg border p-5 lg:p-8"
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {academy.pbl.items.map((item) => (
            <FeatureCard key={item.title} title={item.title} desc={item.desc} />
          ))}
        </div>
        {/*
          "팀으로 일정과 역할을 나눕니다"가 실제로 어떤 장면인지 보여준다.
          아카데미는 법인이 아니라 개인에게 파는 유일한 페이지이고, 수강 결정은
          거기 있는 자기 모습이 그려질 때 일어난다.
        */}
        <Photo
          photo={photos.academyProject}
          sizes="(min-width: 1280px) 60rem, 100vw"
          className="mt-6 aspect-[3/2] lg:aspect-[21/9]"
        />
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={academy.schools.id}
          eyebrow={academy.schools.eyebrow}
          title={academy.schools.title}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {SCHOOLS.map((school) => (
            <FeatureCard
              key={school.key}
              art={school.art}
              title={school.name}
              desc={school.desc}
              href="/academy/courses"
              linkLabel={academy.cta.secondary.label}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          id={academy.external.id}
          eyebrow={academy.external.eyebrow}
          title={academy.external.title}
        />
        <a
          href={academy.external.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-card hover:border-primary/30 focus-visible:ring-ring mt-8 block max-w-[68ch] rounded-lg border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <p className="text-muted-foreground text-sm break-keep">
            {academy.external.desc}
          </p>
          <span className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
            {academy.external.linkLabel}
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only">{ui.nav.externalLink}</span>
          </span>
        </a>
      </Section>

      <Section variant="muted">
        <SectionHeading
          id={academy.process.id}
          eyebrow={academy.process.eyebrow}
          title={academy.process.title}
        />
        <StepFlow className="mt-10" steps={academy.process.steps} />
      </Section>

      <CTASection
        title={academy.cta.title}
        desc={academy.cta.desc}
        cta={academy.cta.primary}
        secondary={academy.cta.secondary}
      />
    </>
  );
}
