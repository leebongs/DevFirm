# Working Memory

Updated: 2026-07-31

## Summary

**DevFirm 홈페이지** (기존 cmnyx.com 리뉴얼, (주)씨엠닉스).
Next.js 16.2.12 + React 19.2.4 + Tailwind v4 + shadcn/ui, 전면 SSG.

**상태: Phase 0~5 구현 완료 + 파비콘·일러스트·사진·글래스모피즘 적용 완료.**
추가: 히어로 배경 영상 · 로고타이프/엠블렘 · 페이지 히어로 배너 · 실제 지도 임베드.
GitHub 푸시 · CI 통과 · Vercel 프로덕션 배포 완료.

- 저장소: https://github.com/leebongs/DevFirm (`main`)
- 배포: **https://devfirm.co** (`dev-firm.vercel.app` 은 308 로 여기로 넘어온다)
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
| A7 Lighthouse | **P 98~99 · A11y 98~100 · BP/SEO 100 · LCP 0.83~1.03s · CLS 0.006** (2026-07-31 재측정) |
| A8 번들 | 초기 JS ≤ 130KB |
| A12 폼 | 3경로 + 동의 필수 + 3초 미만 거부 |
| A13 조판 | keep-all 적용, 오버플로 0 |
| A14 위계 | 최상위 5/6, depth 3/3 |
| E2E | **257 통과 / 0 실패** (메가메뉴 오버플로 4건 포함) |

```bash
pnpm verify                    # 정적 검사 전부
pnpm build && pnpm test:e2e    # E2E 257개
pnpm dlx @lhci/cli autorun     # Lighthouse (lhci 는 전역 설치돼 있지 않다)

pnpm gen:logo                  # 로고타이프·엠블렘·파비콘 재생성
pnpm gen:icons                 # PNG 아이콘·OG 카드 (gen:logo 뒤에 돌린다)
pnpm check:menu                # 메가메뉴 오버플로 (서버가 떠 있어야 함)
```

**주의**: 서버가 떠 있는 상태로 `pnpm build` 하면 실행 중 서버가 사라진 청크를
가리켜 500 이 나고 페이지가 무스타일로 보인다. 빌드 전에 3000·3100 포트를 비울 것.

## 자산 현황

| 종류 | 개수 | 위치 | 용량 |
| --- | --- | --- | --- |
| 파비콘·OG | 4 | `app/icon.svg`, `apple-icon.png`, `opengraph-image.png`, `twitter-image.png` | — |
| 일러스트 | 23 | `public/images/{model,workspace,map,agents,hero,cards}` | 92KB |
| 개념 도형 | 5 | `public/images/concept` | 11KB |
| 사진 | 14×2 | `public/images/photo` (AVIF+WebP) | 1.3MB |
| 로고 | 3 | `assets/logo/wordmark.svg`, `app/icon.svg`, `components/layout/brand-logo.tsx` | 생성물 |
| PNG 파생 | 7 | `public/images/png` | 408KB |

레지스트리(단일 진실원천): `content/illustrations.ts` · `content/photos.ts`

## 미완 · 후속 (전부 외부 요인)

1. **도메인** (O-6) — `devfirm.*` TLD 미정. `NEXT_PUBLIC_SITE_URL` + `LEGACY_HOST`
   두 환경변수만 넣으면 크로스 도메인 308 이 켜진다. 코드 변경 불필요.
   `devfirm.co` 가 Vercel 에 연결돼 동작 중이지만 `NEXT_PUBLIC_SITE_URL` 은 아직
   `https://dev-firm.vercel.app` 이라 canonical 이 리다이렉트되는 주소를 가리킨다.
   2026-07-31 사용자 결정으로 유지 중 — 전환은 환경변수 한 줄이면 된다.
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

#### 2026-07-31 05:28:58 — PRE-COMPACTION CHECKPOINT
- **Context about to be compacted** — this checkpoint preserves state
- Tool calls this session: 45
- Estimated context before compaction: 1533KB
- Unsaved file changes: 3
- Auto-checkpoints written: 1
- Files touched: /Users/coman/Dev/cmnix/DevFirm/scripts/build-hero-video.mjs, /Users/coman/Dev/cmnix/DevFirm/components/content/hero-video.tsx, /Users/coman/Dev/cmnix/DevFirm/app/(site)/page.tsx, /Users/coman/Dev/cmnix/DevFirm/content/site.ts, /Users/coman/Dev/cmnix/DevFirm/components/layout/site-footer.tsx, /Users/coman/Dev/cmnix/DevFirm/components/layout/mega-menu.tsx
- **Action needed**: After compaction, read this file to restore context

#### 2026-08-21 08:07:23 — SESSION END
- Tool calls: 1, Context: 0KB, Checkpoints: 0

#### 2026-08-21 14:37:23 — SESSION END
- Tool calls: 124, Context: 7229KB, Checkpoints: 8

## 2026-10-19 — DocAI 카탈로그 세션 (전부 미커밋)

- **DocAI 페이지** `/solutions/docai` 구현 상태: 페이지·컴포넌트·콘텐츠·E2E 완료,
  nav·푸터·sitemap·테스트 경로 자동 편입 확인. verify·build·E2E 전건 통과.
- **i18n**: `content/docai.ts` 를 dictionary 에 등록, page.tsx 를 getDictionary 로
  전환. 드리프트 1건 수복(`forms.validation` 이 사전에서 빠져 번역 16벌이 고아였음
  — 사전에 복원). 16개 언어 번역 **완료** (`scripts/i18n-translate.sh` codex 배치
  + prettier 포맷 + vi·es 모의 파일명 현지화). check:i18n 16×1555 전건 통과,
  verify·build·E2E green, EN/JA 렌더 실측 확인.
- **환경**: pnpm 단독 바이너리가 머신에 없다 — `corepack pnpm` 으로 실행,
  E2E 는 서버 수동 기동 + `BASE_URL` + webServer env(`FORM_TOKEN_SECRET`,
  `MAIL_TRANSPORT=mock`) 주입으로 돌린다. 영구 복구: `sudo corepack enable`.
  Playwright 브라우저는 재설치했음.
- **남은 결정**: `catalog-redesign/out/` 20MB gitignore 여부, `/solutions` 허브에
  DocAI 카드 추가 여부, 커밋·푸시 시점(번역 완료 전 푸시 금지 — 즉시 배포됨).

#### 2026-10-20 01:07:03 — PRE-COMPACTION CHECKPOINT
- **Context about to be compacted** — this checkpoint preserves state
- Tool calls this session: 99
- Estimated context before compaction: 1179KB
- Unsaved file changes: 0
- Auto-checkpoints written: 0
- Files touched: /Users/coman/.claude/projects/-Users-coman-Dev-cmnix-DevFirm/memory/pnpm-corepack-shim-missing.md, /Users/coman/Dev/cmnix/DevFirm/content/dictionary.ts, /Users/coman/Dev/cmnix/DevFirm/app/[lang]/(site)/solutions/docai/page.tsx
- **Action needed**: After compaction, read this file to restore context

#### 2026-10-20 06:10:39 — SESSION END
- Tool calls: 5, Context: 11KB, Checkpoints: 0

#### 2026-10-20 06:19:59 — SESSION END
- Tool calls: 2, Context: 0KB, Checkpoints: 0

## 2026-10-20 06:20 — DocAI ULTRAQA 체크포인트 (devfirm-9c)

대상: /Users/coman/Dev/cmnix/DocAI (사용자 지시: 전체 에러 점검 + 설정 기능 전수 검증 + 수정)

적용 완료 수정 (build+vitest 135/135 통과, 일부는 이후 타 세션 추가 수정으로 최종 게이트 재실행 예정):
1. app/src/main/aiSetup.ts run() — codex `login status` 성공 문구가 stderr 로 나옴(실측) → stdout 비면 stderr 반환. 실검증: codex authStatus=authenticated.
2. app/src/main/ai.ts — grok 현행 CLI 답변 키 `text` 언랩(연결 테스트+extractJson). 실측 {"text":"OK",...}.
3. app/renderer/app.js — 승인/샘플 버튼 IPC 예외 시 영구 disabled 방지(try/catch).
4. __tests__/aiProvider.test.ts — grok text 래핑 회귀 테스트 2건.

남은 일: grok 실지연 측정(biku85g1s) → 30s 타임아웃 조정 판단, code-reviewer 결과 수합, 최종 build+vitest, 사용자 보고(설정 기능 체크리스트).
조율: docai-1b(ai.ts 소유, 300s/8000자/autofix 보존 지시 준수), 허브 세션은 종료. 실데이터 ~/Documents/DocAI 보존 유지.
메모리 저장: -Users-coman-Dev-cmnix-DocAI/memory/ai-cli-live-contracts.md

## 2026-10-20 06:30 — DocAI ULTRAQA 완료 (devfirm-9c)

최종 게이트: build exit 0 · vitest 151/151 (10파일) · code-reviewer 독립 패스 4건 전부 승인(LOW 2건).
추가 수정: ai.ts grok 연결 테스트 타임아웃 30s→90s(실측 52초) + 실패 문구 초수 파라미터화.
실측 발견: grok 무료 티어 한도 도달 상태 — 시연에서 grok 데모 회피 권장. docai-1b 에 공지 완료.
전 수정 미커밋(사용자 방침). ULTRAQA 상태파일 없음(생성 안 함).

#### 2026-10-20 15:17:49 — PRE-COMPACTION CHECKPOINT
- **Context about to be compacted** — no state file found
- **Action needed**: After compaction, read this file to restore context

## 2026-10-20 16:50 — DocAI→DocASI 리브랜딩 (devfirm-9c)

브랜드: **DocASI** (발음 도카시) · 공식 카피 "Superintelligence for Document Compliance" (처음 "Best Documents ASI"였다가 사용자 승인으로 교체, docai-1b 경유).
사용자 지시: 기계 식별자(appId co.devfirm.docai, docai://, /updates/docai/stable.json, ~/Documents/DocAI, .docai, 실행파일명)는 **최종 단계 마이그레이션으로 연기** — 이번엔 표시 문자열·로고·라우트만.

### DevFirm (이 레포)
- 라우트: /solutions/docai → **/solutions/docasi** (+/start), 구경로 308 redirects(redirects.ts) + proxy rewrite 이중 안전망. /solution/DocAI/releasenote 는 서명 manifest 에 박혀 있어 URL 유지.
- 신규 로고: DOCASI 워드마크(그리드 작도 스트로크, DOC 네이비/아이보리+ASI 호박색), 엠블렘(기존 D-문서+발견점 계승, 스파크+시안 동반점). 원본 docs/brand/docasi-*.svg (DocAI 레포).
- docasi 페이지 히어로에 워드마크 인라인, eyebrow=공식 카피. 솔루션 허브에 DocASI 브랜드 스트립(엠블렘+카피+시작하기/카탈로그 CTA). 허브 ko 타이틀 사용자 원문 "산업현장엔 피지컬AI, 사무현장엔 최과장AI- DocASI" (타 로케일 타이틀 번역은 미갱신 — i18n 파이프라인 몫).
- i18n 18파일 값 치환+eyebrow, catalog-redesign 심볼=새 엠블렘.
- 게이트: lint/tsc/fmt/content/nav/contrast/svg/i18n 전부 OK, build OK, e2e docai 5종 65 passed. 전체 e2e 1회 더 돌린 뒤 **커밋+푸시(프로덕션 배포, 사용자 지시)** 예정.

### DocAI 레포
- 리브랜드 에이전트(opus): 표시 문자열 전수(DocASI), 시작 URL→/solutions/docasi/start, 테스트 기대값 갱신, 229/229. productName 은 OTA 파일명 계약 때문에 보류 → 내가 mac.extendInfo CFBundleDisplayName/CFBundleName="DocASI" 추가(표시만).
- 다크 테마 에이전트: --border-line 토큰 신설, 다크 공통 #2D3B44 저대비 보더, **블루프린트 다크만 제도선 예외**(#2A5580). 라이트 무변경.
- 아이콘 적용: app/build/icon.icns+png, windows Assets/DocAI.ico 전부 새 엠블렘로 재생성(sips+iconutil, 파이썬 ICO 패킹).
- vitest 3건 간헐 실패(engine 이슈id/hub 422/regexSafety)는 전부 무변경 파일 — DevFirm 빌드 병행 부하 플레이크. 유휴 재실행으로 확인 예정.
- DocAI 레포는 미커밋 유지(타 세션 OTA 작업과 혼재, 커밋 지시 없음).
- 카탈로그 아티팩트는 docai-1b 가 재배포 완료(https://claude.ai/artifact/4KAsEf5vFjpnwmJ6n6yUE7 v2).
- 2026-10-20 17:2x: DocAI 레포도 docai-1b 가 사용자 요청으로 커밋·푸시 완료 (cef0ffc, 258파일, build OK·vitest 248/248). locale 구경로 308 핫픽스는 DevFirm 2b9f6c9 로 배포·실측 완료. 양 레포 워킹트리 클린 — 리브랜딩 사이클 종료.
- 2026-10-20 17:3x: GitHub 저장소 개명 leebongs/DocAI → leebongs/DocASI (gh repo rename). 로컬 origin 갱신·fetch 검증·구 URL 리다이렉트 확인 완료. DocAI-releases(OTA)는 보존. 로컬 폴더명 변경은 피어 세션·세션 상태 경로 때문에 보류(사용자 재요청 시 전 세션 정리 후 진행).
- 2026-10-20 17:5x 진행중 체크포인트: start 안내 ① 문구 수정("장치 연결 코드 또는 페어링링크 URL로…", a86060e 배포·라이브 확인) ② 7-8 사이 새 단계 카드 "검사받을 문서를 폴더에 넣습니다"(file-clock, 팀 멤버, 스펙 9단계+단언 추가, 게이트 그린·미커밋) ③ setup 섹션을 세로 타임라인 스테퍼로 재설계(노드 톤 3단: 채움=Hub 관리자/외곽=팀 멤버/소프트=관리자 확인, ol>li 유지) — 빌드·스크린샷·e2e 백그라운드(bj0k4gjfx) 대기 중. 통과 시 ②③ 묶어 커밋·푸시·프로덕션 확인 예정.
- 2026-10-20 18:0x: 스테퍼 게이트 그린(TSC/BUILD/e2e 8 passed). 스크린샷 셀렉터 보정 후 재촬영 중(bpovbbpjk) — 시각 검수 통과하면 카드 추가+스테퍼 묶어 커밋·배포.
