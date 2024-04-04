import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Surah from "./components/SurahPage/Surah";
import SurahList from "./components/Home/Home";
import Home from "./components/Home/Home";

export default function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route index="/surah_list" element={<SurahList />} />
              <Route path="/:number" element={<Surah />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </React.StrictMode>
  );
}
