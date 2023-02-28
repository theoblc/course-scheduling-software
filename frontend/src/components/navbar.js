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
          <Link to="/enseignants" className="site-title">
            Enseignants
          </Link>
        </li>
        <li>
          <Link to="/modules" className="site-title">
            Modules
          </Link>
        </li>
        <li>
          <Link to="/salles" className="site-title">
            Salles
          </Link>
        </li>
        <li>
          <Link to="/seances" className="site-title">
            Séances
          </Link>
        </li>
      </ul>
    </nav>
  );
}
