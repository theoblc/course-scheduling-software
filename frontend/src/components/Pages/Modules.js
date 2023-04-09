import React from "react";
import PageGenerator from "../Assets/PageGenerator";

function Modules() {
  const listParams = {
    title: "Modules",
    urlFetch: "http://localhost:8000/api/modules/",
    urlModify: "http://localhost:8000/api/modules/",
    type: "modules",
    item: {
      code: "",
      nom: "",
      enseignant: "",
      nb_heures_tp: 0,
      nb_heures_td: 0,
      nb_heures_be: 0,
      nb_heures_ci: 0,
      nb_heures_cm: 0,
      nb_heures_total: 0,
    },
    columns: [
      { data: "code", width: "10%" },
      { data: "nom", width: "30%" },
      { data: "enseignant", width: "10%" },
      { data: null, width: "20%" },
    ],
    nameColumns: ["Code", "Nom", "Coordinateur", "Actions"],
    dom:
      "<'row'<'col-sm-12 col-md-7'f><'col-sm-12 col-md-5 d-flex justify-content-end'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
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
      <PageGenerator listParams={listParams} />
    </main>
  );
}

export default Modules;
