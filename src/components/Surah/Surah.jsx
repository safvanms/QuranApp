import React, { useEffect, useState } from 'react'
import './surah.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Surah() {
  const [fullSurah, setFullSurah] = useState(null)
  const [surahDetails, setSurahDetails] = useState('')
  const [fontSize, setFontSize] = useState('18px')
  const [darkMode, setDarkMode] = useState(false)

  const { number } = useParams()

  useEffect(() => {
    const getSurah = async () => {
      try {
        const response = await axios.get(
          'https://api.alquran.cloud/v1/quran/quran-uthmani',
        )
        const surah = response.data.data.surahs[number - 1].ayahs
        setSurahDetails(response.data.data.surahs[number - 1])
        setFullSurah(surah)
      } catch (error) {
        console.log(error)
      }
    }
    getSurah()
  }, [number])

  const handleFontChange = (event) => {
    setFontSize(event.target.value)
  }

  const handleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <div className="options">
        <div className="settings">
          <select value={fontSize} onChange={handleFontChange}>
            <option value="18px">Extra small</option>
            <option value="20px">Small</option>
            <option value="22px">Medium</option>
            <option value="24px">Large</option>
            <option value="28px">Extra Large</option>
          </select>
        </div>
        <div className="darkmode">
          <h3 onClick={handleTheme}>
            {darkMode ? <span>☀️</span> : <span>&#x1F319;</span>}{' '}
          </h3>
        </div>
      </div>

      {console.log(surahDetails)}

      {surahDetails && (
        <div className="surah-details" style={{color:darkMode? 'grey':'',backgroundColor:darkMode?"black":''}}>
          <p>{surahDetails.revelationType}</p>
          <h4>{surahDetails.ayahs.length} Aayahs</h4>
          <h3>{surahDetails.name}</h3>
        </div>
      )}

      <div
        className="surah-page"
        style={{ backgroundColor: darkMode ? 'black' : 'white' }}
      >
        <div className="surah" style={{ fontSize }}>
          {fullSurah ? (
            fullSurah.map((ayah) => (
              <div className="surah-container">
                <div key={ayah.number}>
                  <span
                    className="ayahs"
                    style={{ color: darkMode ? 'grey' : '' }}
                  >
                    {ayah.text}
                  </span>
                  <span className="ayah-number">{ayah.numberInSurah}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{margin:"0 auto"}}>Please wait while we've fetching ...</p>
          )}
        </div>
      </div>
    </>
  )
}
