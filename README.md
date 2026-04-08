# React Frontend Starter Kit

React 19 기반 프론트엔드 스타터킷입니다.  
자주 쓰는 라이브러리를 미리 세팅해두고, 각 기능을 직접 체험할 수 있는 데모 페이지를 함께 제공합니다.

---

## 기술 스택

| 분류 | 라이브러리 |
|------|-----------|
| 프레임워크 | React 19 + TypeScript + Vite |
| 라우팅 | React Router v7 |
| 클라이언트 상태 | Zustand v5 |
| 서버 상태 | TanStack Query v5 |
| 폼 | React Hook Form + Zod |
| 다이어그램 | React Flow (XYFlow) |
| UI | shadcn/ui + Tailwind CSS v4 |

---

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 페이지 구성

| 경로 | 내용 |
|------|------|
| `/` | 기술 스택 소개 (랜딩) |
| `/zustand` | Zustand 카운터 예제 |
| `/query` | TanStack Query 데이터 페칭 예제 |
| `/form` | React Hook Form + Zod 폼 검증 예제 |
| `/flow` | React Flow 다이어그램 예제 |
| `/components` | shadcn/ui 컴포넌트 모음 |

---

## 기타 명령어

```bash
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
npm run format   # Prettier 포맷팅
```
