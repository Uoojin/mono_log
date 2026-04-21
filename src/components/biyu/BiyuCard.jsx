// 관용구 조각 페이지 카드 구성
import { getBiyuImageStyle } from "../../utils/cardBackgrounds";

const languageOrder = ["KR", "JP", "CN", "EN"];

function getHighlightTerm(idiom) {
  if (idiom.highlight) return idiom.highlight;

  if (idiom.code === "KR") return idiom.word.replace(/다$/, "");
  if (idiom.code === "JP") return idiom.word.replace(/う$/, "");

  return idiom.word;
}

function renderExample(example, idiom) {
  const term = getHighlightTerm(idiom);
  const startIndex = example.toLowerCase().indexOf(term.toLowerCase());

  if (startIndex === -1) {
    return example;
  }

  const before = example.slice(0, startIndex);
  const match = example.slice(startIndex, startIndex + term.length);
  const after = example.slice(startIndex + term.length);

  return (
    <>
      {before}
      <strong className="example_match">{match}</strong>
      {after}
    </>
  );
}

function BiyuCard({ card, isOpen, onToggle, onBookmark }) {
  const orderedIdioms = [...card.idioms].sort(
    (a, b) => languageOrder.indexOf(a.code) - languageOrder.indexOf(b.code),
  );

  return (
    <article className={`biyu_card biyu_image_${((card.id - 1) % 4) + 1} ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="biyu_summary"
        onClick={() => onToggle(card.id)}
      >
        <div
          className="biyu_card_img"
          style={getBiyuImageStyle(card)}
          aria-hidden="true"
        ></div>

        <div className="biyu_card_txt">
          <h3 className="biyu_title">{card.title}</h3>
          <p className="biyu_subtitle">| {card.subtitle}</p>
          <p className="biyu_phrase">{card.phrase.join(" · ")}</p>
        </div>

        <span className="biyu_toggle" aria-hidden="true"></span>
      </button>

      {isOpen && (
        <div className="biyu_card_detail">
          {orderedIdioms.map((idiom) => (
            <section
              key={idiom.id}
              className={`biyu_idiom idiom_${idiom.code.toLowerCase()}`}
            >
              <div className="idiom_head">
                <span className="idiom_lan">
                  {idiom.language}({idiom.code})
                </span>

                <button
                  type="button"
                  className="biyu_card_bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark(idiom.id);
                  }}
                >
                  {idiom.saved ? "🖤" : "🤍"}
                </button>
              </div>

              <h4 className="idiom_word">{idiom.word}</h4>
              <p className="idiom_meaning">| {idiom.meaning}</p>

              <div className="biyu_example_list">
                {idiom.examples.map((example, exampleIndex) => (
                  <p key={exampleIndex} className="biyu_example">
                    "{renderExample(example, idiom)}"
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}

export default BiyuCard;
