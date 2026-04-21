// 고유어 조각 상세페이지 구성

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FilterButton from "../components/common/FilterButton";
import SortDropdown from "../components/common/SortDropdown";
import GoyuCard from "../components/goyu/GoyuCard";
import GoyuPanel from "../components/goyu/GoyuPanel";
import goyuWord from "../data/goyuWord";
import "../styles/GoyuPage.css";
import "../styles/GoyuCard.css";
import "../styles/GoyuPanel.css";

function GoyuPage() {
  const location = useLocation();

  const [selectedLan, setSelectedLan] = useState("전체");
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortValue, setSortValue] = useState("default");
  const [cards, setCards] = useState(goyuWord);
  const [toastMessage, setToastMessage] = useState("");
  const [showEndMessage, setShowEndMessage] = useState(false);
  const observerTarget = useRef(null);
  const endMessageTimer = useRef(null);

  // 카테고리 (언어별)-------------------------------------------
  const lanOptions = ["전체", "한국어", "일본어", "중국어", "영어"];

  let filteredData;

  if (selectedLan === "전체") {
    filteredData = cards;
  } else {
    filteredData = cards.filter((item) => item.category === selectedLan);
  }

  // 메인 언어 카드 선택 -> 해당 언어 카테고리 항목으로 이동
  useEffect(() => {
    if (location.state?.selectedLan) {
      setSelectedLan(location.state.selectedLan);
      setSelectedCard(null);
      setVisibleCount(12);

      if (location.state.scrollTop) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }
  }, [location.state]);

  // 정렬-------------------------------------------
  const sortOptions = [
    { value: "default", label: "정렬" },
    { value: "language", label: "언어별" },
    { value: "saved", label: "보관순" },
  ];

  let sortedData = [...filteredData];

  if (sortValue === "language") {
    const order = ["한국어", "일본어", "중국어", "영어"];

    sortedData.sort(
      (a, b) => order.indexOf(a.category) - order.indexOf(b.category),
    );
  } else if (sortValue === "saved") {
    sortedData.sort((a, b) => b.saved - a.saved);
  } else if (sortValue === "length") {
    sortedData.sort((a, b) => a.word.length - b.word.length);
  }

  // 북마크-------------------------------------------
  const bookmark = (id) => {
    const targetCard = cards.find((card) => card.id === id);

    if (!targetCard) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, saved: !card.saved } : card,
      ),
    );

    if (!targetCard.saved) {
      setToastMessage("조각이 보관되었습니다");

      setTimeout(() => {
        setToastMessage("");
      }, 1500);
    }
  };

  const currentSelectedCard = cards.find(
    (card) => card.id === selectedCard?.id,
  );

  // 무한스크롤 (스크롤시 단어카드 계속 등장할 수 있도록)--------------
  useEffect(() => {
    setVisibleCount(12);
    setSelectedCard(null);
    setShowEndMessage(false);
  }, [selectedLan, sortValue]);

  const flashEndMessage = () => {
    setShowEndMessage(true);

    if (endMessageTimer.current) {
      clearTimeout(endMessageTimer.current);
    }

    endMessageTimer.current = setTimeout(() => {
      setShowEndMessage(false);
    }, 1800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && visibleCount < sortedData.length) {
          const nextVisibleCount = Math.min(visibleCount + 8, sortedData.length);

          setVisibleCount(nextVisibleCount);

          if (nextVisibleCount >= sortedData.length) {
            flashEndMessage();
          }
        } else if (
          entry.isIntersecting &&
          visibleCount >= sortedData.length &&
          sortedData.length > 0
        ) {
          flashEndMessage();
        }
      },
      {
        threshold: 1,
      },
    );

    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [visibleCount, sortedData.length]);

  useEffect(() => {
    return () => {
      if (endMessageTimer.current) {
        clearTimeout(endMessageTimer.current);
      }
    };
  }, []);

  const closePanelFromBackground = (e) => {
    if (!selectedCard) return;

    const ignoredElement = e.target.closest(
      ".goyu_card, .goyu_panel, .filter_btn, .sort_dropdown",
    );

    if (!ignoredElement) {
      setSelectedCard(null);
    }
  };

  const visibleData = sortedData.slice(0, visibleCount);

  // console.log(visibleCount, sortedData.length, isEnd);

  return (
    <>
      <Header />

      {/* 고유어 본문 영역 ------------------------------------------*/}
      <main className="goyu_page" onClick={closePanelFromBackground}>
        <section className="goyu_body">
          <div className="goyu_top">
            <div>
              <h1>고유어 조각</h1>
              <p>| 번역되지 않는 말들</p>
            </div>
          </div>

          {/* 고유어 언어 필터 영역 ------------------------------------------*/}
          <div className="goyu_toolbar">
            <div className="goyu_filter">
              <FilterButton
                options={lanOptions}
                selected={selectedLan}
                onSelect={setSelectedLan}
              />
            </div>

            <SortDropdown
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              options={sortOptions}
            />
          </div>

          {/* 고유어 단어 카드 리스트 영역 ------------------------------------------*/}
          <div className={`goyu_content ${selectedCard ? "panel_open" : ""}`}>
            <div className="goyu_card_area">
              <div className="goyu_card_grid">
                {visibleData.map((card) => (
                  <GoyuCard
                    key={card.id}
                    card={card}
                    isSelected={selectedCard?.id === card.id}
                    onClick={setSelectedCard}
                    onBookmark={bookmark}
                  />
                ))}
              </div>

              {showEndMessage && (
                <p className="end_message">모든 조각을 확인했습니다</p>
              )}

              <div ref={observerTarget} className="scroll_observer"></div>
            </div>

            {/* 고유어 단어 모달창(오른쪽 패널) 영역 ------------------------------------------*/}
            {selectedCard && currentSelectedCard && (
              <div
                className="goyu_panel_area"
                onWheel={(e) => e.stopPropagation()}
              >
                <GoyuPanel
                  key={currentSelectedCard.id}
                  card={currentSelectedCard}
                  onClose={() => setSelectedCard(null)}
                  onBookmark={bookmark}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      {toastMessage && <div className="toast_message">{toastMessage}</div>}

      {/* --------------------------------------------------------------------*/}

      <Footer />
    </>
  );
}

export default GoyuPage;
