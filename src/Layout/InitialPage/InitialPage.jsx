import React from 'react'
import './initialPage.css'
import Loader from '../../components/Loader/Loader'

const SRC = 'https://wallpapercave.com/wp/wp2650440.jpg'

export default function InitialPage() {
  return (
    <div className="initial_page">
      <img src={SRC} alt="quran" />
      <div className="app__name">
        <h1>القرآن الكريم برسم العثماني</h1>
        <Loader bg={'#aaaaaa'} />
      </div>
    </div>
  )
}
