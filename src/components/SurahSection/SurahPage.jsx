import React, { useEffect, useRef, useState } from "react";
import "../SurahPage/surah.css";
import Loader from "../Loader/Loader";
import convertToArabicNumerals from "../../utils";
import smoothScrollIntoViewIfNeeded from "smooth-scroll-into-view-if-needed";

export default function SurahPage({
  fullData, // Data for the Surah or Juz
  darkMode,
  clicked,
  handleToggleClicked,
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
      // To find the total height of the current Surah/Juz page
      const pageContainer = document.querySelector(".surah-page");
      if (pageContainer) {
        const height = pageContainer.offsetHeight;
        // Store the height into the state
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
  }, [fullData]);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        const currentScrollPos = window.scrollY + 555;
        // Total height of the page stored in the state totalPageHeight
        const scrollPercentage = (currentScrollPos / totalPageHeight) * 100;
        if (scrollPercentage <= 100) {
          setCurrentScrolledAyah(scrollPercentage);
        }
      }, 0.5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [totalPageHeight, setCurrentScrolledAyah]);

  const handleChange = (e) => {
    setAyahNumber(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleToggleClicked();

    // Scroll to the specified ayah when submitted
    const element = document.getElementById(`ayah-${ayahNumber}`);
    if (ayahNumber > fullData.length)
      alert(`Habibi, this page only has ${fullData.length} ayahs.`);
    else {
      smoothScrollIntoViewIfNeeded(element, {
        behavior: "smooth",
        block: "center",
      });

      // Highlight the scrolled ayah for 3 seconds
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

      {fullData && fullData.length > 0 ? (
        fullData?.map((item) => (
          <>
            <span
              className="ayahs"
              key={item.numberInSurah}
              id={`ayah-${item.numberInSurah}`}
              style={{
                color: darkMode ? "#e5ddddee" : "",
                backgroundColor:
                  item.numberInSurah === scrolledAyahNumber
                    ? "#aaaa"
                    : "inherit",
              }}
            >
              {item.text}
            </span>
            <span className="ayah-number">
              {convertToArabicNumerals(item.numberInSurah)}
            </span>
          </>
        ))
      ) : (
        <div className="loader">
          <Loader />
        </div>
      )}
    </>
  );
}
