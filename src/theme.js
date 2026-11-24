import { createTheme } from '@mui/material/styles';

// BOOK UNIVERSE 전체 페이지 디자인 테마
const theme = createTheme({

  // 1. 전체 색상 설정
  palette: {

    // MUI 다크 모드 적용
    mode: 'dark',

    // 기본 버튼 및 주요 강조 색상
    primary: { main: '#8b5cf6' },

    // 보조 버튼 및 강조 색상
    secondary: { main: '#c4b5fd' },

    // 삭제 버튼 및 오류 안내 색상
    error: { main: '#f87171' },

    // 전체 페이지 및 카드 배경 색상
    background: {
      default: '#090b24', // 전체 페이지 배경
      paper: '#191b3d',   // 카드, 등록 폼, 상세 정보 배경
    },

    // 기본 글자 및 설명 글자 색상
    text: {
      primary: '#f5f3ff',
      secondary: '#b8b0d0',
    },

    // 구분선 및 기본 테두리 색상
    divider: 'rgba(167, 139, 250, 0.25)',
  },

  // 2. 전체 글꼴 설정
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", "Roboto", sans-serif',
  },

  // 3. 컴포넌트 기본 모서리 둥글기
  shape: {
    borderRadius: 12,
  },

  // 4. MUI 컴포넌트별 공통 디자인 설정
  components: {

    // 카드, 도서 등록 폼, 상세 정보 영역
    MuiPaper: {
      styleOverrides: {
        root: {

          // 반투명 딥네이비 배경
          backgroundColor: 'rgba(25, 27, 61, 0.85)',

          // 다크 모드의 기본 배경 이미지 제거
          backgroundImage: 'none',

          // 반투명 유리 효과
          backdropFilter: 'blur(15px)',

          // 은은한 보라색 테두리
          border: '1px solid rgba(167, 139, 250, 0.25)',

          // 보라색 발광 효과
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.12)',
        },
      },
    },

    // 전체 버튼 디자인
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 12,
          transition: 'all 0.3s ease',

          // 마우스를 올리면 위로 살짝 이동
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },

        // 기본 색상의 채워진 버튼에 그라데이션 적용
        containedPrimary: {
          color: '#ffffff',
          background: 'linear-gradient(135deg, #9333ea, #6366f1)',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',

          '&:hover': {
            background: 'linear-gradient(135deg, #a855f7, #818cf8)',
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.7)',
          },
        },
      },
    },

    // 제목, 줄거리, 검색창 등 입력창 디자인
    MuiOutlinedInput: {
      styleOverrides: {
        root: {

          // 기존 흰색 입력창을 어두운 배경으로 변경
          backgroundColor: 'rgba(9, 11, 36, 0.65)',
          borderRadius: 10,
          color: '#f5f3ff',

          // 기본 입력창 테두리
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(167, 139, 250, 0.35)',
          },

          // 마우스를 올렸을 때 테두리 색상
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c4b5fd',
          },

          // 입력창을 클릭했을 때 보라색 테두리 적용
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a78bfa',
          },

          // 입력창 선택 시 네온 효과
          '&.Mui-focused': {
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)',
          },
        },
      },
    },

    // 입력창의 제목 및 안내 문구 색상
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#b8b0d0',

          '&.Mui-focused': {
            color: '#c4b5fd',
          },
        },
      },
    },
  },
});

export default theme;