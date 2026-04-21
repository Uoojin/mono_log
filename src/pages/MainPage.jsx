
import Header from "../components/common/Header";
import Footer from "../components/common/Footer"
import HomeHeroSec from "../components/home/HomeHeroSec";
import LanguageSec from "../components/home/LanguageSec";
import WordJogakSec from "../components/home/WordJogakSec";
import "../styles/MainPage.css";

function MainPage() {
    return (
        <div className="main_page">
            <Header />
            <main className="main_content">
                <HomeHeroSec />
                <LanguageSec />
                <WordJogakSec />
            </main>
            <Footer />
        </div>
    );
}

export default MainPage;