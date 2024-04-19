import React from "react";
import "../SurahPage/surah.css";
import { useNavigate } from "react-router-dom";

export default function NextJuz({ darkMode, number }) {
  const navigate = useNavigate();

  const nextJuz = parseInt(number) + 1;

  const getNextJuz = () => {
    const currentNumber = parseInt(number);
    const nextJuzNumber = currentNumber + 1;
    if (nextJuzNumber <= 30) {
      navigate(`/${nextJuzNumber}`, {
        state: { navigationType: "passingJuz" },
        replace: true
      }
    );
    } else {
      navigate("/", { replace: true });
    }
  };

  const getFullSurah = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div
        className="next"
        style={{
          backgroundColor: darkMode ? "black" : "",
        }}
      >
        {number < 30 ? (
          <p className={darkMode && "darkModeText"} onClick={getNextJuz}>
            الجزء {nextJuz}
          </p>
        ) : (
          ""
        )}
        <p className={darkMode && "darkModeText"} onClick={getFullSurah}>
          {" "}
          القرآن
        </p>
      </div>
    </div>
  );
}
