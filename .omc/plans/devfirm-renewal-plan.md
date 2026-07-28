# DevFirm 홈페이지 리뉴얼 — 상세 구현 계획

- **프로젝트**: DevFirm (기존 https://www.cmnyx.com 리뉴얼)
- **회사**: (주)씨엠닉스(CMNYX) / 브랜드 컴퓨팅매니지먼트
- **작업 디렉토리**: `/Users/coman/Dev/cmnix/DevFirm` (greenfield)
- **스택**: Next.js App Router + React + TypeScript + Tailwind CSS + shadcn/ui, Vercel 배포
- **작성일**: 2026-07-25
- **모드**: RALPLAN-DR (SHORT)

---

## 0. RALPLAN-DR 요약

### 0.1 Principles (설계 원칙 5)

| # | 원칙 | 의미 | 위반 예시 |
|---|---|---|---|
| P1 | **컨셉 우선(Concept-first)** | "개발자들이 모인 개발법인, 데브펌" 이라는 로펌 비유가 홈 첫 화면에서 3초 안에 전달되어야 한다. 기능 나열보다 정체성이 먼저다. | 홈 히어로가 "AI 솔루션 전문기업" 같은 일반 SI 카피로 시작 |
| P2 | **정보 위계는 3단 이내(Depth ≤ 3)** | 모든 콘텐츠는 `섹션 > 페이지 > 앵커` 3단 안에서 도달. 기존 사이트의 중복·평행 메뉴를 병합한다. | `/ai-agent/construction-ai/detail/spec` 같은 4단 경로 |
| P3 | **콘텐츠는 데이터, 페이지는 템플릿** | 텍스트가 많으므로 문구를 JSX에 하드코딩하지 않고 `content/*.ts`(타입 안전) 로 분리해 페이지는 렌더러 역할만. 6종 산업 AI 같은 반복 구조는 단일 템플릿 + 데이터. | 산업별 AI 6개 페이지를 각각 손으로 작성 |
| P4 | **모바일 우선 · 읽기 우선** | 한국어 장문 가독성(줄바꿈, 행간, 측정폭 45~75자)이 화려함보다 우선. 320px에서 가로 스크롤 0. | 데스크탑 기준으로 만들고 모바일에서 폰트만 줄이기 |
| P5 | **정적 우선(Static-first)** | 마케팅 사이트다. 기본 SSG, 클라이언트 컴포넌트는 인터랙션이 필요한 잎(leaf)에만. JS 번들 최소화. | 페이지 루트에 `"use client"` 선언 |

### 0.2 Decision Drivers (top 3)

| 순위 | 드라이버 | 근거 | 계획에 미치는 영향 |
|---|---|---|---|
| **D1** | **정보 과밀 해소 (IA 재설계)** | 기존 사이트의 가장 큰 문제는 디자인이 아니라 메뉴/텍스트 중복. 6개 대메뉴 + 서브 + "더보기" 구조로 무엇을 파는 회사인지 불명확. | 최상위 메뉴 5개 + CTA 1개로 강제 축소. 중복 콘텐츠 병합 매핑표 필수(§2.3). |
| **D2** | **신뢰감 있는 B2B 전문성** | 타깃이 기업 발주처·교육 수강생·개발자 지원자. "세련됨"의 정의 = 절제된 색, 정확한 정렬, 촘촘한 타이포 스케일. | 다크 네이비 + 단일 액센트 팔레트. 그라데이션·이모지·과한 애니메이션 금지(§4). |
| **D3** | **유지보수 비용 (비개발자 수정 가능성)** | 공고·과정·모집 내용은 자주 바뀜. 매번 배포가 필요하면 사이트가 다시 방치된다. | 콘텐츠 레이어를 `content/` 로 완전 분리하고 Phase 6에서 헤드리스 CMS 전환 경로를 열어둠(§10 Open Question). |

### 0.3 Viable Options — 레이아웃 (핵심 결정)

#### Option L-A. 탑바 + 메가메뉴 (Top bar + Mega menu)

- **구조**: 상단 고정 헤더, 대메뉴 hover/tap 시 전폭 드롭다운에 서브메뉴 + 설명 + 대표 CTA.
- **Pros**: (1) B2B 기업 사이트의 표준 관습 — 학습 비용 0. (2) 콘텐츠 영역 전폭 사용 → 히어로/이미지 임팩트 최대. (3) 메가메뉴 패널이 "회사 전체 서비스 지도" 역할을 해서 메뉴가 많아도 한 번에 조망 가능.
- **Cons**: (1) 깊은 페이지에서 현재 위치 감각(orientation)이 약함 — 보조 내비 없이는 길을 잃음. (2) 메가메뉴는 모바일에서 그대로 못 쓰고 별도 드로어 구현 필요(구현 2벌). (3) hover 의존 시 터치/키보드 접근성 처리 비용.
- **적합 조건**: 페이지 수 30개 이하, 마케팅 성격 강함.

#### Option L-B. 고정 좌측 사이드바 (Docs 스타일)

- **구조**: 좌측 240~280px 고정 내비, 전 페이지 동일. 콘텐츠는 우측 영역.
- **Pros**: (1) 모든 메뉴가 항상 노출 — 텍스트/메뉴 많은 사이트에 구조적으로 강함. (2) 현재 위치 표시가 자연스러움. (3) 데스크탑/모바일 구현이 한 벌(드로어로 슬라이드).
- **Cons**: (1) **마케팅 사이트로서 신뢰감·브랜드 임팩트가 약함** — 문서/대시보드처럼 보여 "개발법인의 전문성"이라는 D2를 해침. (2) 히어로 전폭 사용 불가 → 첫인상 손해. (3) 태블릿(768~1024)에서 사이드바가 본문 폭을 심하게 압박.
- **적합 조건**: 문서·핸드북·내부 포털.

#### Option L-C. **하이브리드 — 탑바(메가메뉴) + 섹션 로컬 내비 + 앵커 TOC** ✅ 채택

- **구조**:
  - 전역: 상단 고정 탑바 + 메가메뉴(데스크탑) / 풀스크린 드로어(모바일).
  - 섹션 진입 시: 헤더 바로 아래 **sticky 서브내비(SectionNav)** — 해당 섹션(예: 아카데미)의 형제 페이지만 가로 탭으로 노출.
  - 장문 페이지: `xl` 이상에서 **우측 앵커 TOC(OnThisPage)**, 그 이하 화면에서는 상단 접이식 TOC.
- **Pros**: (1) 마케팅 임팩트(L-A) + 방향 감각(L-B)을 둘 다 확보. (2) 텍스트 과밀 페이지를 앵커로 스캔 가능 → D1 직접 해결. (3) 컴포넌트 3개(`SiteHeader`/`SectionNav`/`OnThisPage`)로 조합되어 각각 독립 테스트 가능.
- **Cons**: (1) 내비 컴포넌트가 3종이라 초기 구현·반응형 검증 비용이 A보다 약 1.3배. (2) 헤더 + 서브내비 이중 sticky로 모바일 세로 공간을 잠식 → **완화책**: 모바일에서 서브내비는 스크롤 다운 시 자동 숨김(스크롤 업 시 복귀), 총 sticky 높이 `≤ 112px` 상한을 토큰으로 강제.
- **판단**: Cons가 모두 구현 기법으로 해소 가능한 반면, L-A의 Con(1)과 L-B의 Con(1)은 구조적 결함이라 해소 불가.

#### Option L-A′. 탑바 + breadcrumbs (경량 보완안)

- **구조**: L-A에 페이지 상단 breadcrumb만 추가. SectionNav 없음.
- **Pros**: 구현 비용 최소, sticky 높이 문제 없음, `BreadcrumbList` 구조화 데이터로 SEO 이점.
- **Cons**: breadcrumb는 **부모 경로만** 알려주고 형제 목록을 보여주지 못한다. 이 사이트의 주 이동은 형제 간 비교 탐색(건설 AI → 제조 AI, 개발스쿨 → 업무스쿨)이라 부모 경유 2클릭이 강제된다.
- **처리**: 방향 감각의 주 수단으로는 **탈락**. 단 breadcrumb 고유 가치(a11y·SEO)는 대체 불가하므로 **채택안 L-C에 `Breadcrumb` 컴포넌트로 흡수**(§6.3, ADR-001).

**→ 채택: L-C 하이브리드.**

### 0.4 Viable Options — IA (정보구조)

#### Option I-A. 고객군 기준 (누구를 위한 것인가)

- 대분류: `기업 고객` / `교육 수강생` / `개발자(입사·입주)`
- **Pros**: 방문자가 자기 경로를 즉시 찾음. 중복 콘텐츠가 고객군별로 자연 분리됨.
- **Cons**: 회사가 "무엇을 만드는가"(피지컬AI·최과장AI)가 2단계 아래로 밀림 → P1(컨셉 우선) 위반. 한 콘텐츠가 두 고객군에 걸치면(예: 공유오피스 = 개발자 + 기업) 다시 중복 발생.

#### Option I-B. **제공물 기준 + 고객 경로는 홈에서 분기** ✅ 채택

- 대분류: `회사소개` / `AI 솔루션` / `개발 서비스` / `아카데미` / `공유오피스` + CTA `문의하기`
- **Pros**: (1) 기존 콘텐츠 자산과 1:1 매핑되어 마이그레이션 손실 없음. (2) 최상위 5개로 억제 가능(D1). (3) 홈에 "고객 경로 분기 블록"을 두어 I-A의 장점을 흡수.
- **Cons**: 첫 방문자가 자기 경로를 스스로 판단해야 함 → **완화책**: 홈 3번째 섹션에 `기업이신가요 / 배우고 싶으신가요 / 함께 일하고 싶으신가요` 3분기 카드 배치.

#### Option I-C. 기존 구조 유지 + 시각 리뉴얼만

- **Pros**: 리스크 최소, 기간 최단, 기존 URL/SEO 보존.
- **Cons**: D1(정보 과밀)이 그대로 남아 리뉴얼의 핵심 목적이 미달성. 중복 콘텐츠 유지보수 비용도 그대로.
- **판정**: 목표 미달로 **탈락**(무효화 근거: 리뉴얼 요구사항 2번 "메뉴 체계 재설계"와 정면 충돌).

**→ 채택: I-B.** (I-A는 홈 분기 블록으로 부분 흡수, I-C는 무효)

### 0.5 옵션 요약 매트릭스

| 결정 | 채택 | 대안 | 탈락 사유 |
|---|---|---|---|
| 레이아웃 | L-C 하이브리드 | L-A, L-A′, L-B | L-A 방향감각 부재 / L-A′ 형제 이동 2클릭(단 Breadcrumb는 흡수) / L-B 브랜드 임팩트 부족 |
| IA | I-B 제공물 기준 | I-A, I-C | I-A는 P1 위반·중복 재발, I-C는 목표 미달 |
| 스타일링 | Tailwind + shadcn/ui | CSS Modules, MUI | 요구사항 명시 |
| 콘텐츠 저장 | 타입드 TS 모듈 (`content/`) | MDX, 헤드리스 CMS | Phase 1~5는 TS, CMS는 Phase 6 옵션(§10) |
| 렌더링 | SSG 전면 | SSR/ISR | 마케팅 사이트, 동적 데이터 없음(문의 폼만 예외) |

---

## 1. 기술 스택 상세

### 1.1 코어

| 영역 | 선택 | 버전 정책 | 비고 |
|---|---|---|---|
| 프레임워크 | **Next.js (App Router)** | `create-next-app@latest` 로 부트스트랩된 최신 안정 버전 고정 | Turbopack dev 사용. 버전은 부트스트랩 시점 실제 값을 README에 기록 |
| 언어 | **TypeScript** | `strict: true`, `noUncheckedIndexedAccess: true` | 콘텐츠 데이터 타입 안전성이 P3의 전제 |
| UI 런타임 | **React (RSC 기본)** | Next와 동반 | 클라이언트 컴포넌트는 명시적 화이트리스트(§6.4) |
| 스타일 | **Tailwind CSS v4** | `@import "tailwindcss"` + **색상은 `:root` CSS 변수, `@theme inline` 은 참조만**(§4.2) | v4는 CSS-first 설정. `tailwind.config.ts` 최소화 |
| 컴포넌트 | **shadcn/ui** | `npx shadcn@latest init` (New York 스타일, CSS 변수 모드) | 소스 복사 방식이므로 `components/ui/` 는 **직접 수정 금지**, 확장은 래퍼로 |
| 아이콘 | **lucide-react** | shadcn 기본 | 아이콘 이모지 대체 금지(P/D2) |
| 폰트 | **Pretendard Variable** (한글) + `next/font/local` | self-host, `subset` 사용 | 외부 CDN 금지(LCP·CSP) |
| 애니메이션 | **CSS transition 우선**, 필요 시 `motion` (framer-motion 후속) | 진입 페이드/슬라이드만 | `prefers-reduced-motion` 필수 준수 |
| 폼 | **react-hook-form + zod** + shadcn Form | — | 문의/수강신청 |
| 배포 | **Vercel** | Preview = PR 단위 | `vercel.json` 최소 설정 |

> **배포 전제 주석 — SSG + Server Action의 런타임 요구사항**
> 사이트는 전면 SSG지만 문의/수강신청 폼은 Server Action(`app/actions/*.ts`)을 사용한다. **Vercel에서는 Server Action이 서버리스 함수로 자동 처리**되므로 별도 설정이 필요 없다. 다만 향후 **정적 호스팅(S3/Netlify 정적 등)이나 셀프호스팅으로 이전할 경우 Node.js 서버 런타임이 반드시 필요**하며, `output: 'export'` 로는 폼이 동작하지 않는다. 정적 내보내기가 요구되면 폼을 외부 서비스(§10 O-1)로 전환해야 한다.

### 1.2 품질 도구

| 목적 | 도구 | 게이트 |
|---|---|---|
| 린트 | ESLint (`next/core-web-vitals`, `@typescript-eslint`) | CI 필수 통과 |
| 포맷 | Prettier + `prettier-plugin-tailwindcss` | CI `--check` |
| 타입 | `tsc --noEmit` | CI 필수 통과 |
| E2E / 반응형 | **Playwright** (6개 뷰포트 프로젝트) | Phase 5 게이트 |
| 접근성 | `@axe-core/playwright` | critical/serious 위반 0 |
| 성능 | Lighthouse CI (`@lhci/cli`) | Perf/A11y/BP/SEO ≥ 95 (모바일 프로파일) |
| 링크 | `linkinator` 또는 Playwright 커스텀 크롤 | 내부 404 = 0 |

### 1.3 명시적 비채택

- **CMS(Sanity/Contentful) 초기 도입 금지** — Phase 1~5 범위 밖. 콘텐츠 스키마가 확정된 뒤(Phase 6)에 판단. 지금 도입하면 IA가 흔들리는 동안 스키마 재작업 비용 발생.
- **i18n 초기 도입 금지** — 한국어 단일. 단, 경로 설계는 `/(site)/...` 라우트 그룹을 써서 후일 `/[locale]/` 삽입이 가능한 형태 유지.
- **상태관리 라이브러리 금지** — 전역 상태 없음. 모바일 메뉴 열림 여부는 로컬 `useState`.

---

## 2. IA / 메뉴 체계

### 2.1 최상위 내비게이션 (5 + CTA)

```
[DevFirm 로고]  회사소개  AI 솔루션  개발 서비스  아카데미  공유오피스     [문의하기 ▸]
```

### 2.2 사이트맵

```
/                                     홈
│
├─ /about                             회사소개 — 데브펌이란
│   ├─ /about/cic                     사내독립기업(CIC) 구조
│   ├─ /about/careers                 개발자 채용 (모집공고 목록)
│   └─ /about/careers/[slug]          개별 모집공고
│
├─ /solutions                         AI 솔루션 (허브)
│   ├─ /solutions/office-ai           최과장AI — 사무현장 에이전트
│   ├─ /solutions/physical-ai         피지컬AI — 산업현장
│   └─ /solutions/agents/[industry]   산업별 AI 에이전트 6종 (동적 템플릿)
│        ├─ construction              건설공사 AI
│        ├─ content                   콘텐츠 AI
│        ├─ manufacturing             제조공정 AI
│        ├─ distribution              유통관리 AI
│        ├─ service                   용역서비스 AI
│        └─ safety                    범죄예방 AI
│
├─ /services                          개발 서비스 (허브)
│   ├─ /services/software             종합 소프트웨어 개발
│   └─ /services/staffing             개발 인재파견 · 아웃소싱
│
├─ /academy                           PBL 아카데미 (허브)
│   ├─ /academy/courses               과정 안내 (3개 스쿨)
│   ├─ /academy/courses/[slug]        개별 과정 상세
│   └─ /academy/apply                 수강 신청 (폼)
│
├─ /workspace                         개발자 공유오피스
│
├─ /contact                           문의하기 (폼 + 오시는 길)
├─ /privacy                           개인정보처리방침
└─ /terms                             이용약관
```

**총 정적 페이지: 약 15개 + 동적 6(산업) + 과정 N + 공고 N.**

### 2.3 기존 → 신규 매핑 & 중복 병합

| 기존 경로 | 신규 경로 | 처리 |
|---|---|---|
| `/welcome` | `/about` | 이전 + 카피 재작성 |
| `/development-in-company` | `/about/cic` | 이전 |
| `/requests` | `/about/careers` | 이전 + 목록형으로 구조화 |
| `/ai-agent` | `/solutions` | 허브로 승격 |
| `/construction-ai` | `/solutions/agents/construction` | **템플릿 병합** |
| `/contentai-agent` | `/solutions/agents/content` | **템플릿 병합** |
| (본문에만 존재하던 제조/유통/용역/범죄예방) | `/solutions/agents/{...}` | 신규 생성(동일 템플릿) |
| `/solution-development` | `/services/software` | 이전 |
| (인재파견 — 기존 본문 산재) | `/services/staffing` | **분리 신설** |
| `/computing-academy` | `/academy` | 허브로 통합 |
| `/solution-academy` | `/academy/courses` | **`/computing-academy` 와 중복 → 병합** |
| `/academy-application` | `/academy/apply` | 이전 |
| `/shared-office` | `/workspace` | 이전 |
| `더보기` | 삭제 | 하위 항목을 위 5개 섹션에 재배치 |
| seoulfilmacademy.com | `/academy` 내 외부 링크 카드 | `rel="noopener"` + 외부 아이콘 |

> **리다이렉트**: 위 매핑 전부를 `next.config.ts` 의 `redirects()` 에 `permanent: true` 로 등록. Phase 5 검증 항목.

### 2.4 홈 페이지 정보 흐름 (D1 + I-A 흡수)

1. **Hero** — "개발자들이 모인 개발법인, 데브펌" + 서브카피 + CTA 2개(문의하기 / 솔루션 보기)
2. **Slogan Band** — "산업현장엔 피지컬AI, 사무현장엔 최과장AI" 2분할 대비 블록
3. **경로 분기 3카드** — 기업 고객 / 배우려는 분 / 함께 일할 개발자 → 각 섹션 진입
4. **산업별 AI 에이전트 6종** — 6그리드 카드, "분야별 AI비서의 도움으로 이제 결정만 내리세요"
5. **데브펌 모델** — 로펌 비유 다이어그램 (개발자 ↔ 경영지원부 백오피스)
6. **아카데미 / 공유오피스** — 2분할 피처 밴드
7. **회사 신뢰 지표** — 설립 2007, CIC 구조, 위치
8. **최종 CTA** — 문의하기

---

## 3. 레이아웃 사양 (채택안 L-C 상세)

### 3.1 전역 구조

```
┌─────────────────────────────────────────────┐
│ SiteHeader (sticky, h-16 / lg:h-18)         │  z-50
│  로고 | 메가메뉴 트리거 5 | CTA | 모바일 버튼 │
├─────────────────────────────────────────────┤
│ SectionNav (sticky top-16 lg:top-18, h-12)  │  z-40
│  — 섹션 내부만. top 은 헤더 높이와 동기화     │
├─────────────────────────────────────────────┤
│                                             │
│  main  ─ PageHero                           │
│         ─ [Content ...]   [OnThisPage xl+]  │
│         ─ CTASection                        │
│                                             │
├─────────────────────────────────────────────┤
│ SiteFooter (4열 → 2열 → 1열)                 │
└─────────────────────────────────────────────┘
```

> **`h-18` 표기 확인됨(유효).** Tailwind v4는 spacing 유틸리티를 `--spacing` 변수의 배수로 **동적 생성**하므로 v3의 고정 스케일에 없던 `h-18`(= 4.5rem = 72px)도 그대로 사용 가능하다. 별도 config 확장이 필요 없다.

### 3.2 breakpoint별 내비게이션 동작

| 구간 | 헤더 | 섹션 내비 | 앵커 TOC | 콘텐츠 그리드 |
|---|---|---|---|---|
| `xs` 360~479 | 로고 + 햄버거 | 가로 스크롤 탭(스크롤 다운 시 숨김) | 상단 `<details>` 접이식 | 1열 |
| `sm` 480~767 | 동일 | 동일 | 동일 | 1열 (카드 여백 확대) |
| `md` 768~1023 (태블릿 세로) | 로고 + 햄버거 + CTA | 가로 탭 고정 | 접이식 | 2열 |
| `lg` 1024~1279 (태블릿 가로/소형 랩탑) | **전체 메뉴 노출 + 메가메뉴** | 가로 탭 고정 | 접이식 | 2~3열 |
| `xl` 1280~1535 (데스크탑) | 동일 | 동일 | **우측 고정 TOC 노출** | 3열 |
| `2xl` 1536~1919 | 동일 | 동일 | 우측 TOC | 3열, 컨테이너 `max-w-[1280px]` |
| `3xl` ≥1920 (와이드) | 동일 | 동일 | 우측 TOC + 여백 확대 | 3~4열, 컨테이너 `max-w-[1440px]` 로 고정(무한 확장 금지) |

**핵심 규칙**
- 내비 전환점은 `lg`(1024px). 그 미만은 드로어, 이상은 메가메뉴. → 아이패드 세로(768)는 드로어로 처리되어 터치 타깃이 안전.
- 컨테이너는 `max-w-[1440px]` 상한. 와이드 모니터에서 글줄이 길어지는 것을 방지(P4).
- 본문 텍스트 블록은 `max-w-[68ch]` 상한 별도 적용.

### 3.3 페이지 타입별 레이아웃 템플릿

| 템플릿 | 사용 페이지 | 구성 |
|---|---|---|
| `T1 Landing` | `/` | 전폭 히어로 + 8개 섹션 밴드, SectionNav 없음 |
| `T2 Hub` | `/solutions`, `/services`, `/academy` | 컴팩트 히어로 + 자식 카드 그리드 + 요약 섹션 |
| `T3 Long-form` | `/about`, `/about/cic`, `/workspace`, `/services/*` | 히어로 + 섹션 스택 + `OnThisPage` |
| `T4 Detail (templated)` | `/solutions/agents/[industry]`, `/academy/courses/[slug]` | 데이터 주입형 고정 섹션 시퀀스 |
| `T5 List` | `/about/careers`, `/academy/courses` | 필터 + 카드 리스트 |
| `T6 Form` | `/contact`, `/academy/apply` | 2열(폼 + 안내 사이드) → 모바일 1열 스택 |
| `T7 Legal` | `/privacy`, `/terms` | 단일 컬럼 산문 + TOC |

---

## 4. 디자인 시스템

### 4.1 디자인 방향

> **"조용한 정밀함(Quiet Precision)"** — 법무법인의 신뢰감 + 개발 스튜디오의 정확함.
> 색은 절제하고 위계는 타이포와 여백으로 만든다. 장식보다 정렬.

- 대비: 짙은 네이비 면 ↔ 넓은 화이트 여백. 액센트 1색만 CTA·강조에 사용.
- 카드는 그림자 최소(`border` 중심), radius `10px` 통일.
- 이미지는 흑백/저채도 오버레이 처리로 톤 통일(기존 사이트의 잡다한 이미지 톤 문제 해결).
- 금지: 다색 그라데이션, 이모지 아이콘, 무의미한 3D 일러스트, 스크롤 패럴랙스 남용.

### 4.2 컬러 토큰 (oklch, `app/globals.css`)

| 토큰 | Light | 용도 |
|---|---|---|
| `--background` | `oklch(1 0 0)` | 페이지 배경 |
| `--foreground` | `oklch(0.21 0.03 256)` | 본문 텍스트 (진네이비 그레이) |
| `--brand` (Firm Navy) | `oklch(0.30 0.07 258)` | 헤더 다크 밴드, 푸터, 강조 면 |
| `--brand-foreground` | `oklch(0.98 0.005 258)` | 브랜드 면 위 텍스트 |
| `--primary` (Signal Blue) | `oklch(0.55 0.17 254)` | CTA 버튼, 링크, 액티브 |
| `--primary-foreground` | `oklch(0.99 0 0)` | |
| `--accent` (Circuit Cyan) | `oklch(0.72 0.13 205)` | AI 관련 배지·아이콘 하이라이트 (사용 빈도 ≤ 5%) |
| `--muted` | `oklch(0.97 0.005 258)` | 섹션 교대 배경 |
| `--muted-foreground` | `oklch(0.52 0.02 258)` | 캡션·보조 텍스트 |
| `--border` | `oklch(0.91 0.008 258)` | 카드/구분선 |
| `--ring` | `--primary` | 포커스 링 |
| `--destructive` | `oklch(0.58 0.21 27)` | 폼 에러 |

**정의 방식 — 색상은 `:root`, breakpoint/radius 등은 `@theme`**

Tailwind v4의 `@theme inline` 은 **CSS 변수를 출력하지 않고 값을 인라인 치환**한다. 색상 토큰을 `@theme inline` 에 직접 넣으면 (1) `.dark` 클래스로 런타임 오버라이드가 불가능해지고 (2) shadcn/ui의 CSS 변수 모드(`bg-background` → `var(--background)` 기대)와 충돌한다. 따라서 **런타임 오버라이드가 필요한 색상은 `:root` 에 CSS custom property로 정의**하고, `@theme inline` 에서는 그 변수를 **참조만** 한다.

```css
@import "tailwindcss";

/* 1) 런타임 오버라이드 대상 = :root 에 실제 값 */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.21 0.03 256);
  --brand: oklch(0.30 0.07 258);
  --brand-foreground: oklch(0.98 0.005 258);
  --primary: oklch(0.55 0.17 254);
  --primary-foreground: oklch(0.99 0 0);
  --accent: oklch(0.72 0.13 205);
  --muted: oklch(0.97 0.005 258);
  --muted-foreground: oklch(0.52 0.02 258);
  --border: oklch(0.91 0.008 258);
  --ring: var(--primary);
  --destructive: oklch(0.58 0.21 27);
  --radius: 0.625rem;
}

/* 2) Phase 6 다크모드는 이 블록 추가만으로 완결 */
/* .dark { --background: oklch(0.19 0.02 258); --foreground: ... } */

/* 3) @theme inline 은 값을 복제하지 않고 var() 로 참조만 한다 */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-destructive: var(--destructive);

  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

- **`@theme inline` 에 실제 값을 직접 쓰는 것이 허용되는 토큰**: 런타임 오버라이드가 필요 없는 정적 토큰만 — breakpoint(§4.5), font-family, 고정 spacing 확장. 색상은 예외 없이 `:root` 경유.
- shadcn `components.json` 은 `"cssVariables": true` 로 설정해 위 구조와 일치시킨다.

**규칙**
- 다크모드는 **Phase 6로 연기**하되, 위 구조 덕분에 `.dark { ... }` 블록 추가만으로 전환 가능(§10 Open Question O-3).
- 본문/배경 대비 ≥ 7:1(AAA 지향), 보조 텍스트 ≥ 4.5:1(AA 필수). **Phase 1 DoD에서 토큰 쌍 전수 1차 검증**, Phase 5에서 렌더 결과 자동 재검증.

### 4.3 타이포그래피

- **폰트**: `Pretendard Variable` (한글+라틴 공용), 숫자·코드는 `--font-mono: ui-monospace`.
- **한국어 필수 규칙** (전역 `body`):
  - `word-break: keep-all;` — 단어 중간 줄바꿈 방지
  - `overflow-wrap: anywhere;` — 긴 URL 대응
  - `line-height` 본문 `1.75` (영문 기본보다 높게)
  - `letter-spacing: -0.01em` (제목은 `-0.02em`)

| 역할 | 모바일 | 데스크탑(`lg+`) | weight |
|---|---|---|---|
| Display (홈 히어로) | `36px / 1.25` | `64px / 1.1` | 700 |
| H1 (페이지 타이틀) | `28px / 1.3` | `44px / 1.15` | 700 |
| H2 (섹션) | `22px / 1.35` | `32px / 1.25` | 600 |
| H3 (카드 제목) | `18px / 1.4` | `20px / 1.4` | 600 |
| Body | `16px / 1.75` | `17px / 1.8` | 400 |
| Body-sm / 캡션 | `14px / 1.7` | `14px / 1.7` | 400 |
| Overline / Eyebrow | `12px / 1.4`, `tracking 0.08em`, 대문자 | 동일 | 600 |

- 본문 최대 폭 `68ch`. 카드 내부 설명문 최대 3줄(`line-clamp-3`).

### 4.4 스페이싱 · 그리드 · 반경

- 기본 스케일: 4px 배수 (Tailwind 기본).
- **섹션 수직 리듬**: 모바일 `py-16` → `md:py-20` → `lg:py-28`.
- **컨테이너 좌우 패딩**: `px-5` → `md:px-8` → `xl:px-12`.
- 그리드 gap: `gap-5` → `lg:gap-6` → `2xl:gap-8`.
- radius: `--radius: 0.625rem(10px)`; 버튼/인풋 `md(8px)`, 카드 `lg(10px)`, 다이얼로그 `xl(14px)`.
- 그림자: `shadow-none` 기본, hover 시 `shadow-sm` + `border-primary/30` 만.

### 4.5 Breakpoint 정의 (7단계 — 요구 5단계 초과 충족)

`app/globals.css` (Tailwind v4 CSS-first):

```css
@theme inline {
  --breakpoint-xs:  22.5rem;  /* 360px  모바일 소형 (Galaxy S, iPhone SE) */
  --breakpoint-sm:  30rem;    /* 480px  모바일 대형 */
  --breakpoint-md:  48rem;    /* 768px  태블릿 세로 (iPad Portrait) */
  --breakpoint-lg:  64rem;    /* 1024px 태블릿 가로 / 소형 랩탑 — 내비 전환점 */
  --breakpoint-xl:  80rem;    /* 1280px 데스크탑 */
  --breakpoint-2xl: 96rem;    /* 1536px 대형 데스크탑 */
  --breakpoint-3xl: 120rem;   /* 1920px 와이드 */
}
```

> breakpoint는 런타임 오버라이드 대상이 아니므로 `@theme inline` 에 실제 값을 직접 정의한다(§4.2 예외 규정).

- **최소 지원 폭 320px** (`xs` 미만도 깨지지 않아야 함 — 가로 스크롤 0이 acceptance).
- **Base(무접두) Tailwind utilities는 320px 최소 폭을 대상으로 설계한다.** 즉 접두사 없는 클래스가 곧 320px 레이아웃이며, `xs:` 접두사는 **360px부터** 레이아웃을 분기하는 용도다. 320~359px 구간은 base 스타일만으로 성립해야 한다(A1 검증 대상).
- 테스트 뷰포트 6종: `320×720`, `390×844`, `768×1024`, `1024×768`, `1440×900`, `1920×1080`.

---

## 5. 페이지별 구성

> 각 페이지는 `템플릿 / 섹션 시퀀스 / 데이터 소스 / 핵심 CTA` 로 정의한다.

### 5.1 `/` 홈 — T1 Landing
- 섹션: Hero → SloganBand(피지컬AI ↔ 최과장AI) → AudienceSplit(3카드) → IndustryAgentGrid(6) → DevFirmModel(다이어그램) → AcademyWorkspaceBand(2분할) → TrustStats(2007·CIC·위치) → FinalCTA
- 데이터: `content/home.ts`, `content/agents.ts`
- CTA: `문의하기`(주) / `AI 솔루션 보기`(부)
- 특기: LCP 대상은 Hero 제목 텍스트(이미지 아님)로 설계 → LCP < 2.0s 확보

### 5.2 `/about` 회사소개 — T3 Long-form
- 섹션: PageHero("개발자들이 모인 개발법인") → 로펌 비유 설명(2열 대조표: 로펌 vs 데브펌) → 경영지원부 백오피스 모델 → 연혁(2007~) → 회사 개요 테이블(사업자번호·주소·연락처) → 관련 링크(CIC/채용)
- 데이터: `content/about.ts`
- CTA: `함께 일하기`(→ careers), `문의하기`

### 5.3 `/about/cic` 사내독립기업 — T3
- 섹션: PageHero → CIC란 무엇인가 → 데브펌의 CIC 운영 방식 → 에이전트 AI 고도화 로드맵 → CIC 참여 조건 → CTA
- 데이터: `content/cic.ts`

### 5.4 `/about/careers` 채용 — T5 List / `[slug]` 상세
- 목록: 직무 카드(직군·고용형태·마감) + 상태 배지(모집중/마감)
- 상세: 담당업무 / 자격요건 / 우대사항 / 근무조건 / 지원방법
- 데이터: `content/careers.ts` (배열, `slug` 키)
- CTA: `지원하기`(메일 또는 폼 — O-1 참조)

### 5.5 `/solutions` AI 솔루션 허브 — T2 Hub
- 섹션: PageHero → 2대 축 카드(피지컬AI / 최과장AI) → 산업별 에이전트 6그리드 → 도입 프로세스 4단계 → FAQ(Accordion) → CTA
- 데이터: `content/solutions.ts`, `content/agents.ts`

### 5.6 `/solutions/office-ai` 최과장AI — T3
- 섹션: Hero → 문제 정의(사무 반복업무) → 최과장AI가 하는 일(기능 4~6) → 적용 사례 → 피지컬AI 기술 접목 설명 → 도입 문의 CTA

### 5.7 `/solutions/physical-ai` 피지컬AI — T3
- 섹션: Hero → 산업현장 문제 → 기술 스택/역량 → 적용 산업(→ 6종 링크) → 사례 → CTA

### 5.8 `/solutions/agents/[industry]` 산업별 6종 — T4 Detail (템플릿)
- **단일 템플릿 + 데이터 6건**. 고정 섹션 시퀀스:
  1. Hero (산업 아이콘 + 한 줄 가치제안)
  2. 현장의 문제 (3항목)
  3. AI 에이전트가 하는 일 (4~6 기능 카드)
  4. 기대 효과 (수치 지표 3)
  5. 도입 흐름 (4스텝)
  6. 다른 산업 보기 (형제 5개 링크)
  7. CTA
- 데이터 타입:
  ```ts
  type IndustryAgent = {
    slug: 'construction'|'content'|'manufacturing'|'distribution'|'service'|'safety';
    name: string; tagline: string; icon: LucideIcon;
    problems: string[]; capabilities: {title:string; desc:string}[];
    outcomes: {label:string; value:string}[]; steps: string[];
    seo: { title: string; description: string };
  };
  ```
- `generateStaticParams()` 로 6개 SSG, `generateMetadata()` 로 개별 SEO

### 5.9 `/services` 개발 서비스 허브 — T2
- 섹션: Hero → 2카드(소프트웨어 개발 / 인재파견) → 협업 방식 → 기술 영역 → CTA

### 5.10 `/services/software` 종합 소프트웨어 개발 — T3
- 섹션: Hero → 개발 영역(웹/앱/AI/시스템) → 진행 프로세스 → 산출물·품질 기준 → 문의 CTA

### 5.11 `/services/staffing` 인재파견·아웃소싱 — T3
- 섹션: Hero → 데브펌 인재 풀의 차별점(경영지원부 백오피스 = 발주처 리스크 감소) → 투입 형태(상주/원격/프로젝트) → 진행 절차 → CTA

### 5.12 `/academy` PBL 아카데미 허브 — T2
- 섹션: Hero → PBL이란(NCS 커리큘럼 + 프로젝트기반학습) → 3개 스쿨 카드(솔루션 개발스쿨 / 공통사무 업무스쿨 / 프로젝트 업무스쿨) → 서울필름아카데미 포스트프로덕션 연계(외부 링크 카드) → 수강 절차 → CTA `수강 신청`
- 데이터: `content/academy.ts`, `content/courses.ts`

### 5.13 `/academy/courses` 과정 목록 — T5 / `[slug]` 상세 — T4
- 목록: 스쿨별 필터(Tabs) + 과정 카드(기간·정원·대상)
- 상세: 개요 / 커리큘럼 주차표(Table) / 대상·선수지식 / 산출 프로젝트 / 수료 후 진로 / 신청 CTA

### 5.14 `/academy/apply` 수강 신청 — T6 Form
- 필드: 이름, 연락처, 이메일, 희망 과정(select), 경력 수준, 지원 동기(textarea), 개인정보 수집·이용 동의(필수 체크)
- zod 검증 + 서버 액션 → 메일 발송(O-1)
- 성공 시 `/academy/apply/done` 대신 인라인 성공 상태(SPA-like) + `aria-live`
- **남용 방지**: Vercel 서버리스 함수는 **stateless**(인스턴스 간 메모리 공유 없음)이므로 in-memory 카운터 기반 rate limit은 동작하지 않는다. 초기 범위는 **honeypot 필드 + 시간 기반 서명 토큰**(폼 렌더 시각을 HMAC 서명해 제출 시 검증, 3초 미만 제출 거부·30분 초과 만료)만 적용한다. **IP/세션 단위 실질적 rate limit이 필요하면 Upstash Redis 등 외부 스토어가 필수**이며 이는 Phase 6 범위(§10 O-1과 함께 결정)

### 5.15 `/workspace` 공유오피스 — T3
- 섹션: Hero → 포스트프로덕션 특화 컨셉 → 시설(녹음스튜디오 / 콘텐츠AI 인프라 / 업무공간) 갤러리 → 입주 대상 → 요금·문의 → 오시는 길(지도) → CTA
- 갤러리는 `next/image` + `sizes` 정확 지정, LCP 회피를 위해 첫 이미지만 `priority`

### 5.16 `/contact` 문의 — T6
- 좌: 문의 폼(문의유형 select: 솔루션 도입/개발 의뢰/인재파견/아카데미/입주/기타)
- 우: 회사 정보 카드(사업자등록번호 206-86-18591, 서울 서초구 강남대로6길 59-1 한양빌딩 2층, 02.2058.0680) + 지도 + 약도 안내
- 지도: **정적 이미지 + 카카오맵 외부 링크**(O-4 확정). 외부 지도 SDK 미도입 → A7·CSP 리스크 없음. 링크는 `target="_blank" rel="noopener"` + 외부 아이콘

### 5.17 `/privacy`, `/terms` — T7 Legal
- 단일 컬럼, 목차 앵커, 최종 개정일 표기
- **O-8 확정(검색콘솔만, GA4 없음)의 결과**: 방문자 추적 쿠키가 없으므로 **쿠키 동의 배너 불필요**, 개인정보처리방침에 분석도구 수집항목 조항 불요. 수집항목은 **폼 제출 데이터(이름·연락처·이메일·문의내용)로 한정**해 기재. GA4를 Phase 6에서 도입하면 이 문서와 배너를 함께 갱신해야 한다.

### 5.18 전역 요소
- **Footer**: 4열(회사 정보 / 솔루션 / 서비스·아카데미 / 연락처) → `md` 2열 → `xs` 1열 아코디언. 하단에 사업자정보 + `©2007 CMNYX` + 개인정보처리방침 링크
- **404 / error.tsx / loading.tsx**: 브랜드 톤 유지, 홈·주요 섹션 링크 제공

---

## 6. 컴포넌트 아키텍처

### 6.1 계층

```
primitives (shadcn/ui, 수정금지)
   └─ patterns (조합 · 프로젝트 소유)
        └─ sections (페이지 섹션 블록)
             └─ templates (T1~T7)
                  └─ pages (app/**/page.tsx — 데이터 주입만)
```

### 6.2 shadcn/ui 도입 목록 (초기)

`button, card, badge, separator, sheet, navigation-menu, accordion, tabs, table, form, input, textarea, select, checkbox, label, sonner(toast), dialog, breadcrumb, skeleton, aspect-ratio, scroll-area`

### 6.3 프로젝트 자체 컴포넌트

| 그룹 | 컴포넌트 | 책임 | RSC/Client |
|---|---|---|---|
| layout | `SiteHeader` | 로고·메뉴·CTA 셸 | RSC |
| layout | `MegaMenu` | `lg+` 드롭다운 패널 | Client |
| layout | `MobileNavDrawer` | Sheet 기반 전체 메뉴 | Client |
| layout | `SectionNav` | 섹션 형제 페이지 탭 + active. **키보드 포커스 수신 시 숨김 상태에서 자동 노출**(스크롤 다운으로 숨겨져 있어도 Tab 진입 시 즉시 복귀 — WCAG 2.4.3/2.4.11 대응) | Client(경로 필요) |
| layout | `OnThisPage` | 앵커 TOC + scrollspy | Client |
| layout | `Breadcrumb` | 현재 경로 표시 (a11y + SEO) | RSC |
| layout | `SiteFooter` | 4열 푸터 | RSC |
| layout | `Container` | max-w + 반응형 패딩 | RSC |
| layout | `Section` | 수직 리듬 + 배경 교대(`variant: default/muted/brand`) | RSC |
| typography | `PageHero` | eyebrow/타이틀/설명/CTA | RSC |
| typography | `SectionHeading` | eyebrow + h2 + 리드문 | RSC |
| typography | `Prose` | 장문 산문 스타일 래퍼(68ch, keep-all) | RSC |
| content | `FeatureCard` | 아이콘 + 제목 + 3줄 설명 | RSC |
| content | `IndustryAgentCard` | 6종 그리드 카드 | RSC |
| content | `StatBlock` | 지표 숫자 + 라벨 | RSC |
| content | `StepFlow` | 번호 붙은 프로세스(반응형: 가로→세로) | RSC |
| content | `ComparisonTable` | 로펌 vs 데브펌 등 2열 대조 | RSC |
| content | `TimelineList` | 연혁 | RSC |
| content | `GalleryGrid` | 오피스 사진 | RSC(Lightbox만 Client) |
| content | `FAQAccordion` | FAQ | Client(accordion) |
| content | `ExternalLinkCard` | 서울필름아카데미 등 | RSC |
| content | `CTASection` | 하단 전환 밴드 | RSC |
| form | `ContactForm` / `ApplyForm` | RHF + zod + 서버액션 | Client |
| seo | `JsonLd` | Organization / BreadcrumbList / Course | RSC |

### 6.4 클라이언트 컴포넌트 화이트리스트 (P5 강제)

`MegaMenu`, `MobileNavDrawer`, `SectionNav`, `OnThisPage`, `FAQAccordion`, `ContactForm`, `ApplyForm`, `GalleryLightbox`, `CourseFilterTabs` — **이 9개 외에 `"use client"` 추가 시 PR에서 사유 명시 필수.**

### 6.4.1 코드 스플리팅 규칙 (A8 130KB 예산 보호)

화이트리스트 컴포넌트는 모두 클라이언트 번들에 들어가므로, 로딩 시점을 다음과 같이 분리한다.

| 구분 | 대상 | 규칙 | 이유 |
|---|---|---|---|
| **레이아웃 레벨** | `MegaMenu`, `MobileNavDrawer` | **`next/dynamic` + `{ ssr: false }` 필수** | `(site)/layout.tsx` 에 있어 **모든 페이지**의 First Load JS에 합산된다. 초기 화면에서 열려 있지 않으므로 SSR 불필요하며, 정적 셸(로고·메뉴 텍스트·CTA)은 `SiteHeader`(RSC)가 이미 렌더하므로 CLS·SEO 손실이 없다. |
| **서브셋 페이지용** | `FAQAccordion`, `GalleryLightbox`, `CourseFilterTabs`, `OnThisPage` | **Suspense 경계 내 `next/dynamic` 권장** | 일부 페이지에서만 쓰이므로 해당 라우트 청크로 격리. `loading` 폴백은 `Skeleton` 으로 레이아웃 높이를 예약해 CLS 0 유지. |
| **폼** | `ContactForm`, `ApplyForm` | 라우트 전용이므로 기본 분할로 충분(추가 dynamic 불필요) | 해당 라우트에서는 폼이 주 콘텐츠 |

- 규칙 위반 감지: Phase 5 번들 분석에서 `(site)/layout` 공유 청크가 예산을 초과하면 즉시 원인 컴포넌트를 dynamic 전환.
- `{ ssr: false }` 적용 컴포넌트는 마크업이 초기 HTML에 없으므로, **내비게이션 링크의 SEO 크롤 경로는 `SiteFooter`(RSC, 전체 사이트맵 링크 보유)가 보증**한다.

### 6.5 콘텐츠 레이어 규약 (P3)

- 모든 문구는 `content/*.ts` 에서 export. 컴포넌트 JSX에 한국어 문장 리터럴 금지(라벨·aria 제외).
- 각 파일은 `satisfies` 로 타입 검증: `export const agents = [...] satisfies IndustryAgent[]`
- 타입은 `content/_types.ts` 에 집중.

**`content/navigation.ts` 타입 정의** (IA 단일 진실원천의 계약)

```ts
// content/_types.ts
export type NavNode = {
  /** 메뉴에 노출되는 라벨 (한국어) */
  label: string;
  /** 내부 경로('/about') 또는 외부 URL('https://...') */
  href: string;
  /** 메가메뉴/드로어/SectionNav 에서 쓰는 1줄 설명 (선택) */
  description?: string;
  /** 하위 노드. depth ≤ 3 강제(A14 단위 테스트) */
  children?: NavNode[];
  /** true 면 target=_blank + rel=noopener + 외부 아이콘 */
  external?: boolean;
  /** sitemap.ts 제외 여부 (예: /styleguide) */
  excludeFromSitemap?: boolean;
};

// content/navigation.ts
export const mainNav = [ /* ... */ ] satisfies NavNode[];
export const footerNav = [ /* ... */ ] satisfies NavNode[];
```

소비처: `SiteHeader` / `MegaMenu` / `MobileNavDrawer` / `SectionNav` / `Breadcrumb` / `SiteFooter` / `app/sitemap.ts`. **이 목록 외의 곳에서 경로 문자열을 하드코딩하지 않는다.**

---

## 7. 디렉토리 구조

```
/Users/coman/Dev/cmnix/DevFirm
├─ app/
│  ├─ layout.tsx                  루트: 폰트, metadata, JsonLd(Organization)
│  ├─ globals.css                 Tailwind v4 @theme 토큰 + 한국어 타이포 기본값
│  ├─ not-found.tsx / error.tsx
│  ├─ sitemap.ts / robots.ts / opengraph-image.tsx
│  ├─ (site)/                     ← 공통 셸(Header/Footer) 라우트 그룹
│  │   ├─ layout.tsx
│  │   ├─ page.tsx                /
│  │   ├─ about/
│  │   │   ├─ layout.tsx          SectionNav(about)
│  │   │   ├─ page.tsx
│  │   │   ├─ cic/page.tsx
│  │   │   └─ careers/
│  │   │       ├─ page.tsx
│  │   │       └─ [slug]/page.tsx
│  │   ├─ solutions/
│  │   │   ├─ layout.tsx
│  │   │   ├─ page.tsx
│  │   │   ├─ office-ai/page.tsx
│  │   │   ├─ physical-ai/page.tsx
│  │   │   └─ agents/[industry]/page.tsx
│  │   ├─ services/
│  │   │   ├─ layout.tsx
│  │   │   ├─ page.tsx
│  │   │   ├─ software/page.tsx
│  │   │   └─ staffing/page.tsx
│  │   ├─ academy/
│  │   │   ├─ layout.tsx
│  │   │   ├─ page.tsx
│  │   │   ├─ courses/
│  │   │   │   ├─ page.tsx
│  │   │   │   └─ [slug]/page.tsx
│  │   │   └─ apply/page.tsx
│  │   ├─ workspace/page.tsx
│  │   ├─ contact/page.tsx
│  │   └─ (legal)/
│  │       ├─ privacy/page.tsx
│  │       └─ terms/page.tsx
│  └─ actions/
│      ├─ submit-contact.ts       'use server'
│      └─ submit-application.ts   'use server'
├─ components/
│  ├─ ui/                         shadcn 생성물 (직접 수정 금지)
│  ├─ layout/                     SiteHeader, MegaMenu, MobileNavDrawer,
│  │                              SectionNav, OnThisPage, Breadcrumb,
│  │                              SiteFooter, Container, Section
│  ├─ typography/                 PageHero, SectionHeading, Prose
│  ├─ content/                    FeatureCard, IndustryAgentCard, StatBlock,
│  │                              StepFlow, ComparisonTable, TimelineList,
│  │                              GalleryGrid, FAQAccordion, ExternalLinkCard,
│  │                              CTASection
│  ├─ forms/                      ContactForm, ApplyForm, FormField 확장
│  └─ seo/                        JsonLd
├─ content/
│  ├─ _types.ts                   IndustryAgent, Course, JobPost, ...
│  ├─ site.ts                     회사정보·연락처·사업자번호(단일 진실원천)
│  ├─ navigation.ts               NAV 트리 (헤더·푸터·SectionNav 공용 소스)
│  ├─ home.ts / about.ts / cic.ts
│  ├─ solutions.ts / agents.ts
│  ├─ services.ts
│  ├─ academy.ts / courses.ts
│  ├─ workspace.ts / careers.ts
│  └─ legal/{privacy,terms}.ts
├─ lib/
│  ├─ utils.ts                    cn()
│  ├─ metadata.ts                 buildMetadata() 헬퍼
│  ├─ validations/{contact,apply}.ts   zod 스키마
│  ├─ form-token.ts               시간 기반 HMAC 서명 토큰(스팸 방지, §5.14)
│  └─ mail.ts                     발송 어댑터(공급자 교체 가능)
├─ scripts/
│  ├─ i18n-allowlist.json         UI 라벨 허용 목록 (A10 예외)
│  └─ check-content-rules.mjs     A10·A11 grep 검사
├─ public/
│  ├─ fonts/PretendardVariable.woff2
│  ├─ images/{home,solutions,academy,workspace}/
│  └─ og/
├─ tests/
│  ├─ e2e/{navigation,responsive,forms,seo}.spec.ts
│  └─ a11y/axe.spec.ts
├─ .github/workflows/ci.yml
├─ playwright.config.ts           6 뷰포트 프로젝트
├─ lighthouserc.json
├─ next.config.ts                 redirects(§2.3), images
├─ components.json                shadcn 설정
└─ README.md                      버전·명령어·콘텐츠 수정 가이드
```

> **`content/navigation.ts` 가 IA의 단일 진실원천**. 헤더·메가메뉴·모바일 드로어·SectionNav·푸터·sitemap.ts 가 전부 이 파일을 읽는다. 메뉴 추가 시 한 곳만 수정 → D1/D3 동시 충족.

---

## 8. 구현 Phase

> 각 Phase는 독립 PR 단위. 완료 기준(DoD)을 만족하지 못하면 다음 Phase 착수 금지.

### Phase 0 — 부트스트랩 & 기반 (0.5~1일)

**작업**
1. `npx create-next-app@latest .` (TypeScript, App Router, Tailwind, ESLint, `@/*` alias, Turbopack)
2. `npx shadcn@latest init` — New York, CSS variables, base color neutral
3. Prettier + `prettier-plugin-tailwindcss`, `tsconfig` strict 강화
4. Pretendard Variable self-host + `next/font/local` 등록
5. `content/_types.ts` 의 `NavNode` 타입(§6.5) + `content/site.ts`(회사정보) + `content/navigation.ts`(§2.2 트리) 스켈레톤 작성
6. **UI 라벨 허용 목록 `scripts/i18n-allowlist.json` 정의**(버튼 라벨·aria·alt·placeholder·검증 메시지) + A10/A11 grep 스크립트 작성
7. GitHub 리포 + Vercel 프로젝트 연결, PR Preview 확인
8. `.github/workflows/ci.yml`: lint / typecheck / build / grep 규칙(A10·A11)

**DoD**
- [ ] `pnpm build` 성공, Vercel Preview URL 접속 시 기본 페이지 렌더
- [ ] `pnpm lint && pnpm typecheck` 무오류
- [ ] 한글 폰트가 self-host로 로드됨(Network 탭에 외부 폰트 요청 0)
- [ ] README에 실제 설치된 Next/React/Tailwind/shadcn 버전 기록

---

### Phase 1 — 디자인 시스템 & 레이아웃 셸 (1.5~2일)

**작업**
1. `globals.css` 에 §4.2 컬러 토큰 + §4.5 breakpoint 7단계 + 한국어 타이포 기본값(`keep-all` 등) 정의
2. `Container` / `Section` / `PageHero` / `SectionHeading` / `Prose` 구현
3. `SiteHeader` + `MegaMenu`(lg+) + `MobileNavDrawer`(Sheet, <lg) 구현 — `navigation.ts` 소비
4. `SectionNav`(sticky, 스크롤 다운 시 숨김 + **포커스 수신 시 자동 노출**) + `OnThisPage`(scrollspy, xl+) + `Breadcrumb`(RSC, `navigation.ts` 기반) 구현
5. `SiteFooter` 구현 (회사정보는 `site.ts` 참조)
6. `app/(site)/layout.tsx` 조립, `not-found.tsx` / `error.tsx`
7. `/styleguide` 내부 확인용 페이지(프로덕션 `noindex`) — 토큰·타이포·컴포넌트 일람

**DoD**
- [ ] 320 / 390 / 768 / 1024 / 1440 / 1920 모든 폭에서 헤더·푸터 가로 스크롤 0
- [ ] `lg`(1024px) 경계에서 드로어 ↔ 메가메뉴 전환이 깨짐 없이 동작
- [ ] 키보드만으로 전체 메뉴 순회 가능(Tab/Shift+Tab/Esc 닫힘), 포커스 트랩 정상
- [ ] 헤더+SectionNav 합산 sticky 높이 ≤ 112px (모바일 실측)
- [ ] `SectionNav` 가 스크롤 다운으로 숨겨진 상태에서 Tab 포커스 진입 시 자동 노출되고, 포커스 링이 잘리지 않음
- [ ] axe: 레이아웃 셸 critical/serious 위반 0
- [ ] **컬러 토큰 쌍 전수 대비 검증** — `foreground/background`, `muted-foreground/background`, `muted-foreground/muted`, `primary-foreground/primary`, `brand-foreground/brand`, `destructive/background`, `border/background` 등 실제 사용 조합 전부를 A6 기준(본문 ≥ 7:1, 보조/큰 텍스트 ≥ 4.5:1, UI 경계 ≥ 3:1)으로 계산 검증. 미달 토큰은 Phase 2 착수 전 조정 (색을 나중에 바꾸면 전 페이지 재검증 비용 발생)
- [ ] **타이포 스케일 시각 확인** — `/styleguide` 에서 Display~Overline 7단계를 **320px와 1920px 두 극단**에서 확인: 320px에서 Display 줄바꿈이 3줄 초과하지 않고, 1920px에서 본문이 68ch를 넘지 않음
- [ ] **한국어 `word-break: keep-all` 동작 테스트 케이스** — 장문 한국어 문장·긴 영문 URL·한영 혼용 문자열 3종 픽스처를 320px에서 렌더해 (a) 한국어 단어 중간 줄바꿈 0, (b) 긴 URL은 `overflow-wrap: anywhere` 로 컨테이너를 넘지 않음 을 assert (A13 선행 검증)
- [ ] **시각 회귀 베이스라인 생성** — `SiteHeader` / `SectionNav` / `SiteFooter` 3개 컴포넌트 × `320` / `768` / `1440` px 3뷰포트 = 9개 `toHaveScreenshot` 스냅샷 커밋. 이후 Phase에서 레이아웃 셸 회귀를 자동 감지

---

### Phase 2 — 홈 + 회사소개 계열 (2~3일)

**작업**
1. `content/home.ts`, `about.ts`, `cic.ts`, `careers.ts` 작성 — 기존 사이트 문구를 **재작성**(중복 제거, 문장 길이 축소)
2. 홈 8개 섹션 구현(§5.1) — Hero LCP는 텍스트
3. `/about`, `/about/cic` (T3), `/about/careers` 목록 + `[slug]` 상세 (T5/T4)
4. 공용 콘텐츠 컴포넌트 1차: `FeatureCard`, `StatBlock`, `StepFlow`, `ComparisonTable`, `TimelineList`, `CTASection`
5. `lib/metadata.ts` + 페이지별 `generateMetadata()`, OG 이미지 기본형

**DoD**
- [ ] 홈에서 회사 정체성(개발법인/데브펌) 문구가 첫 화면(스크롤 0) 안에 노출 — 6뷰포트 전부
- [ ] 홈 Lighthouse 모바일 Performance ≥ 90 (Phase 5에서 95로 상향)
- [ ] 모든 신규 페이지에 고유 `<title>` / `description` 존재
- [ ] `content/` 외부 JSX에 한국어 문장 리터럴 0 (grep 검증)

---

### Phase 3 — AI 솔루션 + 개발 서비스 (2~3일)

**작업**
1. `content/_types.ts` 의 `IndustryAgent` 확정 + `agents.ts` 6건 작성
2. `/solutions` 허브(T2), `/solutions/office-ai`, `/solutions/physical-ai`(T3)
3. `/solutions/agents/[industry]` 템플릿 1개 + `generateStaticParams` 6건 + 개별 `generateMetadata`
4. `/services`, `/services/software`, `/services/staffing`
5. `IndustryAgentCard`, `FAQAccordion` 구현

**DoD**
- [ ] 산업별 6개 페이지가 **단일 템플릿 파일**로 렌더(중복 page.tsx 0)
- [ ] 빌드 산출물에 6개 경로가 정적(SSG)으로 생성됨을 `next build` 로그로 확인
- [ ] 6개 페이지 각각 고유 title/description/OG
- [ ] 형제 산업 링크가 자기 자신을 제외하고 5개 노출

---

### Phase 4 — 아카데미 · 공유오피스 · 문의 · 폼 (2~3일)

**작업**
1. `content/academy.ts`, `courses.ts`, `workspace.ts`
2. `/academy` 허브, `/academy/courses` 목록(Tabs 필터) + `[slug]` 상세
3. `/workspace` (갤러리 포함, `next/image` sizes 정확 지정)
4. `/contact`, `/academy/apply` — zod 스키마 + 서버 액션 + 메일 어댑터(`lib/mail.ts`)
5. 스팸 방지 — **honeypot 필드 + 시간 기반 서명 토큰**(§5.14). Vercel 서버리스는 stateless이므로 **in-memory rate limit은 구현하지 않는다**. IP 단위 rate limit이 필요하면 Upstash 등 외부 스토어 도입이 선행되어야 하며 Phase 6로 분리. 개인정보 수집 동의 체크박스 필수화
6. `/privacy`, `/terms`
7. 외부 링크(seoulfilmacademy.com) `ExternalLinkCard` 처리

**DoD**
- [ ] 두 폼 모두: 검증 실패 시 필드별 에러가 스크린리더에 전달(`aria-describedby`, `aria-live`)
- [ ] 제출 성공/실패 경로 E2E 테스트 통과 (메일 발송은 목킹)
- [ ] 동의 체크 없이는 제출 불가
- [ ] 갤러리 이미지 전부 `alt` 보유, CLS 0 (width/height 또는 aspect-ratio 지정)

---

### Phase 5 — 품질 게이트 · SEO · 배포 (1.5~2일)

**작업**
1. `next.config.ts` 에 §2.3 리다이렉트 전수 등록
2. `sitemap.ts`, `robots.ts`, `JsonLd`(Organization / BreadcrumbList / Course)
3. Playwright 6뷰포트 스위트 + axe 스캔 + 내부 링크 크롤
4. Lighthouse CI 임계값 설정 및 통과
5. 이미지 최적화(AVIF/WebP), 폰트 `display: swap`, 번들 분석
6. **도메인 이전 (O-6 확정 사항, §10.1)**
   - a. `devfirm.*` TLD 확정 및 구매, DNS를 Vercel로 위임
   - b. Vercel 프로젝트에 **2개 도메인 연결** — 신규 도메인 = Production, `cmnyx.com` = Redirect(301)
   - c. `www` 정규화(apex ↔ www 중 하나로 통일), 404/500 확인
   - d. `content/site.ts` 의 `siteUrl` 을 신규 도메인으로 확정 → `metadataBase` 경유로 전 페이지 canonical 반영
   - e. Google 검색콘솔 **주소변경 도구** 실행(구 도메인 → 신규 도메인), 신규 도메인 소유권 확인 + sitemap 제출
   - f. Resend 발송 도메인을 **신규 도메인**으로 SPF/DKIM 인증 (O-1 선행조건)
7. 최종 콘텐츠 교정(오탈자, 사업자정보 정확성)

**DoD** — §9 acceptance criteria 전부 통과

---

### Phase 6 — (선택) 확장 (미착수, 별도 결정)

다크모드 / 헤드리스 CMS 전환 / 블로그·인사이트 / GA4·검색콘솔 / 다국어. §10 Open Questions 해소 후 별도 계획 수립.

---

## 9. 검증 계획

### 9.1 Acceptance Criteria (프로젝트 완료 기준)

| # | 항목 | 기준 | 검증 방법 |
|---|---|---|---|
| A1 | 반응형 무결성 | 320 / 390 / 768 / 1024 / 1440 / 1920 px 에서 **가로 스크롤 0**, 요소 겹침·잘림 0 | Playwright: `document.scrollingElement.scrollWidth <= innerWidth` 전 페이지 assert + 스크린샷 |
| A2 | 내비게이션 | 모든 사이트맵 경로가 헤더/드로어/푸터 중 최소 1곳에서 3클릭 이내 도달 | Playwright 내비 스위트 |
| A3 | 링크 무결성 | 내부 404 = 0, 외부 링크 `target=_blank` + `rel=noopener` | 크롤 테스트 |
| A4 | 리다이렉트 | §2.3 기존 경로 전부 **308**(`permanent: true`, D-2)로 신규 경로 도달. **O-6 확정으로 크로스 도메인까지 포함** — `cmnyx.com/{구경로}` → `devfirm.*/{신경로}` 가 단일 홉(체인 없음)으로 도달 | Playwright: 각 구경로를 **구 도메인 기준**으로 요청해 최종 URL·상태·홉 수 assert |
| A5 | 접근성 | axe critical/serious = 0, 키보드만으로 전 페이지 조작, 포커스 가시성 100% | `@axe-core/playwright` + 수동 키보드 체크리스트 |
| A6 | 색 대비 | 본문 ≥ 7:1, 보조/큰 텍스트 ≥ 4.5:1, UI 컴포넌트 ≥ 3:1 | axe color-contrast + 토큰 단위 계산 테스트 |
| A7 | 성능 | 모바일 Lighthouse Perf ≥ 95, LCP < 2.5s, CLS < 0.1, INP < 200ms | Lighthouse CI (3회 중앙값) |
| A8 | 번들 | 초기 JS(First Load) ≤ 130KB gzip / 페이지 | **D-1 참조 — `next build` 는 더 이상 이 수치를 출력하지 않는다.** Lighthouse CI `total-byte-weight`·`unused-javascript` + Playwright 로 문서 로드 시 JS 응답 바이트 합산 |
| A9 | SEO | 전 페이지 고유 title/description/canonical, sitemap.xml 유효, JSON-LD 오류 0 | Playwright meta assert + Rich Results 수동 확인 |
| A10 | 콘텐츠 분리 | **한국어 문장(5자 이상) 리터럴이 `components/`·`app/` 에 0.** 예외: Phase 0에서 정의하는 **UI 라벨 허용 목록** — 버튼 라벨, `aria-*` 값, `alt`, `placeholder`, 폼 검증 메시지. 허용 목록은 `scripts/i18n-allowlist.json` 으로 관리하며 추가 시 PR에서 사유 명시 | CI grep 스크립트(허용 목록 대조) |
| A11 | 클라이언트 경계 | `"use client"` 파일이 §6.4 화이트리스트와 정확히 일치 | CI grep 스크립트 |
| A12 | 폼 | 정상 제출 / 검증 실패 / 서버 오류 3경로 모두 사용자에게 명확히 피드백 | E2E (메일 목킹) |
| A13 | 한국어 조판 | 제목·본문에서 단어 중간 줄바꿈 발생 0 (`word-break: keep-all`) | 스크린샷 리뷰 + CSS 단위 테스트 |
| A14 | 정보 위계 | 최상위 메뉴 ≤ 6, URL depth ≤ 3 | `navigation.ts` 구조 단위 테스트 |

### 9.2 테스트 레이어

| 레이어 | 범위 | 도구 | 실행 시점 |
|---|---|---|---|
| 정적 검사 | 타입, 린트, 포맷, grep 규칙(A10/A11) | tsc / ESLint / Prettier / 스크립트 | 매 커밋 (CI) |
| 단위 | `navigation.ts` 구조 불변식(A14), zod 스키마, `buildMetadata()` | Vitest | 매 커밋 |
| 컴포넌트 | `SectionNav` active 판정, `OnThisPage` 앵커 추출, `StepFlow` 반응형 분기 | Vitest + Testing Library | 매 커밋 |
| E2E | 내비/반응형/폼/SEO/리다이렉트 | Playwright × 6 뷰포트 | PR |
| 접근성 | 전 페이지 axe 스캔 | axe-core/playwright | PR |
| 성능 | 홈 + 대표 4페이지 | Lighthouse CI | PR (Preview URL 대상) |
| 시각 회귀 | **Phase 1**: layout 3컴포넌트(`SiteHeader`/`SectionNav`/`SiteFooter`) × 3뷰포트(320/768/1440) = 9 스냅샷. **Phase 5+**: 주요 8페이지 × 3뷰포트 | Playwright `toHaveScreenshot` | Phase 1(셸 베이스라인) → Phase 5(페이지 전체) |
| 수동 | 실기기(iPhone / iPad / Android) 확인, 콘텐츠 교정 | — | Phase 5 |

### 9.3 CI 파이프라인

```
push/PR → install → lint → typecheck → unit → build
                                          ↓
                                   vercel preview
                                          ↓
                        playwright(6뷰포트) + axe + lighthouse
                                          ↓
                                    all green → merge 가능
```

---

## 10. Open Questions — **전건 결정 완료 (2026-07-28)**

| ID | 질문 | **확정 결정** | 기본값 대비 | 반영 위치 |
|---|---|---|---|---|
| **O-1** | 폼 제출 처리 방식 | **Resend + `mailto:` 폴백.** `lib/mail.ts` 어댑터로 공급자 추상화. SPF/DKIM은 **O-6 신규 도메인** 기준으로 인증 | 동일 | §5.14, Phase 4 |
| **O-2** | 이미지 자산 | **기존 cmnyx.com 자산 재사용 + 저채도 오버레이로 톤 통일.** 저해상도 항목은 Phase 2에서 목록화해 타이포 중심 블록으로 대체 | 동일 | §4.1, Phase 2 |
| **O-3** | 다크모드 | **미지원 — Phase 6 연기.** §4.2 토큰 구조는 대응형 유지, `.dark {}` 추가만으로 전환 가능 | 동일 | §4.2, Phase 6 |
| **O-4** | 지도 임베드 | **정적 이미지 + 카카오맵 외부 링크.** 외부 지도 SDK 미도입 → A7·CSP 리스크 제거 | 동일 | §5.16 |
| **O-5** | 비개발자 수정 강도 | **개발자 배포 (CMS 미도입).** 전 카피를 `content/*.ts` 타입드 모듈로 유지 | 동일 | ADR-003 |
| **O-6** | 도메인 전략 | ⚠️ **`devfirm.*` 신규 도메인 채택 + `cmnyx.com` 전체 301.** 신규 도메인이 canonical | **변경됨** (기본값은 기존 유지였음) | §10.1, Phase 5, A4, §12 |
| **O-7** | 실데이터 확보 | **기존 문구 기반 초안 작성 → 오픈 전 검수.** 구조는 초안으로 확정 | 동일 | Phase 2 / Phase 4 |
| **O-8** | 분석 도구 | **검색콘솔만 Phase 5. GA4는 Phase 6.** 방문자 추적 없음 → **쿠키 배너 불필요, 개인정보처리방침에 분석도구 수집항목 조항 불요** | GA4도 연기 | Phase 5, §5.17 |

### 10.1 O-6 변경 반영 사항 (유일한 기본값 이탈)

기본값(`cmnyx.com` 유지)이 아니라 **신규 도메인 이전**이 채택되어 다음이 추가된다.

| 영역 | 변경 내용 |
|---|---|
| **Phase 5** | 도메인 확보 → DNS 설정 → Vercel에 2개 도메인 연결(신규=Production, `cmnyx.com`=Redirect) → 검색콘솔 **주소변경 도구** 실행 |
| **A4** | 동일 도메인 301 → **크로스 도메인 301**로 확장. `cmnyx.com/{구경로}` → `devfirm.*/{신경로}` 최종 URL·상태 전수 assert |
| **O-1 선행조건** | SPF/DKIM을 **신규 도메인**에 설정해야 하므로 **도메인 확보가 메일 발송 인증의 선행 조건**. Phase 4 이전에 도메인이 없으면 `mailto:` 폴백으로 진행 |
| **canonical** | 전 페이지 canonical을 신규 도메인 절대경로로 생성(`lib/metadata.ts` 의 `metadataBase`) |
| **구 도메인 유지** | `cmnyx.com` 을 **최소 1년 이상 유지**하며 301을 살려둔다(해지 시 기존 백링크 전량 소실) |

**미확정 실무 항목** — 결정이 아니라 사실 확인이므로 Phase 5 전까지 처리:
`devfirm.com` 은 선점 가능성이 높아 **실제 확보 가능한 TLD 확인 필요**(`devfirm.co.kr` / `devfirm.kr` / `devfirm.dev` 등). 도메인 문자열이 확정되기 전에는 `content/site.ts` 의 `siteUrl` 을 단일 상수로 두어 교체 지점을 1곳으로 묶는다.

> 위 결정은 `.omc/plans/open-questions.md` 에도 동일하게 기록됨.

---

## 11. ADR (Architecture Decision Record)

### ADR-001 — 하이브리드 내비게이션(탑바 + 섹션 로컬 내비 + 앵커 TOC) 채택

- **Decision**: 전역 탑바(메가메뉴/모바일 드로어) + 섹션별 sticky 서브내비 + `xl+` 우측 앵커 TOC 조합을 채택한다.
- **Drivers**: D1(정보 과밀 해소), D2(B2B 전문성/신뢰감), P4(읽기 우선).
- **Alternatives considered**: (a) 탑바+메가메뉴 단독(L-A), (b) 고정 좌측 사이드바(L-B), (c) **탑바+메가메뉴 + breadcrumbs 조합(L-A′)** — SectionNav 없이 페이지 상단 breadcrumb만으로 방향 감각을 보완하는 경량안.
- **Why chosen**: L-A는 장문 페이지에서 위치 감각·스캔성이 부족하고, L-B는 마케팅 사이트의 브랜드 임팩트를 구조적으로 훼손한다(D2 위반).
  L-A′(breadcrumbs)는 구현 비용이 가장 낮은 매력적인 대안이지만, **breadcrumb는 "내가 어디 있는가"만 알려주고 "옆에 무엇이 있는가"는 알려주지 않는다.** 이 사이트의 실제 이동 패턴은 수직(부모↔자식)이 아니라 **수평(형제 간 비교 탐색)** 이다 — 예: `건설공사 AI` 를 본 방문자가 다음으로 원하는 것은 `/solutions` 로 되돌아가는 것이 아니라 `제조공정 AI` 로 바로 넘어가는 것이고, `솔루션 개발스쿨` 다음은 `프로젝트 업무스쿨` 이다. breadcrumb로는 이 이동이 **부모 경유 2클릭**(자식→부모→다른 자식)이 되지만, SectionNav는 **1클릭**이며 형제 목록 자체가 화면에 상시 노출되어 "이 회사가 이 분야에서 무엇을 더 제공하는가"를 동시에 전달한다(D1·전환율 양쪽에 기여).
  다만 breadcrumb의 고유 가치(a11y 위치 고지, `BreadcrumbList` 구조화 데이터)는 SectionNav로 대체되지 않으므로, **L-A′를 폐기하는 대신 `Breadcrumb` 컴포넌트를 채택안에 흡수**한다(§6.3). 즉 최종 구성은 `메가메뉴 + Breadcrumb + SectionNav + OnThisPage` 이며, breadcrumb는 방향 감각의 **주 수단이 아니라 보조 수단**으로 역할이 축소된다.
  하이브리드의 단점(구현 비용, 이중 sticky 높이)은 컴포넌트 분리와 sticky 높이 상한 112px·스크롤 다운 시 서브내비 숨김이라는 기법으로 해소 가능하다.
- **Consequences**: (+) 텍스트 과밀 페이지를 앵커로 스캔 가능, 섹션 내 이동이 1클릭. (−) 내비 컴포넌트 3종의 반응형 QA 부담 증가 → Playwright 6뷰포트 스위트를 필수 게이트로 승격. (−) `SectionNav`/`OnThisPage`는 경로·스크롤 의존이라 클라이언트 컴포넌트가 됨(P5 예외로 명시 등록).
- **Follow-ups**: Phase 1 DoD의 sticky 높이·키보드 순회·포커스 복귀 항목으로 검증.
  **재검토 임계값 (둘 중 하나라도 충족되면 ADR 재작성)**
  - (T1) **총 페이지 수 > 40** — 이 규모에서는 메가메뉴 패널이 한 화면에 담기지 않아 L-B(좌측 사이드바) 또는 검색 우선 내비로 전환 검토
  - (T2) **한 섹션의 형제 페이지 수 > 8** — SectionNav 가로 탭이 데스크탑에서도 스크롤을 요구하게 되므로 해당 섹션만 드롭다운형 `SectionSelect` 로 전환
  - 현재 규모(약 30페이지, 최대 형제 수 6 = 산업별 AI)는 두 임계값 모두 여유가 있으므로 채택안 유지.

### ADR-002 — 제공물 기준 IA(5 최상위 + 홈 고객 분기) 채택

- **Decision**: 최상위를 `회사소개 / AI 솔루션 / 개발 서비스 / 아카데미 / 공유오피스` 5개 + `문의하기` CTA로 고정하고, 고객군 분기는 홈의 3카드 블록으로 처리한다.
- **Drivers**: D1(정보 과밀), P1(컨셉 우선), P2(depth ≤ 3).
- **Alternatives considered**: (a) 고객군 기준 IA(I-A), (b) 기존 구조 유지(I-C).
- **Why chosen**: I-A는 회사의 핵심 제공물(피지컬AI·최과장AI)을 2단계 아래로 밀어 P1을 위반하고, 공유오피스처럼 두 고객군에 걸치는 콘텐츠에서 중복이 재발한다. I-C는 리뉴얼의 명시 목표(메뉴 체계 재설계)와 정면 충돌하여 무효. I-B는 기존 자산과 1:1 매핑되어 마이그레이션 손실이 없고, I-A의 장점은 홈 분기 블록으로 흡수 가능하다.
- **Consequences**: (+) 최상위 6개 이내 유지, URL depth ≤ 3, 중복 페이지 4건 제거(§2.3). (+) 산업별 AI 6종이 단일 템플릿으로 수렴해 유지보수 비용 감소. (−) 기존 URL이 전부 바뀌므로 301 리다이렉트 표가 릴리스 필수 조건이 됨(A4).
- **Follow-ups**: `content/navigation.ts` 를 IA 단일 진실원천으로 강제하고, 최상위 ≤ 6 / depth ≤ 3 을 단위 테스트(A14)로 고정.

### ADR-003 — 콘텐츠를 타입드 TS 모듈로 분리(CMS 연기)

- **Decision**: 모든 카피를 `content/*.ts` 에 타입 안전 데이터로 두고, 헤드리스 CMS는 Phase 6로 연기한다.
- **Drivers**: D3(유지보수 비용), P3(콘텐츠는 데이터), 프로젝트 기간.
- **Alternatives considered**: (a) MDX 파일, (b) Sanity/Contentful 초기 도입.
- **Why chosen**: 콘텐츠 스키마(특히 산업별 에이전트·과정)가 아직 확정 전이므로 CMS를 먼저 도입하면 스키마 재작업 비용이 발생한다. MDX는 반복 구조(6종 에이전트)의 필드 일관성을 타입으로 강제할 수 없다. TS 모듈은 `satisfies` 로 누락 필드를 빌드 타임에 잡는다.
- **Consequences**: (+) 빌드 타임 검증, 전면 SSG 유지, 초기 속도 최고. (−) 비개발자가 직접 수정 불가 → O-5가 "강함"으로 판명되면 Phase 6에서 CMS 전환 필요. 전환 비용을 낮추기 위해 페이지는 데이터 주입만 받는 구조로 유지한다.
- **Follow-ups**: O-5 결정. CMS 전환 시 `content/_types.ts` 를 스키마 원본으로 사용.

---

## 12. 리스크 & 완화

| 리스크 | 영향 | 완화 |
|---|---|---|
| 기존 콘텐츠 문구가 그대로 이식되어 "정보 과밀"이 재현 | 리뉴얼 목적 미달 | Phase 2/3/4 각 DoD에 "문장 재작성" 명시. 카드 설명 3줄 상한, 섹션당 문단 ≤ 3 규칙 |
| 이미지 자산 품질 미달(O-2) | 디자인 목표 미달 | 저채도 오버레이 + 타이포 중심 히어로로 이미지 의존도 최소화 |
| 이중 sticky로 모바일 가독 영역 축소 | UX 저하 | sticky 총 높이 ≤ 112px 강제, 스크롤 다운 시 서브내비 숨김, Phase 1 DoD 검증 |
| 폼 백엔드 미결정(O-1)으로 Phase 4 정체 | 일정 지연 | `lib/mail.ts` 어댑터로 추상화, 키 없으면 `mailto:` 폴백으로 진행 가능 |
| 리다이렉트 누락으로 기존 유입 손실 | SEO 손실 | §2.3 표를 그대로 테스트 케이스(A4)로 변환 |
| **도메인 이전(O-6)으로 검색 순위 일시 하락** | 오픈 직후 유입 감소, 회복까지 수개월 | 전 경로 단일 301(체인 금지) + 검색콘솔 주소변경 도구 + **구 도메인 최소 1년 유지**. 오픈 전후 검색콘솔 색인 추이 모니터링 |
| **`devfirm.*` TLD 확보 실패** | Phase 5 도메인 작업 및 O-1 메일 인증 지연 | `content/site.ts` 의 `siteUrl` 단일 상수로 교체 지점을 1곳에 격리. Phase 5 이전에 TLD 후보 검증. 최악의 경우 `cmnyx.com` 유지로 무비용 롤백 가능 |
| shadcn 컴포넌트 직접 수정 후 업스트림 갱신 충돌 | 유지보수 부담 | `components/ui/` 수정 금지 규약 + 래퍼 패턴, CI에서 diff 경고 |

---

## 12.1 Next.js 16 실물 대조 — 계획 수정 사항 (2026-07-28, Phase 0)

계획은 Next 15 세대를 가정해 작성됐다. 실제 부트스트랩된 **Next 16.2.12** 와 대조해 확인된 차이와 대응이다. 근거는 `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.

| # | 계획의 가정 | Next 16 실제 | 대응 |
|---|---|---|---|
| **D-1** | **A8** 초기 JS ≤ 130KB 를 `next build` 출력 파싱으로 검증 | **`next build` 가 `size`·`First Load JS` 열을 제거했다.** RSC 구조에서 부정확하다는 이유로 삭제 | **검증 방법 교체**: Lighthouse CI 의 `total-byte-weight`·`unused-javascript` + Playwright 로 문서 로드 시 JS 응답 바이트 합산. 예산 130KB 는 유지 |
| **D-2** | **A4** 기존 경로가 **301** 로 도달 | `redirects()` 의 `permanent: true` 는 **308** (`false` 는 307). 메서드 보존 목적 | **A4 기대값을 308 로 수정.** SEO 상 301과 동등 취급되며, 크로스 도메인 이전(O-6)에도 그대로 적용 |
| **D-3** | §6.4.1 `MegaMenu`/`MobileNavDrawer` 를 `(site)/layout.tsx`(RSC)에서 `next/dynamic { ssr:false }` 로 로드 | **`ssr: false` 는 클라이언트 컴포넌트 안에서만 동작한다.** RSC에서 쓰면 무효 | 얇은 클라이언트 래퍼(`"use client"`)를 하나 두고 그 안에서 `dynamic({ssr:false})` 를 호출, `SiteHeader`(RSC)가 래퍼를 렌더한다. 래퍼는 A11 화이트리스트에 포함 |
| **D-4** | `[industry]`/`[slug]` 페이지에서 `params` 를 동기 접근 | `params`·`searchParams` 가 **Promise**. 동기 접근 완전 제거 | `const { slug } = await params`. 타입은 `next typegen` 이 만드는 `PageProps<'/경로'>` 사용 |
| **D-5** | 앵커 TOC(`OnThisPage`)의 부드러운 스크롤을 CSS `scroll-behavior: smooth` 로 처리 | Next 16은 라우트 전환 시 `scroll-behavior` 를 **더 이상 자동 오버라이드하지 않는다** | `<html data-scroll-behavior="smooth">` 를 명시. 앵커는 부드럽게, 페이지 이동은 즉시 최상단으로 동작 |
| **D-6** | 폰트를 `next/font/local` + `subset` 으로 self-host | `next/font/local` 은 **서브셋별 `unicode-range` 를 표현할 수 없다**(패밀리 1개 = 호출 1회). 전체 Pretendard Variable 은 **2.0MB** 로 A7 위협 | **직접 `@font-face`** 로 전환. 92분할 동적 서브셋을 `public/fonts/pretendard/` 에 두고 `app/fonts.css` 에서 선언. 브라우저가 텍스트가 닿는 구간만 다운로드. self-host 원칙(외부 CDN 0)은 그대로 충족 |
| **D-7** | shadcn `init` 을 **New York 스타일**로 | New York 스타일은 없어지고 **`--base` (base/radix/aria) + preset** 체계로 교체 | `-b radix -p nova` 채택. 계획이 쓰려는 컴포넌트(navigation-menu·sheet·accordion·tabs·dialog)가 Radix 기반이고 nova 가 lucide 아이콘을 쓴다. `cssVariables: true` 는 기본값이라 §4.2 구조와 그대로 일치 |
| **D-8** | CI에서 lint 를 돌리고 `next build` 도 검증에 기여 | **`next lint` 제거**, `next build` 는 **lint 를 실행하지 않는다** | CI에 `pnpm lint` 를 독립 단계로 고정(이미 반영). 로컬은 `pnpm verify` 한 방으로 lint→typecheck→format→A10/A11 |
| **D-9** | `next/image` 기본 동작 | `images.qualities` 기본이 **`[75]` 단일**, `minimumCacheTTL` 4시간, `imageSizes` 에서 16 제거 | `next.config.ts` 에 `qualities: [75, 90]` 명시(갤러리·히어로용) |

**계획에 영향 없음이 확인된 항목**: `generateStaticParams`(§5.8), `generateMetadata`, Server Actions(§5.14), `sitemap.ts`/`robots.ts`, `next.config.ts` 의 `redirects()`, 라우트 그룹 `(site)`, Tailwind v4 `@theme inline` 구조(§4.2) — **shadcn 이 생성한 `globals.css` 가 계획의 토큰 구조와 정확히 일치**했다.

---

## 13. 요약

- **채택 레이아웃**: 하이브리드 (탑바 메가메뉴 + 섹션 sticky 서브내비 + `xl+` 앵커 TOC), 내비 전환점 `lg` 1024px
- **채택 IA**: 제공물 기준 5개 최상위 + `문의하기` CTA, URL depth ≤ 3, 중복 4건 병합, 산업별 AI 6종은 단일 템플릿
- **Breakpoint 7단계**: 360 / 480 / 768 / 1024 / 1280 / 1536 / 1920 (최소 지원 320px)
- **디자인 방향**: "조용한 정밀함" — Firm Navy + Signal Blue 단일 액센트, Pretendard, `keep-all`, 본문 68ch
- **Phase**: 0 부트스트랩 → 1 디자인시스템·셸 → 2 홈·회사소개 → 3 솔루션·서비스 → 4 아카데미·오피스·폼 → 5 품질·SEO·배포 (총 9.5~14일 추정)
- **완료 기준**: A1~A14 (반응형·접근성 axe 0·Lighthouse ≥ 95·리다이렉트 전수·콘텐츠 분리 강제)
- **Open Questions**: 2026-07-28 **8건 전건 결정 완료**(§10). CMS 미도입 / 다크모드 Phase 6 / 기존 이미지 + 저채도 오버레이 / Resend + `mailto:` 폴백 / 지도 정적 / 검색콘솔만 / 실데이터는 초안 후 검수. **유일한 기본값 이탈은 O-6 — `devfirm.*` 신규 도메인 + `cmnyx.com` 전체 301**(§10.1)
