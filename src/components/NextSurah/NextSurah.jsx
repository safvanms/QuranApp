import React from "react";
import "../../Layout/SurahPage/surah.css";
import { useNavigate } from "react-router-dom";

export default function NextSurah({ fullSurah, darkMode, nextSurah }) {
  const navigate = useNavigate();

  const getNextSurah = () => {
    if (nextSurah && nextSurah.number) {
      navigate(`/${nextSurah.number}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
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
            backgroundColor: darkMode ? "black" : "",
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
