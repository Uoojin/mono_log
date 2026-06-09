import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SoundCard from "../components/sori/SoundCard";
import soriWord from "../data/soriWord";
import { languageTabs } from "../data/siteContent";
import "../styles/CommonPage.css";

function Tabs({ options, selected, onSelect }) {
  return (
    <div className="mono_tabs">
      {options.map((option) => (
        <button type="button" key={option} className={selected === option ? "active" : ""} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function SoriPage() {
  const [selected, setSelected] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(12);
  const filtered = selected === "전체" ? soriWord : soriWord.filter((item) => item.language === selected);
  const visibleCards = filtered.slice(0, visibleCount);

  const selectTab = (next) => {
    setSelected(next);
    setVisibleCount(12);
  };

  return (
    <>
      <Header />
      <main className="detail_page">
        <section className="detail_intro">
          <h1>소리,<br />언어마다 다른 울림들</h1>
          <p>
            같은 소리도 언어마다 다르게 듣고 표현합니다.
            <br />
            Sori는 의성어와 의태어를 통해 언어마다 다른 감각과 리듬을 비교합니다.
          </p>
        </section>

        <section className="detail_list_section">
          <Tabs options={languageTabs} selected={selected} onSelect={selectTab} />
          <div className="sori_card_grid">
            {visibleCards.map((card) => (
              <SoundCard card={card} key={card.id} />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <button className="load_more_btn" type="button" onClick={() => setVisibleCount((count) => count + 6)}>
              더 많은 소리 보기
            </button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SoriPage;
