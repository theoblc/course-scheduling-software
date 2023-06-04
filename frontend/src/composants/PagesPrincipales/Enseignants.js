// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";
import { getEnseignantsURL } from "../Outils/Urls";

// Code
function Enseignants() {
  const API_URL_ENSEIGNANTS = getEnseignantsURL();
  const { data, fetchData } = ChargeurDonnees(API_URL_ENSEIGNANTS);

  const listParams = {
    title: "Enseignants",
    url: API_URL_ENSEIGNANTS,
    type: "enseignants",
    data: data,
    fetchData: fetchData,
    boutonAjout: true,
    item: {
      nom: "",
      prenom: "",
      departement: "EPH",
    },
    columns: [
      { data: "nom" },
      { data: "prenom" },
      { data: "departement" },
      { data: null },
    ],
    nameColumns: ["Nom", "Prénom", "Département", "Action"],
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

export default Enseignants;
