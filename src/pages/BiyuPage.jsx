// 관용구 조각 페이지

import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BiyuCard from "../components/biyu/BiyuCard";
import biyuWord from "../data/biyuWord";
import SortDropdown from "../components/common/SortDropdown";
import "../styles/BiyuPage.css";

function BiyuPage() {
  const [openCardId, setOpenCardId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortValue, setSortValue] = useState("default");
  const [cards, setCards] = useState(biyuWord);
  const [toastMessage, setToastMessage] = useState("");
  const [showEndMessage, setShowEndMessage] = useState(false);
  const observerTarget = useRef(null);
  const endMessageTimer = useRef(null);

  const toggleCard = (id) => {
    setOpenCardId((prev) => (prev === id ? null : id));
  };

  //   정렬-------------------------------------------
  const sortOptions = [
    { value: "default", label: "정렬" },
    { value: "korean", label: "가나다순" },
    { value: "recent", label: "최신순" },
  ];

  let sortedData = [...cards];

  if (sortValue === "korean") {
    sortedData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "recent") {
    sortedData = [...cards].reverse();
  }

  // 북마크-------------------------------------------
  const bookmark = (id) => {
    const targetIdiom = cards
      .flatMap((card) => card.idioms)
      .find((idiom) => idiom.id === id);

    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        idioms: card.idioms.map((idiom) => {
          if (idiom.id === id) {
            const nextSaved = !idiom.saved;

            return {
              ...idiom,
              saved: nextSaved,
              showMessage: false,
            };
          }
          return {
            ...idiom,
            showMessage: false,
          };
        }),
      })),
    );

    if (targetIdiom && !targetIdiom.saved) {
      setToastMessage("조각이 보관되었습니다");

      setTimeout(() => {
        setToastMessage("");
      }, 1500);
    }

    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          idioms: card.idioms.map((idiom) => ({
            ...idiom,
            showMessage: false,
          })),
        })),
      );
    }, 1500);
  };

  //   무한 스크롤 (고유어 조각 페이지와 동일하게 카드 계속 나오도록)-----------
  const visibleData = sortedData.slice(0, visibleCount);

  // 카드 열 나눠서 토글 목록 열려도 다른쪽 카드의 길이가 같도록 유지---------
  const leftCards = visibleData.filter((_, index) => index % 2 === 0);
  const rightCards = visibleData.filter((_, index) => index % 2 === 1);

  useEffect(() => {
    setVisibleCount(6);
    setOpenCardId(null);
    setShowEndMessage(false);
  }, [sortValue]);

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
          const nextVisibleCount = Math.min(visibleCount + 4, sortedData.length);

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

  return (
    <>
      <Header />

      {/* 관용구 본문 영역 ------------------------------------------*/}
      <main className="biyu_page">
        <section className="biyu_body">
          <div className="biyu_top">
            <div>
              <h1>같은 의미, 다른 표현</h1>
              <p>| 비슷한 상황에서 쓰이는 다양한 언어의 표현을 비교해보세요.</p>
            </div>

            <SortDropdown
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              options={sortOptions}
            />
          </div>

          {/* 관용구 카드 리스트 영역 ------------------------------------------*/}
          <div className="biyu_columns">
            <div className="column">
              {leftCards.map((card) => (
                <BiyuCard
                  key={card.id}
                  card={card}
                  isOpen={openCardId === card.id}
                  onToggle={toggleCard}
                  onBookmark={bookmark}
                />
              ))}
            </div>

            <div className="column">
              {rightCards.map((card) => (
                <BiyuCard
                  key={card.id}
                  card={card}
                  isOpen={openCardId === card.id}
                  onToggle={toggleCard}
                  onBookmark={bookmark}
                />
              ))}
            </div>
          </div>

          {showEndMessage && (
            <p className="end_message">모든 조각을 확인했습니다</p>
          )}

          <div ref={observerTarget} className="scroll_observer"></div>
        </section>
      </main>

      {toastMessage && <div className="toast_message">{toastMessage}</div>}

      <Footer />
    </>
  );
}

export default BiyuPage;
