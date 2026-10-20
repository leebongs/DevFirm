import { CheckCircle2, Download, TriangleAlert } from "lucide-react";
import { CopyLinkButton } from "@/components/content/copy-link-button";
import { SectionHeading } from "@/components/typography/section-heading";
import type { Dictionary } from "@/content/dictionary";
import { docasiDownloads } from "@/lib/docasi-downloads";

/**
 * 앱 다운로드 블록 — 솔루션 페이지와 시작 안내 페이지가 같은 사전 문구와
 * 피드(lib/docasi-downloads)를 공유한다. Section 래퍼는 페이지 쪽 몫이라
 * 배경 리듬은 페이지마다 고를 수 있다.
 */
export function DocasiDownloadSection({
  download,
}: {
  download: Dictionary["docai"]["download"];
}) {
  return (
    <>
      <SectionHeading
        id={download.id}
        eyebrow={download.eyebrow}
        title={download.title}
        lead={download.lead}
        action={
          <CopyLinkButton
            url={docasiDownloads.shareUrl}
            label={download.copyLabel}
            copiedLabel={download.copiedLabel}
          />
        }
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {download.apps.map((app) => {
          const dl = docasiDownloads[app.key];
          // 피드가 아직 구 계약(docai)이면 설치 파일도 구 브랜드다 —
          // 받을 파일의 이름과 버튼 표기가 어긋나지 않게 드러낸다.
          const appName = docasiDownloads.isCanonical
            ? app.name
            : app.name.replace(/^DocASI/, "DocAI (이전 버전)");
          return (
            <article
              key={app.key}
              className="border-border bg-card flex flex-col rounded-2xl border p-6 lg:p-7"
            >
              {/* 버튼이 곧 앱의 이름표다 — 카드 제목을 따로 두지 않고
                  앱명·플랫폼·버전·용량을 전부 다운로드 링크 안에 싣는다. */}
              <a
                href={dl.href}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex items-center gap-4 rounded-xl p-4 pr-5 focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="bg-primary-foreground/12 flex size-11 shrink-0 items-center justify-center rounded-lg">
                  <Download className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.6875rem] font-semibold tracking-wide opacity-85">
                    {download.freeLabel} · {app.platform}
                  </span>
                  <span className="mt-0.5 block text-[1.0625rem] leading-snug font-bold break-keep">
                    {appName}
                  </span>
                </span>
                <span className="shrink-0 text-right font-mono text-[0.6875rem] leading-relaxed opacity-80">
                  {docasiDownloads.version}
                  <br />
                  {dl.size}
                </span>
              </a>

              <div className="border-border mt-6 border-t pt-5">
                <p className="text-sm font-semibold">{download.specsLabel}</p>
                <ul className="mt-3 space-y-2">
                  {app.specs.map((spec) => (
                    <li
                      key={spec}
                      className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed break-keep"
                    >
                      <CheckCircle2
                        className="text-primary mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-500/35 bg-amber-500/10 p-5 lg:p-6">
        <div className="flex items-start gap-3">
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold">{download.notice.title}</p>
            <ul className="text-muted-foreground mt-2 space-y-1.5 text-sm leading-relaxed break-keep">
              {download.notice.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
