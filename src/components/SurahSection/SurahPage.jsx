import React, { useEffect, useRef, useState } from "react";
import "../SurahPage/surah.css";
import Loader from "../Loader/Loader";
import convertToArabicNumerals from "../../utils";

export default function SurahPage({
  fullSurah,
  darkMode,
  clicked,
  handleToggleClicked,
}) {
  const [ayahNumber, setAyahNumber] = useState(null);
  const [scrolledAyahNumber, setScrolledAyahNumber] = useState(null);
  const ayahRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when the component is rendered and clicked state is true
    if (inputRef.current && clicked) {
      inputRef.current.focus();
    }
  }, [clicked]);

  const handleChange = (e) => {
    setAyahNumber(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Scroll to the specified ayah when submitted
    if (ayahRef.current) {
      ayahRef.current.scrollIntoView({ behavior: "smooth" }); // Corrected this line
      // Set the scrolled ayah number for 3 seconds
      setScrolledAyahNumber(ayahNumber);
      setTimeout(() => {
        setScrolledAyahNumber(null);
      }, 3000);
    }
  
    setAyahNumber("");
    handleToggleClicked();
  };

  return (
    <>
      {clicked && (
        <div
          className="search-overlay"
          style={{ display: clicked ? "flex" : "none" }}
        >
          <div className="search_ayah">
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                name="ayahNumber"
                onChange={handleChange}
                value={ayahNumber}
                placeholder="Ayah number"
                ref={inputRef}
              />
              <button type="submit">Click</button>
            </form>
          </div>
        </div>
      )}

      {fullSurah ? (
        fullSurah?.map((ayah) => (
          <>
            <span
              className="ayahs"
              key={ayah.numberInSurah}
              ref={ayah.numberInSurah === ayahNumber ? ayahRef : null}
              style={{
                color: darkMode ? "#CCCCCC" : "",
                backgroundColor:
                  ayah.numberInSurah === scrolledAyahNumber
                    ? "#dddd"
                    : "inherit",
              }}
            >
              {ayah.text}
            </span>
            <span className="ayah-number">
              {convertToArabicNumerals(ayah.numberInSurah)}
            </span>
          </>
        ))
      ) : (
        <div className="loader_">
          <Loader />
        </div>
      )}
    </>
  );
}
