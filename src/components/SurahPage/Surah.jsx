import React, { useEffect, useState } from "react";
import "./surah.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import SurahPage from "../../components/SurahSection/SurahPage";
import NextSurah from "../../components/NextSurah/NextSurah";
import SurahDetails from "../../components/SurahDetails/SurahDetails";
import PageSettings from "../../components/PageSettings/PageSettings";
import SurahBadge from "../../components/SurahBadge/SurahBadge";

export default function Surah() {
  const [fullSurah, setFullSurah] = useState(null);
  const [surahDetails, setSurahDetails] = useState("");
  const [nextSurah, setNextSurah] = useState([]);

  const [fontSize, setFontSize] = useState(() => {
    const storedSettings = JSON.parse(
      localStorage.getItem("quranSettings")
    ) || {
      fontSize: "19px",
      darkMode: false,
    };
    return storedSettings.fontSize;
  });
  const [darkMode, setDarkMode] = useState(() => {
    const storedSettings = JSON.parse(
      localStorage.getItem("quranSettings")
    ) || {
      fontSize: "19px",
      darkMode: false,
    };
    return storedSettings.darkMode;
  });
  const [clicked, setClicked] = useState(false);

  const handleToggleClicked = () => {
    setClicked(!clicked);
  };

  const { number } = useParams();

  useEffect(() => {
    const getSurah = async () => {
      // Check if data is present in local storage
      const storedQuranData = localStorage.getItem("quranData");
      if (storedQuranData) {
        const surahs = JSON.parse(storedQuranData);
        const surah = surahs[number - 1].ayahs;

        setSurahDetails(surahs[number - 1]);
        setNextSurah(surahs[number]);
        setFullSurah(surah);
      } else {
        // Fetch data from the API if not in local storage
        try {
          const response = await axios.get(
            "https://api.alquran.cloud/v1/quran/quran-uthmani"
          );
          const surahs = response.data.data.surahs;
          const surah = surahs[number - 1].ayahs;
          setSurahDetails(surahs[number - 1]);
          setNextSurah(surahs[number]);
          setFullSurah(surah);

          // Store data in local storage
          localStorage.setItem("quranData", JSON.stringify(surahs));
          localStorage.setItem(
            "quranSettings",
            JSON.stringify({ fontSize, darkMode })
          );
        } catch (error) {
          console.log(error);
        }
      }
      window.scrollTo(0, 0);
    };
    getSurah();
  }, [number, fontSize, darkMode]);

  const handleFontChange = (event) => {
    localStorage.setItem(
      "quranSettings",
      JSON.stringify({ fontSize: event.target.value, darkMode })
    );
    setFontSize(event.target.value);
  };

  const handleTheme = () => {
    localStorage.setItem(
      "quranSettings",
      JSON.stringify({ fontSize, darkMode: !darkMode })
    );
    setDarkMode(!darkMode);
  };

  return (
    <>
      <SurahBadge surahDetails={surahDetails} />

      <PageSettings
        handleFontChange={handleFontChange}
        handleTheme={handleTheme}
        handleToggleClicked={handleToggleClicked}
        darkMode={darkMode}
        fontSize={fontSize}
      />

      <SurahDetails darkMode={darkMode} surahDetails={surahDetails} />

      <div
        className="surah-page"
        style={{ backgroundColor: darkMode ? "black" : "white" }}
      >
        <div
          className="surah"
          style={{
            fontSize,
            ...(fullSurah ? { border: "3px double rgb(49, 143, 60)" } : {}),
          }}
        >
          <div>
            <SurahPage
              fullSurah={fullSurah}
              darkMode={darkMode}
              clicked={clicked}
              handleToggleClicked={handleToggleClicked}
              surahDetails={surahDetails}
            />
          </div>
        </div>
      </div>
      <NextSurah
        darkMode={darkMode}
        fullSurah={fullSurah}
        nextSurah={nextSurah}
      />
    </>
  );
}
