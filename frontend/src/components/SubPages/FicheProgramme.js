import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FicheProgrammeContext from "../Assets/Contexte";
import Delete from "../Assets/Delete";
import Module from "./Module";
import Cours from "./Cours";

function FicheProgramme() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const baseURLModule = "http://localhost:8000/api/modules/";

  useEffect(() => {
    const fetchData = async () => {
      const urlModule = baseURLModule + id;
      const raw_module = await fetch(urlModule);
      const data = await raw_module.json();
      setModule(data);
    };

    fetchData().catch(console.error);
  }, [id]);

  // On affiche rien tant que la variable module n'est pas initialisée
  if (!module) {
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
          baseURL={baseURLModule}
          id={id}
          redirection="/modules"
          message="Supprimer le module"
        />
      </div>
    </FicheProgrammeContext.Provider>
  );
}

export default FicheProgramme;
