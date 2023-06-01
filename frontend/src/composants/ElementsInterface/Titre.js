// Bibliothèques
import React from "react";

// Code
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
