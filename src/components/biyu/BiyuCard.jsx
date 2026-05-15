import { getBiyuImageStyle } from "../../utils/cardBackgrounds";

function BiyuCard({ card, isSelected, onClick }) {
  return (
    <article className={`biyu_card biyu_image_${((card.id - 1) % 4) + 1} ${isSelected ? "open selected" : ""}`}>
      <button
        type="button"
        className="biyu_summary"
        onClick={() => onClick(card)}
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
    </article>
  );
}

export default BiyuCard;
