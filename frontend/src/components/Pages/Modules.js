import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Modules() {
  const title = "Modules";
  const baseURL = "http://localhost:8000/api/modules/";
  const type = "modules";
  const item = {
    code: "",
    nom: "",
    nb_heures_tp: 0,
    nb_heures_td: 0,
    nb_heures_be: 0,
    nb_heures_ci: 0,
    nb_heures_cm: 0,
    nb_heures_total: 0,
  };
  const columns = [
    { data: "code" },
    { data: "nom" },
    { data: "nb_heures_tp" },
    { data: "nb_heures_td" },
    { data: "nb_heures_be" },
    { data: "nb_heures_ci" },
    { data: "nb_heures_cm" },
    { data: "nb_heures_total" },
    { data: null },
  ];
  const nameColumns = [
    "Code",
    "Nom",
    "Nombre d'heures de TP",
    "Nombre d'heures de TD",
    "Nombre d'heures de BE",
    "Nombre d'heures de CI",
    "Nombre d'heures de CM",
    "Nombre heures total",
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

export default withRouter(Modules);
