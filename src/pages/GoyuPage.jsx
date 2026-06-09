import { useMemo, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import goyuWord from "../data/goyuWord";
import { languageTabs } from "../data/siteContent";
import "../styles/CommonPage.css";

const languageMap = {
  전체: "전체",
  한국어: "한국어",
  일본어: "일본어",
  중국어: "중국어",
  영어: "영어",
};

function Tabs({ options, selected, onSelect }) {
  return (
    <div className="mono_tabs">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={selected === option ? "active" : ""}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function GoyuPage() {
  const [selected, setSelected] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(10);

  const words = useMemo(
    () => {
      const categories = languageTabs.filter((tab) => tab !== "전체");
      const groupedWords = categories.map((category) =>
        goyuWord.filter((word) => word.category === category).slice(0, 5),
      );
      const balancedWords = Array.from({ length: 5 }, (_, index) =>
        groupedWords.map((group) => group[index]),
      ).flat().filter(Boolean);

      return balancedWords;
    },
    [],
  );

  const filtered =
    selected === "전체"
      ? words
      : words.filter((word) => word.category === languageMap[selected]);
  const visibleWords = filtered.slice(0, visibleCount);

  const selectTab = (next) => {
    setSelected(next);
    setVisibleCount(10);
  };

  return (
    <>
      <Header />
      <main className="detail_page">
        <section className="detail_intro">
          <h1>고유,<br />번역되지 않는 말들</h1>
          <p>
            어떤 단어는 하나의 언어 안에서만 태어나고 사용됩니다.
            <br />
            Goyu는 각 언어의 고유어를 통해 번역만으로는 전해지지 않는 감정과 의미를 살펴봅니다.
          </p>
        </section>

        <section className="detail_list_section">
          <Tabs options={languageTabs} selected={selected} onSelect={selectTab} />
          <div className="goyu_card_grid">
            {visibleWords.map((card) => (
              <article className="goyu_word_card" key={card.id}>
                <img src={card.image} alt="" />
                <div className="goyu_word_body">
                  <h2>{card.word} <span>[{card.pronounce}]</span></h2>
                  <p className="meaning">| {card.meaning}</p>
                  <p className="description">{card.description}</p>
                  <div className="card_divider"></div>
                  <span className="example_label">예문</span>
                  {card.examples.map((example) => (
                    <p className="example" key={example}>{example}</p>
                  ))}
                  <div className="card_divider"></div>
                  <div className="related_chips">
                    {card.synonym.slice(0, 3).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visibleCount < filtered.length && (
            <button className="load_more_btn" type="button" onClick={() => setVisibleCount((count) => count + 6)}>
              더 많은 단어 보기
            </button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default GoyuPage;
