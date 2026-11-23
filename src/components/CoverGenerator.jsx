// AI 표지 생성
// 요구사항: AI 이미지 생성 버튼 / 표지 미리보기 및 재생성 / 생성된 표지를 coverImageUrl로 저장(PATCH)

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { generateCover } from '../api/openai'; 

//
// props
//   book     - 표지를 만들 책 객체 (title, content, id 사용)
//   onSaved  - 표지 저장 성공 후 호출 onSaved(imageSrc) → App이 화면의 표지를 갱신
export default function CoverGenerator({ book, onSaved }) {
  // ──────────────── state 값들 ───────────────────
  const [apiKey, setApiKey] = useState('')
  const [quality, setQuality] = useState('low')
  const [imageSrc, setImageSrc] = useState('')
  const [loading, setLoading] = useState(false)        // true면 버튼 비활성화 + '생성 중...' 표시
  const [error, setError] = useState('')       // 내용이 있으면 빨간 에러 박스 표시


  // ─────────────── AI 표지 생성 버튼을 누르면 실행되는 함수 ──────────────────
  // setImageSrc(imageSrc), onSaved(imageSrc) 해야함
  const handleGenerateCover = async () => {
    try {
        // api 키 확인
        if(apiKey === ''){
          setError('API Key를 입력해주세요')
          return;
        }

        setLoading(true);
        setError('');
        const src = await generateCover(book, apiKey, quality);
        setImageSrc(src);
        onSaved(src);

    } catch (err) {
      console.error(err);

      // 예외처리 
      if(err.message.includes('401')){
        setError('API Key를 확인해주세요')
      }else if(err.message.includes('429')){
        setError('요청이 많아요. 잠시 후 다시 시도해주세요')
      }else{
        setError('표지 생성에 실패했어요')
      }

    } finally {
      setLoading(false);
    }
  }



  // ───────────── 화면 레이아웃 ───────────────
  return (
    <Paper sx={{ p: { xs: 3, md: 4 }, mt: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        AI 표지 생성
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        책 제목과 내용을 바탕으로 어울리는 표지를 만들어요. 생성할 때마다 API 사용 요금이 발생해요.
      </Typography>

      <Stack spacing={2.5}>
        <TextField
          label="OpenAI API Key"
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          fullWidth
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField select label="생성 모델" value="gpt-image-2" fullWidth disabled>
            <MenuItem value="gpt-image-2">GPT Image 2 (1024x1536)</MenuItem>
          </TextField>

          <TextField
            select
            label="품질"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            fullWidth
          >
            <MenuItem value="low">Low (빠름 · 저렴)</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High (느림 · 비쌈)</MenuItem>
          </TextField>
        </Stack>

        {/* error에 내용이 있을 때만 보임 */}
        {error && <Alert severity="error">{error}</Alert>}

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleGenerateCover}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeIcon />}
          sx={{ alignSelf: 'center', px: 4 }}
        >
          {loading ? '생성 중...' : book?.coverImageUrl ? '표지 다시 생성' : 'AI 표지 생성'}
        </Button>
        {/* 생성된 표지 미리보기: imageSrc에 값이 있을 때만 */}
        {imageSrc && (
          <Stack alignItems="center" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              생성된 표지 미리보기
            </Typography>
            <img
              src={imageSrc}
              alt={`${book?.title ?? '도서'} AI 표지`}
              style={{ width: 200, aspectRatio: '2 / 3', objectFit: 'cover', borderRadius: 8 }}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
