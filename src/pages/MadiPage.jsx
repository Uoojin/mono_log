import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { madiCategories, madiItems } from "../data/siteContent";
import madiSummaryIcon from "../img/madi/madi_icon.png";
import "../styles/CommonPage.css";

function Tabs({ options, selected, onSelect }) {
  return (
    <div className="mono_tabs">
      {options.map((option) => (
        <button type="button" key={option} className={selected === option ? "active" : ""} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function MadiPage() {
  const [selected, setSelected] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(5);
  const [openId, setOpenId] = useState(null);
  const filtered = selected === "전체" ? madiItems : madiItems.filter((item) => item.category === selected);
  const visibleItems = filtered.slice(0, visibleCount);

  const selectTab = (next) => {
    setSelected(next);
    setVisibleCount(5);
    setOpenId(null);
  };

  return (
    <>
      <Header />
      <main className="detail_page">
        <section className="detail_intro compact_intro">
          <h1>마디,<br />같은 의미를 담은 다른 말들</h1>
          <p>
            같은 의미를 전하더라도 익숙하게 사용하는 표현은 다릅니다.
            <br />
            Madi는 관용구와 속담을 통해 언어마다 다른 표현의 방식을 비교합니다.
          </p>
        </section>

        <section className="detail_list_section madi_section">
          <Tabs options={madiCategories} selected={selected} onSelect={selectTab} />
          <div className="madi_list">
            {visibleItems.map((item, index) => {
              const open = openId === item.id;
              return (
                <article className={`madi_row ${open ? "open" : ""}`} key={item.id}>
                  <button className="madi_row_button" type="button" onClick={() => setOpenId(open ? null : item.id)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.title}</strong>
                    <em>{item.tag}</em>
                    <b>{open ? "⌃" : "⌄"}</b>
                  </button>
                  {open && (
                    <div className="madi_panel">
                      <div className="madi_panel_summary">
                        <div className="madi_common_summary">
                          <img className="madi_summary_icon" src={madiSummaryIcon} alt="" aria-hidden="true" />
                          <h2 className="madi_common_title">{item.common}</h2>
                          <p className="madi_common_text">{item.commonText}</p>
                        </div>
                        <div className="madi_context_summary">
                          <h2 className="madi_context_title">관련 상황</h2>
                          <p className="madi_context_text">{item.situation}</p>
                        </div>
                      </div>
                      <div className="madi_expression_grid">
                        {item.expressions.map((expression) => (
                          <article key={expression.lang}>
                            <h3>{expression.lang}</h3>
                            <img className="expression-image" src={expression.image} alt="" aria-hidden="true" />
                            <strong>"{expression.phrase}"</strong>
                            <p>→ {expression.meaning}</p>
                          </article>
                        ))}
                      </div>
                      <p className="madi_note"><strong>언어별 문화적 맥락 비교</strong> {item.note}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          {visibleCount < filtered.length && (
            <button className="load_more_btn" type="button" onClick={() => setVisibleCount((count) => count + 5)}>
              더 많은 표현 보기
            </button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MadiPage;
