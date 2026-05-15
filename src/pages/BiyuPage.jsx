// 마디 페이지

import { useRef, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import biyuWord from "../data/biyuWord";
import "../styles/BiyuPage.css";

const languageOrder = ["KR", "JP", "CN", "EN"];

function getHighlightTerm(idiom) {
  if (idiom.highlight) return idiom.highlight;
  return idiom.word;
}

function renderExample(example, idiom) {
  const term = getHighlightTerm(idiom);
  const startIndex = example.toLowerCase().indexOf(term.toLowerCase());

  if (startIndex === -1) return example;

  return (
    <>
      {example.slice(0, startIndex)}
      <strong className="example_match">
        {example.slice(startIndex, startIndex + term.length)}
      </strong>
      {example.slice(startIndex + term.length)}
    </>
  );
}

function BiyuPage() {
  const moments = biyuWord.slice(0, 30);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedId, setSelectedId] = useState(moments[0]?.id);
  const [savedIdioms, setSavedIdioms] = useState({});
  const listRef = useRef(null);

  const visibleMoments = moments.slice(0, visibleCount);
  const selectedMoment =
    moments.find((moment) => moment.id === selectedId) || moments[0];
  const orderedIdioms = [...selectedMoment.idioms].sort(
    (a, b) => languageOrder.indexOf(a.code) - languageOrder.indexOf(b.code),
  );

  const handleListScroll = () => {
    const target = listRef.current;
    if (!target || visibleCount >= moments.length) return;

    const nearBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 60;

    if (nearBottom) {
      setVisibleCount((prev) => Math.min(prev + 6, moments.length));
    }
  };

  const bookmark = (id) => {
    setSavedIdioms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Header />
      <main className="biyu_page madi_page">
        <section className="biyu_body">
          <div className="biyu_top">
            <div>
              <h1>같은 의미, 다른 표현</h1>
              <p>| 비슷한 상황에서 쓰이는 다양한 언어의 표현을 비교해보세요.</p>
            </div>
          </div>

          <div className="madi_layout">
            <aside className="madi_moment_panel">
              <div
                className="madi_moment_list"
                ref={listRef}
                onScroll={handleListScroll}
              >
                {visibleMoments.map((moment) => (
                  <button
                    type="button"
                    key={moment.id}
                    className={`madi_moment_item ${
                      selectedMoment.id === moment.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedId(moment.id)}
                  >
                    <span>{moment.title}</span>
                    <small>| {moment.subtitle}</small>
                    <b aria-hidden="true">›</b>
                  </button>
                ))}
                {visibleCount < moments.length && (
                  <span className="madi_more_arrow">↓</span>
                )}
              </div>
            </aside>

            <section className="madi_expression_panel">
              <div className="madi_expression_intro">
                <h2>{selectedMoment.title}</h2>
                <p>| {selectedMoment.subtitle}</p>
              </div>

              <div className="madi_idiom_list">
                {orderedIdioms.map((idiom) => (
                  <article
                    key={idiom.id}
                    className={`madi_idiom_card idiom_${idiom.code.toLowerCase()}`}
                  >
                    <div className="idiom_head">
                      <span className="idiom_lan">
                        {idiom.language}({idiom.code})
                      </span>
                      <button
                        type="button"
                        className="biyu_card_bookmark"
                        onClick={() => bookmark(idiom.id)}
                      >
                        {savedIdioms[idiom.id] ? "▰" : "▱"}
                      </button>
                    </div>
                    <h3 className="idiom_word">{idiom.word}</h3>
                    <p className="idiom_meaning">{idiom.meaning}</p>
                    <div className="biyu_example_list">
                      {idiom.examples.map((example, index) => (
                        <p key={index} className="biyu_example">
                          "{renderExample(example, idiom)}"
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default BiyuPage;
