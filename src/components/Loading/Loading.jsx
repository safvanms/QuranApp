import React from 'react'
import './loading.css'

const SRC = "https://wallpapercave.com/wp/wp2650440.jpg"

export default function Loading() {
  return (
    <div className='loading'>
     <img src={SRC} alt="quran" />
     <h1>القرآن الكريم برسم العثماني</h1>
    </div>
  )
}
