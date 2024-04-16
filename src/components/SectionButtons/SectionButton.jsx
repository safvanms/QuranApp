import React, { useState } from "react";
import "./sectionButton.css";

const SectionButton = ({ setSelectedType, initialSelectedType }) => {
  const [selected, setSelected] = useState(initialSelectedType || "surah");

  const handleSelect = (type) => {
    setSelected(type);
    setSelectedType(type);
  };

  return (
    <div className="section_button_container">
      <div className="section_buttons">
        <div
          className={`surah_section_button ${
            selected === "surah" ? "selected" : ""
          }`}
          onClick={() => handleSelect("surah")}
        >
          Surah
        </div>
        <div
          className={`juz_section_button ${
            selected === "juz" ? "selected" : ""
          }`}
          onClick={() => handleSelect("juz")}
        >
          Juz
        </div>
      </div>
    </div>
  );
};

export default SectionButton;
