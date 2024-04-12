import React, { useEffect, useState } from "react";
import "./surahBadge.css";

export default function SurahBadge({ surahDetails, currentScrolledAyah }) {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [surahLength, setSurahLength] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > 500 && prevScrollPos > currentScrollPos) {
        setIsVisible(false);
        setPrevScrollPos(currentScrollPos);
      } else if (currentScrollPos > 500) {
        setIsVisible(true);
        setPrevScrollPos(currentScrollPos);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (surahDetails && surahDetails.ayahs) {
      setSurahLength(surahDetails.ayahs.length);
    }
  }, [surahDetails]);

  const progressBarWidth = currentScrolledAyah
    ? (currentScrolledAyah / surahLength) * 100 + "%"
    : "0%";

  return (
    <>
      <div className={`surahBadge ${isVisible ? "visible" : ""}`}>
        <div className="badge_surah_name">{surahDetails.name}</div>
        <div className="surah_length" style={{ width: progressBarWidth }}>
          <div className="head"></div>
        </div>
      </div>
    </>
  );
}
