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
  setCurrentScrolledAyah,
}) {
  const [ayahNumber, setAyahNumber] = useState(null);
  const [scrolledAyahNumber, setScrolledAyahNumber] = useState(null);
  const [totalPageHeight, setTotalPageHeight] = useState(0);
  const inputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && clicked) {
      inputRef.current.focus();
    }
  }, [clicked]);

  useEffect(() => {
    const calculateTotalPageHeight = () => {
      const pageContainer = document.querySelector(".surah-page");
      if (pageContainer) {
        const height = pageContainer.offsetHeight;
        setTotalPageHeight(height);
      }
    };

    calculateTotalPageHeight();

    const handleResize = () => {
      calculateTotalPageHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fullSurah]);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        const currentScrollPos = window.scrollY + 356.7;
        const scrollPercentage = (currentScrollPos / totalPageHeight) * 100;
        setCurrentScrolledAyah(scrollPercentage);
      }, 0.5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [totalPageHeight, setCurrentScrolledAyah]);

  // Function to calculate the current scrolled ayah based on scroll position
  // const getCurrentScrolledAyah = () => {
  //   const ayahElements = document.querySelectorAll(".ayahs");
  //   for (let i = 0; i < ayahElements.length; i++) {
  //     const rect = ayahElements[i].getBoundingClientRect();
  //     if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
  //       return parseInt(ayahElements[i].id.split("-")[1], 10);
  //     }
  //   }
  //   return null;
  // };

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

      // show or Highlight the scrolled ayah for 3 seconds
      setScrolledAyahNumber(ayahNumber);
      setTimeout(() => {
        setScrolledAyahNumber(null);
      }, 5000);
    }

    setAyahNumber("");
  };

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
