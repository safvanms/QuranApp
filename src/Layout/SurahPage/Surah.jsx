import React, { useEffect, useState } from 'react'
import './surah.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'

export default function Surah() {
  const [fullSurah, setFullSurah] = useState(null)
  const [surahDetails, setSurahDetails] = useState('')
  const [fontSize, setFontSize] = useState('18px')
  const [darkMode, setDarkMode] = useState(false)

  const { number } = useParams()

  useEffect(() => {
    const getSurah = async () => {
      // Check if data is present in local storage
      const storedQuranData = localStorage.getItem('quranData')
      if (storedQuranData) {
        const surahs = JSON.parse(storedQuranData)
        const surah = surahs[number - 1].ayahs
        setSurahDetails(surahs[number - 1])
        setFullSurah(surah)
      } else {
        // Fetch data from the API if not in local storage
        try {
          const response = await axios.get(
            'https://api.alquran.cloud/v1/quran/quran-uthmani',
          )
          const surahs = response.data.data.surahs
          const surah = surahs[number - 1].ayahs
          setSurahDetails(surahs[number - 1])
          setFullSurah(surah)

          // Store data in local storage
          localStorage.setItem('quranData', JSON.stringify(surahs))
        } catch (error) {
          console.log(error)
        }
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

  function convertToArabicNumerals(englishNumerals) {
    const arabicNumerals = englishNumerals
      .toString()
      .split('')
      .map((digit) => {
        const englishDigit = parseInt(digit, 10)
        const arabicDigit = String.fromCharCode(1632 + englishDigit)
        return arabicDigit
      })
    return arabicNumerals.join('')
  }

  console.log(!fullSurah);

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

      {surahDetails && (
        <div
          className="surah-details"
          style={{
            color: darkMode ? 'grey' : '',
            backgroundColor: darkMode ? 'black' : '',
          }}
        >
          <p>{surahDetails.revelationType==="Meccan" ? "مكية" : "مدنية"}</p>
          <h3>{surahDetails.name}</h3>
          <h4>{surahDetails.ayahs.length} آيات</h4>
        </div>
      )}

      <div
        className="surah-page"
        style={{ backgroundColor: darkMode ? 'black' : 'white' }}
      >
        <div
          className="surah"
          style={{
            fontSize,
            ...(fullSurah ? { border: '2px double rgb(49, 143, 60)' } : {}),
          }}
        >
          {fullSurah ? (
            fullSurah?.map((ayah) => (
              <div className="surah-container" key={ayah.number}>
                <div>
                  <span
                    className="ayahs"
                    style={{ color: darkMode ? 'grey' : '' }}
                  >
                    {ayah.text}
                  </span>
                  <span className="ayah-number">
                    {convertToArabicNumerals(ayah.numberInSurah)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className='surah_loader'> <Loader bg={'green'} /> </div>
          )}
        </div>
      </div>
    </>
  )
}
