import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Other/Header";
import Footer from "../Other/Footer";
import InitialPage from "../InitialPage/InitialPage";
import SectionButton from "../SectionButtons/SectionButton";
import convertToArabicNumerals from "../../utils";

const CACHE_KEY = "quranData";
const CACHE_TIMESTAMP_KEY = "quranTimestamp";

export default function Home() {
  const [surahNumber, setSurahNumber] = useState([]);
  const [surahName, setSurahName] = useState([]);
  const [englishName, setEnglishName] = useState([]);
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [juz, setJuz] = useState([]);
  const [selectedType, setSelectedType] = useState(
    localStorage.getItem("selectedType") || "surah"
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedSelectedType = localStorage.getItem("selectedType");
  //   console.log(storedSelectedType)
  //   if (storedSelectedType === "passingSurah" || storedSelectedType === null) {
  //     setSelectedType("surah");
  //   } else {
  //     setSelectedType("juz");
  //   }
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Check if data is present in local storage
      const storedQuranData = localStorage.getItem(CACHE_KEY);
      const storedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (storedQuranData && storedTimestamp) {
        const currentTimestamp = new Date().getTime();
        const storedTimestampNumber = parseInt(storedTimestamp, 10);
        const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

        // Check if data is less than 7 days old
        if (
          currentTimestamp - storedTimestampNumber <
          sevenDaysInMilliseconds
        ) {
          // store quran into states from the localStorage
          const cachedData = JSON.parse(storedQuranData);
          updateState(cachedData);

          // Schedule removal after 7 days
          setTimeout(() => {
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(CACHE_TIMESTAMP_KEY);
          }, sevenDaysInMilliseconds);

          return;
        }
      }

      // Fetch data from the API
      try {
        const response = await axios.get(
          "https://api.alquran.cloud/v1/quran/quran-uthmani"
        );
        const surahs = response.data.data.surahs;

        // Store data in local storage
        const currentTimestamp = new Date().getTime();
        localStorage.setItem(CACHE_KEY, JSON.stringify(surahs));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, currentTimestamp.toString());

        // pass the surahs into the function for storing it into the states
        updateState(surahs);
      } catch (error) {
        setLoading(true);
        console.error("Error fetching Quran data:", error);
      }
    };

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

    const updateState = (surahs) => {
      const surahNumbers = surahs.map((surah) => surah.number);
      const surahNames = surahs.map((surah) => surah.name);
      const englishNames = surahs.map((surah) => surah.englishName);
      const types = surahs.map((surah) => surah.revelationType);
      const juzsData = extractJuzsData(surahs);

      setSurahNumber(surahNumbers);
      setSurahName(surahNames);
      setEnglishName(englishNames);
      setType(types);
      setLoading(false);
      setJuz(juzsData);
    };

    fetchData();
  }, []);


  const handleNavigate = (path, type) => {
    if (type === "passingSurah") {
      setSelectedType("surah");
      localStorage.setItem("selectedType", "surah");
    } else {
      setSelectedType("juz");
      localStorage.setItem("selectedType", "juz");
    }
    navigate(`${path}`, { state: { navigationType: type } });
  };


  return (
    <>
      {loading ? (
        <InitialPage />
      ) : (
        <>
          <Header />
          <SectionButton setSelectedType={setSelectedType} 
          initialSelectedType={localStorage.getItem("selectedType")}
          />
          <div className="home-container">
            <div className="home-sec">
              {selectedType === "surah"
                ? surahNumber?.map((number, index) => (
                    <div
                      onClick={() => handleNavigate(number, "passingSurah")}
                      key={index}
                    >
                      <div className="surah-list">
                        <div className="surahNumberEngName">
                          <div>{number}</div>
                          <div
                            style={{
                              fontSize: "15px",
                              color: "grey",
                              marginLeft: "10px",
                              fontWeight: "bolder",
                            }}
                          >
                            {englishName[index]}
                          </div>
                        </div>
                        <div className="type">
                          {type[index] === "Meccan" ? "🕋" : "🕌"}
                        </div>
                        <span className="surah-name">
                          <span>{surahName[index]}</span>
                        </span>
                      </div>
                    </div>
                  ))
                : selectedType === "juz"
                ? // Render Juzs
                  juz.map((juz, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleNavigate(`${index + 1}`, "passingJuz")
                      }
                    >
                      <div className="surah-list" key={index}>
                        <div className="surahNumberEngName">
                          <div
                            style={{
                              fontSize: "15px",
                              color: "grey",
                              marginLeft: "10px",
                              fontWeight: "bolder",
                            }}
                          >
                            Juz {index + 1}
                          </div>
                        </div>
                        <div className="juz_number">
                          {" "}
                          الجزء &nbsp;{convertToArabicNumerals(index + 1)}{" "}
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
