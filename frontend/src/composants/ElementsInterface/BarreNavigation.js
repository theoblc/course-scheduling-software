// Bibliothèques
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Le rôle de ce composant est de créer une barre de navigation pour PEPH.
 * La barre de navigation utilise la bibliothèque react-router-dom pour gérer la navigation
 * entre les différentes pages de l'application.
 */
function BarreNavigation() {
  const [expanded, setExpanded] = useState(false);
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link font-weight-bold" to="/modules">
              Modules
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link font-weight-bold" to="/seances">
              Planification EPH
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/enseignants">
              Enseignants
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/salles">
              Salles
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BarreNavigation;
