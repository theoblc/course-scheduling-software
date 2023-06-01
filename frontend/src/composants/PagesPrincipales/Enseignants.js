// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";

// Code
function Enseignants() {
  const { data, fetchData } = ChargeurDonnees(
    "http://localhost:8000/api/enseignants/"
  );

  const listParams = {
    title: "Enseignants",
    url: "http://localhost:8000/api/enseignants/",
    type: "enseignants",
    data: data,
    fetchData: fetchData,
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
