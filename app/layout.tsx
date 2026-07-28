import type { Metadata } from "next";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior="smooth": Next 16부터 라우트 전환 시 scroll-behavior를
    // 자동 오버라이드하지 않는다. 앵커 TOC(OnThisPage)의 부드러운 스크롤과
    // 페이지 이동 시 즉시 최상단 이동을 둘 다 얻으려면 이 속성이 필요하다.
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
