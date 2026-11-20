// OpenAI 표지 생성 함수
// API 키는 .env 의 VITE_OPENAI_API_KEY 로 읽어옵니다: import.meta.env.VITE_OPENAI_API_KEY
// 엔드포인트: POST https://api.openai.com/v1/images/generations

// TODO: 도서 제목/내용으로 프롬프트를 만들어 이미지를 생성하고, 이미지(Data URL)를 반환
export async function generateCover(book, apiKey, quality) {

    // AI 이미지 생성 프롬프트 작성 
    const prompt = `책 표지 일러스트를 그려줘. 
                    제목: "${book.title}"
                    책 내용: ${book.content}
                    책 내용의 분위기에 어울리는 그림체로해줘, 표지에 제목을 넣어줘.
                    세로형 책 표지로 만들어줘.`;

    
    
}