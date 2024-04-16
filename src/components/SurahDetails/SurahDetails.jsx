import React from "react";
import "../SurahPage/surah.css";
import convertToArabicNumerals from "../../utils";

export default function SurahDetails({ surahDetails, darkMode, number }) {
  return (
    <>
      {number ? (
        <div>
          <div
            className="surah-details"
            style={{
              color: darkMode ? "#aaaaaa" : "",
              backgroundColor: darkMode ? "#040D12" : "",
              justifyContent: "center",
            }}
          >
            <h3>الجزء {number}</h3>
          </div>
        </div>
      ) : (
        <div>
          {surahDetails && (
            <div
              className="surah-details"
              style={{
                color: darkMode ? "#aaaaaa" : "",
                backgroundColor: darkMode ? "#040D12" : "",
              }}
            >
              <p>
                {surahDetails.revelationType === "Meccan" ? "مكية" : "مدنية"}
              </p>
              <h3>{surahDetails.name}</h3>
              <h4>
                <span> آياتها</span>{" "}
                {convertToArabicNumerals(surahDetails.ayahs.length)}
              </h4>
            </div>
          )}
        </div>
      )}
    </>
  );
}
