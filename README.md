# DevFirm

(주)씨엠닉스(CMNYX) 홈페이지. 기존 https://www.cmnyx.com 리뉴얼.

상세 구현 계획은 [`.omc/plans/devfirm-renewal-plan.md`](.omc/plans/devfirm-renewal-plan.md),
확정된 의사결정은 [`.omc/plans/open-questions.md`](.omc/plans/open-questions.md) 참조.

## 설치된 버전 (2026-07-28 부트스트랩 시점)

| 항목        | 버전    |
| ----------- | ------- |
| Next.js     | 16.2.12 |
| React       | 19.2.4  |
| TypeScript  | 5.9.3   |
| Tailwind    | 4.3.3   |
| ESLint      | 9.39.5  |
| shadcn CLI  | 4.16.0  |
| Prettier    | 3.9.6   |
| Pretendard  | 1.3.9   |
| Node (개발) | 25.6.1  |
| pnpm        | 10.33.0 |

> Next 16 요구사항: Node.js 20.9+ / TypeScript 5.1+. CI는 Node 22를 쓴다.

## 명령어

```bash
pnpm dev            # 개발 서버 (Turbopack, Next 16부터 기본)
pnpm build          # 프로덕션 빌드
pnpm start          # 빌드 결과 서빙

pnpm verify         # 아래 4개를 순서대로 실행 (CI와 동일)
pnpm lint           # ESLint — next build 는 더 이상 lint 를 돌리지 않는다
pnpm typecheck      # tsc --noEmit
pnpm format:check   # Prettier
pnpm check:content  # A10 콘텐츠 분리 · A11 클라이언트 경계
```

## 콘텐츠 수정 가이드

**화면에 보이는 한국어 문구는 전부 `content/*.ts` 에 있다.** 컴포넌트(JSX)에
한국어 문장을 직접 쓰면 `pnpm check:content` 가 CI에서 막는다(A10).

| 고치려는 것      | 파일                    |
| ---------------- | ----------------------- |
| 회사 정보·연락처 | `content/site.ts`       |
| 메뉴 구조        | `content/navigation.ts` |
| 홈 문구          | `content/home.ts`       |
| 산업별 AI 6종    | `content/agents.ts`     |
| 아카데미 과정    | `content/courses.ts`    |
| 채용 공고        | `content/careers.ts`    |

`content/navigation.ts` 는 IA의 단일 진실원천이다. 헤더·메가메뉴·모바일 드로어·
SectionNav·Breadcrumb·푸터·`sitemap.ts` 가 전부 이 파일 하나를 읽는다.
메뉴를 추가하려면 이 파일만 고치면 된다.

## 지켜야 하는 규율

- 색상 토큰은 `:root` 에 실값, `@theme inline` 에서는 `var()` 로 **참조만** 한다.
  Tailwind v4 의 `@theme inline` 은 값을 인라인 치환하므로 여기에 색을 직접 쓰면
  런타임 오버라이드(다크모드)가 불가능해지고 shadcn CSS 변수 모드와 충돌한다.
- `components/ui/` 는 shadcn 생성물이므로 직접 수정하지 않는다. 확장은 래퍼로.
- `"use client"` 는 `scripts/check-content-rules.mjs` 의 화이트리스트 9개만 허용.
  추가하려면 PR에 사유를 명시하고 화이트리스트를 갱신한다.

## 폰트

Pretendard Variable 을 **자체 호스팅**한다(외부 CDN 요청 0). `next/font/local` 은
서브셋별 `unicode-range` 를 표현할 수 없어서, 92분할 동적 서브셋을
`public/fonts/pretendard/` 에 두고 `app/fonts.css` 의 `@font-face` 로 선언한다.
브라우저는 페이지 텍스트가 닿는 구간만 내려받는다(전체 Variable 파일은 2.0MB).

폰트를 갱신하려면 `pnpm add -D pretendard@<version>` 후:

```bash
cp node_modules/pretendard/dist/web/variable/woff2-dynamic-subset/*.woff2 public/fonts/pretendard/
sed 's#url(./woff2-dynamic-subset/#url(/fonts/pretendard/#g' \
  node_modules/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css > app/fonts.css
```
