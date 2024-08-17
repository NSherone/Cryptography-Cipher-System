import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.js";
import CipherSelectionPage from "./pages/cipherselection/CipherSelectionPage.js";
import ResultPage from "./pages/resultpage/ResultPage.js";

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ciphers" ciphers element={<CipherSelectionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
