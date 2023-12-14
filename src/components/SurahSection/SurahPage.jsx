import React from 'react'
import '../../Layout/SurahPage/surah.css'
import Loader from '../Loader/Loader'
import convertToArabicNumerals from '../../utils'

export default function SurahPage({ fullSurah, darkMode }) {
  return (
    <>
      {fullSurah ? (
        fullSurah?.map((ayah) => (
          <>
            <span
              className="ayahs"
              key={ayah.number}
              style={{ color: darkMode ? '#dddddd' : '' }}
            >
              {ayah.text}
            </span>
            <span className="ayah-number">   
              {convertToArabicNumerals(ayah.numberInSurah)}
            </span>
          </>
        ))
      ) : (
        <div className="surah_loader">
          <Loader bg={'green'} />
        </div>
      )}
    </>
  )
}
