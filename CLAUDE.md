# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 안내 문서입니다.

> AI 바이브 코딩 입문자를 위한 React 생태계 실습 스타터킷 (교육 목적).

## 명령어

```bash
npm run dev       # Vite 개발 서버 실행 (localhost:5173)
npm run build     # tsc -b && vite build
npm run lint      # ESLint 검사
npm run format    # Prettier 포맷팅 (TS, TSX, CSS)
npm run preview   # 프로덕션 빌드 미리보기
```

## 핵심 의존성 버전

| 라이브러리 | 버전 | 비고 |
|---|---|---|
| React | 19.x | 동시성 렌더링 |
| Vite | 8.x | `@tailwindcss/vite` 플러그인 |
| TypeScript | 6.x | strict 모드 |
| React Router | 7.x | |
| Zustand | 5.x | persist 미들웨어 |
| TanStack Query | 5.x | |
| React Hook Form | 7.x | + Zod 4.x (`@hookform/resolvers`) |
| @xyflow/react | 12.x | 노드·엣지 다이어그램 |
| Tailwind CSS | 4.x | CSS-first 구성 (`@import "tailwindcss"`) |
| shadcn/ui | latest | New York 스타일, zinc 기본색 |

## 아키텍처

### 진입점 및 라우팅

- `src/main.tsx` — React 19 루트, TanStack Query 설정, FOUC 방지 테마 퍼시스턴스 (`localStorage` `'rsk-theme'` 키), `window.error` / `unhandledrejection` 전역 에러 핸들러
- `src/App.tsx` — React Router v7, 총 6개 라우트; 내부 라우트는 모두 `AppLayout`으로 감싸짐

라우트 구성:
- `/` → `LandingPage` (정적 import — 즉시 렌더링, 레이아웃 없음)
- `/zustand`, `/query`, `/form`, `/flow`, `/components` → `AppLayout` 내부 (사이드바 + outlet)

코드 스플리팅:
- `LandingPage`만 정적 import; 나머지 5개 페이지는 `React.lazy()` + `Suspense`로 분리

### 테마 시스템

- CSS 변수 기반 (shadcn/ui 표준) — `document.documentElement`에 `dark` 클래스 토글
- `useThemeStore` (Zustand, localStorage 퍼시스턴스)가 `Sidebar`의 토글 구동
- Tailwind CSS v4 (`@tailwindcss/vite` 플러그인), `index.css`에서 `@import "tailwindcss"` 사용

### 상태 관리

- **클라이언트 상태:** Zustand (`src/store/`)
  - `useThemeStore` — 다크/라이트 모드 (persist, localStorage `'rsk-theme'`)
  - `useCounterStore` — 카운터 (inc / dec / reset)
  - `useCartStore` — 장바구니 (`CartItem[]`, addItem / removeItem / clearCart)
- **서버 상태:** TanStack Query (`src/api/queries.ts`, JSONPlaceholder API)
  - `useUsers()` — GET /users, queryKey: `['users']`
  - `usePosts()` — GET /posts?_limit=5, queryKey: `['posts']`
  - `useCreatePost()` — `useMutation`, POST /posts; `onSuccess`에서 `['posts']` invalidate

### UI 컴포넌트

- shadcn/ui (new-york 스타일, zinc 기본색, CSS 변수) — `src/components/ui/`에 위치
- 현재 설치된 컴포넌트: `Button` `Badge` `Card` `Input` `Label` `Separator`
- 새 컴포넌트 추가: `npx shadcn@latest add <컴포넌트명>`
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
PHASE <번호>: <타입>: <한글 요약>
```

**PHASE 번호 규칙:**
- 정수 (`1`, `2`, `3`, …) — 새로운 주제·기능 단위의 큰 변화 (DEVLOG.md에 새 PHASE 항목 생성)
- 소수점 첫째 자리 (`1.1`, `1.2`, …) — 동일 PHASE 내 사소한 변화 (기존 PHASE 커밋 표에 행 추가)

**예시:**
```
PHASE 2: feat: 사용자 인증 페이지 추가
PHASE 2.1: fix: 로그인 폼 유효성 오류 수정
PHASE 2.2: style: 인증 페이지 버튼 정렬 조정
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

## 크로스 플랫폼 주의사항 (macOS ↔ Windows)

이 프로젝트는 macOS와 Windows 양쪽에서 vibe 코딩하므로, 플랫폼 간 일관성을 유지한다.

### 개발 서버 관리

`npm run dev` 실행 전 기존 node 프로세스를 반드시 종료한다. 여러 서버가 동시에 뜨면 포트 충돌로 엉뚱한 포트에 서버가 열려 빈 화면을 볼 수 있다.

```bash
# Windows
taskkill /IM node.exe /F

# macOS / Linux
pkill -f node
```

실행 후 터미널에 표시된 포트를 확인하고 접속한다 (항상 5173이 아닐 수 있음).

### Node.js 버전

권장: **v20 LTS 이상**. 버전이 너무 다르면 동작 차이가 생길 수 있다.

```bash
node --version   # v20.x.x 이상인지 확인
```

### 라인 엔딩

`.gitattributes`로 LF 통일이 설정되어 있다. 별도 설정 없이 macOS/Windows 양쪽에서 동일한 파일 내용을 유지한다.

### 경로 작성 규칙

- 파일 import는 항상 `@/` 별칭 또는 상대 경로 사용 — OS별 절대 경로 하드코딩 금지
- 경로 구분자(`\` vs `/`)는 Vite가 내부적으로 처리하므로 코드에서 직접 다루지 않는다
