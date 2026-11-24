// OpenAI 표지 생성 함수

// 도서 제목/내용으로 프롬프트를 만들어 이미지를 생성하고, 이미지(Data URL)를 반환
export async function generateCover(book, userApiKey, selectedQuality) {

    // AI 이미지 생성 프롬프트 작성 
    const prompt = `책 표지 일러스트를 그려줘. 
                    제목: "${book.title}"
                    책 내용: ${book.content}
                    책 내용의 분위기에 어울리는 그림체로해줘, 표지에 제목을 넣어줘.
                    세로형 책 표지로 만들어줘.`;

    // 1. OpenAI 이미지 생성 요청 (POST)
    const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userApiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-image-2',
            prompt,
            n: 1,
            size: '1024x1536',
            quality: selectedQuality,
            output_format: 'png',
            }),
    });

    if (!res.ok) throw new Error(`OpenAI 요청 실패 (${res.status})`);

    // 2. OpenAI 응답 파싱 후 b64_json 추출
    const data = await res.json();
    const b64Json = data.data?.[0]?.b64_json;

    // b64_json을 data url 형태로 변환
    const imageSrc = `data:image/png;base64,${b64Json}`;

    
    return imageSrc;

}