# Working Memory

Updated: 2026-07-30

## Summary

**DevFirm 홈페이지** (기존 cmnyx.com 리뉴얼, (주)씨엠닉스).
Next.js 16.2.12 + React 19.2.4 + Tailwind v4 + shadcn/ui, 전면 SSG.

**상태: Phase 0~5 구현 완료 + 파비콘·일러스트·사진·글래스모피즘 적용 완료.**
GitHub 푸시 · CI 통과 · Vercel 프로덕션 배포 완료.

- 저장소: https://github.com/leebongs/DevFirm (`main`)
- 배포: **https://dev-firm.vercel.app** (공개, 로그인 불필요)
- 계획서: `.omc/plans/devfirm-renewal-plan.md`
- 결정 기록: `.omc/plans/open-questions.md` (O-1~O-8 전건 확정)
- 이미지·글래스 기록: `.omc/plans/image-plan.md`

## 통과 중인 게이트 (변경 시 반드시 재확인)

| 기준 | 현재 값 |
| --- | --- |
| A1 반응형 | 19경로 × 6뷰포트 가로 스크롤 0 |
| A3 링크 | 내부 404 = 0 |
| A4 리다이렉트 | 레거시 11경로 **308** 단일 홉 |
| A5 접근성 | axe 390·1440 critical/serious 0 |
| A6 색 대비 | 게이트 전수 통과 (유리 합성 포함) |
| A7 Lighthouse | **P 98~99 · A11y 98~100 · BP/SEO 100 · LCP 0.8~1.1s · CLS 0.006** |
| A8 번들 | 초기 JS ≤ 130KB |
| A12 폼 | 3경로 + 동의 필수 + 3초 미만 거부 |
| A13 조판 | keep-all 적용, 오버플로 0 |
| A14 위계 | 최상위 5/6, depth 3/3 |
| E2E | **245 통과 / 0 실패** |

```bash
pnpm verify                    # 정적 검사 전부
pnpm build && pnpm test:e2e    # E2E 245개
pnpm test:lh                   # Lighthouse
```

## 자산 현황

| 종류 | 개수 | 위치 | 용량 |
| --- | --- | --- | --- |
| 파비콘·OG | 4 | `app/icon.svg`, `apple-icon.png`, `opengraph-image.png`, `twitter-image.png` | — |
| 일러스트 | 23 | `public/images/{model,workspace,map,agents,hero,cards}` | 92KB |
| 개념 도형 | 5 | `public/images/concept` | 11KB |
| 사진 | 6×2 | `public/images/photo` (AVIF+WebP) | 0.4MB |
| PNG 파생 | 7 | `public/images/png` | 408KB |

레지스트리(단일 진실원천): `content/illustrations.ts` · `content/photos.ts`

## 미완 · 후속 (전부 외부 요인)

1. **도메인** (O-6) — `devfirm.*` TLD 미정. `NEXT_PUBLIC_SITE_URL` + `LEGACY_HOST`
   두 환경변수만 넣으면 크로스 도메인 308 이 켜진다. 코드 변경 불필요.
   현재 `NEXT_PUBLIC_SITE_URL=https://dev-firm.vercel.app` 로 설정돼 있음.
2. **폼 메일 미발송** — `RESEND_API_KEY` 없음. O-1 에 따라 도메인 확보(SPF/DKIM)가
   선행. 현재는 `/contact` 의 `contact@cmnyx.com` mailto 가 유효 경로.
   `FORM_TOKEN_SECRET` 은 프로덕션에 설정 완료.
3. **콘텐츠 검수** (O-7) — 전 페이지 문구가 초안. 채용공고 3건·과정 4건 실데이터 교체 필요.
4. **사진 흠 2건** — `about-backoffice` 배경 인물 얼굴, `solutions-desk` 녹색.
   네이비 오버레이로 눌러뒀음. 재생성하려면 해당 프롬프트만 다시 돌리면 됨.
5. **실사진 교체 시** — `content/photos.ts` 경로만 변경. 치수만 맞추면 CLS 영향 없음.
6. **`dev-firm-for-cmagent`** — 같은 저장소에 연결된 두 번째 Vercel 프로젝트가
   매 푸시마다 함께 배포됨(환경변수 미설정). 의도한 것이 아니면 정리 필요.

## 반드시 지켜야 하는 규율

- **색상은 `:root` 실값, `@theme inline` 은 `var()` 참조만.** v4 의 inline 은 값을
  치환하므로 여기 색을 직접 쓰면 런타임 오버라이드가 불가능해진다.
- **`content/navigation.ts` 가 IA 단일 진실원천** (소비처 7곳 + 테스트 + sitemap).
- **푸터에 모든 경로가 있어야 한다** — 메가메뉴가 `ssr:false` 라 초기 HTML의
  유일한 크롤 경로다. (실제로 허브 3개가 빠져 있던 것을 테스트가 잡았다.)
- **`"use client"` 는 화이트리스트 9개만** (`scripts/check-content-rules.mjs`).
- **한국어 문장은 `content/*.ts` 에만.** `scripts/i18n-allowlist.json` 은 비어 있어야 함.
- **색·유리 토큰을 바꾸면 `pnpm check:contrast` 를 반드시 다시 돌린다.**
- **글래스 범위는 홈 + 헤더로 한정.** 본문 카드까지 넓히면 저사양 기기 스크롤과
  본문 대비가 문제가 된다(사용자와 합의한 범위).
- **유리는 어두운 틴트다.** 흰 틴트로 바꾸면 대비가 무너진다 — 이유는 image-plan §6.
- **`Illustration`/`Photo` 는 치수를 타입 단계에서 필수로 만든다.** 우회하지 말 것.

## 계획서와 달랐던 점

- Next 16 실물 대조 9건 → 계획서 **§12.1 (D-1~D-9)** 에 기록
- 구현 중 확정 사항 → **image-plan.md §5, §6** 에 기록

핵심 3개:
- `next build` 가 First Load JS 를 출력하지 않음 → A8 을 실제 네트워크 측정으로 대체
- `redirects({permanent:true})` 는 **308** (301 아님)
- `next/dynamic {ssr:false}` 는 RSC 에서 무효 → `header-nav-client` 래퍼
