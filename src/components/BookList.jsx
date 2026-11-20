// 도서 목록
// 요구사항: 최소 제목 + 등록일 표시, 카드 또는 리스트 클릭 시 상세 페이지로 이동

import {useEffect, useState} from 'react';
import {getBooks} from '../api/books';


export default function BookList({ onSelectBook }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect( ()=> {
    async function loadBooks() {
      try{
        const bookList = await getBooks();
        setBooks(bookList);
      } catch {
        setError('도서 목록을 불러오지 못했습니다.');
      }
    }
    loadBooks();
  }, []);
  
  let errorMessage = null;

    if (error) {
    errorMessage = <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h2>도서 목록</h2>
      {errorMessage}

      <ul>
        {books.map((book) => {
          return (
          <li key={book.id}>
            <button type="button" onClick={() => onSelectBook(book.id)}>
              {book.title}
            </button>
            {' · '}{book.createdAt}
          </li>
          );
        })}
      </ul>
    </section>
  );


}
