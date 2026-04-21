import "../../styles/Header.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="header_logo">
        <Link to="/">MONO-LOG</Link>
      </h1>
      <nav className="header_nav">
        <NavLink to="/goyu">Goyu</NavLink>
        <span>Sori</span>
        <NavLink to="/biyu">Biyu</NavLink>
        <span>Oneul</span>
        <span>Jogak</span>
      </nav>
    </header>
  );
}

export default Header;
