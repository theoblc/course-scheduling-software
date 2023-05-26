// Bibliothèques
import React from "react";
import { useParams } from "react-router-dom";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import FicheProgrammeContext from "../Outils/Contexte";
import Module from "./Module";
import Cours from "./Cours";

// Code
function FicheProgramme() {
  const { id } = useParams();
  const { data } = ChargeurDonnees(`http://localhost:8000/api/modules/${id}`);

  // Tant que les données ne sont pas récupérées, rien n'est affiché.
  if (data.length === 0) {
    return;
  }

  return (
    <FicheProgrammeContext.Provider value={data}>
      <Module />
      <hr className="mt-4 mb-0" />
      <Cours />
    </FicheProgrammeContext.Provider>
  );
}

export default FicheProgramme;
