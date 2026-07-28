# Working Memory

Updated: 2026-07-28

## Summary

**DevFirm 홈페이지** (기존 cmnyx.com 리뉴얼, (주)씨엠닉스).
Next.js 16.2.12 + React 19.2.4 + Tailwind v4 + shadcn/ui, 전면 SSG.

**상태: Phase 0~5 구현 완료.** 계획서(`.omc/plans/devfirm-renewal-plan.md`) 전 범위 구현.
전 페이지 정적 생성, E2E 239개 통과(0 실패), 정적 검사 전부 통과.

## 구현 결과

### 페이지 (19 라우트 + 동적 13)
`/` · `/about` `/about/cic` `/about/careers`(+3 공고) · `/solutions` `/solutions/office-ai`
`/solutions/physical-ai` `/solutions/agents/[industry]`(6) · `/services` `/services/software`
`/services/staffing` · `/academy` `/academy/courses`(+4 과정) `/academy/apply` ·
`/workspace` · `/contact` · `/privacy` `/terms` · `/styleguide`(noindex)

`/api/form-token` 만 동적. 나머지 전부 정적.

### 통과한 검증 게이트
| 기준 | 결과 |
| --- | --- |
| A1 반응형 | 19경로 × 6뷰포트 가로 스크롤 0 |
| A3 링크 | 내부 404 = 0, 외부 링크 rel 정상 |
| A4 리다이렉트 | 레거시 11경로 308 단일 홉 |
| A5 접근성 | axe 390·1440 전 페이지 critical/serious 0 |
| A6 색 대비 | 18개 조합 전수 통과 |
| A8 번들 | 23경로 초기 JS ≤ 130KB |
| A9 SEO | 고유 title/description/canonical |
| A12 폼 | 3경로 + 동의 필수 + 3초 미만 거부 |
| A14 정보 위계 | 최상위 5/6, depth 3/3 |

**A7 Lighthouse**: `lighthouserc.json` 구성 완료. CI 잡 존재. 로컬 실측은 미완.

## 미완 · 후속 (전부 외부 요인)

1. **도메인 확보** (O-6) — `devfirm.*` TLD 미정. `NEXT_PUBLIC_SITE_URL` + `LEGACY_HOST`
   두 환경변수만 설정하면 크로스 도메인 308이 켜진다. 코드 변경 불필요.
2. **Resend 키 · SPF/DKIM** (O-1) — 신규 도메인 확보가 선행. 미설정 시 폼은
   오류를 반환하고 `/contact` 의 `mailto:` 가 폴백.
3. **`FORM_TOKEN_SECRET`** — 프로덕션 필수. 없으면 모든 폼 제출이 거부된다(의도된 fail-closed).
4. **GitHub 리포 · Vercel 연결** — 인증 필요. 로컬 git 저장소는 준비됨(커밋 6개).
   Vercel CLI 미설치(`npm i -g vercel`).
5. **콘텐츠 검수** (O-7) — 전 페이지 문구가 초안. 채용공고·과정 데이터 실물 교체 필요.
6. **이미지 자산** (O-2) — 공유오피스 갤러리는 타이포 카드로 대체해 둠. 실사진 확보 후 교체.

## 계획서와 달랐던 점 (§12.1 D-1~D-9 에 기록)

Next 16 실물 대조로 9건. 핵심 3개:
- `next build` 가 First Load JS 를 더 이상 출력하지 않음 → A8 을 실제 네트워크 측정으로 대체
- `redirects({permanent:true})` 는 **308** (301 아님)
- `next/dynamic {ssr:false}` 는 RSC 에서 무효 → `header-nav-client` 래퍼 추가

추가로 구현 중 확정한 것:
- 계획의 `--accent`(Circuit Cyan)가 shadcn `--accent`(hover 면)와 충돌 → `--highlight` 로 분리
- `--primary` L 0.55 → 0.49 (muted 배경 위 대비 미달, axe 가 검출)
- shadcn v4 에 `form` 없음 → `field` + 서버 액션 + 서버 zod (react-hook-form 미사용)
- 폼 토큰을 SSG 페이지에 심을 수 없어 `/api/form-token` 으로 분리

## 지켜야 하는 규율

- 색상은 `:root` 실값, `@theme inline` 은 `var()` 참조만
- `content/navigation.ts` 가 IA 단일 진실원천 (소비처 7곳 + 테스트 + sitemap)
- **푸터에 모든 경로가 있어야 한다** — 메가메뉴가 `ssr:false` 라 유일한 크롤 경로
- `"use client"` 는 9개 화이트리스트만 (`scripts/check-content-rules.mjs`)
- 한국어 문장은 `content/*.ts` 에만 (`scripts/i18n-allowlist.json` 은 비어 있어야 함)
- 색 토큰을 바꾸면 `pnpm check:contrast` 를 반드시 다시 돌린다

## 명령어

```bash
pnpm verify      # 정적 검사 전부
pnpm build && pnpm test:e2e   # E2E 239개
pnpm test:lh     # Lighthouse
```
