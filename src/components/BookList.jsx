import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import BookCover from './BookCover';
import { useState } from 'react'; // useState 사용
import TextField from '@mui/material/TextField'; // 검색창 ui

// 도서 목록
// 요구사항: 최소 제목 + 등록일 표시, 카드 클릭 시 상세 페이지로 이동
// props: books(도서 배열), onSelectBook(book), onCreateClick()
export default function BookList({ books, onSelectBook, onCreateClick }) {
  const [search, setSearch] = useState('') // state 생성

  const filteredBooks = books.filter( (book) =>  // 조건 : 제목안에 검색어가 있나?
      book.title.includes(search)
  )

  return (
    <Box>
      {/* 제목 + 등록 버튼 */}
      <Stack direction="row" sx={{ alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ flexGrow: 1, color: '#F3E9E4' }}>
          도서 목록
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={onCreateClick}>
          도서 등록
        </Button>
      </Stack>
      {/* 검색창: 입력하면 search state 변경 */}
      <TextField 
          placeholder = "제목으로 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb : 3 }}
        />
      {books.length === 0 ? (
        // 책이 하나도 없을 때
        <Box sx={{ textAlign: 'center', py: 8, color: '#F3E9E4' }}>
          <Typography sx={{ mb: 2 }}>등록된 도서가 없습니다.</Typography>
          <Button variant="contained" onClick={onCreateClick}>
            첫 도서 등록하기
          </Button>
        </Box>
      ) : (
        // 반응형 그리드: 모바일 1열 / 태블릿 2열 / 노트북 3열 / 큰 화면 4열
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
          {/* 검색어로 걸러진 목록 출력 */}
          {filteredBooks.map((book) => (
            <Card key={book.id}>
              <CardActionArea onClick={() => onSelectBook(book)}>
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
      )}
    </Box>
  );
}