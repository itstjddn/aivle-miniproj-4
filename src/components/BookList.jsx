export default function BookList({ books, onSelectBook, onCreateClick }) {
  return (
    <section className="book-list-section">
      <div className="book-list-header">
        <h2>도서 목록</h2>
        <button type="button" onClick={onCreateClick}>
          도서 등록
        </button>
      </div>

      {books.length === 0 ? (
        <p>등록된 도서가 없습니다.</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li
              key={book.id}
              className="book-item"
              onClick={() => onSelectBook(book)}
              style={{ cursor: 'pointer' }}
            >
              <strong>{book.title}</strong>
              <span>{book.createdAt}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}