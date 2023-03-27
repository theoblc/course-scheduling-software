import React from "react";
import withRouter from "../Assets/WithRouter";
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
    buttons:
      '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>',
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default withRouter(Enseignants);
