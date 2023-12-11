import React from 'react'
import './initialPage.css'
import Loader from '../../components/Loader/Loader'
import BG from '../../Assets/quranBG.jpg'

export default function InitialPage() {
  return (
    <div className="initial_page">
      <img src={BG} alt="quran" />
      <div className="app__name">
        <h1>القرآن الكريم برسم العثماني</h1>
        <Loader/>
      </div>
    </div>
  )
}
