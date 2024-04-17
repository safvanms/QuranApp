import React, { useEffect, useState } from "react";
import "./surah.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import SurahPage from "../../components/SurahSection/SurahPage";
import NextSurah from "../../components/NextSurah/NextSurah";
import SurahDetails from "../../components/SurahDetails/SurahDetails";
import PageSettings from "../../components/PageSettings/PageSettings";
import SurahBadge from "../../components/SurahBadge/SurahBadge";
import NextJuz from "../NextJuz/NextJuz";

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
  const [currentScrolledAyah, setCurrentScrolledAyah] = useState(0);
  const [fullData, setFullData] = useState([]);

  const handleToggleClicked = () => {
    setClicked(!clicked);
  };

  const { number } = useParams();
  const location = useLocation();

  const navigationType = location.state ? location.state.navigationType : null;

  useEffect(() => {
    const getSurah = async () => {
      //fallback into '/' when the number is invalid
      if (number > 114 || isNaN(number) || number === null) {
        alert('Invalid rout , Check the URL ')
        window.location.pathname = "/";
        
        return;
      }
      // Check if data is present in local storage
      const storedQuranData = localStorage.getItem("quranData");
      if (storedQuranData) {
        const surahs = JSON.parse(storedQuranData);
        const surah = surahs[number - 1].ayahs;
        const juzsData = extractJuzsData(surahs);

        // Pass the data if the type is Surah
        if (navigationType == "passingSurah") {
          setSurahDetails(surahs[number - 1]);
          setNextSurah(surahs[number]);
          setFullSurah(surah);
          setFullData(surah);
          // Pass the data if the type is Juz
        } else if (navigationType == "passingJuz") {
          const selectedJuz = juzsData[parseInt(number) - 1];
          setFullData(selectedJuz);
          // Pass the data into surah if the type is null
        } else if (navigationType === null) {
          setSurahDetails(surahs[number - 1]);
          setNextSurah(surahs[number]);
          setFullSurah(surah);
          setFullData(surah);
        }
      } else {
        // Fetch data from the API if not in local storage
        try {
          const response = await axios.get(
            "https://api.alquran.cloud/v1/quran/quran-uthmani"
          );
          const surahs = response.data.data.surahs;
          const surah = surahs[number - 1].ayahs;
          const juzsData = extractJuzsData(surahs);

          // Pass the data if the type is Surah
          if (navigationType == "passingSurah") {
            setSurahDetails(surahs[number - 1]);
            setNextSurah(surahs[number]);
            setFullSurah(surah);
            setFullData(surah);
            // Pass the data if the type is Juz
          } else if (navigationType == "passingJuz") {
            const selectedJuz = juzsData[parseInt(number) - 1];
            setFullData(selectedJuz);
            // Pass the data into surah if the type is null
          } else if (navigationType === null) {
            setSurahDetails(surahs[number - 1]);
            setNextSurah(surahs[number]);
            setFullSurah(surah);
            setFullData(surah);
          }

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

  // extracting by juz from the data
  const extractJuzsData = (surahs) => {
    const juzsData = [];
    surahs.forEach((surah) => {
      surah.ayahs.forEach((ayah) => {
        const juzNumber = ayah.juz;
        if (!juzsData[juzNumber - 1]) {
          juzsData[juzNumber - 1] = [];
        }
        juzsData[juzNumber - 1].push(ayah);
      });
    });
    return juzsData;
  };

  // handling the font sizes
  const handleFontChange = (event) => {
    localStorage.setItem(
      "quranSettings",
      JSON.stringify({ fontSize: event.target.value, darkMode })
    );
    setFontSize(event.target.value);
  };

  // handling the theme
  const handleTheme = () => {
    localStorage.setItem(
      "quranSettings",
      JSON.stringify({ fontSize, darkMode: !darkMode })
    );
    setDarkMode(!darkMode);
  };

  return (
    <>
      {navigationType === "passingSurah" || navigationType === null ? (
        <>
          <SurahBadge
            surahDetails={surahDetails}
            currentScrolledAyah={currentScrolledAyah}
          />

          <PageSettings
            handleFontChange={handleFontChange}
            handleTheme={handleTheme}
            handleToggleClicked={handleToggleClicked}
            darkMode={darkMode}
            fontSize={fontSize}
            navigationType={navigationType}
          />

          <SurahDetails darkMode={darkMode} surahDetails={surahDetails} />

          <div
            className="surah-page"
            style={{ backgroundColor: darkMode ? "#040D12" : "white" }}
          >
            <div
              className="surah"
              style={{
                fontSize,
                ...(fullData && fullData.length > 0
                  ? { border: "4px double #50727B" }
                  : {}),
              }}
            >
              <div>
                <SurahPage
                  fullData={fullData}
                  pageType={navigationType}
                  darkMode={darkMode}
                  clicked={clicked}
                  handleToggleClicked={handleToggleClicked}
                  surahDetails={surahDetails}
                  setCurrentScrolledAyah={setCurrentScrolledAyah}
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
      ) : (
        navigationType === "passingJuz" && (
          <>
            <SurahBadge
              surahDetails={surahDetails}
              number={number}
              currentScrolledAyah={currentScrolledAyah}
            />

            <PageSettings
              handleFontChange={handleFontChange}
              handleTheme={handleTheme}
              handleToggleClicked={handleToggleClicked}
              darkMode={darkMode}
              fontSize={fontSize}
              navigationType={navigationType}
            />

            <SurahDetails darkMode={darkMode} number={number} />

            <div
              className="surah-page"
              style={{ backgroundColor: darkMode ? "#040D12" : "white" }}
            >
              <div
                className="surah"
                style={{
                  fontSize,
                  ...(fullData && fullData.length > 0
                    ? { border: "4px double #78A083" }
                    : ""),
                }}
              >
                <div>
                  <SurahPage
                    fullData={fullData}
                    darkMode={darkMode}
                    clicked={clicked}
                    handleToggleClicked={handleToggleClicked}
                    surahDetails={surahDetails}
                    setCurrentScrolledAyah={setCurrentScrolledAyah}
                  />
                </div>
              </div>
            </div>
            <NextJuz darkMode={darkMode} number={number} />
          </>
        )
      )}
    </>
  );
}
