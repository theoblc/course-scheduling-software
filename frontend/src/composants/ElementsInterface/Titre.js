// Bibliothèques
import React from "react";

/**
 * Le rôle de ce composant est d'afficher un titre centré sur la page.
 */
function Titre({ type }) {
  return (
    <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
      <div className="container d-flex justify-content-center">
        <h1>{type}</h1>
      </div>
    </div>
  );
}

export default Titre;
