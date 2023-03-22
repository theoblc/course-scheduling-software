import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Seances() {
  const listParams = {
    title: "Séances",
    urlFetch: "http://localhost:8000/api/seances/",
    urlModify: undefined,
    type: "recap_seances",
    item: {
      date_debut: "",
      date_fin: "",
      numero_groupe_td: "",
    },
    columns: [
      { data: "module" },
      { data: "cours" },
      { data: "date_debut" },
      { data: "date_fin" },
      { data: "numero_groupe_td" },
      { data: "salle" },
      { data: "enseignant" },
      { data: null },
    ],
    nameColumns: [
      "Module",
      "Cours",
      "Heure de début",
      "Heure de fin",
      "Groupe de TD",
      "Salle",
      "Enseignant",
      "Action",
    ],
    add: false,
    buttons: '<button class="rs btn btn-success btn-sm">Détails</button>',
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default withRouter(Seances);
