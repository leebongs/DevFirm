import { cn } from "@/lib/utils";
import type { PhotoAsset } from "@/content/photos";

/**
 * 사진 렌더러.
 *
 * `next/image` 대신 `<picture>` 를 직접 쓴다. 이미 빌드 전에 AVIF/WebP 두 벌을
 * 구워 두었으므로 런타임 변환이 할 일이 없고, 정적 파일로 서빙하는 편이
 * 이미지 최적화 요청을 아예 만들지 않아 더 빠르다.
 *
 * `tone` 은 §4.1 이 요구한 저채도 통일을 담당한다. 생성 사진은 장마다 색온도가
 * 달라 그대로 나열하면 톤이 튄다 — 네이비 오버레이가 그 편차를 눌러 팔레트
 * 밖 색(예: 대시보드의 녹색)까지 함께 잡는다.
 */
export function Photo({
  photo,
  className,
  imgClassName,
  priority,
  sizes = "100vw",
  tone = true,
  rounded = true,
}: {
  photo: PhotoAsset;
  className?: string;
  imgClassName?: string;
  /** 접힘 위에 보이는 사진에만. LCP 후보를 미리 가져온다. */
  priority?: boolean;
  sizes?: string;
  /** 저채도 네이비 오버레이로 톤 통일 */
  tone?: boolean;
  rounded?: boolean;
}) {
  const alt = "alt" in photo && photo.alt ? photo.alt : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded && "rounded-lg",
        className,
      )}
    >
      <picture>
        <source srcSet={`${photo.base}.avif`} type="image/avif" sizes={sizes} />
        <source srcSet={`${photo.base}.webp`} type="image/webp" sizes={sizes} />
        <img
          src={`${photo.base}.webp`}
          width={photo.width}
          height={photo.height}
          alt={alt}
          aria-hidden={alt === "" || undefined}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </picture>

      {tone ? (
        <div
          aria-hidden
          className="from-brand/45 to-brand/25 absolute inset-0 bg-gradient-to-br via-transparent mix-blend-multiply"
        />
      ) : null}
    </div>
  );
}
