import React from "react";
import List from "../Assets/List";

function Enseignants() {
  const listParams = {
    title: "Enseignants",
    urlFetch: "http://localhost:8000/api/enseignants/",
    urlModify: "http://localhost:8000/api/enseignants/",
    type: "enseignants",
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
    add: true,
    ordering: false,
    buttons: (
      <div className="btn-group" role="group">
        <button className="btn btn-warning btn-sm w-70">Modifier</button>
        <button className="btn btn-danger btn-sm w-70">Supprimer</button>
      </div>
    ),
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default Enseignants;
