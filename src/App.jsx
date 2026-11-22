import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import CoverGenerator from './components/CoverGenerator';
import { getBooks, createBook, updateBook, deleteBook } from './api/books';
import theme from './theme';
import './App.css';


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* 브라우저 기본 여백 제거 + 배경색 적용 */}
      <CssBaseline />
      {/* BrowserRouter: 주소창 URL과 화면을 연결 (뒤로가기 / 새로고침 지원) */}
      <BrowserRouter>      {/* react-router 쓰려면 BrowserRouter로 감싸야함 */}
        <BookApp />
      </BrowserRouter>
    </ThemeProvider>
  );
}

// ──────────────── CRUD 기능 ──────────────────────
function BookApp() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);   // 처음 목록을 불러오는 중인지

  // 도서 목록 불러오기
  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error(err);
      alert('도서 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ─────────────────────────────────────────────
  // 등록/수정/삭제 후에는 fetchBooks() 다시 하지 않고 (서버 재요청 안하기 위해)
  // 서버가 돌려준 결과로 books state를 직접 업데이트
  // 등록: [...prev, 새 책]   수정: prev.map(...)   삭제: prev.filter(...)
  // async이므로 안전성 위해 함수형 업데이트.
  // 함수형 업데이트: setBooks(값) 대신 setBooks(함수)로 하면 react로부터 '지금 최신 state'를 받아서 업데이트함.
  // ─────────────────────────────────────────────

  // 신규 등록 처리 -> 목록으로
  const handleCreateBook = async (newBookData) => {
    try {
      const createdBook = await createBook(newBookData);
      setBooks((prev) => [...prev, createdBook]); 
      navigate('/books', { replace: true }); // replace: 뒤로가기 했을 때 폼으로 안 돌아가게. 히스토리 스택에 폼 있던 거 지우고 /books만 넣음.
    } catch (err) {
      console.error(err);
      alert('도서 등록에 실패했습니다.');
    }
  };

  // 수정 처리 -> 상세로
  const handleUpdateBook = async (id, updatedFields) => {
    try {
      const updatedBook = await updateBook(id, updatedFields);
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updatedBook : b)) 
      );
      navigate(`/books/${id}`, { replace: true });
    } catch (err) {
      console.error(err);
      alert('도서 수정에 실패했습니다.');
    }
  };

  // 삭제 처리 -> 목록으로
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id)); 
      navigate('/books', { replace: true });
    } catch (err) {
      console.error(err);
      alert('도서 삭제에 실패했습니다.');
    }
  };

  // AI 표지 저장 후 -> 화면의 해당 책 표지만 바꾸기
  const handleCoverSaved = (id, imageSrc) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, coverImageUrl: imageSrc } : b))
    );
  };

  // 주소의 id(문자열)로 books에서 책 찾기
  const findBook = (id) => books.find((b) => String(b.id) === String(id));


  // 화면 주소(URL)
  //   /                 홈
  //   /books            도서 목록
  //   /books/new        새 도서 등록
  //   /books/:id        도서 상세   (예: /books/3)
  //   /books/:id/edit   도서 수정   (예: /books/3/edit)

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>     {/* Routes: 하위 Route 중에 해당되는 것 하나만 골라서 화면에 보여줌 */}
          <Route path="/" element={<HomePage />} />       {/* Route: path(주소)에 따라 element(화면) 보여줌 */}
          <Route
            path="/books"
            element={<ListPage books={books} loading={loading} />}
          />
          <Route
            path="/books/new"
            element={<CreatePage onSubmit={handleCreateBook} />}
          />
          <Route
            path="/books/:id"
            element={
              <DetailPage
                findBook={findBook}
                loading={loading}
                onDelete={handleDeleteBook}
                onCoverSaved={handleCoverSaved}
              />
            }
          />
          <Route
            path="/books/:id/edit"
            element={
              <EditPage findBook={findBook} loading={loading} onSubmit={handleUpdateBook} />
            }
          />
          {/* 없는 주소로 들어오면 홈으로 */}
          <Route path="*" element={<Navigate to="/" replace />} />        {/* navigate(): 버튼 클릭 등 있어야, <Navigate/>: 그려지자마자 */}
        </Routes>
      </Container>
    </>
  );
}


// ───────────────── 상단 헤더 ─────────────────
function Header() {
  const navigate = useNavigate();      // 화면 이동 함수
  const { pathname } = useLocation();  // 지금 주소 (예: '/books/3')   // useLocation() 객체에서 pathname만 구조 분해 할당으로 꺼냄

  return (
    <AppBar position="sticky">
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          AI 도서관리
        </Typography>
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ fontWeight: pathname === '/' ? 700 : 400 }}   // 지금 화면이 홈이면 홈 버튼이 굵게 표시되게끔
        >
          홈
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate('/books')}
          sx={{ fontWeight: pathname === '/books' ? 700 : 400 }} 
        >
          도서 목록
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/books/new')}
          sx={{ ml: 1 }}
        >
          새 도서 등록
        </Button>
      </Toolbar>
    </AppBar>
  );
}


// ───────────────── 로딩 / 없는 책 ─────────────────
function Loading() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CircularProgress />
    </Box>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ mb: 2 }}>해당 도서를 찾을 수 없습니다.</Typography>
      <Button variant="outlined" onClick={() => navigate('/books')}>
        도서 목록으로
      </Button>
    </Box>
  );
}


// ───────────────── 페이지들 ─────────────────
// 각 페이지는 주소에서 id를 꺼내고, 컴포넌트에 props로 넘겨주는 역할만 함

function HomePage() {
  const navigate = useNavigate();
  return (
    <Home
      onGoList={() => navigate('/books')}          // 도서 목록 보기
      onGoCreate={() => navigate('/books/new')}    // 새 도서 등록
    />
  );
}

function ListPage({ books, loading }) {
  const navigate = useNavigate();
  if (loading) return <Loading />;
  return (
    <BookList
      books={books}
      onSelectBook={(book) => navigate(`/books/${book.id}`)}
      onCreateClick={() => navigate('/books/new')}
    />
  );
}

function CreatePage({ onSubmit }) {
  const navigate = useNavigate();
  return (
    <BookForm
      initialBook={null}
      onSubmit={onSubmit}
      onCancel={() => navigate('/books')}
    />
  );
}

function DetailPage({ findBook, loading, onDelete, onCoverSaved }) {
  const navigate = useNavigate();
  const { id } = useParams(); // 주소 '/books/3' 에서 '3'을 꺼냄
  const book = findBook(id);

  if (loading) return <Loading />;
  if (!book) return <NotFound />;

  return (
    <>
      <BookDetail
        book={book}
        onBack={() => navigate('/books')}
        onEdit={() => navigate(`/books/${book.id}/edit`)}
        onDelete={() => onDelete(book.id)}
      />
      <CoverGenerator
        book={book}
        onSaved={(imageSrc) => onCoverSaved(book.id, imageSrc)}
      />
    </>
  );
}

function EditPage({ findBook, loading, onSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = findBook(id);

  if (loading) return <Loading />;
  if (!book) return <NotFound />;

  return (
    <BookForm
      initialBook={book}
      onSubmit={(fields) => onSubmit(book.id, fields)}
      onCancel={() => navigate(`/books/${book.id}`)}
    />
  );
}
