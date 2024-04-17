import React from "react";
import "./initialPage.css";
import BG from "../../Assets/quran_ramadan_BG.jpg";
import Loader from "../../components/Loader/Loader";

export default function InitialPage() {
  return (
    <div className="initial_page">
      <div className="img_section">
        <img src={BG} alt="quran" />
        <div className="app__name">
          <h1>القرآن الكريم برسم العثماني</h1>
          <Loader/>
        </div>
      </div>
      <p style={{fontSize:"9px" , marginTop:"10px"}}>please wait while we're loading ... </p>
    </div>
  );
}
