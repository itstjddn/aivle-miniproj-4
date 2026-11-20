import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import CoverGenerator from './components/CoverGenerator';
import './App.css';
import { useState } from 'react';

// TODO: 화면 전환(목록 / 상세 / 등록 / 수정) 방식을 정해서 구현하세요.
export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [listKey, setListKey] = useState(0);

  function handleBookDeleted() {
    setSelectedId(null);
    setListKey((previousKey) => previousKey + 1);
  }
  return (
    <div className="app">
      <h1>AI 도서 관리</h1>
      <BookList key={listKey} onSelectBook={setSelectedId} />

      {selectedId !== null && (<BookDetail
      key={selectedId}
      id={selectedId}
      onDeleted={handleBookDeleted}
      />)}
      <BookForm />
      <CoverGenerator />
    </div>
  );
}
