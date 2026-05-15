import { Link, useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import geulBooks from "../data/geulBooks";
import "../styles/GeulPage.css";

function GeulDetailPage() {
  const { bookId } = useParams();
  const book = geulBooks.find((item) => item.id === bookId) || geulBooks[0];
  const related = geulBooks.filter((item) => item.id !== book.id).slice(0, 4);

  return (
    <>
      <header className="detail_header">
        <Link to="/geul">← 목록으로</Link>
      </header>
      <main className="book_detail_page">
        <section className="book_detail_hero">
          <div className="book_detail_cover book_cover">
            <span>{book.title}</span>
          </div>
          <div className="book_detail_info">
            <div className="detail_label_row">
              <span>{book.language}</span>
              <button type="button">▱</button>
            </div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p className="book_meta">{book.publisher}　|　{book.year}</p>
            <p className="book_intro">{book.intro}</p>
            <blockquote>
              <strong>“ {book.quote} ”</strong>
              <small>p.{book.page}</small>
            </blockquote>
          </div>
        </section>

        <section className="book_text_section">
          <h3>문맥 속 문장</h3>
          <p>{book.note}</p>
        </section>

        <section className="book_text_section">
          <h3>책 속 또다른 문장</h3>
          <p>"문장 내용"</p>
          <p>"문장 내용"</p>
          <p>"문장 내용"</p>
        </section>

        <section className="book_related_section">
          <h3>함께 보면 좋은 문장</h3>
          <div className="related_sentence_grid">
            {related.map((item) => (
              <Link to={`/geul/${item.id}`} key={item.id} className="related_sentence_card">
                <span>{item.language}</span>
                <button type="button">▱</button>
                <strong>소중한 것은 모두<br />작은 목소리로 온다.</strong>
                <small>[{item.title}] {item.author}<br />p.{item.page}</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default GeulDetailPage;
