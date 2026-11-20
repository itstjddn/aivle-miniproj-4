export default function BookDetail({ book, onBack, onEdit, onDelete }) {
  const handleDeleteClick = () => {
    if (window.confirm(`"${book.title}" 도서를 삭제할까요?`)) {
      onDelete(book.id);
    }
  };

  return (
    <section className="book-detail">
      <button type="button" onClick={onBack}>
        목록으로
      </button>

      <h2>{book.title}</h2>
      <p>{book.content}</p>
      <p>등록일: {book.createdAt}</p>
      {book.updatedAt && <p>수정일: {book.updatedAt}</p>}
      {book.coverImageUrl && (
        <img
          src={book.coverImageUrl}
          alt={`${book.title} 표지`}
          style={{ maxWidth: '240px', display: 'block', marginTop: '12px' }}
        />
      )}

      <div className="book-detail-actions" style={{ marginTop: '16px' }}>
        <button type="button" onClick={onEdit}>
          수정
        </button>
        <button type="button" onClick={handleDeleteClick}>
          삭제
        </button>
      </div>
    </section>
  );
}