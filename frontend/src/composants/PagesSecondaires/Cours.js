// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";
import { getModuleCoursURL, getCoursURL } from "../Outils/Urls";

/**
 * Le rôle de composant est d'afficher la liste des cours dans la FicheProgramme d'un module.
 */
function Cours({ module }) {
  const API_URL_MODULE_COURS = getModuleCoursURL(module.id);
  const API_URL_COURS = getCoursURL();
  const { data, fetchData } = ChargeurDonnees(API_URL_MODULE_COURS);

  const listParams = {
    title: "Liste des cours",
    url: API_URL_COURS,
    type: "cours",
    data: data,
    fetchData: fetchData,
    boutonAjout: true,
    item: {
      nom: "",
      nb_heures: 0,
      module: module.id,
      nb_heures_hors_presentiel: 0,
      type: null,
      effectif: null,
    },
    columns: [
      { data: "nom" },
      { data: "type" },
      { data: "effectif" },
      { data: "nb_heures" },
      { data: "nb_heures_hors_presentiel" },
      { data: null },
    ],
    nameColumns: [
      "Nom",
      "Type",
      "Effectif",
      "Nombre heures",
      "Nombre heures hors présentiel",
      "Action",
    ],
    buttons: (
      <div className="btn-group" role="group">
        <button className="btn btn-warning btn-sm w-70">Modifier</button>
        <button className="btn btn-danger btn-sm w-70">Supprimer</button>
      </div>
    ),
  };

  return (
    <main>
      <GenerateurPage listParams={listParams} />
    </main>
  );
}

export default Cours;
