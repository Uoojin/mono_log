import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SortDropdown from "../components/common/SortDropdown";
import geulBooks from "../data/geulBooks";
import "../styles/GeulPage.css";

function GeulPage() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortValue, setSortValue] = useState("recent");
  const [showEndMessage, setShowEndMessage] = useState(false);
  const observerTarget = useRef(null);
  const timer = useRef(null);

  const sortOptions = [
    { value: "recent", label: "최신순" },
    { value: "title", label: "제목순" },
  ];
  const sortedBooks =
    sortValue === "title"
      ? [...geulBooks].sort((a, b) => a.title.localeCompare(b.title))
      : [...geulBooks];
  const visibleBooks = sortedBooks.slice(0, visibleCount);

  const flashEndMessage = () => {
    setShowEndMessage(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowEndMessage(false), 1800);
  };

  useEffect(() => {
    setVisibleCount(12);
  }, [sortValue]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (visibleCount < sortedBooks.length) {
        const next = Math.min(visibleCount + 4, sortedBooks.length);
        setVisibleCount(next);
        if (next >= sortedBooks.length) flashEndMessage();
      } else {
        flashEndMessage();
      }
    });
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [sortedBooks.length, visibleCount]);

  return (
    <>
      <Header />
      <main className="geul_page">
        <section className="geul_body">
          <div className="geul_top">
            <div className="page_intro">
              <h1>책 속 문장</h1>
              <p>| 비슷한 상황에서 쓰이는 다양한 언어의 표현을 비교해보세요.</p>
            </div>
            <SortDropdown
              value={sortValue}
              onChange={(event) => setSortValue(event.target.value)}
              options={sortOptions}
            />
          </div>

          <div className="bookshelf">
            {visibleBooks.map((book) => (
              <Link to={`/geul/${book.id}`} key={book.id} className="book_item">
                <span className="book_cover">
                  <span>{book.title}</span>
                </span>
                <strong>{book.title}</strong>
                <em>{book.author}</em>
              </Link>
            ))}
          </div>
          {showEndMessage && <p className="geul_end_message">마지막 문장입니다.</p>}
          <div ref={observerTarget} className="scroll_observer"></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default GeulPage;
