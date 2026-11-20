# 📚 AI 표지 생성 도서관리 시스템

KT AIVLE School 미니프로젝트 4차 — AI 표지 생성을 지원하는 도서관리 시스템 (Frontend)

## 기술 스택
| 구분 | 사용 기술 |
|---|---|
| Frontend | React 19 · Vite · fetch |
| 데이터 | json-server (로컬 REST API, `db.json`) |
| AI | OpenAI API (GPT Image 모델) |
| 협업 | GitHub |

## 실행 방법
```bash
git clone https://github.com/itstjddn/aivle-miniproj-4.git
cd aivle-miniproj-4
npm install
```
`.env.example`을 복사해서 `.env`를 만들고 OpenAI 키를 넣습니다. (`.env`는 절대 커밋하지 않기!)

터미널 2개를 열어서 각각 실행합니다.
```bash
npm run server   # json-server → http://localhost:3000/books
npm run dev      # React      → http://localhost:5173
```

## 데이터 구조 (`db.json`)
```json
{
  "id": 1,
  "title": "도서 제목",
  "content": "도서 내용",
  "coverImageUrl": "",
  "createdAt": "2026-11-20",
  "updatedAt": "2026-11-20"
}
```

## API 엔드포인트
| 기능 | 메서드 | URL |
|---|---|---|
| 목록 조회 | GET | `/books` |
| 상세 조회 | GET | `/books/:id` |
| 신규 등록 | POST | `/books` |
| 수정 | PATCH | `/books/:id` |
| 삭제 | DELETE | `/books/:id` |
| AI 표지 저장 | PATCH | `/books/:id` (`coverImageUrl`만) |
| 표지 생성 | POST | `https://api.openai.com/v1/images/generations` |

fetch 함수는 `src/api/books.js`에 작성합니다.

## 폴더 구조
```
src/
├── api/
│   ├── books.js           # json-server CRUD 함수
│   └── openai.js          # OpenAI 표지 생성 함수
├── components/
│   ├── BookList.jsx       # 목록
│   ├── BookDetail.jsx     # 상세 + 삭제
│   ├── BookForm.jsx       # 등록/수정 + 유효성 검사
│   └── CoverGenerator.jsx # AI 표지 생성/미리보기/저장
└── App.jsx                # 화면 전환
```

## 역할 분담 (R&R)
| 이름 | 역할 | 담당 파일 |
|---|---|---|
| 김채민 | 조장, 타임키퍼, PM | `README.md` |
| 전소연 | PPT 제작, 스타일링, UI 레이아웃 | `App.jsx`, `App.css` |
| 장표권 | 서기, 검토 담당, CRUD | `api/books.js`, `BookList.jsx`, `BookDetail.jsx`, `BookForm.jsx` |
| 김성우 | 발표, OpenAI 연동, 데모 시연 | `api/openai.js`, `CoverGenerator.jsx` |

## Git 협업 규칙
1. **main에 직접 push 금지** → 브랜치에서 작업 후 PR로 합치기
2. 작업 시작 전 항상 최신화
   ```bash
   git switch main
   git pull
   git switch -c feature/기능이름
   ```
3. 작업 후
   ```bash
   git add .
   git commit -m "feat: 무엇을 했는지"
   git push -u origin feature/기능이름
   ```
   → GitHub에서 **Compare & pull request** → 팀원 확인 후 **Merge**
4. 커밋 메시지: `feat:` 기능 추가 / `fix:` 버그 수정 / `style:` 디자인 / `docs:` 문서
5. `db.json`은 테스트하면서 자동으로 바뀝니다. 구조를 바꾼 게 아니라면 커밋 전에 되돌리기
   ```bash
   git restore db.json
   ```
