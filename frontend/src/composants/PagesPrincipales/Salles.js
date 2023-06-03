// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";

// Code
function Salles() {
  const API_URL_SALLES = "http://localhost:8000/api/salles/";
  const { data, fetchData } = ChargeurDonnees(API_URL_SALLES);

  const listParams = {
    title: "Salles",
    url: API_URL_SALLES,
    type: "salles",
    data: data,
    fetchData: fetchData,
    boutonAjout: true,
    item: {
      numero: "",
      description: "",
    },
    columns: [{ data: "numero" }, { data: "description" }, { data: null }],
    nameColumns: ["Numéro", "Description", "Action"],
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

export default Salles;
