# DEVLOG.md

React Frontend Starter Kit의 PHASE별 개발 히스토리를 추적하는 문서입니다.

## 유지보수 규칙

- 커밋 완료 후 이 문서를 함께 업데이트한다 (가능하면 같은 커밋에 포함).
- **PHASE 정수 커밋** (`PHASE 2: …`): 새 주제·기능 단위의 시작 → 새 PHASE 항목 생성.
- **PHASE 소수점 커밋** (`PHASE 2.1: …`): 동일 PHASE 내 사소한 변화 → 해당 PHASE 커밋 표에 행 추가.
- 모든 설명은 한글로 작성한다.

---

## PHASE 0 — 프로젝트 초기화 `v0.1.0`

**날짜:** 2026-04-08  
**상태:** 완료

### 목표

React + TypeScript + Vite 기반 SPA 스타터킷의 뼈대를 구축한다.
주요 라이브러리를 모두 통합하고, 각 기술을 시연하는 예제 페이지를 만든다.

### 커밋

| 해시 | 메시지 |
|---|---|
| `8052bd5` | feat: React SPA 스타터킷 초기 세팅 |

### 작업 내용

- Vite + React 19 + TypeScript 프로젝트 세팅
- React Router v7 — 6개 라우트 구성 (`/`, `/zustand`, `/query`, `/form`, `/flow`, `/components`)
- Zustand v5 — `useCounterStore`, `useThemeStore` 기초 구현
- TanStack Query v5 — JSONPlaceholder API 연동 (`useUsers`)
- shadcn/ui (new-york 스타일, zinc 기본색) — Badge, Button, Card, Input, Label, Separator 추가
- React Hook Form + Zod — 폼 유효성 검사 예제 페이지
- XY Flow (React Flow v12) — 플로우 차트 예제 페이지
- Tailwind CSS v4 (`@tailwindcss/vite` 플러그인) 설정
- `@/` 경로 별칭 (`vite.config.ts`, `tsconfig.app.json`)
- Prettier + ESLint 9 flat config 설정

### 주요 생성 파일

- `src/App.tsx`, `src/main.tsx`, `src/index.css`
- `src/pages/` — LandingPage, ZustandPage, QueryPage, FormPage, FlowPage, ComponentsPage
- `src/components/layout/` — AppLayout, Sidebar
- `src/store/` — useCounterStore, useThemeStore
- `src/api/queries.ts`, `src/types/index.ts`, `src/lib/utils.ts`

### 기술 결정

- **Tailwind v4** 채택: `tailwind.config.js` 없이 `index.css`에서 `@import "tailwindcss"` 사용
- **shadcn/ui new-york 스타일 + zinc 기본색** 선택: 미니멀하고 중립적인 톤
- **TanStack Query QueryClient**를 `src/main.tsx`에서 전역 설정

---

## PHASE 1 — 랜딩페이지 완성 및 테마 시스템 `v0.1.0`

**날짜:** 2026-04-08  
**상태:** 완료

### 목표

랜딩페이지(LandingPage)의 UI를 개선하고, 다크/라이트 테마 전환 시스템을 안정적으로 구축한다.
왕초보 사용자를 위한 설명 섹션과 인터랙티브 카드 네비게이션을 추가한다.

### 커밋

| 해시 | 메시지 |
|---|---|
| `68843b1` | feat: 홈페이지 Hero 섹션 Glass UI 리디자인 |
| `96d21ea` | feat: 다크/라이트 토글, 왕초보 설명, 카드 클릭 이동 추가 |
| `36f7457` | fix: 전역 테마 시스템 구축 및 버그 수정 |

### 작업 내용

- **Glass UI 리디자인**: LandingPage를 AppLayout 밖으로 분리, Hero 섹션에 Glassmorphism 스타일 (그라디언트 오브, backdrop-blur, 반투명 카드) 적용
- **sticky glass 헤더 Nav** 추가
- **다크/라이트 토글**: Sidebar에 테마 전환 버튼 추가 (Sun/Moon 아이콘)
- **왕초보 설명 섹션**: 각 기술 스택 카드에 비개발자 친화적 설명 추가
- **카드 클릭 네비게이션**: 기술 카드 클릭 시 내부 예제 페이지(7개) 또는 공식 문서(5개)로 이동
- **전역 테마 시스템 안정화**: `useThemeStore` (Zustand + localStorage 퍼시스턴스) 완성, FOUC 방지 로직을 `main.tsx` 최상단에 추가

### 주요 변경 파일

- `src/pages/LandingPage.tsx` — 대규모 수정 (3개 커밋 연속)
- `src/store/useThemeStore.ts` — localStorage 퍼시스턴스 완성
- `src/components/layout/Sidebar.tsx` — 테마 토글 버튼 추가
- `src/main.tsx` — FOUC 방지 스크립트 추가
- `index.html` — 메타 태그 수정, 페이지 타이틀 변경

### 기술 결정

- **localStorage 키를 `'rsk-theme'`으로 고정**: 다른 앱과의 충돌 방지
- **FOUC 방지를 `main.tsx` 최상단에서 처리**: 컴포넌트 마운트 전에 테마 클래스를 적용하여 깜빡임 제거
- **LandingPage를 AppLayout 밖으로 분리**: 사이드바 없이 전체 화면 쇼케이스 레이아웃 사용

---

## PHASE 2 — 왕초보 친화적 설명 카드 추가 `v0.1.0`

**날짜:** 2026-04-08  
**상태:** 완료

### 목표

각 예시 페이지에 왕초보 사용자를 위한 개념 설명 카드를 추가한다.
"이게 뭔가요?", "이런 상황에 써요", "내 프로젝트에 적용하기" 3종 카드로 구성한다.

### 커밋

| 해시 | 메시지 |
|---|---|
| `a8611a1` | PHASE 2: feat: 각 예시 페이지에 왕초보 친화적 설명 카드 3종 추가 |
| `d7af2c7` | PHASE 2.1: docs: PHASE 번호 기반 커밋 메시지 규칙 추가 |

### 작업 내용

- ZustandPage, QueryPage, FormPage, FlowPage, ComponentsPage 각각에 설명 카드 3종 추가
  - **이게 뭔가요?** — 라이브러리 개념을 비개발자 언어로 설명
  - **이런 상황에 써요** — 실무 활용 예시 4가지
  - **내 프로젝트에 적용하기** — 설치부터 사용까지 단계별 가이드
- CLAUDE.md에 PHASE 번호 기반 커밋 메시지 규칙 명문화

---

## PHASE 2.3 — Windows 안정성 개선 및 에러 핸들링

**날짜:** 2026-04-09  
**상태:** 완료

### 목표

macOS에서 정상 동작하던 앱이 Windows에서 빈 화면이 되는 문제를 해결한다.
에러 발생 시 빈 화면 대신 오류 내용이 화면에 표시되도록 개선한다.

### 커밋

| 해시 | 메시지 |
|---|---|
| *(이번 커밋)* | PHASE 2.3: fix: Windows 빈 화면 해결 — lazy 로딩 및 에러 핸들러 추가 |

### 작업 내용

- **`App.tsx` — 페이지 컴포넌트 지연 로딩(lazy) 전환**
  - 5개 내부 페이지를 `React.lazy()` + `Suspense`로 변경
  - 특정 페이지 모듈 초기화 오류가 전체 앱 마운트를 막는 문제 해결
  - 코드 스플리팅 부수 효과: 메인 번들 664KB → 302KB (약 55% 감소)
- **`main.tsx` — 에러 핸들러 추가**
  - `window.onerror` / `unhandledrejection` 핸들러로 오류를 화면에 직접 표시
  - `localStorage` 접근을 `try/catch`로 감싸 보안 제한 환경 대응
  - `#root` null 체크 추가

### 기술 결정

- **`React.lazy`가 아닌 정적 import를 LandingPage에만 유지**: 랜딩 페이지는 첫 화면이므로 지연 없이 즉시 렌더링
- **에러 핸들러를 프레임워크 밖(window 레벨)에 배치**: React 마운트 전 오류도 잡을 수 있도록 함

---

## PHASE 3 — 실전 예시 추가 및 레이아웃 개선

**날짜:** 2026-04-08  
**상태:** 완료

### 목표

각 예시 페이지에 단순 데모를 넘어 실전에서 쓸 수 있는 패턴과 UI 예시를 추가한다.

### 커밋

| 해시 | 메시지 |
|---|---|
| `b5cdd58` | PHASE 3: feat: 각 예시 페이지에 다양한 실전 예시 추가 및 레이아웃 개선 |

### 작업 내용

- **Zustand**: 장바구니 데모(배열 상태/담기/삭제/합계), `persist` 미들웨어 코드 예시 추가
- **TanStack Query**: `refetch` 버튼, 다중 엔드포인트 예시, `useMutation` 데모 추가
- **Form**: 상품 등록 폼(`z.coerce`, `.int`, `.optional`, `.or`) 및 편집 폼 패턴 코드 예시 추가
- **Components**: Separator 섹션, 알림 아이템/통계 카드/사용자 목록 실전 UI 패턴 추가
- **Flow**: 주문 처리 플로우 및 AI 에이전트 파이프라인 두 번째 예시 추가

### 주요 생성 파일

- `src/store/useCartStore.ts` — Zustand 장바구니 스토어

---

## PHASE 4 — 바이브 코더 Tip 및 히어로 섹션 강화

**날짜:** 2026-04-09  
**상태:** 완료

### 목표

AI와 함께 코딩하는 왕왕초보 바이브 코더를 위한 콘텐츠를 대폭 강화한다.
LandingPage에 타겟 카피라이팅과 단계별 사용 가이드를 추가하고, 각 기술 페이지에
실전 예시 2개 + "바이브 코더 Tip" 카드를 추가한다.

### 커밋

| 해시 | 메시지 |
|---|---|
| *(이번 커밋)* | PHASE 4: feat: 바이브 코더 Tip 카드 및 히어로 섹션 강화 |

### 작업 내용

- **LandingPage — 히어로 카피라이팅 추가**
  - `"AI한테 코드 짜달라고 했는데 왜 동작을 안 하는지 모르겠다면"` 강조 문구
  - Claude, ChatGPT 바이브 코더 타겟 설명 문구
  - 다크/라이트 모드 대응 (violet-300 / violet-600)
- **LandingPage — "이럴 때 이렇게 활용하세요" 섹션 추가**
  - 5개 Step 카드: Zustand/Query/Form/Flow/Components 각각
  - "이럴 때(when)" + "이렇게(how)" + 해당 페이지 링크 구조
  - 기술별 고유 색상 테두리 (orange/rose/pink/emerald/zinc)
- **각 기술 페이지 — 예시 2개 추가**
  - Zustand: 알림 Toast 스토어, AI 채팅 히스토리 스토어
  - TanStack Query: staleTime/gcTime/refetchInterval 설정, enabled 조건부 쿼리
  - React Hook Form: 체크박스 & enum 선택 필드, 다단계 폼(Multi-step)
  - @xyflow/react: 커스텀 노드 컴포넌트(Handle/Position), API 데이터 → 동적 다이어그램
  - Components: 로딩 스켈레톤 패턴(animate-pulse), 빈 상태(Empty State) 패턴
- **각 기술 페이지 — "바이브 코더 Tip" 카드 추가 (amber 색상)**
  - AI 프롬프트 예시 (실제로 붙여넣어 쓸 수 있는 형태)
  - 3가지 실용 팁 bullet

---

## 버전 히스토리 요약

| 버전 | PHASE | 날짜 | 주요 내용 |
|---|---|---|---|
| v0.1.0 | PHASE 0 | 2026-04-08 | 프로젝트 초기화, 전체 기술 스택 세팅 |
| v0.1.0 | PHASE 1 | 2026-04-08 | 랜딩페이지 완성, 테마 시스템 구축 |
| v0.1.0 | PHASE 2 | 2026-04-08 | 왕초보 친화적 설명 카드 3종 추가 |
| v0.1.0 | PHASE 2.3 | 2026-04-09 | Windows 안정성 개선, 코드 스플리팅 |
| v0.1.0 | PHASE 3 | 2026-04-08 | 각 예시 페이지 실전 패턴 추가 |
| v0.1.0 | PHASE 4 | 2026-04-09 | 바이브 코더 Tip 카드 + 히어로 섹션 강화 |
