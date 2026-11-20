// 도서 등록 / 수정 폼
// 요구사항: 제목·내용 입력 필드 / 유효성 검사(공백 금지) / 수정 시 기존 정보 자동 불러오기

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// TODO(CRUD 담당): 입력값 state, 유효성 검사(공백 금지), 저장(createBook/updateBook),
//                 수정 시 기존 정보 불러오기(getBook) 추가하기
// props: id(있으면 수정 모드), onDone(id), onCancel()
export default function BookForm({ id, onCancel }) {
  return (
    <Paper sx={{ maxWidth: 720, mx: 'auto', p: { xs: 3, md: 5 } }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        {id ? '도서 수정' : '새 도서 등록'}
      </Typography>

      <Stack spacing={3}>
        <TextField label="제목" placeholder="도서 제목을 입력하세요" fullWidth />

        <TextField
          label="내용"
          placeholder="도서의 내용을 입력하세요"
          multiline
          minRows={8}
          fullWidth
        />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            취소
          </Button>
          <Button variant="contained">저장</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
