import { useEffect, useState } from "react";

const heroWords = [
  {
    id: 1,
    className: "hero_image_1",
    label: "오늘의 조각",
    word: "木漏れ日 (こもれび)",
    sentence: ["햇빛이 나뭇잎 사이를", "천천히 걸어가고 있었다."],
  },
  {
    id: 2,
    className: "hero_image_2",
    label: "오늘의 조각",
    word: "잔잔하다 [jan-jan-ha-da]",
    sentence: ["호수의 물결이 조용히", "마음을 지나갔다."],
  },
  {
    id: 3,
    className: "hero_image_3",
    label: "오늘의 조각",
    word: "fleeting",
    sentence: ["순간은 짧았지만", "오래 마음에 남았다."],
  },
  {
    id: 4,
    className: "hero_image_4",
    label: "오늘의 조각",
    word: "淡然",
    sentence: ["조용한 표정 아래", "마음은 천천히 가라앉았다."],
  },
];

function HomeHeroSec() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeHero = heroWords[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroWords.length);
    }, 5400);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home_hero_sec">
      <div className={`hero_card ${activeHero.className}`} key={activeHero.id}>
        <div className="hero_overlay">
          <p className="hero_title">{activeHero.label}</p>
          <h2 className="hero_txt">{activeHero.word}</h2>
          <p className="hero_description">
            {activeHero.sentence.map((line, index) => (
              <span key={line}>
                {index === 0 ? `" ${line}` : line}
                {index === activeHero.sentence.length - 1 ? ` "` : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroSec;
