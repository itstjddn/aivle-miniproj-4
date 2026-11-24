import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';

// 도서 카드 UI를 구성하기 위한 MUI 컴포넌트
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
// 기존 도서 표지 컴포넌트 재사용
import BookCover from './BookCover';
// 자동 슬라이드 및 타이머 제어를 위한 React Hook
import { useEffect, useRef } from 'react';
// 좌우 화살표 버튼
import IconButton from '@mui/material/IconButton';
// 우주 서재 배경 이미지 불러오기
import universeBg from '../assets/universe-bg.png';
// 홈 화면 전용 CSS 불러오기
import './Home.css';
// 도서 슬라이드 좌우 이동에 사용할 MUI 화살표 아이콘
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


// 첫 화면 (환영 페이지)
// props: onGoList() - 도서 목록으로 이동, onGoCreate() - 새 도서 등록으로 이동
export default function Home({
  books,       // 전체 도서 목록
  onGoList,    // 도서 목록 페이지 이동
  onGoCreate,  // 신규 도서 등록 페이지 이동
  onGoDetail   // 선택한 도서의 상세 페이지 이동
 }) {
// 도서 카드 스크롤 영역 참조
const carouselRef = useRef(null);

// 자동 슬라이드 반복 타이머 참조
const timerRef = useRef(null);

// 자동 슬라이드 재개 타이머 참조
const resumeTimerRef = useRef(null);

// 도서 카드 좌우 이동 함수
const moveCarousel = (direction) => {
  const carousel = carouselRef.current;

  // 스크롤 영역이 존재하지 않으면 종료
  if (!carousel) return;

  // 스크롤 가능한 최대 거리 계산
  const maxScroll =
    carousel.scrollWidth - carousel.clientWidth;

  // 카드 너비 200px + 카드 간격 24px
  const scrollAmount = 224;

  // 이동 가능한 공간이 없으면 종료
  if (maxScroll <= 0) return;

  // 오른쪽으로 이동
  if (direction === 'right') {

    // 마지막 위치에 도달하면 처음으로 이동
    if (carousel.scrollLeft >= maxScroll - 2) {
      carousel.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }

  // 왼쪽으로 이동
  } else {

    // 첫 번째 위치에서는 마지막으로 이동
    if (carousel.scrollLeft <= 2) {
      carousel.scrollTo({
        left: maxScroll,
        behavior: 'smooth',
      });
    } else {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  }
};

// 화살표 클릭 시 수동 슬라이드 실행
const handleManualMove = (direction) => {

  // 기존 자동 슬라이드 중지
  clearInterval(timerRef.current);

  // 이전 재개 타이머 초기화
  clearTimeout(resumeTimerRef.current);

  // 사용자가 선택한 방향으로 즉시 이동
  moveCarousel(direction);

  // 마지막 화살표 클릭 후 10초 뒤 자동 슬라이드 재개
  resumeTimerRef.current = setTimeout(() => {

    moveCarousel('right');

    // 이후 3초마다 자동 이동
    timerRef.current = setInterval(() => {
      moveCarousel('right');
    }, 3000);

  }, 10000);
};

// 홈 화면 진입 시 자동 슬라이드 실행
useEffect(() => {

  // 도서가 1개 이하이면 자동 이동하지 않음
  if (books.length <= 1) return;

  // 3초마다 오른쪽으로 자동 이동
  timerRef.current = setInterval(() => {
    moveCarousel('right');
  }, 3000);

  // 페이지 이동 또는 도서 개수 변경 시 타이머 정리
  return () => {
    clearInterval(timerRef.current);
    clearTimeout(resumeTimerRef.current);
  };

}, [books.length]);

  return (
  // 우주 서재 배경 영역
  <Box
    className="universe-home"
    sx={{
      backgroundImage: `url(${universeBg})`,
    }}
  >
    {/* 배경 위에 표시되는 실제 콘텐츠 영역 */}
    <Box className="universe-content">
      <MenuBookIcon color="primary" sx={{ fontSize: 64, mb: 2 }} />

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        도서 관리 시스템에 오신 것을 환영합니다!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        도서를 등록하고 관리해 보세요. AI가 책 내용에 어울리는 표지도 만들어 드려요.
      </Typography>

      {/* 메인 화면 버튼 영역 */}
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: 'flex-start', // 버튼 왼쪽 정렬
    mt: 3,
  }}
>
  {/* 새 책 만들기 버튼 */}
  <Button
    variant="contained"
    size="large"
    startIcon={<AddIcon />}
    onClick={onGoCreate}
    sx={{
      color: '#ffffff',
      background: 'linear-gradient(135deg, #9333ea, #6366f1)',
      borderRadius: 10,
      px: 4,
      py: 1.5,
      fontWeight: 600,

      // 보라색 네온 효과
      boxShadow: '0 0 25px rgba(147, 51, 234, 0.5)',
      transition: 'all 0.3s ease',

      // 마우스를 올리면 밝아지면서 위로 이동
      '&:hover': {
        background: 'linear-gradient(135deg, #a855f7, #818cf8)',
        boxShadow: '0 0 35px rgba(168, 85, 247, 0.8)',
        transform: 'translateY(-3px)',
      },
    }}
  >
    새 책 만들기
  </Button>

  {/* 내 서재 보기 버튼 */}
  <Button
    variant="outlined"
    size="large"
    startIcon={<MenuBookIcon />}
    onClick={onGoList}
    sx={{
      color: '#ffffff',
      borderColor: '#c4b5fd',
      borderRadius: 10,
      px: 4,
      py: 1.5,
      fontWeight: 600,

      // 반투명 유리 효과
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',

      // 마우스를 올리면 테두리와 배경이 밝아짐
      '&:hover': {
        borderColor: '#e9d5ff',
        backgroundColor: 'rgba(139, 92, 246, 0.25)',
        boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
        transform: 'translateY(-3px)',
      },
    }}
  >
    내 서재 보기
  </Button>
</Stack>

{/* 홈 화면 도서 컬렉션 영역 */}
<Box sx={{ mt: 8, textAlign: 'left' }}>

  {/* 컬렉션 제목 */}
  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
    나의 책 컬렉션
  </Typography>

  <Typography color="text.secondary" sx={{ mb: 3 }}>
    내가 만든 이야기들을 만나보세요.
  </Typography>

  {/* 등록된 도서가 없는 경우 안내 문구 표시 */}
  {books.length === 0 ? (
    <Typography color="text.secondary">
      아직 등록된 도서가 없습니다.
    </Typography>
  ) : (

    /* 화살표와 도서 카드 영역을 가로 방향으로 배치 */
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >

      {/* 이전 도서로 이동하는 왼쪽 화살표 버튼 */}
      <IconButton
        aria-label="이전 도서"

        // 클릭 시 왼쪽으로 이동하고 자동 슬라이드 일시 중지
        onClick={() => handleManualMove('left')}

        // 등록된 도서가 1권 이하일 경우 버튼 비활성화
        disabled={books.length <= 1}

        // Home.css에 정의한 화살표 공통 디자인 적용
        className="carousel-arrow"
      >
        {/* 왼쪽 화살표 아이콘 및 크기 설정 */}
        <ChevronLeftIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* 도서 카드 슬라이드 영역 */}
      <Box
        ref={carouselRef}
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          py: 2,

          // 전체 화면에서도 최대 5권이 표시되도록 제한
          maxWidth: '1096px',
          width: '100%',
          minWidth: 0,

          // 부드러운 스크롤 효과
          scrollBehavior: 'smooth',

          // 스크롤바 숨기기
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >

        {/* 전체 도서 데이터를 반복하여 카드 생성 */}
        {books.map((book) => (
          <Card
            key={book.id}
            sx={{
              width: 200,
              flexShrink: 0,
              borderRadius: 3,
              transition: 'transform 0.3s',

              // 마우스를 올리면 카드 확대
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >

            {/* 카드 클릭 시 도서 상세 페이지 이동 */}
            <CardActionArea
              onClick={() => onGoDetail(book.id)}
            >

              {/* 기존 도서 표지 컴포넌트 재사용 */}
              <BookCover
                src={book.coverImageUrl}
                title={book.title}
              />

              {/* 도서 제목 및 등록일 표시 */}
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                >
                  {book.title}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {book.createdAt}
                </Typography>
              </CardContent>

            </CardActionArea>
          </Card>
        ))}
      </Box>

      
      {/* 다음 도서로 이동하는 오른쪽 화살표 버튼 */}
      <IconButton
        aria-label="다음 도서"

        // 클릭 시 오른쪽으로 이동하고 자동 슬라이드 일시 중지
        onClick={() => handleManualMove('right')}

        // 등록된 도서가 1권 이하일 경우 버튼 비활성화
        disabled={books.length <= 1}

        // 왼쪽 화살표와 동일한 CSS 디자인 적용
        className="carousel-arrow"
      >
        {/* 오른쪽 화살표 아이콘 및 크기 설정 */}
        <ChevronRightIcon sx={{ fontSize: 32 }} />
      </IconButton>


          </Box>
        )}
      </Box>
    </Box>
  </Box>
  );
}