// 도서 상세 조회 + 삭제
// 요구사항: 표지, 작성일, 수정일, 본문 내용 표시 / [수정] 버튼 / [삭제] 버튼 클릭 시 확인 알림 후 삭제

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookCover from './BookCover';

// props: id(보여줄 책), onEdit(id), onBack(), onDeleted()

const MOCK_BOOKS = [
  {
    id: 1,
    title: '어린 왕자',
    content:
      '사막에 불시착한 비행사가 작은 별에서 온 왕자를 만나며 어른들이 잊어버린 소중한 것들을 깨닫는 이야기.',
    coverImageUrl: '',
    createdAt: '2026-11-20',
    updatedAt: '2026-11-20',
  },
  {
    id: 2,
    title: '별을 세는 밤',
    content:
      '도시의 불빛을 피해 시골 마을로 내려간 소녀가 할머니와 함께 밤하늘의 별자리를 하나씩 이어가는 성장 이야기.',
    coverImageUrl: '',
    createdAt: '2026-11-20',
    updatedAt: '2026-11-20',
  },
  {
    id: 3,
    title: '바다로 간 고래',
    content:
      '수족관에서 태어난 아기 고래가 처음으로 넓은 바다를 만나 친구들과 모험을 떠나는 동화.',
    coverImageUrl: '',
    createdAt: '2026-11-20',
    updatedAt: '2026-11-20',
  },
];

export default function BookDetail({ id, onEdit }) {
  const book = MOCK_BOOKS.find((b) => b.id === id) ?? MOCK_BOOKS[0];

  return (
    <Paper sx={{ p: { xs: 3, md: 4 } }}>
      {/* 제목 + 수정/삭제 버튼 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 700, flexGrow: 1 }}>
          {book.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
          <Button variant="contained" color="success" startIcon={<EditIcon />} onClick={() => onEdit?.(book.id)}>
            수정
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
            삭제
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* 표지(왼쪽) + 내용(오른쪽) — 모바일에서는 위아래로 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: 260 }, flexShrink: 0, borderRadius: 2, overflow: 'hidden' }}>
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
            <Typography variant="body2" color="text.secondary">
              <b>수정일</b> {book.updatedAt}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
