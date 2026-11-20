import { useState } from 'react'
import { generateCover } from '../api/openai'

// AI 표지 생성
// 요구사항: AI 이미지 생성 버튼 / 표지 미리보기 및 재생성 / 생성된 표지를 coverImageUrl로 저장(PATCH)
export default function CoverGenerator({ book }){

    const [apiKey, setApiKey] = useState('')
    const [quality, setQuality] = useState('low')
    const [imageSrc, setImageSrc] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleGenerateCover = async () => {
      try {

      } catch (err) {
        console.error(err);
      }
    }
    return <div className="cover-generator">AI 표지 생성</div>;
}
