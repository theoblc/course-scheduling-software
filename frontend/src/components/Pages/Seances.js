import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Seances() {
  const title = "Séances";
  const baseURL = "http://localhost:8000/api/seances/";
  const type = "recap_seances";
  const item = {
    date_debut: "",
    date_fin: "",
    numero_groupe_td: "",
  };
  const columns = [
    { data: "module" },
    { data: "cours" },
    { data: "date_debut" },
    { data: "date_fin" },
    { data: "numero_groupe_td" },
    { data: "salle" },
    { data: "enseignant" },
    { data: null },
  ];
  const nameColumns = [
    "Module",
    "Cours",
    "Heure de début",
    "Heure de fin",
    "Groupe de TD",
    "Salle",
    "Enseignant",
    "Action",
  ];
  const buttons = '<button class="btn btn-success btn-sm">Détails</button>';

  return (
    <main>
      <List
        title={title}
        urlFetch={baseURL}
        type={type}
        item={item}
        columns={columns}
        nameColumns={nameColumns}
        add={false}
        buttons={buttons}
      />
    </main>
  );
}

export default withRouter(Seances);
