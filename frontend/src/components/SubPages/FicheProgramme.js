import React from "react";
import { useParams } from "react-router-dom";
import DataFetcher from "../Assets/DataFetcher";
import FicheProgrammeContext from "../Assets/Contexte";
import Delete from "../Assets/Delete";
import Module from "./Module";
import Cours from "./Cours";

function FicheProgramme() {
  const { id } = useParams();
  const { data } = DataFetcher(`http://localhost:8000/api/modules/${id}`);

  // Tant que les données ne sont pas récupérées, rien n'est affiché.
  if (data.length === 0) {
    return;
  }

  return (
    <FicheProgrammeContext.Provider value={data}>
      <Module />
      <hr className="mt-4 mb-0" />
      <Cours />
      <hr className="mt-4 mb-0" />
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "30px", paddingBottom: "10px" }}
      >
        <Delete
          baseURL={"http://localhost:8000/api/modules/"}
          id={id}
          redirection="/modules"
          message="Supprimer le module"
        />
      </div>
    </FicheProgrammeContext.Provider>
  );
}

export default FicheProgramme;
