import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { iyagiCategories, iyagiItems } from "../data/siteContent";
import "../styles/CommonPage.css";

function IyagiPage() {
  const [selected, setSelected] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(12);
  const [modalItem, setModalItem] = useState(null);
  const filtered = selected === "전체" ? iyagiItems : iyagiItems.filter((item) => item.category === selected);
  const visibleItems = filtered.slice(0, visibleCount);

  const selectTab = (next) => {
    setSelected(next);
    setVisibleCount(12);
  };

  return (
    <>
      <Header />
      <main className="detail_page">
        <section className="detail_intro compact_intro">
          <h1>장면,<br />언어가 머무는 순간들</h1>
          <p>
            단어와 표현은 문장이 되고, 문장은 하나의 장면이 됩니다.
            <br />
            Iyagi는 다양한 작품 속 문장을 통해 언어가 살아 있는 순간들을 살펴봅니다.
          </p>
        </section>

        <section className="detail_list_section iyagi_section">
          <div className="mono_tabs">
            {iyagiCategories.map((category) => (
              <button type="button" key={category} className={selected === category ? "active" : ""} onClick={() => selectTab(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="iyagi_grid">
            {visibleItems.map((item) => (
              <button className="iyagi_card" type="button" key={item.id} onClick={() => setModalItem(item)}>
                <img src={item.image} alt="" />
                <span>{item.category} · {item.code}</span>
                <small>{item.title}</small>
                <strong>"{item.quote}"</strong>
              </button>
            ))}
          </div>
          {visibleCount < filtered.length && (
            <button className="load_more_btn" type="button" onClick={() => setVisibleCount((count) => count + 6)}>
              더 많은 장면 보기
            </button>
          )}
        </section>
      </main>
      <Footer />

      {modalItem && (
        <div className="iyagi_modal_backdrop" onClick={() => setModalItem(null)}>
          <article className="iyagi_modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal_close" onClick={() => setModalItem(null)}>×</button>
            <img src={modalItem.image} alt="" />
            <div className="iyagi_modal_body">
              <span>{modalItem.category} · {modalItem.code}</span>
              <h2>{modalItem.title} <small>{modalItem.year}</small></h2>
              <strong>"{modalItem.quote}"</strong>
              <dl>
                <div>
                  <dt>장면 설명</dt>
                  <dd>{modalItem.description}</dd>
                </div>
                <div>
                  <dt>장면이 담고 있는 감정</dt>
                  <dd>{modalItem.emotion}</dd>
                </div>
                <div>
                  <dt>관련 표현</dt>
                  <dd>{modalItem.related}</dd>
                </div>
              </dl>
              <a href={modalItem.url} target="_blank" rel="noreferrer">작품 정보 더보기</a>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default IyagiPage;
