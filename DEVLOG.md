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

## PHASE 2 — [미정] [예정]

**날짜:** -  
**상태:** 예정

> 다음 작업이 결정되면 이 항목을 업데이트하고, 커밋 완료 후 상태를 "완료"로 변경합니다.

### 커밋

| 해시 | 메시지 |
|---|---|
| — | — |

---

## 버전 히스토리 요약

| 버전 | PHASE | 날짜 | 주요 내용 |
|---|---|---|---|
| v0.1.0 | PHASE 0 | 2026-04-08 | 프로젝트 초기화, 전체 기술 스택 세팅 |
| v0.1.0 | PHASE 1 | 2026-04-08 | 랜딩페이지 완성, 테마 시스템 구축 |
