import React, { useEffect, useState } from 'react'
import './surah.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'



export default function Surah() {
  const [fullSurah, setFullSurah] = useState(null)

  const { number } = useParams()

  useEffect(() => {
    const getSurah = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/quran',
        )
        const surah = response.data.data.surahs[number-1].ayahs
      console.log('surah stored');
        setFullSurah(surah)
      } catch (error) {
        console.log(error)
      }
    }
    getSurah()


  }, [number])


  return (
    <div className="surah-page">
      <div className="surah">
        {fullSurah ?
          fullSurah.map((ayah) => (
            <div className="surah-container">
              <div key={ayah.number}>
                <span className='ayahs'>{ayah.text}</span>
                <span className="ayah-number">{ayah.numberInSurah}</span>
              </div>
            </div>
          )): <p style={{marginRight:"30%"}} >Please wait...</p> }
      </div>
    </div>
  )
}
