import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Modules() {
  const listParams = {
    title: "Modules",
    urlFetch: "http://localhost:8000/api/modules/",
    urlModify: "http://localhost:8000/api/modules/",
    type: "modules",
    item: {
      code: "",
      nom: "",
      nb_heures_tp: 0,
      nb_heures_td: 0,
      nb_heures_be: 0,
      nb_heures_ci: 0,
      nb_heures_cm: 0,
      nb_heures_total: 0,
    },
    columns: [
      { data: "code" },
      { data: "nom" },
      { data: "nb_heures_cm" },
      { data: "nb_heures_ci" },
      { data: "nb_heures_td" },
      { data: "nb_heures_tp" },
      { data: "nb_heures_be" },
      { data: "nb_heures_total" },
      { data: null },
    ],
    nameColumns: [
      "Code",
      "Nom",
      "Nombre d'heures de CM",
      "Nombre d'heures de CI",
      "Nombre d'heures de TD",
      "Nombre d'heures de TP",
      "Nombre d'heures de BE",
      "Nombre heures total",
      "Action",
    ],
    add: true,
    ordering: false,
    buttons: (
      <div className="btn-group" role="group">
        <button className="btn btn-secondary btn-sm w-70">
          Fiche Programme
        </button>
        <button className="btn btn-dark btn-sm w-70">Planification</button>
      </div>
    ),
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default withRouter(Modules);
