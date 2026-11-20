import { useEffect, useState } from 'react';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import CoverGenerator from './components/CoverGenerator';
import { getBooks, createBook, updateBook, deleteBook } from './api/books';
import './App.css';

export default function App() {
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'create' | 'edit'
  const [selectedBook, setSelectedBook] = useState(null);

  // 초기 도서 목록 불러오기
  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error(err);
      alert('도서 목록을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 상세 보기 이동
  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setView('detail');
  };

  // 신규 등록 처리
  const handleCreateBook = async (newBookData) => {
    try {
      await createBook(newBookData);
      await fetchBooks();
      setView('list');
    } catch (err) {
      console.error(err);
      alert('도서 등록에 실패했습니다.');
    }
  };

  // 수정 처리
  const handleUpdateBook = async (updatedFields) => {
    if (!selectedBook) return;
    try {
      const updated = await updateBook(selectedBook.id, updatedFields);
      await fetchBooks();
      setSelectedBook(updated);
      setView('detail');
    } catch (err) {
      console.error(err);
      alert('도서 수정에 실패했습니다.');
    }
  };

  // 삭제 처리
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      await fetchBooks();
      setSelectedBook(null);
      setView('list');
    } catch (err) {
      console.error(err);
      alert('도서 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="app">
      <h1>AI 도서관리</h1>

      {view === 'list' && (
        <BookList
          books={books}
          onSelectBook={handleSelectBook}
          onCreateClick={() => {
            setSelectedBook(null);
            setView('create');
          }}
        />
      )}

      {view === 'detail' && selectedBook && (
        <BookDetail
          book={selectedBook}
          onBack={() => setView('list')}
          onEdit={() => setView('edit')}
          onDelete={() => handleDeleteBook(selectedBook.id)}
        />
      )}

      {(view === 'create' || view === 'edit') && (
        <BookForm
          initialBook={view === 'edit' ? selectedBook : null}
          onSubmit={view === 'edit' ? handleUpdateBook : handleCreateBook}
          onCancel={() => setView(view === 'edit' ? 'detail' : 'list')}
        />
      )}

      <CoverGenerator />
    </div>
  );
}