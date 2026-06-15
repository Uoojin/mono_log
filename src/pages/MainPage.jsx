import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import heroBg from "../img/hero_bg.png";
import korea from "../img/korea.png";
import japan from "../img/japan.png";
import china from "../img/china.png";
import eng from "../img/eng.png";
import "../styles/MainPage.css";

const languageCards = [
  { title: "한국어", text: "감정의 결을\n담아내는 언어", image: korea, className: "kr" },
  { title: "日本語", text: "여운을 남기는\n표현의 언어", image: japan, className: "jp" },
  { title: "中文", text: "관계와 맥락을\n담는 언어", image: china, className: "cn" },
  { title: "English", text: "생각을 설명하고\n연결하는 언어", image: eng, className: "en" },
];

gsap.registerPlugin(ScrollTrigger);

function MainPage() {
  const aboutRef = useRef(null);
  const languagePieceRef = useRef(null);

  useEffect(() => {
    const about = aboutRef.current;
    if (!about) return undefined;

    const context = gsap.context(() => {
      const line = about.querySelector(".about_line_track");
      const dots = about.querySelectorAll(".about_line_dot");
      const blocks = about.querySelectorAll(".about_motion_block");

      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dots, { opacity: 0, scale: 0.5 });
      gsap.set(blocks, { opacity: 0, y: 24 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: about,
          start: "top 65%",
          once: true,
        },
      });

      timeline
        .to(line, {
          scaleX: 1,
          duration: 1.35,
          ease: "power2.out",
        })
        .to(dots, {
          opacity: 1,
          scale: 1,
          duration: 0.48,
          ease: "power2.out",
          stagger: 0.28,
        }, "-=1.02")
        .to(blocks, {
          opacity: 1,
          y: 0,
          duration: 0.76,
          ease: "power2.out",
          stagger: 0.2,
        }, "-=0.06");
    }, about);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const languagePiece = languagePieceRef.current;
    if (!languagePiece) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        languagePiece.classList.add("language_revealed");
        observer.unobserve(languagePiece);
      },
      { threshold: 0.28 },
    );

    observer.observe(languagePiece);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="main_page">
      <section className="home_hero">
        <img className="hero_bg_image" src={heroBg} alt="" aria-hidden="true" />
        <Header />
        
      </section>

      <main>
        <section className="about_section" ref={aboutRef}>
          <div className="section_shell about_grid">
            <h2>ABOUT</h2>
            <div className="about_text">
              <p>
                모노로그는 <strong>한국어 · 일본어 · 중국어 · 영어</strong> 네 가지 언어의 단어와 표현,
                문장과 화법을 비교하며 언어 속에 담긴 감정과 의미의 차이를 탐색합니다. 같은 마음이
                언어마다 어떻게 다르게 전달되는지 살펴보며, 번역만으로는 전해지지 않는 언어의 결을
                발견할 수 있습니다.
              </p>
              <p className="about_sub">
                MONO-LOG explores the differences in emotion and meaning embedded in Korean,
                Japanese, <br /> Chinese, and English through words, expressions, sentences, and speech.
                <br />
                言葉は、感情の距離を映し出します。 | 语言塑造我们理解世界的方式。
              </p>
            </div>
          </div>

          <div className="about_line section_shell" aria-hidden="true">
            <i className="about_line_track"></i>
            <span className="about_line_dot"></span>
            <span className="about_line_dot"></span>
            <span className="about_line_dot"></span>
          </div>

          <div className="about_points section_shell">
            <article className="about_sub_txt about_motion_block">
              <h3>Language</h3>
              <p><strong>한국어 · 일본어 · 중국어 · 영어</strong><br />네 가지 언어 속<br />감정과 순간을 탐색합니다.</p>
            </article>
            <article  className="about_sub_txt about_motion_block">
              <h3>Flow</h3>
              <p><strong>단어</strong>에서 표현으로<br /><strong>표현</strong>에서 문장으로<br /><strong>문장</strong>에서 장면으로</p>
            </article>
            <article className="about_sub_txt about_motion_block">
              <h3>Nuance</h3>
              <p>같은 마음이 언어마다 어떻게<br />다르게 전달되는지,<br /><strong>차이</strong>를 따라가며 살펴보세요.</p>
            </article>
          </div>
        </section>

        <section className="language_piece_section" ref={languagePieceRef}>
          <div className="section_shell language_piece_shell">
            <h2>같은 감정,<br />다른 언어의 조각</h2>
            <div className="language_cards">
              {languageCards.map((card) => (
                <article className={`language_card language_reveal_card ${card.className}`} key={card.title}>
                  <div>
                    <h3>{card.title}</h3>
                    <span></span>
                    <p>{card.text}</p>
                  </div>
                  <img src={card.image} alt="" />
                </article>
              ))}
            </div>
            <p className="language_piece_copy language_reveal_copy">
              단어와 표현, 문장 속에서<br />언어마다 다른 시선을 발견합니다
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MainPage;
