import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, localeCodes } from "@/content/locales";

/**
 * 언어 접두사가 없는 요청을 적절한 언어로 보낸다.
 *
 * Next 16 은 이 파일을 `proxy.ts` 로 부른다(예전 `middleware.ts` 자리다).
 *
 * 판정 순서
 *   1. 이미 `/xx/...` 형태면 그대로 통과.
 *   2. 방문자가 전에 고른 언어(쿠키)가 있으면 그것을 존중한다.
 *      **선택은 브라우저 언어 설정보다 세다** — 사용자가 명시적으로 고른 값이다.
 *   3. 없으면 `Accept-Language` 로 협상한다.
 *   4. 그래도 못 정하면 한국어.
 *
 * 리다이렉트는 **307** 이다. 308 로 영구 고정하면 나중에 판정이 바뀌어도
 * 브라우저가 옛 언어를 계속 캐시한다.
 */
const COOKIE = "devfirm_locale";

/** `ko`, `pt-BR` 같은 코드를 소문자 기준으로 비교하기 위한 대조표 */
const byLower = new Map(localeCodes.map((c) => [c.toLowerCase(), c]));

function fromAcceptLanguage(header: string | null): string | null {
  if (!header) return null;

  // "ko-KR,ko;q=0.9,en;q=0.8" → 품질값 내림차순 태그 목록
  const tags = header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = rawTag ?? "";
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((t) => t.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    // 정확히 일치 (pt-br → pt-BR)
    const exact = byLower.get(tag);
    if (exact) return exact;
    // 지역만 다른 경우 기본 언어로 (en-GB → en)
    const base = tag.split("-")[0] ?? "";
    const loose = byLower.get(base);
    if (loose) return loose;
  }
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 앱과 초대 메일이 참조하는 공개 주소는 언어 설정과 무관하게 그대로 유지한다.
  const publicDocAiRoutes = new Map([
    ["/solutions/docasi/start", "/solutions/docasi/start"],
    ["/solutions/docai/start", "/solutions/docasi/start"],
    ["/solution/DocASI/releasenote", "/solution/DocASI/releasenote"],
    ["/solution/DocAI/releasenote", "/solution/DocAI/releasenote"],
  ]);
  const publicDocAiRoute = publicDocAiRoutes.get(pathname);
  if (publicDocAiRoute) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${publicDocAiRoute}`;
    return NextResponse.rewrite(url);
  }

  // DocASI 리브랜딩(2026-10): locale 접두가 붙은 구 docai 경로는 같은 locale 의
  // docasi 로 영구 이동한다. next.config 의 redirects 는 bare 경로만 잡으므로
  // (/solutions/docai), 외부에 공유된 /ko/... 형 구 링크는 여기서 구제한다.
  const legacyDocAi = pathname.match(/^\/([^/]+)\/solutions\/docai(\/start)?$/);
  const legacyLang = legacyDocAi?.[1];
  if (legacyLang && byLower.get(legacyLang.toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/${legacyLang}/solutions/docasi${legacyDocAi?.[2] ?? ""}`;
    return NextResponse.redirect(url, 308);
  }

  // 다운로드 섹션 공유 주소의 locale 접두 변형. bare 경로(/solutions/docasi/
  // download)는 next.config 의 redirects 가 잡고, /ko/... 형은 여기서 같은
  // locale 의 페이지 앵커로 보낸다.
  const downloadShortcut = pathname.match(
    /^\/([^/]+)\/solutions\/docasi\/download$/,
  );
  const downloadLang = downloadShortcut?.[1];
  if (downloadLang && byLower.get(downloadLang.toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/${downloadLang}/solutions/docasi`;
    url.hash = "#download";
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = localeCodes.some(
    (code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE)?.value;
  const chosen =
    (cookie && byLower.get(cookie.toLowerCase())) ||
    fromAcceptLanguage(request.headers.get("accept-language")) ||
    DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${chosen}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  /*
   * 정적 자산과 메타데이터 파일은 언어와 무관하므로 건너뛴다.
   * 여기에 sitemap·robots·아이콘을 넣지 않으면 `/ko/sitemap.xml` 로 밀려
   * 크롤러가 원래 자리에서 404 를 받는다.
   */
  matcher: [
    "/((?!_next|api|catalogs|updates|images|fonts|video|favicon\\.ico|icon\\.svg|apple-icon\\.png|opengraph-image\\.png|twitter-image\\.png|robots\\.txt|sitemap\\.xml).*)",
  ],
};
