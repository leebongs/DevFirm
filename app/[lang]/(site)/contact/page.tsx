import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/typography/page-hero";
import { photos } from "@/content/photos";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/content/map-embed";
import { buildMetadata } from "@/lib/metadata";
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
        photo={photos.contactHero}
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
              {/* 문의처는 사업 단위 이름으로 받는다. 법인명(legalName)은
                  푸터의 사업자정보 고지와 JSON-LD 에만 쓴다. */}
              <p className="font-semibold">{site.footerBrand}</p>
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
              실제 지도. 사이드바 하단이라 초기 뷰포트 밖이고, MapEmbed 가
              lazy 로딩 + 비율 고정을 맡으므로 A7·CLS 에 영향이 없다.
            */}
            <div className="border-border overflow-hidden rounded-lg border">
              <MapEmbed title={workspace.location.mapTitle} />
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
