import React from 'react'
import '../SurahPage/surah.css'
import convertToArabicNumerals from '../../utils'

export default function SurahDetails({surahDetails,darkMode}) {
  return (
    <div>
     {surahDetails && (
        <div
          className="surah-details"
          style={{
            color: darkMode ? '#aaaaaa' : '',
            backgroundColor: darkMode ? 'black' : '',
          }}
        >
          <p>{surahDetails.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
          <h3>{surahDetails.name}</h3>
          <h4>
            <span> آياتها</span>{' '}
            {convertToArabicNumerals(surahDetails.ayahs.length)}
          </h4>
        </div>
      )}
    </div>
  )
}
