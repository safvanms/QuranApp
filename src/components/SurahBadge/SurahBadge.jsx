import React, { useState, useEffect } from "react";
import "./surahBadge.css";

export default function SurahBadge({ surahDetails }) {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  return (
    <div className={`surahBadge ${isVisible ? "visible" : ""}`}>
      {surahDetails.name}
    </div>
  );
}
