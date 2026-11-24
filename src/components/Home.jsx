import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { SCRIPT_FONT, GOLD } from '../theme';

// 홈 화면에 보여줄 기능 소개 (화면 장식용 데이터)
const FEATURES = [
  { no: 'I', title: '도서 관리', desc: '도서를 등록하고, 수정하고, 삭제까지 한 곳에서 관리해요.' },
  { no: 'II', title: 'AI 표지 생성', desc: '책 제목과 내용을 읽고 GPT Image가 어울리는 표지를 그려줘요.' },
  { no: 'III', title: '제목 검색', desc: '찾고 싶은 책 제목을 입력하면 바로 골라서 보여줘요.' },
];

// 첫 화면 (환영 페이지)
// props: onGoList() - 도서 목록으로 이동, onGoCreate() - 새 도서 등록으로 이동
export default function Home({ onGoList, onGoCreate }) {
  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* ── 1. 환영 카드 ── */}
      <Paper
        className="fade-up"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          px: { xs: 3, md: 8 },
          pt: { xs: 7, md: 9 },
          pb: { xs: 5, md: 7 },
          border: `1px solid ${GOLD}`,
          outline: `1px solid ${GOLD}`,
          outlineOffset: '-10px',            // 안쪽에 한 줄 더 → 이중 금색 테두리
          boxShadow: '0 24px 60px rgba(20, 0, 5, 0.5)',
        }}
      >
        {/* 위쪽 금색 리본 */}
        <div className="gift-ribbon-h" aria-hidden="true" />

        <Typography
          sx={{ fontFamily: SCRIPT_FONT, color: 'secondary.main', fontSize: { xs: '2.4rem', md: '3.2rem' }, lineHeight: 1.1 }}
        >
          Merry Christmas
        </Typography>

        <Box className="gold-divider" sx={{ maxWidth: 320, mx: 'auto', my: 2 }} aria-hidden="true">✦</Box>

        <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: '1.6rem', md: '2.3rem' } }}>
          도서 관리 시스템에 오신 것을 환영합니다!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, wordBreak: 'keep-all' }}>
          도서를 등록하고 관리해 보세요. AI가 책 내용에 어울리는 표지도 만들어 드려요.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Button variant="contained" size="large" onClick={onGoList} sx={{ px: 4 }}>
            도서 목록 보기
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<AddIcon />}
            onClick={onGoCreate}
            sx={{ px: 4, borderColor: 'secondary.main' }}
          >
            새 도서 등록
          </Button>
        </Stack>
      </Paper>

      {/* ── 2. 주요 기능 (흰 박스 없이 배경 위에) ── */}
      <Box sx={{ mt: 7, textAlign: 'center' }}>
        <Typography sx={{ fontFamily: SCRIPT_FONT, color: GOLD, fontSize: '2rem', lineHeight: 1 }}>
          Features
        </Typography>
        <Typography variant="h5" sx={{ color: '#F3E9E4', mt: 0.5, mb: 4 }}>
          주요 기능
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {FEATURES.map((f) => (
            <Box key={f.title} sx={{ color: '#F3E9E4' }}>
              <Typography sx={{ fontFamily: '"Song Myung", serif', color: GOLD, fontSize: 30, lineHeight: 1, mb: 1 }}>
                {f.no}
              </Typography>
              <Box sx={{ width: 28, height: '1px', bgcolor: GOLD, mx: 'auto', mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>{f.title}</Typography>
              <Typography variant="body2" sx={{ color: '#D9C6BF', wordBreak: 'keep-all', px: 2 }}>
                {f.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
