import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Header from "./components/layout/Header.jsx";
import HomePage from "./pages/home/index.jsx";
import HistoricalPage from "./pages/historical/index.jsx";
import ConclusionPage from "./pages/conclusion/index.jsx";
import GamesPage from "./pages/games/index.jsx";
import AIChatboxPage from "./pages/ai/index.jsx";
import InformationsPage from "./pages/informations/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boi-canh-lich-su" element={<HistoricalPage />} />
        <Route path="/tranh-luan-ket-luan" element={<ConclusionPage />} />
        <Route path="/tro-choi" element={<GamesPage />} />
        <Route path="/ai-chatbot" element={<AIChatboxPage />} />
        <Route path="/thong-tin-du-an" element={<InformationsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
