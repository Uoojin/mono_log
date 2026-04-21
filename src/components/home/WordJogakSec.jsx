import { useState } from "react";
import CTAButton from "../common/CTAButton";
import wordJogak from "../../data/wordJogak";
import { getWordJogakImageStyle } from "../../utils/cardBackgrounds";

function pickWords(previousIds = []) {
  const shuffled = [...wordJogak].sort(() => Math.random() - 0.5);
  const nextWords = shuffled.filter((word) => !previousIds.includes(word.id));
  const pool = nextWords.length >= 4 ? nextWords : shuffled;

  return pool.slice(0, 4);
}

function WordJogakSec() {
  const [currentWords, setCurrentWords] = useState(() => wordJogak.slice(0, 4));
  const [flippedCards, setFlippedCards] = useState({});
  const [savedCards, setSavedCards] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const cardFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const bookmark = (id) => {
    setSavedCards((prev) => {
      const nextSaved = !prev[id];

      if (nextSaved) {
        setToastMessage("조각이 보관되었습니다");
        setTimeout(() => setToastMessage(""), 1500);
      }

      return {
        ...prev,
        [id]: nextSaved,
      };
    });
  };

  const cardChangeWords = () => {
    setCurrentWords((prev) => pickWords(prev.map((word) => word.id)));
    setFlippedCards({});
  };

  return (
    <section className="word_jogak_sec">
      <h2 className="sec_title">흘러가는 단어의 조각들</h2>

      <div className="word_card_list">
        {currentWords.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`flip_card word_image_${((card.id - 1) % 6) + 1} word_${card.category}`}
            onClick={() => cardFlip(card.id)}
          >
            <span
              className={`flip_inner ${flippedCards[card.id] ? "flipped" : ""}`}
            >
              <span className="flip_front">
                <span
                  className="word_card_img"
                  style={getWordJogakImageStyle(card)}
                  aria-hidden="true"
                ></span>
                <span className="card_top">
                  <span className="word_card_title">
                    {card.word} [{card.pronounce}]
                  </span>
                  <span className="card_meaning">| {card.meaning}</span>
                </span>

                <span className="card_synonym">{card.synonym}</span>
              </span>

              <span className="flip_back">
                <span className="card_back_top">
                  <span className="card_back_header">
                    <span className="card_back_lan">{card.language}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      className="word_bookmark"
                      onClick={(e) => {
                        e.stopPropagation();
                        bookmark(card.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          bookmark(card.id);
                        }
                      }}
                    >
                      {savedCards[card.id] ? "🖤" : "🤍"}
                    </span>
                  </span>
                  <span className="word_card_title highlight_title">
                    {card.word} [{card.pronounce}]
                  </span>
                  <span className="card_meaning">| {card.meaning}</span>
                  <span className="card_desc">{card.description}</span>
                </span>

                <span className="card_exam">{card.example}</span>
                <span className="card_synonym">{card.synonym}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <CTAButton text="다른 조각 만나보기" onClick={cardChangeWords} />

      {toastMessage && <div className="toast_message">{toastMessage}</div>}
    </section>
  );
}

export default WordJogakSec;
