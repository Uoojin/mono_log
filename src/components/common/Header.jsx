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
        <NavLink to="/sori">Sori</NavLink>
        <NavLink to="/madi">Madi</NavLink>
        <NavLink to="/geul">Geul</NavLink>
        <NavLink to="/jogak">Jogak</NavLink>
      </nav>
    </header>
  );
}

export default Header;
