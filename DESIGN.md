# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-08-28
- Primary product surfaces: 다국어 기업 사이트, AI 솔루션 소개, DocASI 카탈로그
- Evidence reviewed: `app/globals.css`, `app/[lang]/(site)/*`, `components/layout/*`, `components/content/*`, `content/*`, `README.md`

## Brand

- Personality: 조용하고 정밀하며, 기술을 과장하지 않는 실무 전문가
- Trust signals: 처리 범위와 산출물을 구체적으로 표기하고, 사람의 검수 지점을 숨기지 않는다.
- Avoid: 과도한 네온, 전면 글래스모피즘, 근거 없는 정확도 수치, 장식 목적의 3D 이미지

## Product goals

- Goals: 방문자가 처리하려는 문서 유형을 빠르게 찾고, 입력·추출·산출 범위를 이해한 뒤 문의로 전환한다.
- Non-goals: 브라우저에서 실제 문서를 업로드하거나 결과를 생성하는 운영형 SaaS 기능
- Success signals: 카탈로그 검색·필터 사용, 문서팩 상세 확인, 도입 문의 전환

## Personas and jobs

- Primary personas: 반복 문서 업무를 줄이려는 실무자, 자동화 범위를 검토하는 팀 리더, AI 도입을 평가하는 의사결정자
- User jobs: 업무에 맞는 문서팩 찾기, 지원 파일과 추출 항목 확인하기, 적용 가능성 문의하기
- Key contexts of use: 업무 중 데스크톱 탐색, 모바일에서 공유 링크 확인, 도입 검토 회의 전 비교

## Information architecture

- Primary navigation: AI 솔루션 아래 `DocASI 카탈로그`
- Core routes/screens: `/solutions/docasi` 카탈로그 단일 페이지, `/contact` 도입 문의
- Content hierarchy: 가치 제안 → 카탈로그 탐색 → 처리 흐름 → 운영 원칙 → 문의

## Design principles

- Find before explain: 긴 설명보다 검색, 분야 필터, 문서팩 제목을 먼저 제공한다.
- Show the handoff: AI가 읽는 지점뿐 아니라 사람이 확인하고 시스템으로 넘기는 지점을 함께 보여준다.
- Quiet confidence: 강한 색은 활성 상태와 CTA에만 쓰고, 카드 정보는 구조와 여백으로 구분한다.
- Tradeoffs: 상세 모달보다 페이지 내 비교 속도와 낮은 초기 JS 비용을 우선한다.

## Visual language

- Color: 기존 Firm Navy, Signal Blue, Circuit Cyan 토큰을 유지한다. DocASI 히어로만 네이비 면과 미세한 시안 글로우를 쓴다.
- Typography: Pretendard Variable, 짧고 굵은 제목, 본문 1.75 이상의 한국어 행간
- Spacing/layout rhythm: 20/32/48px 좌우 여백, 64/80/112px 섹션 리듬, 최대 1440px 컨테이너
- Shape/radius/elevation: 10~18px 반경, 1px 테두리, hover에서만 얕은 그림자
- Motion: 150~200ms 색·이동 전환, `prefers-reduced-motion` 준수
- Imagery/iconography: Lucide 선형 아이콘과 HTML/CSS 기반 문서 미리보기. 새로운 래스터 자산은 만들지 않는다.

## Components

- Existing components to reuse: `Container`, `Section`, `SectionHeading`, `Breadcrumb`, `CTASection`, 전역 헤더·푸터
- New/changed components: 검색·분야 필터·문서팩 카드가 한 경계에 있는 `DocAiCatalog`
- Variants and states: 기본/추천 카드, 활성/비활성 필터, 검색 결과 있음/없음
- Token/component ownership: 색과 반경은 `app/globals.css`, 콘텐츠는 `content/docai.ts`, 상호작용은 `components/content/docai-catalog.tsx`

## Accessibility

- Target standard: WCAG 2.2 AA, 기존 axe critical/serious 0 기준
- Keyboard/focus behavior: 모든 필터와 링크 44px 이상, 명시적 focus ring, 검색 결과 수 `aria-live`
- Contrast/readability: 기존 검증된 토큰만 사용하고 어두운 면에는 밝은 텍스트만 배치한다.
- Screen-reader semantics: 검색 label, 필터 group label, 결과 count, 카드 article 제목 연결
- Reduced motion and sensory considerations: 움직임 없이도 상태가 색·텍스트·테두리로 구분된다.

## Responsive behavior

- Supported breakpoints/devices: 320~1920px, 기존 Tailwind 7단계 breakpoint
- Layout adaptations: 모바일 1열, 태블릿 2열, 데스크톱 3열. 히어로 미리보기는 작은 화면에서 단순화한다.
- Touch/hover differences: hover는 보조 피드백이며 동일한 정보를 터치·키보드로 사용할 수 있다.

## Interaction states

- Loading: 정적 카탈로그이므로 별도 네트워크 로딩 없음
- Empty: 검색어·필터와 일치하는 문서팩이 없다는 메시지와 초기화 버튼 제공
- Error: 정적 데이터 렌더 실패는 전역 오류 경계 사용
- Success: 검색 결과 수와 카드 목록을 즉시 갱신
- Disabled: 사용하지 않음
- Offline/slow network, if applicable: 초기 HTML에 전체 콘텐츠가 있어 네트워크 지연 중에도 카탈로그를 읽을 수 있다.

## Content voice

- Tone: 짧고 구체적인 실무 한국어, 기능보다 처리 결과 중심
- Terminology: 제품명은 `DocASI`(도카시), 영문 카피는 `Superintelligence for Document Compliance`, 판매 단위는 `문서팩`, AI 처리 후 사람 확인은 `검수`
- Microcopy rules: 정확도 보장 대신 지원 형식·추출 필드·산출 형식을 명시한다.

## Implementation constraints

- Framework/styling system: Next.js 16 App Router, React 19, Tailwind CSS 4, shadcn/Radix
- Design-token constraints: 새 전역 색상 토큰 없이 기존 토큰 조합 사용
- Performance constraints: 페이지는 RSC 유지, 검색·필터만 Client Component, 새 이미지·의존성 없음
- Compatibility constraints: 17개 언어 경로와 RTL 레이아웃을 깨지 않으며 한국어 카탈로그 콘텐츠는 1차 출시 범위로 둔다.
- Test/screenshot expectations: lint, typecheck, content/nav/contrast/i18n 검사, production build, Playwright 반응형·접근성 확인

## Open questions

- [ ] 실제 판매 가능한 문서팩 이름·지원 형식·추출 필드를 영업/제품 담당자가 검수한다. / 제품 / 공개 전 정확성
- [ ] 카탈로그 본문 16개 언어 번역 범위를 확정한다. / 콘텐츠 / 현재는 한국어 원문 노출
- [ ] 실제 업로드 체험을 제공할 경우 보관 정책과 개인정보 처리 흐름을 별도 설계한다. / 보안·법무 / 운영형 기능 범위
