import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Accueil
      </Link>
      <ul>
        <li>
          <Link to="/cours" className="site-title">
            Cours
          </Link>
        </li>
        <li>
          <Link to="/enseignant" className="site-title">
            Enseignant
          </Link>
        </li>
        <li>
          <Link to="/module" className="site-title">
            Module
          </Link>
        </li>
        <li>
          <Link to="/salle" className="site-title">
            Salle
          </Link>
        </li>
        <li>
          <Link to="/seance" className="site-title">
            Séance
          </Link>
        </li>
      </ul>
    </nav>
  );
}
