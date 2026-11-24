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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import CoverGenerator from './components/CoverGenerator';
import { getBooks, createBook, updateBook, deleteBook } from './api/books';
import theme, { GOLD, GOLD_LIGHT } from './theme';
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

// ──────────────── 🎄 배경에서 반짝이는 금색 장식 ──────────────────────
// 위치·크기·속도를 미리 정해둔 배열 (렌더링할 때마다 바뀌지 않게 컴포넌트 밖에 둠)
const SPARKLES = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 41 + 7) % 100,             // 가로 위치 (%)
  top: (i * 67 + 13) % 100,             // 세로 위치 (%)
  size: 3 + ((i * 7) % 6),              // 크기 (px)
  duration: 1.6 + ((i * 3) % 5) * 0.5,  // 반짝이는 주기 (초)
  delay: -((i * 0.37) % 3),             // 반짝이는 타이밍을 흩어놓기
  star: i % 4 === 0,                    // 4개 중 1개는 별(✦), 나머지는 금가루 점
}));

function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={s.star ? 'sparkle' : 'sparkle dot'}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.star ? undefined : s.size,
            height: s.star ? undefined : s.size,
            fontSize: s.star ? s.size * 2.2 : undefined,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          {s.star ? '✦' : ''}
        </span>
      ))}
    </div>
  );
}

// ──────────────── CRUD 기능 & 라우팅 ──────────────────────
function BookApp() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);   // 처음 목록을 불러오는 중인지

  // 스낵바 (성공/실패 ui)
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };
  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };


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
      showToast(`${createdBook.title} 도서가 등록되었습니다.`);
    } catch (err) {
      console.error(err);
      showToast('도서 등록에 실패했습니다', 'error');
    }
  };

  // 수정 처리 -> 상세로
  const handleUpdateBook = async (id, updatedFields) => {
    try {
      const updatedBook = await updateBook(id, updatedFields);
      setBooks((prev) =>
        prev.map((p) => (p.id === id ? updatedBook : p)) 
      );
      navigate(`/books/${id}`, { replace: true });
      showToast('도서 정보가 수정되었습니다.');
    } catch (err) {
      console.error(err);
      showToast('도서 정보 수정에 실패했습니다.', 'error');
    }
  };

  // 삭제 처리 -> 목록으로
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((p) => p.id !== id)); 
      navigate('/books', { replace: true });
      showToast('도서가 삭제되었습니다.');
    } catch (err) {
      console.error(err);
      showToast('도서 삭제에 실패했습니다', 'error');
    }
  };

  // AI 표지 저장 후 -> 화면의 해당 책 표지만 바꾸기
  const handleCoverSaved = (id, imageSrc) => {
    setBooks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, coverImageUrl: imageSrc } : p))
    );
  };

  // 주소의 id(문자열)로 books에서 책 찾기
  const findBook = (id) => books.find((book) => String(book.id) === String(id));


  // 화면 주소(URL)
  //   /                 홈
  //   /books            도서 목록
  //   /books/new        새 도서 등록
  //   /books/:id        도서 상세   (예: /books/3)
  //   /books/:id/edit   도서 수정   (예: /books/3/edit)

  return (
    <>
      <Sparkles />
      <Header />
      {/* position + zIndex: 반짝이 장식보다 내용이 위에 오게 */}
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
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

      {/* 성공/실패 알림 : 화면 아래 가운데에 3초 동안 표시 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
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
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer', whiteSpace: 'nowrap', fontSize: { xs: 18, sm: 22 }, color: GOLD_LIGHT }}
          onClick={() => navigate('/')}
        >
          AI 도서관리
        </Typography>
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ fontWeight: pathname === '/' ? 700 : 400, color: pathname === '/' ? GOLD_LIGHT : '#F3E9E4', whiteSpace: 'nowrap', minWidth: 0, px: { xs: 1, sm: 2 } }}   // 지금 화면이 홈이면 홈 버튼이 굵게 표시되게끔
        >
          홈
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate('/books')}
          sx={{ fontWeight: pathname === '/books' ? 700 : 400, color: pathname === '/books' ? GOLD_LIGHT : '#F3E9E4', whiteSpace: 'nowrap', minWidth: 0, px: { xs: 1, sm: 2 } }}
        >
          도서 목록
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/books/new')}
          sx={{ ml: 1, whiteSpace: 'nowrap', px: { xs: 1.5, sm: 2.5 }, bgcolor: GOLD, color: '#2A0A0F', '&:hover': { bgcolor: GOLD_LIGHT } }}
        >
          {/* 좁은 화면(모바일)에서는 '등록'만 보이게 */}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>새 도서&nbsp;</Box>등록
        </Button>
      </Toolbar>
    </AppBar>
  );
}


// ───────────────── 로딩 / 없는 책 ─────────────────
function Loading() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CircularProgress sx={{ color: GOLD }} />
    </Box>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ mb: 2, color: '#F3E9E4' }}>해당 도서를 찾을 수 없습니다.</Typography>
      <Button variant="contained" onClick={() => navigate('/books')}>
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
