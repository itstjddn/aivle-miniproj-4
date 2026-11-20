// json-server(도서 데이터) 통신 함수 모음
// 서버 실행: npm run server -> http://localhost:3000/books
export const BASE_URL = 'http://localhost:3000/books';

// 목록 조회 - GET /books
export async function getBooks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('도서 목록을 불러오지 못했습니다.');
  return res.json();
}

// 상세 조회 - GET /books/:id
export async function getBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('도서 상세 정보를 불러오지 못했습니다.');
  return res.json();
}

// 신규 등록 - POST /books
export async function createBook(book) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
  const newBook = {
    ...book,
    createdAt: book.createdAt || today,
    updatedAt: book.updatedAt || today,
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });
  if (!res.ok) throw new Error('도서 등록에 실패했습니다.');
  return res.json();
}

// 수정 - PATCH /books/:id
export async function updateBook(id, fields) {
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...fields,
      updatedAt: today,
    }),
  });
  if (!res.ok) throw new Error('도서 수정에 실패했습니다.');
  return res.json();
}

// 삭제 - DELETE /books/:id
export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('도서 삭제에 실패했습니다.');
  return res.json();
}