import { useEffect, useState } from 'react';

export default function BookForm({ initialBook, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title || '');
      setContent(initialBook.content || '');
      setCoverImageUrl(initialBook.coverImageUrl || '');
    } else {
      setTitle('');
      setContent('');
      setCoverImageUrl('');
    }
  }, [initialBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('도서 제목을 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      alert('도서 내용을 입력해 주세요.');
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      coverImageUrl: coverImageUrl.trim(),
    });
  };

  return (
    <section className="book-form-section">
      <h2>{initialBook ? '도서 수정' : '새 도서 등록'}</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <div>
          <label htmlFor="book-title">제목</label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="도서 제목을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="book-content">설명 / 줄거리</label>
          <textarea
            id="book-content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="도서 설명을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="book-cover">표지 이미지 URL</label>
          <input
            id="book-cover"
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="이미지 URL (선택)"
          />
        </div>

        <div className="book-form-actions">
          <button type="submit">{initialBook ? '수정 완료' : '등록하기'}</button>
          <button type="button" onClick={onCancel}>
            취소
          </button>
        </div>
      </form>
    </section>
  );
}