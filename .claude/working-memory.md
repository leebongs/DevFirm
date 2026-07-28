# Working Memory
Updated: 2026-07-28

## Summary

**DevFirm 홈페이지 리뉴얼** (기존 https://www.cmnyx.com 리뉴얼, (주)씨엠닉스/CMNYX).
스택: Next.js App Router + TS + Tailwind v4 + shadcn/ui, Vercel 배포.

**현재 상태: 계획 확정 완료, 코드 0줄. Phase 0 착수 대기.**

## Detail

### 계획 문서
- `.omc/plans/devfirm-renewal-plan.md` (975줄) — 13개 섹션 상세 구현 계획, ADR-001~003 포함
- `.omc/plans/open-questions.md` (55줄) — Open Question 결정 기록

### 이번 세션 작업 (2026-07-28)
1. 플랜 파일 탐색 및 전문 정독
2. **Open Questions 8건 전건 결정** — 사용자 답변으로 확정, 두 문서에 반영 완료

### 확정 결정 (O-1 ~ O-8)

| ID | 결정 | 기본값 대비 |
|---|---|---|
| O-1 | Resend + `mailto:` 폴백 (`lib/mail.ts` 어댑터) | 동일 |
| O-2 | 기존 이미지 재사용 + 저채도 오버레이 | 동일 |
| O-3 | 다크모드 미지원 → Phase 6 연기 | 동일 |
| O-4 | 지도 정적 이미지 + 카카오맵 외부링크 | 동일 |
| O-5 | 개발자 배포, CMS 미도입 (ADR-003 확정) | 동일 |
| **O-6** | **`devfirm.*` 신규 도메인 + cmnyx.com 전체 301** | **변경됨** |
| O-7 | 기존 문구 초안 → 오픈 전 검수 | 동일 |
| O-8 | 검색콘솔만 Phase 5, GA4는 Phase 6 | GA4도 연기 |

### O-6 파급 (계획 반영 완료)
- Phase 5 작업 6번에 도메인 이전 a~f 세분 추가
- A4 acceptance criteria → 크로스 도메인 301로 확장
- §10.1 신설, §12 리스크 2행 추가, §13 요약 갱신
- **주의: O-6가 O-1을 역방향 의존시킨다** — Resend SPF/DKIM을 신규 도메인에 걸어야 하므로 도메인 확보가 폼 실동작의 선행조건. Phase 4 시점에 도메인이 없으면 `mailto:` 폴백으로 진행.

### 남은 실무 확인 (결정 아님, 사실 확인)
- [ ] `devfirm.*` TLD 확보 가능 여부 (`.com` 선점 가능성 높음 → `.co.kr`/`.kr`/`.dev` 대안). `content/site.ts` 의 `siteUrl` 단일 상수로 교체 지점 격리
- [ ] Resend API 키 + 문의 수신 담당자 메일 주소
- [ ] cmnyx.com DNS 관리 주체(등록기관·계정 접근 권한)
- [ ] 저해상도로 재사용 불가한 기존 이미지 목록 (Phase 2 착수 시 판별)

### 환경 갭
- **Vercel CLI 미설치** — Phase 0 항목 7(Vercel 프로젝트 연결)에 필요. `npm i -g vercel`
- 작업 디렉토리가 git 저장소 아님 — Phase 0에서 `git init` + GitHub 리포 생성 필요

### 다음 액션
**Phase 0 — 부트스트랩 & 기반 (0.5~1일).** 블로커 없음.
1. `npx create-next-app@latest .` (TS, App Router, Tailwind, ESLint, `@/*` alias, Turbopack)
2. `npx shadcn@latest init` (New York, CSS variables, neutral)
3. Prettier + `prettier-plugin-tailwindcss`, tsconfig strict 강화
4. Pretendard Variable self-host + `next/font/local`
5. `content/_types.ts`(NavNode) + `site.ts` + `navigation.ts` 스켈레톤
6. `scripts/i18n-allowlist.json` + A10/A11 grep 스크립트
7. git init + GitHub 리포 + Vercel 연결
8. `.github/workflows/ci.yml`

### 핵심 규율 (구현 시 위반 금지)
- 색상 토큰은 `:root` 에 실값, `@theme inline` 은 `var()` 참조만 (§4.2 — v4 inline은 값 치환이라 런타임 오버라이드 불가)
- `content/navigation.ts` 가 IA 단일 진실원천 — 소비처 7곳 외 경로 하드코딩 금지
- `"use client"` 는 §6.4 화이트리스트 9개만
- `components/ui/` (shadcn 생성물) 직접 수정 금지, 확장은 래퍼로
- `content/` 외부 JSX에 한국어 문장 리터럴 금지 (A10 grep 검증)
