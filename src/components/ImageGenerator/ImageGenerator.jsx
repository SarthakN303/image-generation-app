import { useState } from 'react'
import sampleAi from '../../assets/sampleAI.jpg'
import './ImageGenerator.css'
import { useRef } from 'react'

const ImageGenerator = () => {
  const [imgUrl, setImgUrl] = useState('/')
  const [loading, setLoading] = useState(false)
  let inputRef = useRef(null)

  const imgGenerator = async () => {
    if (inputRef.current.value === '') {
      return 0
    } else {
      setLoading(true)
      const res = await fetch(
        'https://stablediffusionapi.com/api/v3/text2img',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Chrome',
          },
          body: JSON.stringify({
            key: `${import.meta.env.VITE_API_KEY}`,
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: '512x512',
          }),
        }
      )
      let data = await res.json()
      setImgUrl(data.output[0])
      setLoading(false)
    }
  }
  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imgUrl === '/' ? sampleAi : imgUrl} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? `loading-bar-full` : 'loading-bar'}></div>
          <div className={loading ? 'loading-text' : 'display-none'}>
            Generating...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Describe what you want to create"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imgGenerator()
          }}
        >
          Generate
        </div>
      </div>
    </div>
  )
}
export default ImageGenerator
