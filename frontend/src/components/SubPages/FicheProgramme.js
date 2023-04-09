import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FicheProgrammeContext from "../Assets/Contexte";
import Delete from "../Assets/Delete";
import Module from "./Module";
import Cours from "./Cours";

function FicheProgramme() {
  const { id } = useParams();
  const [module, setModule] = useState([]);

  async function fetchData() {
    const raw_data = await fetch(`http://localhost:8000/api/modules/${id}`);
    const data = await raw_data.json();
    fetch(`http://localhost:8000/api/enseignants/${data.enseignant}`)
      .then((response) => response.json())
      .then((enseignant) => {
        data.enseignant = enseignant;
      });
    setModule(data);
  }

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  // Tant que les données ne sont pas récupérées, rien n'est affiché.
  if (module.length === 0) {
    return;
  }

  return (
    <FicheProgrammeContext.Provider value={module}>
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
