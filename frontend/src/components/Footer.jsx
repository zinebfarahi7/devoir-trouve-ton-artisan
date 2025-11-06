import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png"; 
import "../styles/SCSS/components/footer.scss";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Logo + Nom */}
        <div className="footer-brand">
          <img src={Logo} alt="Logo" className="footer-logo" />
          <span className="footer-title">Trouve ton artisan</span>
        </div>

        {/* Liens */}
        <nav className="footer-nav">
          <NavLink to="/mentions-legales">Mentions légales</NavLink>
          <NavLink to="/donnees-personnelles">Données personnelles</NavLink>
          <NavLink to="/conditions-utilisation">Conditions d'utilisation</NavLink>
        </nav>

      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Trouve ton artisan — Tous droits réservés.
      </p>
    </footer>
  );
}
