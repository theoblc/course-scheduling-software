export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Planification PHY
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Accueil <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cours">
              Cours
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/enseignants">
              Enseignants
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/modules">
              Modules
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/salles">
              Salles
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/seances">
              Séances
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
