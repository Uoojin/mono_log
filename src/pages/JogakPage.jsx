import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FilterButton from "../components/common/FilterButton";
import goyuWord from "../data/goyuWord";
import soriWord from "../data/soriWord";
import geulBooks from "../data/geulBooks";
import { getGoyuImageStyle } from "../utils/cardBackgrounds";
import "../styles/JogakPage.css";

function JogakPage() {
  const [category, setCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const archiveItems = useMemo(() => {
    const goyuItems = goyuWord.slice(0, 8).map((item) => ({
      id: `goyu-${item.id}`,
      type: "Goyu",
      typeLabel: "고유어",
      title: item.word,
      description: item.meaning,
      meta: item.synonym.join(" · "),
      imageStyle: getGoyuImageStyle(item),
      onClick: () => navigate("/goyu", { state: { openCardId: item.id } }),
    }));
    const soriItems = soriWord.slice(0, 4).map((item) => ({
      id: `sori-${item.id}`,
      type: "Sori",
      typeLabel: "소리",
      title: item.word,
      description: item.meaning,
      meta: item.expressions.join(" · "),
      imageClass: "sori_archive_visual",
      onClick: () => navigate("/sori"),
    }));
    const madiItems = [
      {
        id: "madi-1",
        type: "Madi",
        typeLabel: "마디",
        title: "당황한 순간",
        description: "예상하지 못한 순간, 말이 멈춰버릴 때",
        meta: "머리가 하얘지다 · 言葉を失う · be at a loss",
        onClick: () => navigate("/madi"),
      },
    ];
    const geulItems = geulBooks.slice(0, 3).map((item) => ({
      id: `geul-${item.id}`,
      type: "Geul",
      typeLabel: "글",
      title: item.title,
      description: item.quote,
      meta: `${item.author} · p.${item.page}`,
      onClick: () => navigate(`/geul/${item.id}`),
    }));

    return [...goyuItems, ...soriItems, ...madiItems, ...geulItems];
  }, [navigate]);

  const options = ["ALL", "Goyu", "Sori", "Madi", "Geul"];
  const filtered =
    category === "ALL"
      ? archiveItems
      : archiveItems.filter((item) => item.type === category);
  const perPage = 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory);
    setPage(1);
  };

  return (
    <>
      <Header />
      <main className="jogak_page">
        <section className="jogak_body">
          <div className="page_intro">
            <h1>아카이브</h1>
            <p>| 수집한 언어의 조각들을 한 곳에 모았습니다. 필요할 때 다시 꺼내어 기억해보세요.</p>
          </div>

          <FilterButton
            options={options}
            selected={category}
            onSelect={selectCategory}
          />

          <div className="archive_list">
            {pageItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className="archive_item"
                onClick={item.onClick}
              >
                <span className="archive_type">{item.typeLabel}</span>
                <span className="archive_text">
                  <strong>{item.title}</strong>
                  <em>| {item.description}</em>
                  <small>{item.meta}</small>
                </span>
                <span
                  className={`archive_thumb ${item.imageClass || ""}`}
                  style={item.imageStyle}
                  aria-hidden="true"
                ></span>
                <b aria-hidden="true">▰</b>
              </button>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="archive_pagination">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                &lt;
              </button>
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  type="button"
                  key={index + 1}
                  className={page === index + 1 ? "active" : ""}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                type="button"
                disabled={page === pageCount}
                onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default JogakPage;
