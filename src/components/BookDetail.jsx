// 도서 상세 조회 + 삭제
// 요구사항: 표지, 작성일, 수정일, 본문 내용 표시 / [수정] 버튼 / [삭제] 버튼 클릭 시 확인 알림 후 삭제
import { useEffect, useState } from 'react';
import { getBook, updateBook, deleteBook   } from '../api/books';

export default function BookDetail({id, onDeleted }) {
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editError, setEditError] = useState('');

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await getBook(id);
        setBook(bookData);
      } catch {
        setError('도서 상세 정보를 불러오지 못했습니다.');
      }
    }

    loadBook();
  }, [id]);

  
  function startEditing() {
  setEditTitle(book.title);
  setEditContent(book.content);
  setEditError('');
  setIsEditing(true);
  }

    async function handleSave(event) {
      event.preventDefault();

      if (editTitle.trim() === '' || editContent.trim() === '') {
        setEditError('제목과 본문을 모두 입력해 주세요.');
        return;
      }

      try {
        const updatedBook = await updateBook(id, {
          title: editTitle.trim(),
          content: editContent.trim(),
          updatedAt: new Date().toLocaleDateString('sv-SE'),
        });

        setBook(updatedBook);
        setIsEditing(false);
      } catch {
        setEditError('도서를 수정하지 못했습니다.');
      }
    }


  if (error) {
    return <p>{error}</p>;
  }

  if (book === null) {
    return <p>도서 정보를 불러오는 중입니다.</p>;
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSave}>
        <h2>도서 수정</h2>

        <div>
          <label>
            제목
            <input
              type="text"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            본문
            <textarea
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
            />
          </label>
        </div>

        <button type="submit">저장</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          취소
        </button>
        <p>{editError}</p>
      </form>
    );

  }
  async function handleDelete() {
  const confirmed = window.confirm(`"${book.title}"을 삭제할까요?`);

  if (!confirmed) {
    return;
  }

  try {
    await deleteBook(id);
    onDeleted();
  } catch {
    window.alert('도서를 삭제하지 못했습니다.');
  }
}


  return (
    <section>
      <h2>{book.title}</h2>
      <p>{book.content}</p>
      <p>등록일 {book.createdAt}</p>
      <p>수정일 {book.updatedAt}</p>
      <button type="button" onClick={startEditing}>
        수정
      </button>
      <button type="button" onClick={handleDelete}>
        삭제
      </button>
    </section>
  );
}