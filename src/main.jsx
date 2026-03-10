import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

import Header from "./components/layout/Header.jsx";
import HomePage from "./pages/home/index.jsx";
import HistoricalPage from "./pages/historical/index.jsx";
import ConclusionPage from "./pages/conclusion/index.jsx";
import GamesPage from "./pages/games/index.jsx";
import AIChatboxPage from "./pages/ai/index.jsx";
import InformationsPage from "./pages/informations/index.jsx";
import TimelinePage from "./pages/timeline/index.jsx";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        {...pageTransition}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/boi-canh-lich-su" element={<HistoricalPage />} />
          <Route path="/tranh-luan-ket-luan" element={<ConclusionPage />} />
          <Route path="/moc-thoi-gian" element={<TimelinePage />} />
          <Route path="/tro-choi" element={<GamesPage />} />
          <Route path="/ai-chatbot" element={<AIChatboxPage />} />
          <Route path="/thong-tin-du-an" element={<InformationsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
);
