import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Header from '../Other/Header'
import Footer from '../Other/Footer'
import Loading from '../Loading/Loading'

const CACHE_KEY = 'quranData'
const CACHE_TIMESTAMP_KEY = 'quranTimestamp'

export default function Home() {
  const [surahNumber, setSurahNumber] = useState([])
  const [surahName, setSurahName] = useState([])
  const [englishName, setEnglishName] = useState([])
  const [type, setType] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Check if data is present in local storage
        const storedQuranData = localStorage.getItem(CACHE_KEY)
        const storedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)

        if (storedQuranData && storedTimestamp) {
          const currentTimestamp = new Date().getTime()
          const storedTimestampNumber = parseInt(storedTimestamp, 10)
          const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000

          // Check if data is less than 7 days old
          if (
            currentTimestamp - storedTimestampNumber <
            sevenDaysInMilliseconds
          ) {
            const cachedData = JSON.parse(storedQuranData)
            updateState(cachedData)

            // Schedule removal after 7 days
            setTimeout(() => {
              localStorage.removeItem(CACHE_KEY)
              localStorage.removeItem(CACHE_TIMESTAMP_KEY)
            }, sevenDaysInMilliseconds)

            return
          }
        }
        // Fetch data from the API
        const response = await axios.get(
          'https://api.alquran.cloud/v1/quran/quran-uthmani',
        )
        const surahs = response.data.data.surahs

        // Store data in local storage
        const currentTimestamp = new Date().getTime()
        localStorage.setItem(CACHE_KEY, JSON.stringify(surahs))
        localStorage.setItem(CACHE_TIMESTAMP_KEY, currentTimestamp.toString())

        updateState(surahs)

      } catch (error) {
        setLoading(true)
        console.error('Error fetching Quran data:', error)
      }
    }

    const updateState = (surahs) => {
      const surahNumbers = surahs.map((surah) => surah.number)
      const surahNames = surahs.map((surah) => surah.name)
      const englishNames = surahs.map((surah) => surah.englishName)
      const types = surahs.map((surah) => surah.revelationType)

      setSurahNumber(surahNumbers)
      setSurahName(surahNames)
      setEnglishName(englishNames)
      setType(types)
      setLoading(false)
    }

    fetchData()
  }, [])


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className="home-container">
            <div className="home-sec">
              {surahNumber.length > 0 &&
                surahNumber?.map((number, index) => (
                  <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    to={`/${number}`}
                    key={index}
                  >
                    <div className="surah-list">
                      <div className="surahNumberEngName">
                        <div>{number}</div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: 'grey',
                            marginLeft: '10px',
                          }}
                        >
                          {englishName[index]}
                        </div>
                      </div>
                      <div className="type">
                        {type[index] === 'Meccan' ? '🕋' : '🕌'}
                      </div>
                      <span className="surah-name">
                        <span>{surahName[index]}</span>
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}
