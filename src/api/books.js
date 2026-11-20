// json-server(도서 데이터) 통신 함수 모음
// 서버 실행: npm run server  →  http://localhost:3000/books
export const BASE_URL = 'http://localhost:3000/books';

// TODO: 아래 함수들을 fetch로 구현하세요. (API 표는 README 참고)

// 목록 조회 - GET /books
export async function getBooks() {}

// 상세 조회 - GET /books/:id
export async function getBook(id) {}

// 신규 등록 - POST /books
export async function createBook(book) {}

// 수정 - PATCH /books/:id
export async function updateBook(id, fields) {}

// 삭제 - DELETE /books/:id
export async function deleteBook(id) {}
