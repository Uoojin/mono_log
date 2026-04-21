import "../../styles/Footer.css";

function Footer () {
   return (
    <footer className="footer">
        <div className="footer-left">
            <h2 className="footer_logo">MONO-LOG</h2>
            <p className="footer_lan">한국어 · 日本語 · 中文 · English</p>
            <p className="footer_about">다른 언어로, 같은 경험을 기록합니다.</p>
            <p className="footer_copy">© 2026 Mono-Log, Yujin</p>
        </div>

        <div className="footer_right">
            <p className="footer_quote"> Words stay,<br />
               even when languages change</p>
        </div>
    </footer>
  );
}

export default Footer;