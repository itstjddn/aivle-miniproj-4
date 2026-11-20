import { createTheme } from '@mui/material/styles';

// 앱 전체 디자인 톤 — 색을 바꾸고 싶으면 여기만 고치면 됨
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },   // 메인 파랑 (헤더, 기본 버튼)
    secondary: { main: '#9c27b0' }, // 강조 보라 (새 도서 등록, AI 표지 생성)
    error: { main: '#e53935' },     // 삭제 버튼
    background: { default: '#f5f7fa' },
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", "Roboto", sans-serif',
  },
  shape: { borderRadius: 10 },
});

export default theme;
