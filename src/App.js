import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GoyuPage from "./pages/GoyuPage";
import BiyuPage from "./pages/BiyuPage";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/goyu" element={<GoyuPage />} />
        <Route path="/biyu" element={<BiyuPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
