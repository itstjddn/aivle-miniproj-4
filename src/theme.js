import { createTheme } from '@mui/material/styles';

// 🎄 크리스마스 테마
//   와인 레드 배경 + 금색 포인트 + 아이보리 카드 + 깊은 숲 초록
// 색을 바꾸고 싶으면 아래 값만 고치면 됨
export const GOLD = '#C9A55C';        // 금색
export const GOLD_LIGHT = '#E8D3A2';  // 밝은 금색
export const WINE = '#6E1420';        // 와인 레드
export const FOREST = '#1F4A37';      // 숲 초록
export const IVORY = '#FFFCF5';       // 아이보리 카드

// 글꼴 (index.css 에서 불러옴) — 고전 소설책 느낌
//   제목·버튼: Song Myung (옛 소설책 느낌의 명조체, 한글 지원)
//   본문: Gowun Batang (읽기 편한 우아한 바탕체, 한글 지원)
//   장식 영어 문구(Merry Christmas): Great Vibes (우아한 영문 필기체) → SCRIPT_FONT 로 따로 사용
export const SCRIPT_FONT = '"Great Vibes", "Song Myung", cursive';
const HEADING_FONT = '"Song Myung", "Gowun Batang", serif';
const BODY_FONT = '"Gowun Batang", "Nanum Myeongjo", serif';

const theme = createTheme({
  palette: {
    primary: { main: FOREST, contrastText: '#FFFFFF' },      // 기본 버튼
    secondary: { main: '#8E1B2B', contrastText: '#FFFFFF' }, // 강조 버튼 (새 도서 등록, AI 표지 생성)
    success: { main: '#2E6B4F', contrastText: '#FFFFFF' },   // 수정 버튼
    error: { main: '#A3202E' },                              // 삭제 버튼
    warning: { main: GOLD },
    background: { default: '#4E0E17', paper: IVORY },
    text: { primary: '#2A1E1A', secondary: '#6B5D55' },
    divider: '#E9DCC1',
  },
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontFamily: HEADING_FONT },
    h2: { fontFamily: HEADING_FONT },
    h3: { fontFamily: HEADING_FONT },
    h4: { fontFamily: HEADING_FONT, letterSpacing: '0.02em' },
    h5: { fontFamily: HEADING_FONT, letterSpacing: '0.02em' },
    h6: { fontFamily: HEADING_FONT, letterSpacing: '0.02em' },
    subtitle1: { fontFamily: HEADING_FONT },
    button: { fontFamily: HEADING_FONT, textTransform: 'none', fontSize: '1rem', letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 6 },
  components: {
    // 상단 헤더: 짙은 와인색 + 얇은 금색 라인
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#3A0A11',
          backgroundImage: 'linear-gradient(180deg, #4A0D16 0%, #33080F 100%)',
          borderBottom: `1px solid ${GOLD}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
        },
      },
    },
    // 버튼: 단정한 직사각형 + 은은한 그림자
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4, paddingInline: 20, boxShadow: 'none' },
        contained: { '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.25)' } },
      },
    },
    // 카드: 아이보리 + 얇은 금색 테두리
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${GOLD_LIGHT}`,
          boxShadow: '0 18px 40px rgba(20, 0, 5, 0.45)',
        },
      },
    },
    // 도서 카드: 마우스 올리면 살짝 떠오르며 금색 테두리 + 금빛
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 22px 40px rgba(20, 0, 5, 0.55), 0 0 0 1px ${GOLD}`,
          },
        },
      },
    },
    // 입력칸: 흰 배경, 포커스 시 금색 테두리
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: GOLD },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },
  },
});

export default theme;
