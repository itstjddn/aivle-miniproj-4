// 도서 목록
// 요구사항: 최소 제목 + 등록일 표시, 카드 또는 리스트 클릭 시 상세 페이지로 이동

// props: onSelect(id) - 카드 클릭 시 호출, onCreate() - 등록 버튼 클릭 시 호출

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import BookCover from './BookCover';

const MOCK_BOOKS = [
  { id: 1, title: '어린 왕자', coverImageUrl: '', createdAt: '2026-11-20' },
  { id: 2, title: '별을 세는 밤', coverImageUrl: '', createdAt: '2026-11-20' },
  { id: 3, title: '바다로 간 고래', coverImageUrl: '', createdAt: '2026-11-20' },
];

export default function BookList({ onSelect }) {
  const books = MOCK_BOOKS;

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        도서 목록
      </Typography>

      {/* 반응형 그리드: 모바일 1열 / 태블릿 2열 / 노트북 3열 / 큰 화면 4열 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr', 
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {books.map((book) => (
          <Card key={book.id}>
            <CardActionArea onClick={() => onSelect?.(book.id)}>
              <BookCover src={book.coverImageUrl} title={book.title} />
              <CardContent>
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  등록일 {book.createdAt}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
