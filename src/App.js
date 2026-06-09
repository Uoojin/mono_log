import { HashRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import MainPage from "./pages/MainPage";
import GoyuPage from "./pages/GoyuPage";
import SoriPage from "./pages/SoriPage";
import MadiPage from "./pages/MadiPage";
import SaiPage from "./pages/SaiPage";
import IyagiPage from "./pages/IyagiPage";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/goyu" element={<GoyuPage />} />
        <Route path="/sori" element={<SoriPage />} />
        <Route path="/madi" element={<MadiPage />} />
        <Route path="/sai" element={<SaiPage />} />
        <Route path="/iyagi" element={<IyagiPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
