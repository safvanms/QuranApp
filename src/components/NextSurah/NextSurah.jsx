import React from "react";
import "../SurahPage/surah.css";
import { useNavigate } from "react-router-dom";

export default function NextSurah({ fullSurah, darkMode, nextSurah }) {
  const navigate = useNavigate();

  const getNextSurah = () => {
    if (nextSurah && nextSurah.number) {
      navigate(`/${nextSurah.number}`, {
        state: { navigationType: "passingSurah" },
        replace: true,
      });
    } else return;
  };

  const getFullSurah = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      {fullSurah && (
        <div
          className="next"
          style={{
            backgroundColor: darkMode ? "#040d12" : "",
          }}
        >
          <p className={darkMode && "darkModeText"} onClick={getNextSurah}>
            {nextSurah && nextSurah.name}
          </p>
          <p className={darkMode && "darkModeText"} onClick={getFullSurah}>
            {" "}
            القرآن
          </p>
        </div>
      )}
    </div>
  );
}
