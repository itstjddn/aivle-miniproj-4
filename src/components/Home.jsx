import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';

// 첫 화면 (환영 페이지)
// props: onGoList() - 도서 목록으로 이동, onGoCreate() - 새 도서 등록으로 이동
export default function Home({ onGoList, onGoCreate }) {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
      <MenuBookIcon color="primary" sx={{ fontSize: 64, mb: 2 }} />

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        도서 관리 시스템에 오신 것을 환영합니다!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        도서를 등록하고 관리해 보세요. AI가 책 내용에 어울리는 표지도 만들어 드려요.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" size="large" onClick={onGoList}>
          도서 목록 보기
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<AddIcon />}
          onClick={onGoCreate}
        >
          새 도서 등록
        </Button>
      </Stack>
    </Box>
  );
}
