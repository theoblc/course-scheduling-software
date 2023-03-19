import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Seances() {
  const title = "Séances";
  const baseURL = "http://localhost:8000/api/seances/";
  const type = "seances";
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

  return (
    <main>
      <List
        title={title}
        baseURL={baseURL}
        type={type}
        item={item}
        columns={columns}
        nameColumns={nameColumns}
      />
    </main>
  );
}

export default withRouter(Seances);
