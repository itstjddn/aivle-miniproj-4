# 📚 AI 표지 생성 도서관리 시스템

KT AIVLE School 미니프로젝트 4차 Frontend — 도서를 등록·조회·수정·삭제하고, 도서 제목과 내용을 바탕으로 OpenAI `gpt-image-2`가 어울리는 표지를 생성해 주는 웹 애플리케이션입니다.

## 🛠 기술 스택 및 실행 방법

* **Frontend / UI / 라우팅:** React 19 · Vite · `fetch` · React Router · MUI (Material UI) · Emotion
* **데이터 / AI:** `json-server` 0.17.4 (`db.json` 기반 로컬 REST API, `http://localhost:3000`) · OpenAI API (`gpt-image-2`)
* **실행 절차:**
  ```bash
  git clone https://github.com/itstjddn/aivle-miniproj-4.git
  cd aivle-miniproj-4
  npm install
  ```
  터미널 2개를 열어서 **둘 다** 실행합니다.
  ```bash
  npm run server   # 터미널 1: json-server (데이터) → http://localhost:3000/books
  npm run dev      # 터미널 2: React (화면)         → http://localhost:5173
  ```
  OpenAI API Key는 파일에 저장하지 않고, 도서 상세 화면의 입력칸에 직접 입력합니다.

## ✨ 주요 기능

* **도서 목록:** 표지 · 제목 · 등록일 카드 그리드(화면 폭에 따라 1~4열 반응형), 표지가 없으면 기본 표지(`BookCover`, "표지 없음") 표시
* **제목 검색:** 검색창에 입력하면 제목에 검색어가 포함된 도서만 표시(`Array.filter` + `includes`, 대소문자 구분)
* **도서 등록:** 제목 · 내용 입력, 공백 입력 금지 + 글자 수 제한(제목 50자 / 내용 1000자, 입력 중 글자 수 표시, 한도를 넘으면 더 입력되지 않음)
* **도서 상세:** 표지 · 본문 · 등록일 · 수정일(수정한 적이 있을 때) 표시
* **도서 수정:** 기존 정보 자동 입력, 저장 후 상세 화면에 즉시 반영
* **도서 삭제:** 삭제 전 확인창(`window.confirm`) 제공, 확인 시 목록에서 즉시 제거
* **AI 표지 생성:** API Key(빈 값·한글 등 허용되지 않는 문자 포함 시 안내) · 품질(Low / Medium / High) 선택 → 제목·내용 기반 한글 프롬프트로 표지 생성(`b64_json` → Data URL 변환) 후 `coverImageUrl`에 `PATCH` 저장 → 미리보기 → "이 표지 사용하기"를 누르면 목록·상세 화면에 반영 (401 · 429 등 에러 안내 포함)
* **알림:** 등록 · 수정 · 삭제 결과를 화면 하단 스낵바로 안내 (목록 불러오기 실패는 `alert`)
* **화면 주소:** 화면마다 URL(`/`, `/books`, `/books/new`, `/books/:id`, `/books/:id/edit`)이 있어 브라우저 뒤로가기 · 새로고침 시에도 보던 화면 유지

## 🗂 데이터 구조 & API / 화면 경로

### 1. 데이터 구조 (`db.json`)

```json
{
  "id": "1",
  "title": "도서 제목",
  "content": "도서 내용",
  "coverImageUrl": "data:image/png;base64,...",
  "createdAt": "2026-11-20",
  "updatedAt": "2026-11-20"
}
```

* `id` : `json-server`가 등록 시 자동 부여
* `coverImageUrl` : 처음에는 없고, AI 표지를 생성하면 Data URL(이미지 데이터 자체) 형태로 저장
* `createdAt` / `updatedAt` : 등록 · 수정 시 오늘 날짜(`YYYY-MM-DD`) 자동 입력

### 2. API 엔드포인트 (데이터 서버: `http://localhost:3000`)

| 기능 | 메서드 | URL | 담당 파일 / 설명 |
|---|---|---|---|
| 목록 조회 | GET | `/books` | `api/books.js` `getBooks` — 앱 시작 시 전체 도서 목록 불러오기 |
| 상세 조회 | GET | `/books/:id` | `api/books.js` `getBook` — 함수는 준비되어 있으나, 현재 상세 화면은 이미 불러온 목록(state)에서 도서를 찾아 표시 |
| 신규 등록 | POST | `/books` | `api/books.js` `createBook` — 새 도서 추가 (id 자동 생성) |
| 도서 수정 | PATCH | `/books/:id` | `api/books.js` `updateBook` — 제목 · 내용 · 수정일 변경 |
| AI 표지 저장 | PATCH | `/books/:id` | `api/openai.js` `generateCover` — `coverImageUrl`만 저장 |
| 도서 삭제 | DELETE | `/books/:id` | `api/books.js` `deleteBook` — 도서 데이터 삭제 |
| 표지 생성 요청 | POST | `https://api.openai.com/v1/images/generations` | `api/openai.js` `generateCover` — OpenAI 이미지 생성 API |

### 3. 화면 경로 (브라우저 주소: `http://localhost:5173`)

| 화면 | 경로 | 연결 컴포넌트 | 설명 |
|---|---|---|---|
| 홈 | `/` | `Home` | 서비스 소개 및 환영 화면 |
| 도서 목록 | `/books` | `BookList` | 도서 카드 그리드 목록 및 제목 검색 |
| 새 도서 등록 | `/books/new` | `BookForm` | 신규 도서 등록 입력 폼 |
| 도서 상세 + AI 표지 생성 | `/books/:id` | `BookDetail`, `CoverGenerator` | 도서 본문 조회, AI 표지 생성 및 반영 |
| 도서 수정 | `/books/:id/edit` | `BookForm` | 기존 정보가 채워진 도서 수정 폼 |
| 미지정 경로 | `*` | 홈으로 리다이렉트 | 잘못된 주소 입력 시 홈 화면으로 이동 |

## ⚙️ 동작 구조 및 상태 관리

* **`App.jsx` 중앙 관리:** `books` state와 CRUD 핸들러, 라우팅, 스낵바를 한 곳에서 관리하고 하위 화면(`Home`, `BookList`, `BookDetail`, `BookForm`, `CoverGenerator`)에 `props`로 전달합니다.
* **불변성 3패턴:** 등록 · 수정 · 삭제 후 목록 전체를 다시 불러오지 않고, 서버 응답으로 새 배열을 만들어 함수형 업데이트로 `books` state를 갱신합니다 — 등록 `[...prev, createdBook]`, 수정 `prev.map(...)`, 삭제 `prev.filter(...)`.
* **폴더 구조:**
  ```text
  src/
  ├── api/          # books.js (CRUD), openai.js (표지 생성 + coverImageUrl PATCH)
  ├── components/   # Home, BookList, BookCover, BookDetail, BookForm, CoverGenerator
  ├── theme.js      # MUI 테마 (색상 · 폰트 · 모서리)
  ├── App.jsx       # 도서 state · CRUD · 라우팅 · 스낵바
  └── main.jsx      # 앱 진입점
  ```

## 👥 역할 분담 (R&R)

* **김채민 (조장·PM):** 일정·협업 조율, `README.md`, `api/books.js` 및 CRUD 컴포넌트 연동, 표지 DB 저장 점검
* **전소연 (UI·PPT):** MUI 레이아웃·테마(`theme.js`), 라우팅 및 스낵바 피드백, 발표 자료 구성
* **장표권 (서기·CRUD):** 환경 세팅 및 CRUD 기능·테스트, `db.json` 정리, 표지 미리보기 후 반영 기능
* **김성우 (발표·AI):** `api/openai.js` 표지 생성, `CoverGenerator` 표지 생성 처리(로딩 · 에러 안내), 글자 수 제한 및 제목 검색 기능 구현, 시연·발표

## ⚠️ 알려진 한계

* **표지 저장 시점:** 표지는 생성 직후 `openai.js`에서 DB에 저장되고, "이 표지 사용하기"는 화면(state) 반영만 담당합니다. 그래서 "사용 안 함"을 눌러도 새로고침하면 새로 생성한 표지가 보입니다. (개선 방향: 저장을 "이 표지 사용하기" 단계의 `updateBook`으로 옮기기)
* **API Key:** 브라우저에서 OpenAI를 직접 호출하므로 Key가 네트워크 요청에 노출됩니다. 실습용 구조이며, 실제 서비스라면 백엔드 서버를 거쳐 호출해야 합니다.
* **검색:** 제목만 검색하며 대소문자를 구분합니다.
