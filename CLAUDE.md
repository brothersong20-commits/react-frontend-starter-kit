# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 안내 문서입니다.

## 명령어

```bash
npm run dev       # Vite 개발 서버 실행 (localhost:5173)
npm run build     # tsc -b && vite build
npm run lint      # ESLint 검사
npm run format    # Prettier 포맷팅 (TS, TSX, CSS)
npm run preview   # 프로덕션 빌드 미리보기
```

## 아키텍처

### 진입점 및 라우팅

- `src/main.tsx` — React 19 루트, TanStack Query 설정, FOUC 방지를 위한 테마 퍼시스턴스 (`localStorage` `'rsk-theme'` 키)
- `src/App.tsx` — React Router v7, 총 6개 라우트; 내부 라우트는 모두 `AppLayout`으로 감싸짐

라우트 구성:
- `/` → `LandingPage` (기술 스택 쇼케이스, 레이아웃 없음)
- `/zustand`, `/query`, `/form`, `/flow`, `/components` → `AppLayout` 내부 (사이드바 + outlet)

### 테마 시스템

- CSS 변수 기반 (shadcn/ui 표준) — `document.documentElement`에 `dark` 클래스 토글
- `useThemeStore` (Zustand, localStorage 퍼시스턴스)가 `Sidebar`의 토글 구동
- Tailwind CSS v4 (`@tailwindcss/vite` 플러그인), `index.css`에서 `@import "tailwindcss"` 사용

### 상태 관리

- **클라이언트 상태:** Zustand (`src/store/`) — `useThemeStore`, `useCounterStore`
- **서버 상태:** TanStack Query — `src/api/queries.ts`의 `useUsers()` (JSONPlaceholder API)

### UI 컴포넌트

- shadcn/ui (new-york 스타일, zinc 기본색, CSS 변수) — `src/components/ui/`에 위치
- 새 shadcn 컴포넌트 추가: `npx shadcn@latest add <컴포넌트명>`
- `cn()` 유틸리티: `src/lib/utils.ts` (clsx + tailwind-merge)

### 경로 별칭

`@/`는 `./src/`로 해석됨 (`vite.config.ts` 및 `tsconfig.app.json` 모두 설정됨).

### 타입

공통 타입은 `src/types/index.ts`에서 중앙 관리.

## 코드 스타일

- Prettier: 들여쓰기 2칸, 단따옴표, 줄 너비 100자, 세미콜론 없음, 후행 쉼표 (ES5)
- ESLint 9 flat config — typescript-eslint 및 react-hooks 규칙 적용
- TypeScript strict 모드 (미사용 로컬 변수/매개변수 금지)

## 언어 사용 규칙

- **코드명·코드 내용** (변수명, 함수명, 파일명, 타입명 등): 영문으로 작성
- **주석** (인라인 주석, JSDoc 등): 한글로 작성
- **git commit 메시지**: 한글로 작성

### Commit 메시지 형식

```
<타입>: <한글 요약>
```

타입 목록:
- `feat` — 새 기능 추가
- `fix` — 버그 수정
- `refactor` — 리팩토링 (기능 변경 없음)
- `style` — 코드 포맷·스타일 변경
- `docs` — 문서 변경
- `chore` — 빌드·설정 변경

### DEVLOG.md 유지보수

커밋 완료 후 `DEVLOG.md`를 함께 업데이트한다:
1. 새 주제(기능 단위, 페이지 단위) 시작 시 → 새 PHASE 항목 생성
2. 기존 주제 연장 커밋 시 → 해당 PHASE 커밋 표에 해시·메시지 행 추가
3. 마일스톤 완료 시 → `package.json` version 올리고 PHASE 헤더에 버전 태그 명시
