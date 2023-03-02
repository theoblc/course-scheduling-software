export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <li className="nav-item">
            <a className="navbar-brand" href="/modules">
              Modules
            </a>
          </li>
          <li className="nav-item">
            <a className="navbar-brand" href="/cours">
              Cours
            </a>
          </li>
          <li className="nav-item">
            <a className="navbar-brand" href="/enseignants">
              Enseignants
            </a>
          </li>
          <li className="nav-item">
            <a className="navbar-brand" href="/salles">
              Salles
            </a>
          </li>
          <li className="nav-item">
            <a className="navbar-brand" href="/seances">
              Séances
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
