// 도서 등록 / 수정 폼
// 요구사항: 제목·내용 입력 필드 / 유효성 검사(공백 금지) / 수정 시 기존 정보 자동 불러오기
import { useState } from 'react';
import {createBook} from '../api/books';

export default function BookForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (title.trim() === '' || content.trim() === '') {
      setMessage('제목과 본문을 모두 입력해 주세요.');
      return;
    }
    const today = new Date().toLocaleDateString('sv-SE');
    
    const book = {
      id: null,
      title: title.trim(),
      content: content.trim(),
      coverImageUrl: '',
      createdAt: today,
      updatedAt: today,
    };
        try {
      await createBook(book);
      setTitle('');
      setContent('');
      setMessage('도서를 등록했습니다.');
    } catch {
      setMessage('도서를 등록하지 못했습니다.');
    }

  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>도서 등록</h2>

      <div>
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(event) => 
              setTitle(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          본문
          <textarea
            value={content}
            onChange={(event) => 
              setContent(event.target.value)}
          />
        </label>
      </div>

      <button type="submit">등록</button>
      <p>{message}</p>
    </form>
  );
}
