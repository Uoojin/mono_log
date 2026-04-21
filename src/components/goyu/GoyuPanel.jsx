// 고유어 조각 페이지 카드 클릭시 등장하는 모달창 구성
import { getGoyuImageStyle } from "../../utils/cardBackgrounds";

function renderHighlightedExample(example, highlight) {
  if (!highlight) return example;

  const startIndex = example.toLowerCase().indexOf(highlight.toLowerCase());

  if (startIndex === -1) return example;

  const before = example.slice(0, startIndex);
  const match = example.slice(startIndex, startIndex + highlight.length);
  const after = example.slice(startIndex + highlight.length);

  return (
    <>
      {before}
      <strong className="goyu_example_match">{match}</strong>
      {after}
    </>
  );
}

function GoyuPanel({ card, onClose, onBookmark }) {
  if (!card) return null;

  return (
    <div
      className={`goyu_panel goyu_image_${((card.id - 1) % 6) + 1} goyu_lang_${card.language.toLowerCase()}`}
    >
      <div className="panel_hero" style={getGoyuImageStyle(card)}>
        <button type="button" className="panel_close" onClick={onClose}>
          X
        </button>
      </div>

      <div className="panel_body">
        <div className="panel_header">
          <span>{card.language}</span>
          <button
            type="button"
            className="panel_bookmark"
            onClick={() => onBookmark(card.id)}
          >
            {card.saved ? "🖤" : "🤍"}
          </button>
        </div>

        <h2>
          {card.word} [{card.pronounce}]
        </h2>

        <p className="panel_meaning">
          <span>{card.meaning}</span>
        </p>
        <p>{card.description}</p>

        <section className="panel_section">
          <h4>예문</h4>
          {card.examples.map((example, index) => (
            <p key={index}>
              {renderHighlightedExample(example, card.highlight || card.word)}
            </p>
          ))}
        </section>

        <section className="panel_section">
          <h4>유사 표현</h4>
          <p>{card.synonym.join(" ・ ")}</p>
        </section>
      </div>
    </div>
  );
}


export default GoyuPanel;
