// 메인페이지 언어(한일중영) 섹션
import { useNavigate } from "react-router-dom";

function LanguageSec() {
  const navigate = useNavigate();

  const languageCards = [
    {
      id: 1,

      // 메인 기본 카드 구성
      lan: "한국어",
      code: "KOREAN",
      description: "말의 온도가 느껴지는 순간",
      imageClass: "lan_image_1",

      // hover 카드 구성
      previewWord: "아련하다",
      previewMeaning: "희미하게 남아 있는 그리운 감정",
      previewExample: '"오래된 기억이 아련하게 \n 떠오르는 밤입니다."',

      // 클릭시 이동
      routeValue: "한국어",
    },

    {
      id: 2,
      lan: "일본어",
      code: "JAPANESE",
      description: "조용히 감정이 스며드는 표현",
      imageClass: "lan_image_2",

      previewWord: "ぬくもり",
      previewMeaning: "사람이나 공간에서 느껴지는 따뜻함",
      previewExample: '"手のひらにぬくもりが \n 残っていた。"',

      routeValue: "일본어",
    },

    {
      id: 3,
      lan: "중국어",
      code: "CHINESE",
      description: "의미가 겹겹이 쌓이는 언어",
      imageClass: "lan_image_3",

      previewWord: "淡然",
      previewMeaning: "담담하고 집착 없는 상태",
      previewExample: '"他只是淡然地笑了，\n 没有再多说什么。"',

      routeValue: "중국어",
    },

    {
      id: 4,
      lan: "영어",
      code: "ENGLISH",
      description: "직관적으로 감정을 전하는 방식",
      imageClass: "lan_image_4",

      previewWord: "fleeting",
      previewMeaning: "순간적으로 스쳐 지나가는 느낌",
      previewExample: '"It was just a \n fleeting moment."',

      routeValue: "영어",
    },
  ];

  const handleMove = (lan) => {
    navigate("/goyu", { state: { selectedLan: lan, scrollTop: true } });
  };

  return (
    <section className="lan_section">
      <h2 className="sec_title">같은 감정, 다른 언어의 조각</h2>

      <div className="lan_card_list">
        {languageCards.map((card) => (
          <button
            type="button"
            key={card.id}
            className={`lan_card ${card.imageClass}`}
            onClick={() => handleMove(card.routeValue)}
          >
            {/* 메인 언어 카드 기본 */}
            <div className="lan_card_front">
              <p>{card.lan}</p>
              <p>{card.code}</p>
              <p>{card.description}</p>
            </div>

            {/* 메인 언어 카드 호버시 */}
            <div className="lan_card_back">
              <div className="back_header">
                <p>{card.previewWord}</p>
                <p className="meaning">| {card.previewMeaning}</p>
              </div>

              <p className="back_quote">{card.previewExample}</p>
              <span className="more">조각 찾으러 가기</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default LanguageSec;
