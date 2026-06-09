import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/Header.css";

const menuItems = [
  { label: "Goyu", to: "/goyu" },
  { label: "Sori", to: "/sori" },
  { label: "Madi", to: "/madi" },
  { label: "Sai", to: "/sai" },
  { label: "Iyagi", to: "/iyagi" },
];

function Header() {
  const refreshMain = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  return (
    <header className="site_header">
      <a className="site_logo" href="/" aria-label="Mono-Log main" onClick={refreshMain}>
        <img src={logo} alt="MONO-LOG" />
      </a>
      <nav className="site_nav" aria-label="Mono-Log detail pages">
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
