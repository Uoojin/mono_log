import footerLogo from "../../img/footerLogo.png";
import footerMail from "../../img/footer_mail.png";
import footerInsta from "../../img/footer_insta.png";
import footerGithub from "../../img/footer_github.png";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="site_footer">
      <div className="footer_inner">
        <div className="footer_top">
          <div className="footer_brand">
            <img src={footerLogo} alt="MONO-LOG" />
            <p>한국어 · 日本語 · 中文 · English</p>
            <p>다른 언어로, 같은 경험을 기록합니다.</p>
          </div>
          <div className="footer_socials" aria-label="Mono-Log contact links">
            <a href="mailto:u.oooojini@gmail.com" aria-label="Send email">
              <img src={footerMail} alt="mail" />
            </a>
            <a href="https://www.instagram.com/y.__.oou.u?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Open Instagram">
              <img src={footerInsta} alt="instagram" />
            </a>
            <a href="https://github.com/Uoojin" target="_blank" rel="noreferrer" aria-label="Open GitHub">
              <img src={footerGithub} alt="github" />
            </a>
          </div>
        </div>
        <div className="footer_rule"></div>
        <p className="footer_copy">Copyright © 2026 Mono-Log All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
