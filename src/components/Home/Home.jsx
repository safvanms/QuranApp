import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Header from '../Other/Header'
import Footer from '../Other/Footer'

export default function Home() {
  // const [surahNumber, setSurahNumber] = useState([])
  // const [surahNames, setSurahNames] = useState([])
  // const [englishName, setEnglishName] = useState([])

  // useEffect(() => {
  //   const fetchAllSurah = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/quran')
  //       const surahs = response.data.data.surahs

  //       const surahNumbers = surahs.map((surah) => surah.number)
  //       const surahNames = surahs.map((surah) => surah.name)
  //       const englishName = surahs.map((surah) => surah.englishName)

  //       setSurahNumber(surahNumbers)
  //       setSurahNames(surahNames)
  //       setEnglishName(englishName)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchAllSurah()
  // }, [])

  const data = [
    {
      id: 1,
      name: 'sss',
    },
    {
      id: 2,
      name: 'nnnn',
    },
    {
      id: 3,
      name: 'kkkk',
    },
    {
      id: 4,
      name: 'okol',
    },
  ]

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-sec">
          {/* {surahNumber?.map((number, index) => (
            <Link
              style={{ color: 'black', textDecoration: 'none' }}
              to={`/${number}`}
            >
              {console.log(index)}
              <div key={index} className="surah-list">
                <span>{number}</span>
                <span style={{ fontSize: '12px', color: 'grey' }}>
                  {englishName[index]}
                </span>
                <span className="surah-name">
                  <span>{surahNames[index]}</span>
                </span>
              </div>
            </Link>
          ))} */}
          {data?.map((da, index) => (
            <Link
              style={{ color: 'black', textDecoration: 'none' }}
              // to={`/${number}`}
            >
              {console.log(index)}
              <div key={index} className="surah-list">
                <span>{da.id}</span>
                <span style={{ fontSize: '12px', color: 'grey' }}>
                  {da.name}
                </span>
                <span className="surah-name">
                  {/* <span>{surahNames[index]}</span> */}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
