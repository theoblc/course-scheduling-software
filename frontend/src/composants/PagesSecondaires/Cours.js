// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";

// Code
function Cours({ module }) {
  const { data, fetchData } = ChargeurDonnees(
    `http://localhost:8000/api/modules/${module.id}/cours/`
  );

  const listParams = {
    title: "Liste des cours",
    url: `http://127.0.0.1:8000/api/cours/`,
    type: "cours",
    data: data,
    fetchData: fetchData,
    boutonAjout: true,
    item: {
      nom: "",
      nb_heures: 0,
      module: module.id,
      nb_heures_hors_presentiel: 0,
      type: "",
      effectif: "",
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
