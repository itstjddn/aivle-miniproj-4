import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// 도서 표지 (목록 카드, 상세 화면에서 같이 사용)
// props: src - 표지 이미지 주소(coverImageUrl), title - 도서 제목
// 표지가 아직 없으면 초록 기본 표지 + 책 아이콘 + 제목을 보여줌
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

  // 표지가 아직 없을 때: 깔끔한 초록 표지 + 얇은 안쪽 테두리 + 제목
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '2 / 3',
        p: 1.5,
        background: 'linear-gradient(160deg, #2B5A45 0%, #1F4A37 50%, #183B2C 100%)',
      }}
    >
      <Box
        sx={{
          height: '100%',
          border: '1px solid rgba(232, 211, 162, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          px: 2,
          textAlign: 'center',
          color: '#E8D3A2',
        }}
      >
        <MenuBookIcon sx={{ fontSize: 30, opacity: 0.85 }} />
        <Typography variant="subtitle1" sx={{ lineHeight: 1.35, wordBreak: 'keep-all' }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
