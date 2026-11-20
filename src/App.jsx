import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import CoverGenerator from './components/CoverGenerator';
import './App.css';

// TODO: 화면 전환(목록 / 상세 / 등록 / 수정) 방식을 정해서 구현하세요.
export default function App() {
  return (
    <div className="app">
      <h1>AI 도서관리</h1>
      <BookList />
      <BookDetail />
      <BookForm />
      <CoverGenerator />
    </div>
  );
}
