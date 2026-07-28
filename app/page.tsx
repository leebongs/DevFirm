import { site } from "@/content/site";

/**
 * Phase 0 임시 홈. Phase 2 에서 §5.1 의 8개 섹션 구성으로 교체된다.
 * 문구는 이 시점부터 content/ 에서만 가져온다(P3 / A10).
 */
export default function Home() {
  return (
    <main className="mx-auto flex max-w-[68ch] flex-1 flex-col justify-center px-5 py-24">
      <p className="text-muted-foreground text-xs font-semibold tracking-[0.08em] uppercase">
        {site.legalNameEn}
      </p>
      <h1 className="mt-4 text-4xl leading-tight font-bold tracking-[-0.02em] break-keep">
        {site.tagline}
      </h1>
      <p className="text-muted-foreground mt-6 leading-[1.75] break-keep">
        {site.name} · {site.brand}
      </p>
    </main>
  );
}
