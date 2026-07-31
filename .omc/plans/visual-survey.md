# DevFirm 시각 자산 실측 조사 (2026-08-01)

계획의 입력 자료다. 추정치가 아니라 저장소를 스캔한 결과다.

## 1. 페이지별 현황

`히어로사진` = PageHero 배경 배너 / `art` = PageHero 우측 일러스트 /
`일러스트`·`사진`·`StepFlow`·`Timeline`·`비교표` = 본문 내 등장 횟수

| 경로 | 줄수 | 일러스트 | 사진 | 히어로사진 | art | StepFlow | Timeline | 비교표 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 284 | 3 | 4 | ✔ | 1 | 0 | 0 | 2 |
| `/about` | 167 | 5 | 3 | ✔ | 0 | 0 | 2 | 2 |
| `/about/cic` | 109 | 2 | 0 | ✔ | 0 | 2 | 0 | 0 |
| `/about/careers` | 84 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/about/careers/[slug]` | 105 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/solutions` | 158 | 5 | 2 | ✔ | 0 | 2 | 0 | 0 |
| `/solutions/physical-ai` | 88 | 0 | 0 | ✖ | 1 | 0 | 0 | 0 |
| `/solutions/office-ai` | 80 | 0 | 0 | ✖ | 1 | 0 | 0 | 0 |
| `/solutions/agents/[industry]` | 151 | 2 | 0 | ✖ | 1 | 2 | 0 | 0 |
| `/services` | 76 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/services/software` | 84 | 0 | 0 | ✔ | 0 | 2 | 0 | 0 |
| `/services/staffing` | 81 | 0 | 0 | ✔ | 0 | 2 | 0 | 0 |
| `/academy` | 104 | 0 | 0 | ✖ | 2 | 2 | 0 | 0 |
| `/academy/courses` | 42 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/academy/courses/[slug]` | 160 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/academy/apply` | 54 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/workspace` | 121 | 0 | 0 | ✔ | 1 | 0 | 0 | 0 |
| `/contact` | 101 | 0 | 0 | ✔ | 0 | 0 | 0 | 0 |
| `/privacy`, `/terms` | 37 | 0 | 0 | ✖ | 0 | 0 | 0 | 0 |
| `/styleguide` | 185 | 0 | 0 | ✖ | 0 | 0 | 0 | 0 |

**관찰**

- 본문 시각 자산이 `/`, `/about`, `/solutions` 세 페이지에 몰려 있다.
  나머지 15개 페이지는 히어로 배너 하나가 전부이고 본문은 글과 카드뿐이다.
- `StepFlow` 를 쓰는 페이지가 5개(`cic`, `academy`, `software`, `staffing`,
  `agents/[industry]`)인데, 전부 **텍스트 단계 목록**이라 절차 그래픽이 아니다.
- 리프 3종(`physical-ai`, `office-ai`, `agents/[industry]`)은 히어로 배너가 없다.
  PageHero 우측 `art` 일러스트를 쓰고 있어 의도적으로 제외한 것이다
  (흰 배경 전제로 그린 도형이 어두운 사진 위에서 무너지기 때문).

## 2. 섹션 구조 (본문 시각 자산이 없는 페이지)

### `/services` — 개발 서비스 허브
1. (히어로 아래 무제 카드 그리드)
2. `collaboration` 협업 방식 — "발주처의 관리 부담을 줄이는 쪽으로"
3. `domains` 기술 영역 — "다루는 범위"
4. CTA

### `/services/software` — 종합 소프트웨어 개발
1. `areas` 개발 영역 — "네 가지 영역" (FeatureCard 4장)
2. `process` 진행 프로세스 — **"다섯 단계"** (StepFlow, 텍스트)
3. `quality` 산출물·품질 기준 — "무엇을 받게 되는지 미리 정합니다"

### `/services/staffing` — 개발 인재파견
1. `difference` 차이 — **"프리랜서 직접 계약과 무엇이 다른가"** (비교 구조인데 비교표 없음)
2. `formats` 투입 형태 — "세 가지 중에서 고릅니다"
3. `process` 진행 프로세스 (StepFlow, 텍스트)

### `/academy` — PBL 아카데미
1. `pbl` PBL 이란 — "프로젝트가 커리큘럼입니다"
2. `schools` 3개 스쿨 — "무엇을 만들고 싶은지에 따라 고릅니다"
3. `external` 연계 — "포스트프로덕션 과정"
4. `process` 수강 절차 — **"네 단계"** (StepFlow, 텍스트)

### `/academy/courses/[slug]` — 과정 상세 (160줄, 시각 자산 0)
1. `curriculum` 커리큘럼 (표)
2. 기타 필드 섹션들

### `/about/cic` — 사내독립기업
1. `what` CIC 란 — "창업의 위험은 줄이고, 창업의 자율은 남깁니다"
2. `operation` 운영 방식
3. `roadmap` 로드맵 — **"에이전트 AI 고도화"** (시간축 구조인데 Timeline 없음)
4. `conditions` 참여 조건

### `/about/careers`, `/about/careers/[slug]` — 채용 (시각 자산 0)

### `/workspace` — 공유오피스
1. `concept` 컨셉 — "포스트프로덕션까지 되는 개발자 공간"
2. `facilities` 시설 — "무엇이 있나"
3. `tenants` 입주 대상
4. `pricing` 요금·문의
5. `location` 오시는 길 (실제 지도 ✔)

### `/solutions/physical-ai`, `/solutions/office-ai`
1. `problems` 현장의 문제 / 2. `capabilities` 하는 일 /
3. `outcomes` 기대 효과 / 4. `stack`·`industries`

### `/solutions/agents/[industry]`
1. `problems` → 2. `capabilities` → 3. `outcomes` → 4. `steps` 도입 흐름 → 5. `siblings`

## 3. 기존 자산·컴포넌트

**컴포넌트** (`components/content/`)
`comparison-table` `course-filter-tabs` `cta-section` `faq-accordion`
`feature-card` `hero-video` `illustration` `industry-agent-card`
`map-embed` `photo` `stat-block` `step-flow` `timeline-list`

**일러스트 레지스트리** (`content/illustrations.ts`, 28개)
`lawfirmModel` `backoffice` `cic` `risk` `growth` `twoAxes` `agentPipeline`
`adoption` `workspaceStudio` `workspaceInfra` `workspaceDesk` `map`(미사용)
`physicalAi` `officeAi` `academy` `home` `audienceClient` `audienceLearner`
`audienceDeveloper` `schoolSolution` `schoolOffice` `schoolProject`
`construction` `content` `manufacturing` `distribution` `service` `safety`

**사진 레지스트리** (`content/photos.ts`, 14개)
`heroOffice` / 배너 8종(`aboutHero` `solutionsHero` `servicesHero`
`servicesSoftwareHero` `servicesStaffingHero` `academyHero` `workspaceHero`
`contactHero`) / 본문 5종(`aboutTeam` `aboutSpace` `aboutBackoffice`
`solutionsIndustrial` `solutionsDesk`)

## 4. 지켜야 하는 제약

| 게이트 | 기준 | 현재 |
| --- | --- | --- |
| A6 색 대비 | 본문 4.5:1, 사진 위 7:1 | 전수 통과 (`pnpm check:contrast`) |
| A7 Lighthouse | 전 카테고리 ≥ 95, LCP ≤ 2.5s, CLS ≤ 0.1 | P 98~99 · LCP 0.83~1.03s · CLS 0.006 |
| A8 번들 | 초기 JS ≤ 130KB/페이지 | 통과 |
| A10 콘텐츠 분리 | 한국어 문장은 `content/*.ts` 에만 | 통과 |
| A11 클라이언트 경계 | `"use client"` 는 화이트리스트 10개만 | 통과 |
| A5 접근성 | axe critical/serious 0 | 통과 |

- 이미지는 `Illustration`/`Photo` 컴포넌트로만 넣는다. 두 컴포넌트가 치수와
  대체 텍스트를 **타입 단계에서 필수**로 만들어 CLS·axe 위반을 막는다.
- 자산 경로는 레지스트리(`content/illustrations.ts`, `content/photos.ts`)에만 쓴다.
- 일러스트는 codex 로 생성한다. 명사가 아니라 **치수 레시피**로 지시해야 하고
  (`.omc/plans/image-plan.md` §5 스타일 계약), 세트는 한 호출로 묶는다.
- 사진은 higgsfield `nano_banana_2` → `pnpm gen:photo` (AVIF+WebP).
- 로고·파비콘은 `scripts/generate-logo.mjs` 산출물이라 손대지 않는다.
- `total-byte-weight` 는 이미 warn 임계(1MB)를 넘긴 페이지가 2개 있다.
