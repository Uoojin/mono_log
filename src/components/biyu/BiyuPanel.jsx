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

function BiyuPanel({ card, onClose, onBookmark }) {
  if (!card) return null;

  const orderedIdioms = [...card.idioms].sort(
    (a, b) => languageOrder.indexOf(a.code) - languageOrder.indexOf(b.code),
  );

  return (
    <div className="biyu_panel">
      <div
        className="biyu_panel_hero"
        style={getBiyuImageStyle(card)}
      >
        <button type="button" className="biyu_panel_close" onClick={onClose}>
          X
        </button>
      </div>

      <div className="biyu_panel_body">
        <div className="biyu_panel_header">
          <h3 className="biyu_panel_title">{card.title}</h3>
          <p className="biyu_panel_subtitle">| {card.subtitle}</p>
          <p className="biyu_panel_phrase">{card.phrase.join(" · ")}</p>
        </div>

        <div className="biyu_panel_detail">
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
                  onClick={() => onBookmark(idiom.id)}
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
      </div>
    </div>
  );
}

export default BiyuPanel;
