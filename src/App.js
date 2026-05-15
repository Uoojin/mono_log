import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GoyuPage from "./pages/GoyuPage";
import BiyuPage from "./pages/BiyuPage";
import SoriPage from "./pages/SoriPage";
import GeulPage from "./pages/GeulPage";
import GeulDetailPage from "./pages/GeulDetailPage";
import JogakPage from "./pages/JogakPage";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/goyu" element={<GoyuPage />} />
        <Route path="/sori" element={<SoriPage />} />
        <Route path="/madi" element={<BiyuPage />} />
        <Route path="/geul" element={<GeulPage />} />
        <Route path="/geul/:bookId" element={<GeulDetailPage />} />
        <Route path="/jogak" element={<JogakPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
