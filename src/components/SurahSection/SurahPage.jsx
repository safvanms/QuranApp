import React, { useEffect, useRef, useState } from "react";
import "../SurahPage/surah.css";
import Loader from "../Loader/Loader";
import convertToArabicNumerals from "../../utils";
import smoothScrollIntoViewIfNeeded from "smooth-scroll-into-view-if-needed";

export default function SurahPage({
  fullSurah,
  darkMode,
  clicked,
  handleToggleClicked,
  surahDetails,
}) {
  const [ayahNumber, setAyahNumber] = useState(null);
  const [scrolledAyahNumber, setScrolledAyahNumber] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Retrieve last read ayah number from local storage
    const lastReadAyah = localStorage.getItem("lastReadAyah");
    if (lastReadAyah) {
      setAyahNumber(Number(lastReadAyah));
    }
    if (inputRef.current && clicked) {
      inputRef.current.focus();
    }
  }, [clicked]);

  // for navigate into the ayah by input ayah number
  const handleChange = (e) => {
    setAyahNumber(Number(e.target.value));
  };

  // submitting the ayah number
  const handleSubmit = (e) => {
    e.preventDefault();
    handleToggleClicked();

    // Scroll to the specified ayah when submitted
    const element = document.getElementById(`ayah-${ayahNumber}`);
    if (ayahNumber > fullSurah.length)
      alert(
        `Habibi , Surah ${surahDetails.englishName} have only ${fullSurah.length} ayahs. `
      );
    else {
      smoothScrollIntoViewIfNeeded(element, {
        behavior: "smooth",
        block: "center",
      });

      // show / Highlight the scrolled ayah for 3 seconds
      setScrolledAyahNumber(ayahNumber);
      setTimeout(() => {
        setScrolledAyahNumber(null);
      }, 5000);

      // Store the last read ayah number in local storage
      localStorage.setItem("lastReadAyah", ayahNumber);
    }

    setAyahNumber("");
  };

  // Clear stored ayah number from local storage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem("lastReadAyah");
    };
  }, []);

  return (
    <>
      {clicked && (
        <div
          className="search-overlay"
          style={{ display: clicked ? "flex" : "none" }}
        >
          <div className="search_ayah">
            <p>Find ayah</p>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                name="ayahNumber"
                onChange={handleChange}
                value={ayahNumber}
                placeholder="Enter"
                ref={inputRef}
              />
              <button type="submit">{ayahNumber ? "Go" : "Cancel"}</button>
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
              // ref={ayah.numberInSurah === ayahNumber ? ayahRef : null}
              id={`ayah-${ayah.numberInSurah}`}
              style={{
                color: darkMode ? "#CCCCCC" : "",
                backgroundColor:
                  ayah.numberInSurah === scrolledAyahNumber
                    ? "#aaaa"
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
