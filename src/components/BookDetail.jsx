import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookCover from './BookCover';

// 도서 상세 조회 + 삭제
// 요구사항: 표지, 작성일, 수정일, 본문 내용 표시 / [수정] 버튼 / [삭제] 버튼 클릭 시 확인 알림 후 삭제
// props: book(도서 객체), onBack(), onEdit(), onDelete(id)
export default function BookDetail({ book, onBack, onEdit, onDelete }) {
  const handleDeleteClick = () => {
    if (window.confirm(`"${book.title}" 도서를 삭제할까요?`)) {
      onDelete(book.id);
    }
  };

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
        목록으로
      </Button>

      <Paper sx={{ p: { xs: 3, md: 4 } }}>
        {/* 제목 + 수정/삭제 버튼 */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {book.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            <Button variant="contained" color="success" startIcon={<EditIcon />} onClick={onEdit}>
              수정
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
            >
              삭제
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* 표지(왼쪽) + 내용(오른쪽) — 모바일에서는 위아래로 */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
          <Box
            sx={{ width: { xs: '100%', sm: 260 }, flexShrink: 0, borderRadius: 2, overflow: 'hidden' }}
          >
            <BookCover src={book.coverImageUrl} title={book.title} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              책 내용
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {book.content}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                <b>등록일</b> {book.createdAt}
              </Typography>
              {book.updatedAt && (
                <Typography variant="body2" color="text.secondary">
                  <b>수정일</b> {book.updatedAt}
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
