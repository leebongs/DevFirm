# 시각 자산 배치 계획 — Critic 판정

- 대상: `.omc/plans/visual-placement-plan.md` (Planner) · `.omc/plans/visual-placement-architect.md` (Architect)
- 검토일: 2026-08-01
- 입장: **Architect 의 A− 를 뼈대로 채택한다. 다만 A− 도 세 곳에서 과장했고, 두 문서 모두
  종료 조건이 실행 불가능하다.** 아래 판정을 붙이면 인도 가능한 계획이 된다.

부모가 이미 검증한 항목(§1.1 `twMerge`·호출부 6개·열 수 3종, §8.1 재인코딩 28개,
§8.2 `check:contrast` no-op, §8.3 `verify` 구성, §8.5 수치)은 재론하지 않는다.
아래는 **그 사실들로부터 무엇이 따라 나오는가**에 대한 판정이다.

---

## 1. 원칙–선택지 정합성

### 1.1 P1 이 T1-1 을 거른다는 Architect 의 논증 — **결론 옳음, 근거는 약간 과장**

`components/content/step-flow.tsx:15-24` 는 이미 `<ol>` + `{index + 1}` 번호 배지다.
연결선이 추가로 전달하는 명제는 계획이 적은 *"앞 단계가 끝나야 다음이 시작된다"* 인데,
번호 붙은 순서 목록과 구별되는 정보가 아니다. **한계 정보량이 0 이므로 P1 을 통과하지 못한다.**
결론은 옳다.

다만 근거는 문자 그대로는 과장이다. P1 은 *"그림을 넣을 것인가"* 의 시험이다
(원문: "그림은 산문이 못 하는 일을 할 때만 넣는다"). 연결선은 자산이 아니라 컴포넌트 내부의
의사요소 장식이므로 P1 의 문언적 적용 대상이 아니다. 적용되는 것은 P1 의 **취지**
("장식이 쌓이면 브로슈어가 된다")이고, 그 취지로 판단하면 결과는 같다.
→ **Architect 의 판정을 채택하되, "P1 위반"이 아니라 "한계 정보량 0" 으로 근거를 바꿔 기록한다.**

### 1.2 계획이 자기 원칙을 어긴 곳은 T1-1 이 아니라 T2-5 다 — **Architect 옳음, 그리고 더 강한 근거가 있다**

Architect §2.3 은 P2("라벨이 필요한 그림은 컴포넌트다")로 T2-5 를 친다. 옳다.
여기에 **계획 자신의 T2 계약**이 더 결정적이다.

계획 §B 「종류 2」는 *"자산이 두 번째 소비처를 갖게 되면 양쪽에서 alt 가 참이어야 한다"* 고
못 박았다. `content/illustrations.ts:93-98` 의 `map` alt 는
*"강남대로에서 강남대로6길로 들어와 한양빌딩에 이르는 약도. 지하철 출입구에서 도보 경로가
표시되어 있다"* 인데, `public/images/map/map-office.svg` 는 `<text>` 요소가 **0 개**이고
전체 3,186바이트다(전수 확인). **이 alt 는 두 번째 소비처에서 거짓인 것이 아니라,
첫 번째 소비처에서도 참인 적이 없었다.** 계획이 T2-1~4 에 적용한 alt 재검증 규칙을
T2-5 에만 적용하지 않았다.

### 1.3 P3(재고 우선)가 P1 을 이기는 구간이 하나 있다 — 양쪽 다 놓쳤다

계획은 P3 로 `map` 을 되살리고 `home` 을 폐기한다. 그런데 **T2-5 는 P3 적용이고 P1 위반이다**
— "자리가 자산을 부른" 경우라는 §E 의 자기 변호는, 자리가 부른 것이 *지도*이지
*라벨 없는 회색 사각형*이 아니라는 사실을 건너뛴다. P3 는 "쓸 만한 재고"에 대한 원칙이지
"재고이므로 쓴다"가 아니다. → 계획의 P3 문언에 *"자산이 그 자리의 일을 실제로 할 때만"*
이라는 단서를 넣을 것을 권고한다.

### 1.4 나머지 원칙–선택지 정합성은 문제없다

P2→T1 방향, P4→D3 바이트 배치, P5→`/workspace` 제외는 전부 일관적이다. 한 줄로 끝낸다.

---

## 2. 대안(선택지 C)의 공정한 취급 — **순환 지적은 절반만 맞다**

Architect §1.4 는 *"채워야 할 섹션 대부분이 절차 섹션인 이유는 T1-1 이 여섯 개를
올려놨기 때문"* 이라고 한다. 검증했다.

T1-1 을 제거하면 남는 공백은 여섯이고, 그 성격은 다음과 같다.

| 자리 | 그림이 해야 할 일 | 사진이 할 수 있나 |
|---|---|---|
| `/services` `collaboration` | 위상 | ✖ |
| `/services/staffing` `difference` | 대비 | ✖ |
| `/solutions/physical-ai` `stack` | 위상 | ✖ |
| `/solutions/office-ai` `physical` | 위상 | ✖ |
| `/academy` `pbl` | 대비 | ✖ |
| `/about/cic` `roadmap` | 순서 | ✖ |

**Architect 가 맞는 부분**: 이 여섯은 "절차 섹션"이 아니다. 계획이 적은 기각 문언
(*"대부분이 구조·절차 섹션"*)은 T1-1 을 전제해야만 참이고, 그 점에서 순환이다.

**Architect 가 틀린 부분**: 기각 *결론*은 순환이 아니다. 여섯 중 다섯이 위상·대비를 요구하는데
사진은 **분위기**를 전달하는 매체다. C 는 "절차라서" 떨어지는 것이 아니라 **P1 의 다른 항목에서
떨어진다.** 여기에 D3(바이트)가 독립적으로 겹친다. 계획 스스로 C 에서 한 장(T3-2)만 뽑아
`/academy` 에 넣은 것 — 그 자리가 유일하게 **분위기**를 요구하는 자리다 — 은 오히려
기준이 일관되게 작동했다는 증거다.

**판정**: 계획의 C 기각 **문언은 수정 대상**(순환), **결정은 유지**. §0「선택지 C」의
"잃는 것" 문단을 *"채워야 할 자리가 요구하는 것은 위상과 대비인데 사진은 분위기의 매체다"* 로
다시 쓴다. 선택지 B 의 기각은 두 문서 모두 정확하다 — 재론하지 않는다.

**부수 판정 — 조사 자료의 계수 오류(양 문서 공통 상속).**
`visual-survey.md` §1 표의 컴포넌트 계수는 **렌더 횟수가 아니라 `grep` 출현 횟수**다.
`app/(site)/about/cic/page.tsx` 는 StepFlow 가 import 1 + 렌더 1 = 표에 "2" 로 기록됐고
실제 렌더는 1 이다(`page.tsx:7`, `:62`). `/solutions` 도 StepFlow 표기 2 → 실제 렌더 1
(`page.tsx:8`, `:137`). **표의 모든 0 이 아닌 값은 1 을 빼야 렌더 수가 된다.**
이 오류는 계획의 `/about` 포화 논거(*"일러스트 5 · 사진 3"* → 실제 4 · 2)를 약화시키지만
결론(손대지 않음)을 뒤집지는 않는다. 조사 자료에 정정 각주를 남긴다.

---

## 3. 위험 완화의 실행 가능성 — **두 문서 모두 실행 불가능하다. 전면 재작성**

계획의 종료 조건은 세 종류의 실행 불가 문장을 포함한다.

| 계획 원문 | 왜 실행 불가인가 | 대체 |
|---|---|---|
| Phase 1 · §B · §D — *"색 토큰을 건드렸으면 `pnpm check:contrast` 재실행"* | `scripts/check-contrast.mjs` 는 `app/globals.css` `:root` 토큰과 고정 `PAIRS`(`:165-186`)만 계산한다. 컴포넌트를 읽지 않으므로 출력이 동일하다. 현재 배지 조합(`bg-primary/10` / `text-primary`, `step-flow.tsx:21`)도 `PAIRS` 에 없다 | `pnpm build && pnpm test:e2e` (axe `color-contrast`, wcag2aa, 390·1440) |
| Phase 2 — *"320px 에서 행이 위아래로 쌓이고 가로 스크롤 0. `pnpm verify` 통과"* | `verify` = `lint && typecheck && format:check && check:content && check:nav && check:contrast`. 320px 을 보는 검사가 없다 | `pnpm verify` **그리고** `pnpm build && pnpm test:e2e` (`responsive.spec.ts` 6뷰포트) |
| Phase 3 — *"axe 0, CLS ≤ 0.1 유지"* | 두 값이 서로 다른 러너에 있다. axe = playwright, CLS = lhci | axe → `pnpm test:e2e` · CLS → `pnpm test:lh` (측정 URL 5개 한정) |
| Phase 0 — *"`pnpm gen:photo` 가 기존 14장을 정상 처리"* | `scripts/optimize-photos.mjs:43` 이 `readdirSync(SRC)` 전량을 재인코딩한다. `assets/photo-src` 는 gitignore 이고 로컬에만 14장 존재 → **CI·타 개발자에서 재현 불가이며, 성공하면 오히려 28개 바이너리가 갈린다** | 아래 §3.1 |
| Phase 1 — *"6개 라우트를 렌더해 연결선을 눈으로 확인"* | 자동 판정 불가. 그리고 이 조건은 T1-1 폐기와 함께 소멸 | 해당 없음(항목 폐기) |

**추가로 두 문서가 모두 빠뜨린 것**: `playwright.config.ts:44` 의 `webServer` 는
`pnpm start --port 3100` 이다. `pnpm test:e2e` 앞에 **`pnpm build` 가 반드시 선행**해야 한다.
`BASE_URL` 이 없으면 빌드 산출물이 없는 상태에서 서버가 뜨지 않는다.

### 3.1 Phase 0 재작성 — `gen:photo` 는 인자 필터와 **함께만** 추가한다

Architect §8.1 의 권고("파일명 인자 필터")를 채택하되, 종료 조건까지 바꾼다.

```
"gen:photo": "node scripts/optimize-photos.mjs"
```
와 함께 `scripts/optimize-photos.mjs:43` 을 다음과 같이 좁힌다:

```js
const only = process.argv.slice(2);
const files = readdirSync(SRC)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .filter((f) => only.length === 0 || only.includes(basename(f, extname(f))));
```

**Phase 0 종료 조건 (재작성)**

```
pnpm gen:photo about-team              # 인자 1개 지정
git status --porcelain -- public/images/photo
```
기대 출력: **빈 문자열** — 즉 인자를 준 실행이 나머지 13장을 건드리지 않았고,
`about-team` 자신도 바이트 동일하게 재생산됐다(sharp 버전 동일성 확인 겸용).
바이트가 갈리면 **그 자체가 Phase 4 이전에 알아야 할 정보**이므로 여기서 멈추고 기록한다.

인자 없는 실행(`pnpm gen:photo`)은 **문서에 "전량 재인코딩" 경고와 함께** 남긴다.

---

## 4. 항목별 기계 판정 가능한 인수 기준

살아남은 항목마다 "무엇이 실패를 만드는가"를 적는다. `눈으로 확인` 이 남는 곳은
그것이 축소 불가능한 인간 판단임을 명시하고, 앞에 기계 사전 필터를 붙인다.

### T2-4 `/solutions/office-ai` `physical` ← `illustrations.twoAxes`

| 기준 | 판정 수단 | 실패 조건 |
|---|---|---|
| 자산이 실제로 렌더된다 | **신규 assert 필요** (아래) | 셀렉터 미스 |
| 치수 하드코딩 0 | `grep -n 'width={9\|height={4' app/\(site\)/solutions/office-ai/page.tsx` | 숫자 리터럴 존재 |
| 가로 스크롤 0 | `pnpm test:e2e` `responsive.spec.ts` 6뷰포트 | scrollWidth > innerWidth |
| axe 0 | `pnpm test:e2e` `axe.spec.ts` (390·1440) | critical/serious ≥ 1 |
| 초기 JS ≤ 130KB | `pnpm test:e2e` `bundle.spec.ts` (1440) | 초과 |

**현재 저장소에는 "이미지가 그 페이지에 존재하는가"를 실패시킬 수 있는 검사가 없다.**
`tests/e2e/` 7개 스펙 어디에도 자산 존재 assert 가 없다. 계획·Architect 둘 다 이 공백을
보지 못했다. 최소 비용의 보완:

```ts
// tests/e2e/links.spec.ts 말미에 추가 (신규 파일 없음)
test("배치한 개념도형이 대상 페이지에 존재한다", async ({ page }) => {
  await page.goto("/solutions/office-ai");
  await expect(
    page.locator('img[src="/images/concept/concept-two-axes.svg"]'),
  ).toHaveCount(1);
});
```
이 한 블록이 T2-4·T3-1·(채택 시) T2-5′ 전부의 회귀 가드가 된다. **Phase 1 산출물에 포함한다.**

### T3-2 `/academy` 학습자 사진 1장

| 기준 | 판정 수단 | 기대 |
|---|---|---|
| 산출 파일이 정확히 2개 | `git status --porcelain -- public/images/photo` | `?? …academy-project.avif` · `?? …academy-project.webp` **두 줄만** |
| AVIF ≤ 45KB | `find public/images/photo/academy-project.avif -size +45k` | 빈 출력 |
| 레지스트리 치수 = 실측 | `pnpm gen:photo academy-project` 출력의 `1600×NNN` 을 `content/photos.ts` 에 전사 | 불일치 시 CLS |
| CLS ≤ 0.1 | **자동 판정 없음** — `/academy` 는 `lighthouserc.json:7-13` 의 5개 URL 에 없다 | §5 참조 |
| 얼굴 식별 불가 | **축소 불가능한 인간 판단** | — |

`Photo` 는 alt 를 타입 단계에서 강제하지 **않는다**. `components/content/photo.tsx:34` 가
`"alt" in photo && photo.alt ? photo.alt : ""` 이므로 alt 누락이 조용히 장식 이미지가 된다.
(`Illustration` 은 `alt | decorative` 유니온으로 실제 강제한다 — `illustration.tsx:24-29`.)
계획 §D A5 행의 *"신규 자산 2점은 alt 필수 타입에 걸린다"* 는 **사진에 대해서는 거짓**이다.
→ 기계 판정: `grep -A5 'academyProject' content/photos.ts | grep -c 'alt:'` 가 `1` 이어야 한다.

### T3-1 PBL 역전 도형

기계 사전 필터(전부 실패 가능):

```
find public/images/concept/concept-pbl-inversion.svg -size +20k      # 빈 출력
grep -c '[가-힣]' public/images/concept/concept-pbl-inversion.svg      # 0
grep -cE '<script|href=|<image|font-family|filter=|Gradient' …svg     # 0
grep -oE '#[0-9a-fA-F]{6}' …svg | sort -u                             # image-plan §0 7색의 부분집합
grep -oE 'stroke-width="[0-9.]+"' …svg | sort -u                      # 기존 concept-*.svg 5점과 동일 집합
```
남는 인간 판단 — **획 굵기·모서리 반경·투영의 시각적 정합**, **흰/Mist 양쪽 생존**.
`node scripts/preview-illustrations.mjs concept` 시트로 본다. 이 둘은 대체 불가.

### T1-2 · T2-5′ · T2-3

착수 조건이 충족되지 않았으므로 인수 기준을 여기서 확정하지 않는다(§7).

---

## 5. 단계별 정확한 명령과 기대 출력

`pnpm test:e2e` 앞의 `pnpm build` 는 **모든 단계에서 필수**다(`playwright.config.ts:44`).

```bash
# ── Phase 0 위생 ──────────────────────────────────────────
pnpm gen:photo about-team
git status --porcelain -- public/images/photo     # 기대: (빈 출력)
pnpm preview:art                                   # 기대: concept 5점이 시트에 포함
pnpm verify                                        # 기대: ✔ 6단계 전부

# ── Phase 1 T2-4 (+ 존재 assert 추가) ─────────────────────
pnpm verify
pnpm build && pnpm test:e2e
# 기대: 6 프로젝트(320/390/768/1024/1440/1920) 전부 pass,
#       axe 는 390·1440 에서만 실행되고 나머지는 skip,
#       bundle 은 1440 에서만 실행되고 나머지는 skip

# ── Phase 2 T3-2 ─────────────────────────────────────────
pnpm gen:photo academy-project
# 기대 출력 1줄: ✔ academy-project  1600×NNN  avif  NNKB  webp  NNKB
git status --porcelain -- public/images/photo      # 기대: ?? 두 줄
find public/images/photo/academy-project.avif -size +45k   # 기대: (빈 출력)
pnpm verify && pnpm build && pnpm test:e2e

# ── Phase 3 T3-1 ─────────────────────────────────────────
node scripts/preview-illustrations.mjs concept
# + §4 의 5개 grep/find 필터 전부 기대값
pnpm verify && pnpm build && pnpm test:e2e

# ── 전 단계 사후 (측정 URL 회귀 확인) ─────────────────────
pnpm build && pnpm test:lh
# 기대: categories:* ≥ 0.95, LCP ≤ 2500, CLS ≤ 0.1 이 error 로 통과.
#       total-byte-weight 는 warn 이므로 `/` 2087KB 는 계속 경고로 남는다 — 정상이다.
```

**바이트 수치를 실제로 읽는 방법**(계획 Phase 3 의 *"`lhci autorun` 으로 실측"* 은 방법을
적지 않았다):

```bash
node -e '
const {readdirSync,readFileSync}=require("fs");
for (const f of readdirSync(".lighthouseci").filter(f=>f.startsWith("lhr-")&&f.endsWith(".json"))) {
  const r=JSON.parse(readFileSync(".lighthouseci/"+f));
  console.log(r.finalDisplayedUrl, Math.round(r.audits["total-byte-weight"].numericValue/1024)+"KB");
}'
```

**측정 게이트에 대한 정직한 기록**: `lighthouserc.json:21-30` 의 `assert` 블록은 URL 을
구분하지 않는다. 따라서 `/contact` 에만 더 엄격한 `total-byte-weight` 를 걸 수 없고,
전역 임계를 낮추면 `/` 2087KB 가 즉시 걸린다. **URL 별 임계가 필요하면 `assertMatrix` 로
구조를 바꿔야 한다.** 이 계획의 범위 밖으로 두되, "바이트를 CI 가 지킨다"고 적어서는 안 된다.

---

## 6. 범위 정직성 — 양 문서가 지킬 수 없는 약속

| 문서 | 약속 | 왜 지킬 수 없나 |
|---|---|---|
| Planner D2 · §0 A | *"한 번의 컴포넌트 작업으로 절차 6곳이 동시에 개선"* | 성립하지 않음(부모 검증 완료). **문장을 삭제한다** |
| Planner §D | *"`/contact` 1201KB → 약 809KB"* | 미래 측정값의 단정. 서드파티 실측은 670/454KB 라 산술도 다르다. → *"측정하고 before/after 를 기록한다"* 로 |
| Planner §D A5 | *"신규 자산 2점은 alt 필수 타입에 걸린다"* | `Photo` 는 강제하지 않음(`photo.tsx:34`). 사진에 대해 거짓 |
| Planner Phase 0 | *"기존 14장은 안전하다"* | 삭제되지 않을 뿐 전량 재인코딩된다 |
| Planner §B「연결」 | *"`last:` 변형으로 처리"* | 줄바꿈 행 끝을 잡지 못함 |
| Architect §1.1 | *"`columns` 프롭을 도입하면 6개 호출부를 전부 고쳐야 한다"* | **과장.** 열을 오버라이드하는 호출부는 2개뿐이다(`services/software/page.tsx:53`, `agents/[industry]/page.tsx:124`). 나머지 4곳은 기본 4열을 그대로 쓰므로 무수정이다. 실제 비용은 컴포넌트 + 2 호출부 |
| Architect §4.2 | *"`ComparisonTable` 에 `label` 필드 추가가 필요하다 → 기존 비교표 4개가 회귀 반경"* | **틀렸다.** §7-A 참조 |
| Architect §3.2 | *"AVIF 약 20~30KB, 640KB 이상 순감"* | `scripts/optimize-photos.mjs:29-35` 의 `widthFor` 기본값이 **1600px** 이다. `WIDTHS` 항목을 추가하지 않으면 352px 슬롯에 1600px 래스터가 구워진다 |
| Architect §3.2 | *"렌더러 `Photo`, 새 컴포넌트 0"* | `Photo` 는 `tone = true` 가 기본이고(`photo.tsx:21`) `from-brand/45 … mix-blend-multiply` 오버레이를 덮는다(`:63`). **지도 위에 씌우면 도로명 대비가 떨어져 `/contact` 의 axe `color-contrast` 를 흔들 수 있다.** `tone={false}` 필수이고, 그 순간 §4.1 저채도 통일의 예외가 하나 생긴다 — 명시해야 한다 |
| Architect §9.2 | 최소 승급(`readonly (string \| ProcessStep)[]`) 권고 | **자기 §9.1 과 모순.** §9.1 은 `roadmap` 을 `FeatureCard` 로 유지하라고 한다. 그러면 `desc` 를 쓸 소비처가 **하나도 없다** |
| 양 문서 | `pnpm test:e2e` 를 종료 조건에 사용 | `pnpm build` 선행 누락 |
| 조사 자료 | §1 표의 컴포넌트 계수 | import 포함 grep 계수(§2 부수 판정) |

Architect §9.2 의 타입 세부(요소의 유니온이어야 한다)는 옳다. 다만 그대로 쓰면
`key={step.title}` 이 컴파일되지 않는다 — `typeof step === "string" ? step : step.title` 로
좁혀야 한다. 채택하지 않을 항목이므로 기록만 남긴다.

---

## 7. 쟁점 판정

### 7-1. T1-1 / T1-3 → **둘 다 폐기. `StepFlow` 는 아예 손대지 않는다.**

Architect 의 "최소 승급"보다 **한 걸음 더 간다.**

- **T1-1(연결선)**: 폐기. 한계 정보량 0(§1.1)이고, 열 수를 컴포넌트가 소유하지 않으면
  줄바꿈 두 곳에서 틀린다. `columns` 프롭으로 소유할 수는 있으나(비용은 Architect 주장의
  6곳이 아니라 컴포넌트 + 2 호출부, §6) 그렇게 해도 Tailwind 는 동적 클래스명을 못 만들므로
  2·3·4열 각각에 대한 `lg:[&>li:nth-child(3n)]:after:hidden` 류 정적 맵을 손으로 유지해야 한다.
  **얻는 정보가 0 인 기능에 지불할 값이 아니다.**
- **T1-3(`roadmap` → `StepFlow`)**: 폐기. Architect §1.3 의 논거(인접 `operation` 과
  시각적으로 동일해져 "반복 사이클"과 "일회성 축적"이 구별 불가)가 맞다.
  `content/cic.ts:34-44` 의 `operation`(4단계 운영 사이클)과 `:46-65` 의 `roadmap`(3단계 축적)은
  성격이 다르다. `roadmap` 은 `FeatureCard` `sm:grid-cols-3` 을 유지하고,
  순서 정보는 이미 `roadmap.lead` 가 *"CIC 에, 회사에 쌓입니다"* 로 말하고 있다.
- **따라서 `{title, desc}` 수용 승급도 폐기.** T1-3 이 유일한 소비처였으므로 소비처가 없다.
  Architect §9.2 는 자기 §9.1 과 모순이며(§6), 소비처 없는 API 확장은 YAGNI 다.

**결과**: `components/content/step-flow.tsx` 무수정. `content/_types.ts` 에 `ProcessStep` 추가 없음.
회귀 반경 6곳이 계획에서 완전히 사라진다.

### 7-2. T2-5 → **정적 래스터 지도를 조건부 채택. 라이선스 답이 오기 전에는 Google iframe 유지. SVG 약도는 어떤 경우에도 채택하지 않는다.**

- **SVG 약도(계획안) 기각.** `map-office.svg` 는 `<text>` 0 개(전수 확인). 352px 사이드바
  (`contact/page.tsx:31` 의 `lg:grid-cols-[minmax(0,1fr)_22rem]`)에 들어가는
  라벨 없는 회전 사각형 묶음이다. 게다가 레지스트리 alt(`illustrations.ts:93-98`)가
  자산이 하지 않는 일을 서술하고 있어 **계획 자신의 alt 재검증 계약을 위반한다**(§1.2).
  `/contact` 는 "찾아오게 하는 것"이 목적 함수인 유일한 페이지다.
- **Google iframe 유지가 기본값(default).** `lighthouserc.json:28` 에서
  `total-byte-weight` 는 `warn` 이고, `error` 인 `categories:*`·LCP·CLS 는 전부 통과 중이다.
  **CI 를 깨지 않는 경고 하나 때문에 길찾기 기능을 내주지 않는다.**
  Architect §3.2 후보 2 의 분석(lazy iframe 은 일반적으로 지연되지 않는다)은 옳고,
  그것이 iframe 을 *제거할* 이유는 되어도 *약도로 바꿀* 이유는 되지 못한다.
- **정적 래스터는 라이선스 답이 온 뒤에만 채택.** Architect 의 후보 3 방향은 옳다.
  다만 다음 세 가지를 구현 계약에 **명시적으로** 넣어야 한다 — 두 문서 모두 빠뜨렸다.
  1. `scripts/optimize-photos.mjs` 의 `WIDTHS` 에 항목 추가(예: `"contact-map": 800`).
     기본값 1600px 이 그대로 적용되면 352px 슬롯에 4배 자산이 실린다.
  2. `Photo` 를 **`tone={false}`** 로 호출한다. 네이비 `mix-blend-multiply` 오버레이가
     도로명 대비를 깎아 `/contact` 의 axe `color-contrast` 를 흔들 수 있다.
     §4.1 저채도 통일의 명시적 예외로 기록한다.
  3. `content/photos.ts` 에 alt 필수(타입이 강제하지 않음, §4).
- **`/workspace` 는 이번 계획에서 다루지 않는다.** Architect §3.3 의 관찰(사용자 비용은
  동일하다)은 옳지만, 결론(같은 단계에 묶는다)은 반대다. `/workspace` 의 지도는 사이드바가
  아니라 본문 폭이므로 **다른 폭의 두 번째 래스터**가 필요하고, `map-embed.tsx` 삭제까지
  따라온다. 회귀 반경 1페이지 원칙을 스스로 어기게 된다. **후속 항목으로 분리**하고
  `components/content/map-embed.tsx` 는 존치한다.

### 7-3. Phase 순서 → **Architect 가 옳다. 계획의 순서는 뒤집는다.**

계획은 회귀 반경 6곳짜리 항목을 단독 관문으로 두고 나머지 전부를 그 뒤에 묶었다.
T1-1/T1-3 이 폐기되면서 이 관문 자체가 사라지므로 논쟁은 자동 해소되지만,
원칙으로 기록한다: **회귀 반경이 작고 가치가 확정된 것부터 간다.**
T2-4 는 본문이 문자 그대로 비어 있는 유일한 섹션(`solutions/office-ai/page.tsx:62-69` 이
`SectionHeading` 하나만 렌더)을 신규 바이트 0 으로 채운다. 이것이 첫 단계여야 한다.

### 7-A. 부가 판정 — T1-2 는 `ComparisonTable` 수정을 요구하지 않는다

Architect §4.2 는 이 계획에서 가장 실질적인 지적으로 제시됐지만 **틀렸다.**
저장소의 기존 비교표 관용을 확인하면 행에 축 라벨이 없다:

```
content/about.ts:20  { left: "변호사가 사건을 맡는다", right: "개발자가 프로젝트를 맡는다" }
content/about.ts:25  { left: "의뢰인은 법인과 계약한다", right: "발주처는 법인과 계약한다" }
```

**축은 좌우 문장의 평행 구조가 담는다.** 그리고 `staffing.difference.items` 의 네 `title`
(`content/services.ts:136,140,144,148`)은 중립적 비교 축이 아니다 —
`계약 주체가 법인` · `검증된 인력 풀` · `백오피스 지원` 셋은 이미 **데브펌 쪽 주장**이라
자연히 `right` 로 흡수된다. 축다운 축은 `세무·노무 처리` 하나뿐이다.
따라서 필요한 것은 `label` 필드가 아니라 **좌우를 평행 문장으로 다시 쓰는 카피 작업**이고,
`components/content/comparison-table.tsx` 는 무수정이다. 계획의
*"`ComparisonTable` 은 수정하지 않는다"* 가 살아남는다. 기존 비교표 4개는 회귀 반경 밖이다.

**다만 착수 조건은 Architect §5 를 그대로 채택한다.** 좌변 4문장은 발주처의 세무·노무
리스크에 대한 진술이 되므로 소유권이 사업 측이다. `comparison-table.tsx:38` 이
`key={row.left}` 를 쓰므로 네 좌변은 서로 달라야 한다는 제약도 카피 발주서에 넣는다.
**카피가 도착하기 전에는 착수하지 않는다.**

### 7-B. 부가 판정 — T2-3 기각, T2-1 기각

- **T2-3 기각.** Architect §6.3 이 맞다. `agentPipeline` alt 는 4구간
  (`illustrations.ts:63`: 입력 수집 → 판독 → 판단 → 업무 시스템으로 전달)이고,
  `physicalAi.stack.items`(`content/solutions.ts:211-232`)는 영상 인식 / 센서 시계열 분석 /
  **현장 엣지 처리** / 업무 시스템 연동이다. "현장 엣지 처리"는 파이프라인 구간이 아니라
  배치 위상이고 "입력 수집"에 대응하는 항목은 없다. **1:1 이 아니다.**
  콘텐츠를 고쳐 1:1 을 만드는 것은 그림을 넣기 위해 주장을 바꾸는 역방향 추론이므로 하지 않는다.
- **T2-1 기각.** Architect §6.2 가 맞다. `/services` → `/services/staffing` 은 카드 링크로
  이어지는 실제 이동 경로인데 같은 도형을 연속으로 두 번 보게 된다.
  게다가 `services.collaboration` 세 항목 중 `인수인계 문서` 는 도형에 없다.
  계획이 `/solutions/agents/*` 를 제외할 때 쓴 "허브와 중복" 논거를
  여기에도 일관되게 적용한다.
- **T2-2 유지.** `staffing.difference.lead`(`content/services.ts:133`)의
  *"발주처가 개인과 직접 계약할 때 생기는 위험을 법인이 흡수합니다"* 와
  `risk` alt 가 거의 축자적으로 같다. 단, T1-2 와 짝지어 착수한다(카피 대기).

---

## 8. 확정 실행 순서

| # | 항목 | 회귀 반경 | 상태 |
|---|---|---|---|
| **0** | 위생 — `gen:photo` **+ 인자 필터**(§3.1) · `preview:art` 기본 배열에 `concept` · `illustrations.home` 폐기(Q-3) | 0 | 착수 가능 |
| **1** | **T2-4** `/solutions/office-ai` `physical` ← `twoAxes` · **자산 존재 assert 추가**(§4) | 1페이지 | 착수 가능 |
| **2** | **T3-2** `/academy` 학습자 사진 1장 | 1페이지 (미측정) | Q-4′ 답 후 |
| **3** | **T3-1** PBL 역전 도형 — viewBox 재설계 또는 `decorative` 격하 | 1페이지 | 착수 가능 |
| 보류 A | **T1-2 + T2-2** `staffing.difference` 비교표 전환 (`ComparisonTable` 무수정, §7-A) | 1페이지 | **사업 측 카피 대기** |
| 보류 B | **T2-5′** `/contact` 정적 래스터 지도 (`tone={false}` · `WIDTHS` 항목 필수) | 1페이지 | **라이선스 결정 대기.** 미결 시 iframe 유지 |
| 후속 | `/workspace` 지도 동일 처리 · F-4/F-5 문서 정합 · LH 측정 URL 확대 | — | 범위 밖 |
| 제외 | T1-1 · T1-3 · `StepFlow` 승급 전체 · T2-1 · T2-3 | — | §7-1, §7-B |

**T3-1 에 대한 추가 판정**: Architect §7 의 두 선택지 중 **2안(viewBox 재설계)** 을 택한다.
`Container` 가 `px-5` 이므로 320px 뷰포트의 콘텐츠 폭은 280px 이고, `0 0 900 420` 은
높이 131px 로 축소되어 화살촉 방향차라는 유일한 의미 담지체가 뭉개진다.
`decorative` 격하(1안)는 P1 통과 근거를 "순차 → 동시" 하나로 얇게 만들어
**넣지 않는 것과 구별하기 어려워진다.** 세로로 큰 비율(예: `0 0 640 520`)로 다시 잡고,
`concept-two-axes` 옆에 나란히 놓일 확률이라는 논거는 포기한다.

## 9. 미결 질문 (확정)

- **Q-1′ (사업 소유)** `staffing.difference` 좌변 4문장을 사업 측이 **직접 공급**한다.
  네 문장은 서로 달라야 한다(`comparison-table.tsx:38` 의 `key={row.left}`).
  구현자 초안 → 승인 순서는 쓰지 않는다.
- **Q-2′ (법무·경영)** `/contact` 정적 지도의 출처(OSM+귀속 / Kakao 정적지도 API 1회 / 기타).
  **답이 오기 전에는 Google iframe 을 그대로 둔다** — 약도 SVG 는 선택지가 아니다.
- **Q-3** `illustrations.home` 폐기 승인. 계획 그대로.
- **Q-4′** `/workspace` 실촬영 계획. 있다면 `/academy` 학습자 사진(T3-2)도 같은 촬영에서
  실물로 확보 가능한지 함께 확인한다 — **생성 전에 물어야 한다.**
- **Q-5** LH 측정 URL 확대는 로컬 수집으로 전 카테고리 ≥95 를 확인한 뒤에만 커밋.
  `assert` 블록이 URL 을 구분하지 않는다는 사실(§5)을 함께 기록한다.

---

## 10. 한 문단

Planner 의 판단 기준(P1·P2·P5, 「손대지 않는 자리」 목록)은 그대로 쓸 만하고,
Architect 의 핵심 반박(D2 는 지렛대가 아니다, 단계 순서를 뒤집어라)은 옳다.
남은 문제는 두 문서가 **서로 다른 두 곳에서 각각 과장했다**는 것이다 —
Planner 는 인도 불가능한 지렛대를 서사의 기둥으로 삼았고,
Architect 는 그것을 무너뜨린 뒤 `ComparisonTable` 수정 필요라는 존재하지 않는 결함과
6개 호출부라는 부풀린 비용을 새로 세웠다. 양쪽을 걷어내면
**신규 바이트 0 짜리 한 건, 사진 한 장, 도형 한 점, 그리고 외부 답을 기다리는 두 건**이 남는다.
작지만 전부 인도 가능하고, 종료 조건이 §5 의 명령으로 실제 실행된다.

APPROVE
