import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { saiCategories, saiGroups } from "../data/siteContent";
import "../styles/CommonPage.css";

function SaiPage() {
  const [selected, setSelected] = useState("사과");
  const groupListRef = useRef(null);
  const groups = saiGroups.filter((group) => group.category === selected);

  useEffect(() => {
    const groupList = groupListRef.current;
    if (!groupList) return undefined;

    const articles = Array.from(groupList.querySelectorAll(".sai_group"));
    articles.forEach((article) => article.classList.remove("sai_group_revealed"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = articles.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.14}s`;
          entry.target.classList.add("sai_group_revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    articles.forEach((article) => observer.observe(article));

    return () => {
      observer.disconnect();
    };
  }, [selected]);

  return (
    <>
      <Header />
      <main className="detail_page">
        <section className="detail_intro compact_intro">
          <h1>사이,<br />말 속에 담긴 관계들</h1>
          <p>
            의미가 같더라도 상황과 관계에 따라 사용하는 말은 달라집니다.
            <br />
            Sai는 언어가 만들어내는 거리와 예의의 차이를 통해 말의 온도를 비교합니다.
          </p>
        </section>

        <section className="detail_list_section sai_section">
          <div className="mono_tabs">
            {saiCategories.map((category) => (
              <button type="button" key={category} className={selected === category ? "active" : ""} onClick={() => setSelected(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="sai_group_list" ref={groupListRef}>
            {groups.map((group) => (
              <article className="sai_group" key={`${group.category}-${group.title}`}>
                <div className="sai_group_head">
                  <span aria-hidden="true"></span>
                  <strong>{group.title}</strong>
                  <p>| {group.description}</p>
                  <em>{group.tag}</em>
                </div>
                <div className="sai_cards">
                  {group.cards.map((card) => (
                    <article className="sai_card" key={card.lang}>
                      <h3>{card.lang}</h3>
                      <strong>{card.phrase}</strong>
                      <p>"{card.example}"</p>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SaiPage;
