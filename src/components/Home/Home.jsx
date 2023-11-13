import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Header from '../Other/Header'
import Footer from '../Other/Footer'

export default function Home() {
  
  const [surahNumber, setSurahNumber] = useState([])
  const [surahName, setSurahName] = useState([])
  const [englishName, setEnglishName] = useState([])
  const [type, setType] = useState([])


  useEffect(() => {
    const fetchAllSurah = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/quran/quran-uthmani')
        const surahs = response.data.data.surahs;

        console.log(surahs);

        const surahNumbers = surahs.map((surah) => surah.number)
        const surahNames = surahs.map((surah) => surah.name)
        const englishName = surahs.map((surah) => surah.englishName)
        const typeofAyah = surahs.map((surah) => surah.revelationType)

        setSurahNumber(surahNumbers)
        setSurahName(surahNames)
        setEnglishName(englishName)
        setType(typeofAyah)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllSurah()
  }, [])

  console.log(surahNumber);


  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-sec">
          {surahNumber.length>=0?surahNumber?.map((number, index) => (
            <Link
              style={{ color: 'black', textDecoration: 'none' }}
              to={`/${number}`}
            >
              <div key={index} className="surah-list">
               <div className='surahNumberEngName'>
                <div>{number}</div>
                <div style={{ fontSize: '12px', color: 'grey' , marginLeft:"10px"}}>
                  {englishName[index]}
                </div>
               </div>
               <div className="type">{type[index]==='Meccan'?'🕋' :'🕌'}</div>
                <span className="surah-name">
                  <span>{surahName[index]}</span>
                </span>
              </div>
            </Link>
          )):"Loading ..."}
        </div>
      </div>
      <Footer />
    </>
  )
}
