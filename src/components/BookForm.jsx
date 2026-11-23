import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// 도서 등록 / 수정 폼
// 요구사항: 제목·내용 입력 필드 / 유효성 검사(공백 금지) / 수정 시 기존 정보 자동 불러오기
// props: initialBook(있으면 수정 모드), onSubmit(입력값), onCancel()
export default function BookForm({ initialBook, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [coverImageUrl, setCoverImageUrl] = useState('');
  // 입력칸 아래 빨간 에러 문구 (비어 있으면 에러 없음)
  const [errors, setErrors] = useState({ title: '', content: '' });

  // 수정 모드면 기존 정보 채우기, 등록 모드면 비우기
  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title || '');
      setContent(initialBook.content || '');
      //setCoverImageUrl(initialBook.coverImageUrl || '');
    } else {
      setTitle('');
      setContent('');
      setCoverImageUrl('');
    }
    setErrors({ title: '', content: '' });
  }, [initialBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors = {
      title: title.trim() ? '' : '도서 제목을 입력해 주세요.',
      content: content.trim() ? '' : '도서 내용을 입력해 주세요.',
    };
    setErrors(newErrors);
    if (newErrors.title || newErrors.content) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      //coverImageUrl: coverImageUrl.trim(),
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ maxWidth: 720, mx: 'auto', p: { xs: 3, md: 5 } }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        {initialBook ? '도서 수정' : '새 도서 등록'}
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="제목"
          placeholder="도서 제목을 입력하세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: '' })); // 다시 입력하면 에러 지우기
          }}
          error={Boolean(errors.title)}
          helperText={errors.title}
          fullWidth
        />

        <TextField
          label="설명 / 줄거리"
          placeholder="도서 설명을 입력하세요 (AI 표지 생성에도 사용돼요)"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setErrors((prev) => ({ ...prev, content: '' }));
          }}
          error={Boolean(errors.content)}
          helperText={errors.content}
          multiline
          minRows={6}
          fullWidth
        />

        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" variant="contained">
            {initialBook ? '수정 완료' : '등록하기'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
