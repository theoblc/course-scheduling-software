import React from "react";
import { useParams } from "react-router-dom";
import Delete from "../Assets/Delete";
import Module from "./Module";
import Cours from "./Cours";

function FicheProgramme() {
  const { id } = useParams();

  return (
    <div className="container">
      <Module idModule={id} />
      <hr className="mt-4 mb-0" />
      <Cours idModule={id} />
      <hr className="mt-4 mb-0" />
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "30px", paddingBottom: "10px" }}
      >
        <Delete
          baseURL="http://localhost:8000/api/modules/"
          id={id}
          redirection="/modules"
          message="Supprimer le module"
        />
      </div>
    </div>
  );
}

export default FicheProgramme;
