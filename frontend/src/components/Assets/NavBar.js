import React from "react";
import { NavLink } from "react-router-dom";

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
            <NavLink className="nav-link font-weight-bold" to="/modules">
              Modules
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link font-weight-bold" to="/seances">
              Séances
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
