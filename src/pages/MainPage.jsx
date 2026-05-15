
import Header from "../components/common/Header";
import Footer from "../components/common/Footer"
import HomeHeroSec from "../components/home/HomeHeroSec";
import LanguageSec from "../components/home/LanguageSec";
import WordJogakSec from "../components/home/WordJogakSec";
import { useState } from "react";
import "../styles/MainPage.css";

function MainPage() {
    const [dotOffset, setDotOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
        setDotOffset({ x, y });
    };

    return (
        <div className="main_page">
            <Header />
            <main className="main_content">
                <HomeHeroSec />
                <section
                    className="explore_prompt_sec"
                    onMouseMove={handleMouseMove}
                    style={{
                        "--dot-x": `${dotOffset.x}px`,
                        "--dot-y": `${dotOffset.y}px`,
                    }}
                >
                    <div className="explore_dots" aria-hidden="true"></div>
                    <div className="explore_prompt_inner">
                        <p>fragments of language</p>
                        <h2>언어는 같은 감정을 서로 다른 결로 기록합니다.</h2>
                        <span>단어와 표현, 문장 속에 남겨진 언어의 조각들.</span>
                        <b aria-hidden="true">↓</b>
                    </div>
                </section>
                <LanguageSec />
                <WordJogakSec />
            </main>
            <Footer />
        </div>
    );
}

export default MainPage;
