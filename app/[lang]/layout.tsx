import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import {
  DEFAULT_LOCALE,
  dirOf,
  isLocale,
  localeCodes,
  type Locale,
} from "@/content/locales";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

/**
 * 루트 레이아웃이자 언어 경계.
 *
 * Next 16 은 `<html>` 을 가장 바깥 레이아웃에서만 받는데 `lang`·`dir` 은 경로의
 * 언어에 따라 달라져야 한다. 그래서 루트 레이아웃 자체를 `[lang]` 아래로
 * 내렸다 — `app/layout.tsx` 는 더 이상 없다.
 *
 * `dir` 이 중요한 이유: 지원 언어 중 우르두어 하나가 rtl 이다. 이 속성이 없으면
 * 문장이 왼쪽에서 시작해 읽을 수 없는 화면이 된다.
 */
export function generateStaticParams() {
  return localeCodes.map((lang) => ({ lang }));
}

/** 17개 언어를 전부 빌드 시점에 굳힌다. 목록에 없는 값은 404 다. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: site.name,
    description: t.site.tagline,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    // data-scroll-behavior="smooth": Next 16부터 라우트 전환 시 scroll-behavior를
    // 자동 오버라이드하지 않는다. 앵커 TOC(OnThisPage)의 부드러운 스크롤과
    // 페이지 이동 시 즉시 최상단 이동을 둘 다 얻으려면 이 속성이 필요하다.
    <html
      lang={lang}
      dir={dirOf(lang)}
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
