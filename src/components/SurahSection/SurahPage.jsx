import React, { useRef, useState } from "react";
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
  const [ayah, setAyah] = useState("");

  const ayahRef = useRef(null);

  const handleChange = (e) => {
    setAyahNumber(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAyah(ayahNumber);
    setAyahNumber("");

    // Scroll to the specified ayah when submitted
    if (ayahRef.current) {
      ayahRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
              style={{ color: darkMode ? "#CCCCCC" : "" }}
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
