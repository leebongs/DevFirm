/**
 * 지원 언어 레지스트리 — 단일 진실원천.
 *
 * 요청받은 20개 항목 중 다섯은 별개 언어가 아니어서 정리했다.
 *   파키스탄어 → 우르두어(ur)      파키스탄어라는 언어는 없다. 국어는 우르두어다.
 *   인도어     → 힌디어(hi)        인도의 공용어만 22개다. 가장 널리 쓰는 것을 택했다.
 *   브라질어   → pt-BR             포르투갈어의 브라질 변형.
 *   아르헨티나어·파라과이어·멕시코어 → es 로 통합.
 *     셋 다 스페인어이고 번역문이 사실상 같아진다. 지역 변형을 따로 두면
 *     유지비가 네 배가 되고 hreflang 중복으로 SEO 에서 서로를 잠식한다.
 *     나중에 시장별로 쪼갤 필요가 생기면 여기 항목만 늘리면 된다.
 *
 * `label` 은 **그 언어 사용자가 읽는 이름**(endonym)이다. 언어 선택기에서
 * 자기 언어를 못 찾는 일이 없어야 하므로 한국어 표기를 쓰지 않는다.
 */
export type Locale = (typeof locales)[number]["code"];

export const locales = [
  { code: "ko", label: "한국어", english: "Korean", dir: "ltr" },
  { code: "en", label: "English", english: "English", dir: "ltr" },
  { code: "ja", label: "日本語", english: "Japanese", dir: "ltr" },
  {
    code: "zh",
    label: "简体中文",
    english: "Chinese (Simplified)",
    dir: "ltr",
  },
  { code: "ms", label: "Bahasa Melayu", english: "Malay", dir: "ltr" },
  { code: "id", label: "Bahasa Indonesia", english: "Indonesian", dir: "ltr" },
  { code: "vi", label: "Tiếng Việt", english: "Vietnamese", dir: "ltr" },
  { code: "th", label: "ไทย", english: "Thai", dir: "ltr" },
  { code: "ur", label: "اردو", english: "Urdu", dir: "rtl" },
  { code: "hi", label: "हिन्दी", english: "Hindi", dir: "ltr" },
  { code: "es", label: "Español", english: "Spanish", dir: "ltr" },
  { code: "fr", label: "Français", english: "French", dir: "ltr" },
  { code: "fi", label: "Suomi", english: "Finnish", dir: "ltr" },
  { code: "sv", label: "Svenska", english: "Swedish", dir: "ltr" },
  { code: "it", label: "Italiano", english: "Italian", dir: "ltr" },
  { code: "ro", label: "Română", english: "Romanian", dir: "ltr" },
  {
    code: "pt-BR",
    label: "Português (Brasil)",
    english: "Portuguese (Brazil)",
    dir: "ltr",
  },
] as const;

/**
 * 접두사 없는 경로가 가리키는 언어. 원문이 한국어이므로 폴백 대상이기도 하다.
 *
 * `: Locale` 로 넓히지 않고 리터럴로 둔다. 넓히면 `Exclude<Locale, typeof
 * DEFAULT_LOCALE>` 가 `never` 로 접혀 번역 로더 테이블의 타입이 무너진다.
 */
export const DEFAULT_LOCALE = "ko" as const satisfies Locale;

export const localeCodes = locales.map((l) => l.code);

export const isLocale = (value: string): value is Locale =>
  (localeCodes as readonly string[]).includes(value);

export const localeOf = (code: Locale) =>
  locales.find((l) => l.code === code) ?? locales[0];

/**
 * `<html dir>` 값. 우르두어만 rtl 이다.
 *
 * 이 한 항목 때문에 레이아웃 전반이 논리 속성(`ms-*`·`ps-*`·`text-start`)을
 * 써야 한다 — 물리 속성(`ml-*`·`text-left`)은 rtl 에서 뒤집히지 않는다.
 */
export const dirOf = (code: Locale) => localeOf(code).dir;

/**
 * hreflang 에 넣을 값. 검색엔진은 BCP-47 을 기대하므로 코드를 그대로 쓴다.
 * `x-default` 는 언어 협상이 실패했을 때의 기본으로 기본 언어를 가리킨다.
 */
export const hreflangOf = (code: Locale) => code;
