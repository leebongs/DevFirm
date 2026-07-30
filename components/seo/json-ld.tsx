import { site } from "@/content/site";
import { findTrail } from "@/lib/nav";

/**
 * 구조화 데이터(§6.3).
 *
 * RSC 라 스크립트가 초기 HTML 에 그대로 들어간다.
 * `JSON.stringify` 결과를 그대로 넣되 `<` 를 이스케이프해 스크립트 조기 종료를
 * 막는다 — 콘텐츠에 태그 문자가 섞였을 때 생기는 XSS 경로다.
 */
function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.legalName,
        alternateName: [site.name, site.nameKo, site.brand],
        url: site.url,
        foundingDate: String(site.founded),
        telephone: site.tel,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.full,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        // 지도에 쓰는 좌표를 구조화 데이터에도 같이 준다. 지역 검색 결과에서
        // 주소 문자열 지오코딩보다 좌표가 우선한다.
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.address.geo.lat,
          longitude: site.address.geo.lng,
        },
        taxID: site.businessNumber,
      }}
    />
  );
}

export function BreadcrumbJsonLd({ href }: { href: string }) {
  const trail = findTrail(href);
  if (trail.length === 0) return null;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: site.url,
          },
          ...trail.map((node, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: node.label,
            item: `${site.url}${node.href}`,
          })),
        ],
      }}
    />
  );
}

export function CourseJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description,
        url: `${site.url}${path}`,
        provider: {
          "@type": "Organization",
          name: site.legalName,
          url: site.url,
        },
      }}
    />
  );
}
