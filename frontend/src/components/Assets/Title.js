import React from "react";

function Titre(props) {
  return (
    <div className="container d-flex justify-content-center">
      <h1>{props.type}</h1>
    </div>
  );
}

export default Titre;
