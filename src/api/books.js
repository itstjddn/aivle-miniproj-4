// json-server(도서 데이터) 통신 함수 모음
// 서버 실행: npm run server  →  http://localhost:3000/books
export const BASE_URL = 'http://localhost:3000/books';

// TODO: 아래 함수들을 fetch로 구현하세요. (API 표는 README 참고)

// 목록 조회 - GET /books
export async function getBooks() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error('도서 목록을 불러오지 못했습니다.');
    }
    return response.json();
}




// 상세 조회 - GET /books/:id
export async function getBook(id) {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error('도서 상세 정보를 불러오지 못했습니다.');
    }
    return response.json();
}




// 신규 등록 - POST /books
export async function createBook(book) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    if (!response.ok) {
    throw new Error('도서를 등록하지 못했습니다.');
  }

  return response.json();
}




// 수정 - PATCH /books/:id 
export async function updateBook(id, fields) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error('도서를 수정하지 못했습니다.');
  }

  return response.json();
}



// 삭제 - DELETE /books/:id
export async function deleteBook(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('도서를 삭제하지 못했습니다.');
  }
}
