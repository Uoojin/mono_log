import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FilterButton from "../components/common/FilterButton";
import soriWord from "../data/soriWord";
import "../styles/SoriPage.css";

function SoriShape({ motion }) {
  return (
    <div className={`sori_shape sori_shape_${motion}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function SoriPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(12);
  const [cards, setCards] = useState(soriWord);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const observerTarget = useRef(null);
  const timer = useRef(null);

  const options = ["전체", "한국어", "일본어", "중국어", "영어"];
  const filteredData =
    selectedLanguage === "전체"
      ? cards
      : cards.filter((card) => card.language === selectedLanguage);
  const visibleData = filteredData.slice(0, visibleCount);

  const bookmark = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, saved: !card.saved } : card,
      ),
    );
  };

  const flashEndMessage = () => {
    setShowEndMessage(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowEndMessage(false), 1800);
  };

  useEffect(() => {
    setVisibleCount(12);
    setShowEndMessage(false);
  }, [selectedLanguage]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (visibleCount < filteredData.length) {
        const next = Math.min(visibleCount + 8, filteredData.length);
        setVisibleCount(next);
        if (next >= filteredData.length) flashEndMessage();
      } else if (filteredData.length > 0) {
        flashEndMessage();
      }
    });
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [filteredData.length, visibleCount]);

  return (
    <>
      <Header />
      <main className="sori_page">
        <section className="sori_body">
          <div className="page_intro">
            <h1>소리의 결</h1>
            <p>| 말은 소리로 태어나 감각으로 남습니다. 의성·의태어에 담긴 소리를 시각적으로 느껴보세요.</p>
          </div>

          <FilterButton
            options={options}
            selected={selectedLanguage}
            onSelect={setSelectedLanguage}
          />

          <div className="sori_grid">
            {visibleData.map((card) => (
              <article key={card.id} className="sori_card">
                <div className="sori_card_head">
                  <h2>{card.word}</h2>
                  <button type="button" onClick={() => bookmark(card.id)}>
                    {card.saved ? "▰" : "▱"}
                  </button>
                </div>
                <p className="sori_meaning">| {card.meaning}</p>
                <SoriShape motion={card.motion} />
                <div className="sori_expression_list">
                  <span>日本語</span><b>{card.expressions[0]}</b>
                  <span>中文</span><b>{card.expressions[1]}</b>
                  <span>English</span><b>{card.expressions[2]}</b>
                </div>
              </article>
            ))}
          </div>

          {showEndMessage && (
            <p className="sori_end_message">
              언어마다 소리를 표현하는 방식은 다르지만,<br />
              그 감각은 우리 안에서 비슷하게 울립니다.
            </p>
          )}
          <div ref={observerTarget} className="scroll_observer"></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SoriPage;
