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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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

// ──────────────── CRUD 기능 & 라우팅 ──────────────────────
function BookApp() {

  const navigate = useNavigate();

  // 현재 페이지의 URL 경로 확인
  const { pathname } = useLocation();
  // 현재 페이지가 홈 화면인지 확인
  const isHome = pathname === '/';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <Header />

    {/* 홈 화면에서만 최대 너비 제한 및 여백 제거 */}
    <Container
      maxWidth={isHome ? false : 'lg'}
      disableGutters={isHome}
      sx={{
        py: isHome ? 0 : 4,
      }}
    >
          <Routes>    {/* Routes: 하위 Route 중에 해당되는 것 하나만 골라서 화면에 보여줌 */}
          <Route path="/" element={<HomePage books={books} />} />       {/* 홈 화면에서도 등록된 도서 목록을 사용할 수 있도록 books 전달 */}
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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        // 딥네이비 반투명 배경
        background: 'rgba(9, 11, 36, 0.95)',
        backdropFilter: 'blur(15px)',

        // 보라색 테두리와 은은한 빛 효과
        borderBottom: '1px solid rgba(167, 139, 250, 0.35)',
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>

        {/* 서비스 로고 아이콘 */}
        <MenuBookIcon
          sx={{
            mr: 1.5,
            fontSize: 30,
            color: '#c4b5fd',
            filter: 'drop-shadow(0 0 8px #a78bfa)',
          }}
        />

        {/* 서비스 이름 */}
        <Typography
          variant="h6"
          onClick={() => navigate('/')}
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 2,
            color: '#e9ddff',
            textShadow: '0 0 12px #8b5cf6',
          }}
        >
          BOOK UNIVERSE
        </Typography>

        {/* 홈 이동 버튼 */}
        <Button
          onClick={() => navigate('/')}
          sx={{
            mx: 1,
            color: pathname === '/' ? '#ffffff' : '#b8b0d0',
            fontWeight: pathname === '/' ? 700 : 400,
            '&:hover': {
              color: '#ffffff',
              backgroundColor: 'rgba(167, 139, 250, 0.1)',
            },
          }}
        >
          홈
        </Button>

        {/* 도서 목록 이동 버튼 */}
        <Button
          onClick={() => navigate('/books')}
          sx={{
            mx: 1,
            color: pathname === '/books' ? '#ffffff' : '#b8b0d0',
            fontWeight: pathname === '/books' ? 700 : 400,
            '&:hover': {
              color: '#ffffff',
              backgroundColor: 'rgba(167, 139, 250, 0.1)',
            },
          }}
        >
          내 서재
        </Button>

        {/* 신규 도서 등록 버튼 */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/books/new')}
          sx={{
            ml: 2,
            px: 3,
            py: 1,
            borderRadius: 10,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #9333ea, #6366f1)',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
            transition: 'all 0.3s',

            // 마우스를 올렸을 때 네온 효과 강화
            '&:hover': {
              background: 'linear-gradient(135deg, #a855f7, #818cf8)',
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.8)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          새 책 만들기
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

// 홈 화면에서 사용할 도서 목록을 props로 전달받음
function HomePage({ books }) {
  const navigate = useNavigate();
  return (
    <Home
      books={books}  // Home 컴포넌트에 전체 도서 목록 전달
      onGoList={() => navigate('/books')}          // 도서 목록 보기
      onGoCreate={() => navigate('/books/new')}    // 새 도서 등록

      // 선택한 도서의 ID를 이용하여 상세 페이지로 이동
      onGoDetail={(id) => navigate(`/books/${id}`)}
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
