import React from "react";

function Titre(props) {
  return (
    <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
      <div className="container d-flex justify-content-center">
        <h1>{props.type}</h1>
      </div>
    </div>
  );
}

export default Titre;
