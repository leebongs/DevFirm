# 시각 자산 배치 — 확정 계획

- 확정일: 2026-08-01
- 절차: ralplan 합의(Planner → Architect → Critic). **Critic 판정 `APPROVE`**
- 근거 문서: `visual-survey.md`(실측) · `visual-placement-plan.md`(초안) ·
  `visual-placement-architect.md`(반론) · `visual-placement-critic.md`(판정)
- 이 문서가 위 넷을 대체한다. 충돌 시 **이 문서가 이긴다.**

---

## 요약

개념도·절차도·사진을 넣을 자리를 전수 조사한 결과, **넣을 곳보다 넣지 않을 곳이 많다.**
사이트는 이미 `/`·`/about`·`/solutions` 세 페이지에 시각 자산이 몰려 있고, 나머지가
비어 보이는 이유는 대부분 그 자리가 *구조·절차* 섹션이라 그림이 할 일이 없기 때문이다.

확정 작업은 **네 건 + 대기 두 건**이다.

| # | 항목 | 종류 | 신규 바이트 | 회귀 반경 | 상태 |
|---|---|---|---:|---|---|
| 0 | 저장소 위생 | — | 0 | 0 | 착수 가능 |
| 1 | `/solutions/office-ai` `physical` ← `twoAxes` | 개념도(재배치) | **0** | 1페이지 | 착수 가능 |
| 2 | `/academy` 학습자 사진 1장 | 사진(신규) | ~35KB | 1페이지(미측정) | Q-4 답 후 |
| 3 | `/academy` PBL 역전 도형 | 개념도(신규) | ~3KB | 1페이지 | 착수 가능 |
| 보류 A | `/services/staffing` `difference` 비교표 + `risk` 도형 | 대비도 | 0 | 1페이지 | **사업 측 카피 대기** |
| 보류 B | `/contact` 정적 지도 | 사진(신규) | ~15KB, **−640KB** | 1페이지 | **라이선스 결정 대기** |

**폐기**: `StepFlow` 연결선 승급(T1-1) · `cic.roadmap` 재배치(T1-3) ·
`/services` `collaboration`(T2-1) · `/solutions/physical-ai` `stack`(T2-3) ·
`/contact` 약도 SVG 환원.

---

## 1. 원칙

- **P1. 그림은 산문이 못 하는 일을 할 때만 넣는다.**
  그림만 할 수 있는 일은 넷 — 위상·순서·대비·분위기. 넷 중 아무것도 아니면 장식이고,
  장식이 쌓이면 브로슈어가 된다.
- **P2. 라벨이 필요한 그림은 자산이 아니라 컴포넌트다.**
  A10 이 SVG 안의 한국어를 금지한다. 라벨 있는 다이어그램은 "SVG 뼈대 + HTML 오버레이"가
  되는데 그 결합은 320px 에서 어긋나고 `content/*.ts` 변경을 따라오지 못한다.
- **P3. 재고를 먼저 쓴다.** 일러스트 28점 중 2점이 어디에도 쓰이지 않고 있었다.
- **P4. 바이트는 "무엇을"만큼 "어디에"의 문제다.** Lighthouse 는 5개 URL 만 본다.
  같은 35KB 가 `/academy` 에서는 무해하고 `/solutions`(여유 131KB)에서는 유의미하다.
- **P5. 실물이 있는 것은 실물로만 찍는다.** 방문 가능한 공간(`/workspace`)을 생성 이미지로
  보여주면 상담하러 온 사람이 그 방을 찾지 못한다. 톤이 아니라 사실의 문제다.

## 2. 결정 동인

| # | 동인 | 결과 |
|---|---|---|
| **D1** | A10 이 라벨 있는 다이어그램을 컴포넌트 쪽으로 민다 | 절차 그래픽을 SVG 로 그리지 않는다 |
| **D2** | 회귀 반경이 작고 가치가 확정된 것부터 간다 | 회귀 반경 1페이지 항목만 확정, 6곳짜리 항목 폐기 |
| **D3** | LH 5개 URL 중 2개가 이미 `total-byte-weight` warn 초과 | 신규 래스터를 미측정 페이지에만 |

> **초안의 D2 는 기각됐다.** "`StepFlow` 하나를 고치면 여섯 자리가 개선된다"는 명제가
> 저장소에서 성립하지 않는다 — §5 참조. 그 자리를 위 D2 가 대체한다.

---

## 3. 확정 작업

### Phase 0 — 저장소 위생 (선행)

| 할 일 | 근거 |
|---|---|
| `package.json` 에 `"gen:photo"` 추가 — **반드시 파일명 인자 필터와 함께** | README·image-plan 이 안내하지만 존재하지 않는다 |
| `scripts/optimize-photos.mjs` 에 인자 필터 도입 | 현재 `readdirSync(SRC)` 가 필터 없이 전부 굽는다(`:42`). `assets/photo-src` 에 원본 14장이 실재하므로, 사진 한 장 추가 후 실행하면 **기존 28개 바이너리가 전부 재인코딩**된다. sharp 버전이 다르면 바이트가 달라지고, 산출 치수가 바뀌면 `content/photos.ts` 와 어긋나 **다른 페이지에서 CLS 가 난다** |
| `scripts/preview-illustrations.mjs` 기본 배열에 `"concept"` 추가 | 기본 대상이 `["model","workspace","map","agents","hero","cards"]` 라 개념도형 5점이 검수 시트에 나오지 않는다(`:19-21`) |
| `illustrations.home` 폐기 (파일 + 레지스트리) | 홈이 사진·영상 히어로로 바뀌며 고아가 된 620×520 자산. **Q-3 승인 필요** |

**종료 조건**
```bash
node scripts/optimize-photos.mjs academy-project   # 인자 하나만 처리하는지
git status --porcelain -- public/images/photo      # 출력이 신규 2개 파일뿐
pnpm verify
```

---

### Phase 1 — `/solutions/office-ai` `physical` ← `illustrations.twoAxes`

**신규 바이트 0. 이 계획에서 가장 확실한 항목이므로 맨 앞에 둔다.**

`app/(site)/solutions/office-ai/page.tsx:62-69` 는 `SectionHeading` 하나만 렌더한다 —
사이트에서 **본문이 문자 그대로 비어 있는 유일한 섹션**이다(확인함).
섹션 문구는 *"현장 사진 한 장이 결재 문서까지 가는 경로를 하나로"*(`content/solutions.ts:176`)이고,
`twoAxes` 의 alt 는 *"두 축이 하나의 공통 기반 위에"* 다. 주장이 정확히 겹친다.

**구현 계약**
- `Illustration` 으로 렌더. `src`/`width`/`height`/`alt` 를 **레지스트리에서 전개**한다
  (호출부에서 치수를 다시 적으면 viewBox 와 어긋나 CLS 가 난다).
- 액자는 기존 관용 클래스 `border-border bg-muted/50 rounded-lg border p-5 lg:p-8`.
- 새 컴포넌트·새 액자 스타일 없음.

**종료 조건 (기계 판정)**
```bash
test -f public/images/concept/concept-two-axes.svg      # 자산 존재
pnpm typecheck && pnpm check:content
pnpm build && pnpm test:e2e                             # 320~1920 6폭 + axe
```

---

### Phase 2 — `/academy` 학습자 사진 1장  *(Q-4 답 후)*

`/academy` 는 **법인이 아니라 개인에게 파는 유일한 페이지**다. 수강 결정은 "저기 있는 내 모습"이
그려질 때 일어난다. 기존 사진 14장 중 **학습자가 찍힌 것이 하나도 없다**(전부 사무·산업·시설) —
재사용으로 해결되지 않는 유일한 공백이다.

**생성**: higgsfield `nano_banana_2`. image-plan §6·§9 공통 조건 승계 —
저채도 네이비 그레이드 · 깊은 그림자 · 텍스트/로고 없음 · 다큐멘터리 톤.
**비율은 3:2 또는 16:9**(21:9 는 전폭 히어로 전용). 1600px 으로 굽는다.
장면: 화면 앞에서 역할을 나누는 팀, **얼굴이 식별되지 않는 각도**
(§6 이 `about-backoffice` 의 "배경 인물 얼굴"을 알려진 흠으로 기록했다 — 생성 단계에서
피하는 편이 `tone` 으로 누르는 것보다 싸다).

**레지스트리**: `content/photos.ts` → `photos.academyProject`.
**치수는 추정하지 않고 스크립트가 출력한 실측치를 그대로 옮긴다.**

**종료 조건**
```bash
node scripts/optimize-photos.mjs academy-project
# 기대 1줄: ✔ academy-project  1600×NNN  avif NNKB  webp NNKB
git status --porcelain -- public/images/photo   # 신규 2개만
pnpm build && pnpm test:e2e
```

---

### Phase 3 — `/academy` `pbl` PBL 역전 개념도형

이 페이지의 핵심 주장은 *역전*이다 — 일반 교육은 지식을 쌓고 과제로 끝나지만 PBL 은
과제를 먼저 놓고 지식을 채운다. **역전은 두 방향을 나란히 놓아야만 보인다.**
사진으로는 불가능하고, 절차도로 그리면 "순서"만 남고 뒤집혔다는 사실이 사라진다.

**생성**: codex. image-plan §5 스타일 계약 준수.
명사가 아니라 **치수로 지시한다** — §5 에서 `"silhouette"` 한 단어가 5점을 반려시켰다.
기존 `concept-*.svg` 원문을 스타일 예시로 동봉하고 획 3px/1.5px 2단계·모서리 반경 2~4·
정면 투영을 명시적으로 요구한다.

**출력 계약**

| 항목 | 값 |
|---|---|
| 경로 | `public/images/concept/concept-pbl-inversion.svg` |
| viewBox | **`0 0 640 520`** (세로로 큰 비율) |
| 고정 width/height | 없음 |
| 팔레트 | image-plan §0 의 7색만. Circuit Cyan 면적 ≤ 5% |
| 크기 | ≤ 20KB (기존 개념도형 실측 1.6~2.5KB) |
| 금지 | 내부 한국어 · `<script>` · 외부 `<image href>` · 폰트 참조 · 그림자 |

> **viewBox 를 `900 420` 이 아니라 세로로 잡는 이유**: `Container` 가 `px-5` 이므로
> 320px 뷰포트의 콘텐츠 폭은 280px 이고, `900 420` 은 높이 131px 로 축소돼
> 화살촉 방향차 — 이 그림의 유일한 의미 담지체 — 가 뭉개진다.
> `concept-two-axes` 옆에 나란히 놓일 확률이라는 논거는 포기한다.

**검수**: `node scripts/preview-illustrations.mjs concept` — **인자를 반드시 준다**(Phase 0 전이면).

---

### 보류 A — `/services/staffing` `difference` 비교표 전환 + `risk` 도형

현재 4장의 동일한 `FeatureCard` 라 **좌변(프리랜서 직접 계약 쪽)이 화면에 없다.**
독자가 대조 대상을 머릿속에서 복원해야 한다. `ComparisonTable` 이 이미 있고
`/`·`/about` 에서 같은 논증에 쓰이고 있다. 구조는 `risk` 도형이, 세부는 표가 맡는
`/about` `metaphor` 의 기존 패턴을 그대로 재현한다.

**`components/content/comparison-table.tsx` 는 무수정이다.** 기존 비교표 관용에 축 라벨이
없고(`content/about.ts:20,25`), 좌우 문장의 평행 구조가 축을 담는다.

**착수 조건**: 좌변 4문장을 **사업 측이 직접 공급**한다(Q-1). 발주처의 세무·노무 리스크에
대한 진술이 되므로 소유권이 구현 밖이다. 네 문장은 서로 달라야 한다
(`comparison-table.tsx:38` 이 `key={row.left}`).

---

### 보류 B — `/contact` 정적 래스터 지도

**측정 사실**: `/contact` 의 Google Maps 서드파티는 **670KB(데스크탑) / 454KB(모바일)** 다.
iframe 이 940px 뷰포트의 `top: 708px` 에 있어 `loading="lazy"` 가 **지연시키지 못한다.**

**그럼에도 기본값은 iframe 유지다.** `total-byte-weight` 는 `warn` 이고
(`lighthouserc.json:28`), `error` 인 `categories:*`·LCP·CLS 는 전부 통과 중이다.
**CI 를 깨지 않는 경고 하나 때문에 길찾기 기능을 내주지 않는다.**

**약도 SVG 환원은 어떤 경우에도 채택하지 않는다.** `map-office.svg` 는 `<text>` 가 0개고
(확인함), 352px 사이드바에 들어가는 라벨 없는 회전 사각형 묶음이다.
`/contact` 는 "찾아오게 하는 것"이 목적 함수인 유일한 페이지다.

**정적 래스터는 라이선스 답(Q-2) 이후에만.** 채택 시 구현 계약:
1. `scripts/optimize-photos.mjs` 의 `WIDTHS` 에 항목 추가(`"contact-map": 800`).
   기본 1600px 이 352px 슬롯에 4배 자산을 싣는다.
2. `Photo` 를 **`tone={false}`** 로 호출한다. 네이비 `mix-blend-multiply` 가 도로명 대비를
   깎아 axe `color-contrast` 를 흔든다. §4.1 저채도 통일의 명시적 예외로 기록한다.
3. `alt` 필수 (타입이 강제하지 않는다).

`components/content/map-embed.tsx` 는 **존치한다** — `/workspace` 가 계속 쓴다.

---

## 4. 손대지 않는 자리 — 그리고 그 이유

> 이 목록이 계획의 절반이다.

| 대상 | 이유 |
|---|---|
| `/` 전 섹션 | 일러스트 3·사진 4·비교표 2·히어로 영상. **2087KB 로 측정 5개 중 최대.** 더할 곳이 아니라 뺄 곳 |
| `/about` 전 섹션 | 섹션마다 다이어그램·표·사진이 2~3중. 포화 |
| `/workspace` `facilities` | **P5.** 방문 가능한 실물 공간. 실촬영 전까지 현재 일러스트 3점 유지 — 코드 주석이 이미 이 교체 경로를 예고해 뒀다 |
| `/about/careers`, `[slug]` | 스캔·클릭 화면. 이미지를 붙이면 한 화면에 보이는 공고 수가 줄고 그것이 이 페이지의 유일한 지표다 |
| `/academy/courses` | 주역이 필터 탭이고 LH 측정 대상(708KB) |
| `/academy/courses/[slug]` | 주역이 커리큘럼 표. `SCHOOLS[].art` 를 3줄로 넣을 수 있지만 240×180 카드 글리프를 본문 폭으로 늘리는 것은 자산 용도 밖이다. **넣을 수 있다는 것이 넣어야 한다는 뜻은 아니다** |
| `/academy/apply`, `/contact` 폼 | 폼 옆 이미지는 시선을 분산시킨다. A12 가 이 페이지들의 목적 함수 |
| `/solutions/agents/[industry]` | 6개 라우트가 이미 산업별 전용 일러스트를 하나씩 갖는다. 범용 도형을 얹으면 차별성이 희석된다 |
| `/services/software` `areas`·`quality` | 병렬 카드와 인도물 목록. 위상·순서·대비·분위기 중 아무것도 아니다 — **P1 이 거른다** |
| `/services` `collaboration` | `/services` → `/services/staffing` 은 카드 링크로 이어지는 실제 이동 경로다. 같은 도형을 연속으로 두 번 보게 된다. 세 항목 중 `인수인계 문서` 는 도형에 없다 |
| `/solutions/physical-ai` `stack` | `agentPipeline` 은 4구간(입력 수집 → 판독 → 판단 → 전달)이고 `stack` 은 영상 인식/센서 분석/**현장 엣지 처리**/시스템 연동이다. "현장 엣지 처리"는 구간이 아니라 배치 위상이고 "입력 수집"에 대응하는 항목이 없다 — **1:1 이 아니다.** 그림을 넣으려고 주장을 고치지 않는다 |
| `/privacy`, `/terms`, `/styleguide` | 법적 고지와 내부 참조 |

---

## 5. 폐기된 항목과 그 이유

### `StepFlow` 연결선 승급 — 폐기

초안의 중심 논거였다. 두 가지 이유로 성립하지 않는다.

**(1) 정보량이 0 이다.** `StepFlow` 는 이미 `<ol>` + 번호 배지다(`step-flow.tsx:15-27`).
순서는 마크업과 숫자가 이미 전달한다. 연결선이 더하는 "앞이 끝나야 다음이 시작된다"는
번호 매긴 목록이 말하는 것과 구별되지 않는다. **계획 자신의 P1 이 이것을 거른다** —
같은 규칙으로 `/services/software` `areas` 를 제외해 놓고 여기에만 적용하지 않았다.

**(2) 구현이 불가능하다.** 호출부는 6개이고 열 수가 셋이다:

| 호출부 | 열 | 단계 | lg 배치 |
|---|---|---|---|
| `solutions/page.tsx:137` · `about/cic/page.tsx:62` · `academy/page.tsx:93` · `services/staffing/page.tsx:70` | 4 | 4 | 1행 — 깨끗 |
| `services/software/page.tsx:53` | **3** | **5** | **3+2 줄바꿈** |
| `solutions/agents/[industry]/page.tsx:124` | **2** | 4 | **2+2 줄바꿈** |

`last:` 는 마지막 항목 하나만 끈다. 줄바꿈 두 곳에서 **행의 마지막 칸**은 `last:` 에 걸리지
않아 연결선이 허공을 가리킨다. CSS 에는 "그리드 시각적 행의 마지막 칸" 선택자가 없고,
`nth-child` 를 쓰려면 열 수를 알아야 하는데 **열 수는 호출부가 `className` 으로 주입한다.**
`cn` 이 `twMerge`(`lib/utils.ts`)라 호출부의 `lg:grid-cols-3` 이 기본값을 이긴다 —
**컴포넌트는 자기 열 수를 알 방법이 없다.**

그리고 이 결함은 자동으로 잡히지 않는다. `tests/e2e/responsive.spec.ts:11-31` 은
문서 `scrollWidth ≤ innerWidth` 만 본다. 거터 안쪽 연결선은 통과한다.

### `cic.roadmap` → `StepFlow` — 폐기

`/about/cic` 가 인접한 두 섹션에 **시각적으로 동일한 번호 흐름 두 개**를 갖게 된다.
`operation`(4단계, 반복되는 운영 사이클)과 `roadmap`(3단계, 일회성 축적)은 성격이 다른데
같은 어휘로 렌더하면 독자가 구별할 근거를 잃는다. 순서 정보는 이미 `roadmap.lead` 가
*"CIC 에, 회사에 쌓입니다"* 로 말한다.

→ **소비처가 사라지므로 `{title, desc}` 수용 승급도 폐기.** `step-flow.tsx` 무수정,
`_types.ts` 에 `ProcessStep` 추가 없음. **회귀 반경 6곳이 계획에서 완전히 사라진다.**

---

## 6. 게이트 영향

| 게이트 | 기준 | 예상 | 검증 |
|---|---|---|---|
| A6 색 대비 | 본문 4.5:1 / 사진 위 7:1 | 변화 없음 | **`pnpm check:contrast` 가 아니다.** 그 스크립트는 `app/globals.css` 의 `:root` 토큰만 파싱해 고정 `PAIRS` 를 계산하고 **컴포넌트 마크업을 읽지 않는다** — 컴포넌트 색 변경에 대해 no-op 이다. 실제 게이트는 `tests/a11y/axe.spec.ts` 의 `color-contrast`(wcag2aa, 390·1440 × 전 라우트) |
| A7 LCP·CLS | ≤2.5s / ≤0.1 | 변화 없음 | 신규 래스터는 `/academy` 본문(접힘 아래, 미측정 URL). 히어로는 어느 페이지도 건드리지 않는다 |
| A7 total-byte-weight | warn @1MB | 변화 없음 (보류 B 채택 시 `/contact` −640KB) | `warn` 이지 `error` 가 아니다. `/` 2087KB 는 이 계획이 고치지 않는다 |
| A8 초기 JS | ≤130KB | 변화 없음 | 신규 클라이언트 컴포넌트 0 |
| A5 접근성 | axe critical/serious 0 | 변화 없음 | 신규 자산 2점은 `alt` 필수 타입에 걸린다 |
| A10·A11 | 콘텐츠 분리·클라이언트 경계 | 변화 없음 | `"use client"` 신규 0. 신규 SVG 내부 한국어 0 |
| A1 반응형 | 320~1920 스크롤 0 | 재검증 | Phase 3 의 viewBox 재설계가 이 제약에서 나왔다 |

> **`pnpm verify` 로는 부족하다.** 실제 구성은
> `lint && typecheck && format:check && check:content && check:nav && check:contrast` 로
> **e2e·a11y·Lighthouse 가 없다.** 모든 Phase 종료 조건은 `pnpm build && pnpm test:e2e` 를
> 명시해야 한다.

---

## 7. 미결 (사용자 답변 필요)

| # | 질문 | 소유 | 막고 있는 것 |
|---|---|---|---|
| **Q-1** | `staffing.difference` 좌변 4문장을 **사업 측이 직접** 공급할 수 있는가 | 사업 | 보류 A |
| **Q-2** | `/contact` 정적 지도의 출처 (OSM+귀속 / Kakao 정적지도 API / 기타) | 법무·경영 | 보류 B |
| **Q-3** | `illustrations.home` 폐기(파일+레지스트리) 승인 | 사용자 | Phase 0 일부 |
| **Q-4** | `/workspace` 실촬영 계획이 있는가. 있다면 `/academy` 학습자 사진도 같은 촬영에서 실물로 확보 가능한가 | 사용자 | Phase 2 (**생성 전에 물어야 한다**) |
| **Q-5** | LH 측정 URL 에 `/academy`·`/solutions/office-ai` 를 추가할 것인가 | 사용자 | 후속 |

---

## ADR

- **결정**: 시각 자산 확충을 *생성*이 아니라 *기존 자산 재배치*로 수행한다.
  신규 생성은 `/academy` 2점(개념도형 1·사진 1)으로 제한하고, 공유 컴포넌트는 건드리지 않는다.

- **동인**: D1 A10 라벨 제약이 매체 선택을 규정한다 · D2 회귀 반경이 작고 가치가 확정된
  것부터 간다 · D3 LH 바이트 예산은 "어디에"의 문제다.

- **검토한 대안**:
  - **B — 일러스트 8~12점 확장.** 기각. 채울 자리의 다수가 라벨 필수 구간이라 P2 의
    결합 구조에 걸리고, 라벨 없이 그리면 아무것도 말하지 않는 추상 도형이 된다.
  - **C — 사진 6~10장 확장.** 부분 채택(1장). 장당 30~45KB 가 그대로 바이트이고,
    채워야 할 섹션 다수가 구조·절차라 사진이 설명을 대신하지 못한다. 다만 C 의 판단 기준이
    옳기 때문에 `/academy` 한 장이 살아남았다.
  - **A0 — 초안의 `StepFlow` 지렛대안.** 기각. §5 참조 — 정보량 0 이고 구현이 불가능하다.

- **채택 이유**: 확정 네 건은 회귀 반경이 각각 한 페이지이고 서로 독립이다.
  Phase 1 은 신규 바이트 0 으로 사이트에서 본문이 비어 있는 유일한 섹션을 채운다.

- **결과**:
  - `components/content/` 무수정. `content/_types.ts` 무수정.
  - 신규 바이트 ≈ 38KB, 전량 LH 미측정 페이지.
  - `/` 의 `total-byte-weight` warn 은 그대로 남는다. 이 계획은 그것을 고치지 않는다.
  - 두 건(보류 A·B)이 외부 답에 막혀 있다 — **막힌 것을 막힌 채로 둔다.**
    구현자가 사업 카피를 대신 쓰거나 라이선스를 임의 판단하지 않는다.

- **후속**:
  - `/workspace` 지도도 같은 처리 (사이드바가 아니라 본문 폭이라 다른 자산이 필요)
  - F-4 `gallery-lightbox` 가 화이트리스트에 있으나 파일 없음 · F-5 화이트리스트 개수
    문서 불일치(README 9 / image-plan 10 / 실제 11)
  - LH 측정 URL 확대 (Q-5) — 로컬 수집으로 ≥95 확인 후에만 커밋
  - `scripts/check-contrast.mjs` 가 컴포넌트를 보지 않는다는 사실을 README 에 명시
