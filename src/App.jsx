import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import CoverGenerator from './components/CoverGenerator';
import theme from './theme';
import './App.css';

// 화면 전환: react-router 없이 state 하나로 관리
// screen 예시:
//   { name: 'home' }
//   { name: 'list' }
//   { name: 'detail', id: 3 }
//   { name: 'create' }
//   { name: 'edit', id: 3 }
export default function App() {
  const [screen, setScreen] = useState({ name: 'home' });
  // 표지 저장 후 상세 화면을 다시 불러오기 위한 값 (바뀌면 BookDetail이 새로 그려짐)
  const [refreshKey, setRefreshKey] = useState(0);

  const goHome = () => setScreen({ name: 'home' });
  const goList = () => setScreen({ name: 'list' });
  const goDetail = (id) => setScreen({ name: 'detail', id });
  const goCreate = () => setScreen({ name: 'create' });
  const goEdit = (id) => setScreen({ name: 'edit', id });

  return (
    <ThemeProvider theme={theme}>
      {/* 브라우저 기본 여백 제거 + 배경색 적용 */}
      <CssBaseline />

      {/* 상단 헤더 */}
      <AppBar position="sticky">
        <Toolbar>
          <MenuBookIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: 'pointer' }}
            onClick={goHome}
          >
            AI 도서관리
          </Typography>
          <Button
            color="inherit"
            onClick={goHome}
            sx={{ fontWeight: screen.name === 'home' ? 700 : 400 }}
          >
            홈
          </Button>
          <Button
            color="inherit"
            onClick={goList}
            sx={{ fontWeight: screen.name === 'list' ? 700 : 400 }}
          >
            도서 목록
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={goCreate}
            sx={{ ml: 1 }}
          >
            새 도서 등록
          </Button>
        </Toolbar>
      </AppBar>

      {/* 본문: 가운데 정렬 + 최대 폭 제한 */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {screen.name === 'home' && (
          <Home onGoList={goList} onGoCreate={goCreate} />
        )}

        {screen.name === 'list' && (
          <BookList onSelect={goDetail} onCreate={goCreate} />
        )}

        {screen.name === 'detail' && (
          <>
            <BookDetail
              key={refreshKey}
              id={screen.id}
              onEdit={goEdit}
              onBack={goList}
              onDeleted={goList}
            />
            <CoverGenerator
              bookId={screen.id}
              onSaved={() => setRefreshKey((k) => k + 1)}
            />
          </>
        )}

        {screen.name === 'create' && (
          <BookForm onDone={goDetail} onCancel={goList} />
        )}

        {screen.name === 'edit' && (
          <BookForm
            id={screen.id}
            onDone={goDetail}
            onCancel={() => goDetail(screen.id)}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}
