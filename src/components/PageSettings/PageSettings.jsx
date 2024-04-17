import React from "react";
import "../SurahPage/surah.css";
import { RiPhoneFindLine } from "react-icons/ri";

export default function PageSettings({
  handleFontChange,
  handleTheme,
  darkMode,
  fontSize,
  handleToggleClicked,
  navigationType,
}) {

  return (
    <div>
      <div className="options">
        <div className="settings">
          <select value={fontSize} onChange={handleFontChange}>
            <option value="15px">extra small</option>
            <option value="18px">Small</option>
            <option value="19px">Normal (Font)</option>
            <option value="20px">Medium</option>
            <option value="24px">Large</option>
            <option value="28px">extra Large</option>
          </select>
        </div>

        {navigationType === "passingSurah"   && (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={()=>handleToggleClicked()}
          >
            <span style={{ color: "#aaaaaa", fontSize: "14px" }}> Search</span>
            <RiPhoneFindLine color="#aaaaaa" size={22} />
          </div>
        )}

        <div className="darkmode">
          <h3 onClick={handleTheme}>
            {darkMode ? <span>☀️</span> : <span>&#x1F319;</span>}{" "}
          </h3>
        </div>
      </div>
    </div>
  );
}
