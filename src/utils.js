export default function convertToArabicNumerals(englishNumerals) {
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
   