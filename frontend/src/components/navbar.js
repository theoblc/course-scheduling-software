import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Accueil
      </Link>
      <ul>
        <li>
          <Link to="/Cours" className="site-title">
            Cours
          </Link>
        </li>
        <li>
          <Link to="/Enseignant" className="site-title">
            Enseignant
          </Link>
        </li>
        <li>
          <Link to="/Modules" className="site-title">
            Module
          </Link>
        </li>
        <li>
          <Link to="/Salle" className="site-title">
            Salle
          </Link>
        </li>
        <li>
          <Link to="/Seance" className="site-title">
            Séance
          </Link>
        </li>
      </ul>
    </nav>
  );
}
