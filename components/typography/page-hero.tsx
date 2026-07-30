import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Illustration } from "@/components/content/illustration";
import { Photo } from "@/components/content/photo";
import type { IllustrationAsset } from "@/content/illustrations";
import type { PhotoAsset } from "@/content/photos";

/**
 * 페이지 상단 히어로(§3.3 T2/T3/T5/T6/T7 공용).
 *
 * LCP 대상은 원래 제목 텍스트였고, 배경 이미지를 넣지 않는 것이 LCP < 2.5s(A7)를
 * 지키는 가장 쉬운 길이었다. `photo` 를 받게 되면서 그 전제가 바뀐다 — 다만
 * 비용은 통제된다:
 *
 *   - 21:9 배너를 AVIF 로 미리 구워 두므로 장당 40KB 안쪽이다.
 *   - `priority` 로 미리 가져와 사진 자체가 LCP 요소가 되게 한다. 사진을
 *     늦게 띄우면서 그 위 글자를 LCP 로 두면 두 번 그려져 오히려 느리다.
 *
 * 사진 위에서는 텍스트 색을 통째로 뒤집는다. 본문색(Ink)을 사진 위에 두면
 * 밝은 부분에서 대비가 무너진다 — 어두운 스크림 + 밝은 글자가 유일하게
 * 사진 내용과 무관하게 대비를 보장하는 조합이다(A6 은 scripts/check-contrast.mjs
 * 가 최악 케이스 합성으로 검증한다).
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  art,
  photo,
  variant = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: React.ReactNode;
  /** lg 이상에서만 제목 오른쪽에 붙는다. LCP 요소가 되지 않게 하기 위함 */
  art?: IllustrationAsset;
  /** 배경 사진. 주면 어두운 스크림과 밝은 글자로 전환된다. */
  photo?: PhotoAsset;
  variant?: "default" | "brand";
  className?: string;
}) {
  // 사진이 있으면 brand 변형과 같은 글자색 체계를 쓴다
  const onDark = variant === "brand" || Boolean(photo);

  return (
    <div
      className={cn(
        "border-border relative isolate overflow-hidden border-b py-14 md:py-20 lg:py-24",
        photo
          ? "text-brand-foreground border-transparent"
          : variant === "brand"
            ? "bg-brand text-brand-foreground border-transparent"
            : "bg-background",
        className,
      )}
    >
      {photo ? (
        <>
          <Photo
            photo={photo}
            priority
            tone={false}
            rounded={false}
            sizes="100vw"
            className="absolute inset-0 -z-20"
            imgClassName="object-cover object-[60%_center]"
          />
          {/* 홈 히어로와 같은 스크림. 좌측이 짙어 헤드라인이 앉는다 */}
          <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
        </>
      ) : null}

      <Container
        className={cn(
          art &&
            "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12",
        )}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-semibold tracking-[0.08em] uppercase",
                photo
                  ? "text-highlight"
                  : onDark
                    ? "text-brand-foreground/70"
                    : "text-primary",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "max-w-[24ch] text-[1.75rem] leading-[1.3] font-bold break-keep lg:text-[2.75rem] lg:leading-[1.15]",
              eyebrow && "mt-3",
            )}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className={cn(
                "mt-5 max-w-[68ch] text-base leading-[1.75] break-keep lg:text-[1.0625rem] lg:leading-[1.8]",
                onDark ? "text-brand-foreground/85" : "text-muted-foreground",
              )}
            >
              {lead}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {actions}
            </div>
          ) : null}
        </div>

        {art ? (
          <div className="mt-10 hidden w-[22rem] lg:mt-0 lg:block xl:w-[26rem]">
            <Illustration
              src={art.src}
              width={art.width}
              height={art.height}
              decorative
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
