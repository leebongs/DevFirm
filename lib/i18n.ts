import "server-only";
import { cache } from "react";
import { dictionary, type Dictionary } from "@/content/dictionary";
import { DEFAULT_LOCALE, type Locale } from "@/content/locales";

/**
 * 언어별 콘텐츠 해석기.
 *
 * 번역본은 한국어 원문에 **덮어씌우는 층**이지 대체본이 아니다. 번역 파일에
 * 없는 키는 한국어가 그대로 남는다. 이 규칙 하나로 두 가지가 해결된다:
 *
 *   - 번역이 늦은 언어도 페이지가 깨지지 않고 뜬다. 빠진 문장만 한국어다.
 *   - 한국어에 문장을 새로 추가해도 16개 번역 파일을 동시에 고칠 필요가 없다.
 *     `pnpm check:i18n` 이 누락을 보고하고, 그때까지는 한국어로 나간다.
 *
 * 각 언어 JSON 은 동적 임포트로 가져온다. 정적으로 17개를 전부 임포트하면
 * 모든 페이지 번들에 17개 언어가 다 실린다 — 전면 SSG 라 빌드 시점에 해당
 * 언어 페이지에만 인라인되어야 한다.
 */
const loaders: Record<
  Exclude<Locale, typeof DEFAULT_LOCALE>,
  () => Promise<{ default: unknown }>
> = {
  en: () => import("@/content/i18n/en.json"),
  ja: () => import("@/content/i18n/ja.json"),
  zh: () => import("@/content/i18n/zh.json"),
  ms: () => import("@/content/i18n/ms.json"),
  id: () => import("@/content/i18n/id.json"),
  vi: () => import("@/content/i18n/vi.json"),
  th: () => import("@/content/i18n/th.json"),
  ur: () => import("@/content/i18n/ur.json"),
  hi: () => import("@/content/i18n/hi.json"),
  es: () => import("@/content/i18n/es.json"),
  fr: () => import("@/content/i18n/fr.json"),
  fi: () => import("@/content/i18n/fi.json"),
  sv: () => import("@/content/i18n/sv.json"),
  it: () => import("@/content/i18n/it.json"),
  ro: () => import("@/content/i18n/ro.json"),
  "pt-BR": () => import("@/content/i18n/pt-BR.json"),
};

/**
 * 번역층을 원문 위에 겹친다.
 *
 * 배열은 통째로 갈아끼우지 않고 **인덱스별로** 겹친다. 번역본의 배열이 짧으면
 * 뒤쪽 항목이 통째로 사라지는데, 그러면 메뉴 항목이나 카드가 언어에 따라
 * 개수가 달라진다. 길이는 원문이 정하고 번역은 자리만 채운다.
 */
function overlay<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base;

  if (typeof base === "string") {
    return (
      typeof patch === "string" && patch.trim() !== "" ? patch : base
    ) as T;
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(patch)) return base;
    return base.map((item, i) => overlay(item, patch[i])) as T;
  }

  if (base && typeof base === "object") {
    if (!patch || typeof patch !== "object" || Array.isArray(patch))
      return base;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base)) {
      out[key] = overlay(value, (patch as Record<string, unknown>)[key]);
    }
    return out as T;
  }

  // 숫자·불리언은 번역 대상이 아니다
  return base;
}

/**
 * `cache` 로 감싸 같은 렌더 패스에서 한 번만 읽는다. 레이아웃과 페이지가
 * 각각 호출해도 JSON 파싱은 한 번이다.
 */
export const getDictionary = cache(
  async (locale: Locale): Promise<Dictionary> => {
    if (locale === DEFAULT_LOCALE) return dictionary;
    const load = loaders[locale as Exclude<Locale, typeof DEFAULT_LOCALE>];
    if (!load) return dictionary;
    try {
      const mod = await load();
      return overlay(dictionary, mod.default);
    } catch {
      // 번역 파일이 아직 없으면 한국어로 낸다. 페이지가 500 나는 것보다 낫다.
      return dictionary;
    }
  },
);
