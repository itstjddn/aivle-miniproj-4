import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// 도서 표지 (목록 카드, 상세 화면에서 같이 사용)
// props: src - 표지 이미지 주소(coverImageUrl), title - 도서 제목
// 표지가 아직 없으면 회색 박스 + 책 아이콘 + 제목을 보여줌
export default function BookCover({ src, title }) {
  if (src) {
    return (
      <Box
        component="img"
        src={src}
        alt={`${title} 표지`}
        sx={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'cover', display: 'block' }}
      />
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '2 / 3',
        bgcolor: 'grey.200',
        color: 'grey.500',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        p: 2,
        textAlign: 'center',
      }}
    >
      <MenuBookIcon sx={{ fontSize: 48 }} />
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="caption">표지 없음</Typography>
    </Box>
  );
}
