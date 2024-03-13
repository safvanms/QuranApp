import React from "react";
import "../SurahPage/surah.css";

export default function PageSettings({
  handleFontChange,
  handleTheme,
  darkMode,
  fontSize,
}) {
  return (
    <div>
      <div className="options">
        <div className="settings">
          <select value={fontSize} onChange={handleFontChange}>
            <option value="19px">Font size</option>
            <option value="18px">Small</option>
            <option value="20px">Medium</option>
            <option value="24px">Large</option>
            <option value="28px">Extra Large</option>
          </select>
        </div>

        <div className="darkmode">
          <h3 onClick={handleTheme}>
            {darkMode ? <span>☀️</span> : <span>&#x1F319;</span>}{" "}
          </h3>
        </div>
      </div>
    </div>
  );
}