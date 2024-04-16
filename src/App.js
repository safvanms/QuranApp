import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Surah from "./components/SurahPage/Surah";
import Home from "./components/Home/Home";

export default function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/:number" element={<Surah />} />
              <Route path="*" element={<Home/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </React.StrictMode>
  );
}
