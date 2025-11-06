import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // mets ton image à src/assets/logo.png
import "../styles/SCSS/components/header.scss";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="brand" aria-label="Accueil">
          <img src={Logo} alt="Trouve ton artisan" className="big-logo" />
          <span className="brand-title">Trouve ton artisan</span>
        </Link>

        <nav className="main-nav">
          <Link to="/categories/alimentation">Alimentation</Link>
          <Link to="/categories/batiment">Bâtiment</Link>
          <Link to="/categories/fabrication">Fabrication</Link>
          <Link to="/categories/services">Services</Link>
        </nav>
      </div>
    </header>
  );
}
