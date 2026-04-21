// 고유어 조각 페이지 메인에 보여지는 카드 구성
import { getGoyuImageStyle } from "../../utils/cardBackgrounds";

function GoyuCard({ card, isSelected, onClick, onBookmark }) {
  return (
    <div
      className={`goyu_card goyu_image_${((card.id - 1) % 6) + 1} ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onClick(card)}
    >
      <div className="goyu_card_top">
        <span className="goyu_card_lan">{card.language}</span>
        <button
          type="button"
          className="goyu_card_bookmark"
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(card.id);
          }}
        >
          {card.saved ? "🖤" : "🤍"}
        </button>
      </div>

      <h3 className="goyu_card_title">
        {card.word} [{card.pronounce}]
      </h3>

      <p className="goyu_card_meaning">
        <span>{card.meaning}</span>
      </p>
      <p className="goyu_card_synonym">{card.synonym.join(" ・ ")}</p>

      <div
        className="goyu_card_thumb"
        style={getGoyuImageStyle(card)}
        aria-hidden="true"
      ></div>
    </div>
  );
}

export default GoyuCard;
