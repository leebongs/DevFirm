import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { Illustration } from "@/components/content/illustration";
import { buildMetadata } from "@/lib/metadata";
import { illustrations } from "@/content/illustrations";
import { forms } from "@/content/forms";
import { workspace } from "@/content/workspace";
import { site } from "@/content/site";
import { pageSeo } from "@/content/seo";
import { ui } from "@/content/ui";

export const metadata: Metadata = buildMetadata({
  ...pageSeo.contact,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={forms.contact.hero.eyebrow}
        title={forms.contact.hero.title}
        lead={forms.contact.hero.lead}
      />

      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="max-w-[42rem] min-w-0">
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="border-border rounded-lg border p-5">
              <p className="font-semibold">{site.legalName}</p>
              <dl className="text-muted-foreground mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs">{ui.footer.addressLabel}</dt>
                  <dd className="text-foreground mt-0.5 break-keep">
                    {site.address.full}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs">{ui.footer.telLabel}</dt>
                  <dd className="text-foreground mt-0.5">
                    <a href={site.telHref} className="hover:text-primary">
                      {site.tel}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs">{forms.contact.labels.email}</dt>
                  <dd className="text-foreground mt-0.5">
                    {/* 메일 발송이 설정되지 않았을 때의 폴백 경로이기도 하다(O-1) */}
                    <a
                      href={`mailto:${site.email}`}
                      className="hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/*
              O-4 확정: 지도 임베드 없이 정적 안내 + 외부 링크.
              외부 지도 SDK 를 넣으면 스크립트 하나로 A7(Perf ≥ 95)이 흔들린다.
            */}
            <div className="border-border overflow-hidden rounded-lg border">
              <Illustration
                src={illustrations.map.src}
                width={illustrations.map.width}
                height={illustrations.map.height}
                alt={illustrations.map.alt}
                className="bg-muted/40"
              />
              <div className="border-border border-t p-5">
                <p className="text-xs font-semibold tracking-[0.08em] uppercase">
                  {workspace.location.eyebrow}
                </p>
                <p className="mt-3 text-sm break-keep">
                  {workspace.location.address}
                </p>
                <a
                  href={workspace.location.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  {workspace.location.mapLinkLabel}
                  <ExternalLink className="size-3.5" aria-hidden />
                  <span className="sr-only">{ui.nav.externalLink}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
