// Bibliothèques
import React from "react";

// Composants
import DataFetcher from "../Outils/ChargeurDonnees";
import PageGenerator from "../ElementsInterface/GenerateurPage";

// Code
function Modules() {
  const { data, fetchData } = DataFetcher("http://localhost:8000/api/modules/");

  const listParams = {
    title: "Modules",
    urlFetch: "http://localhost:8000/api/modules/",
    urlModify: "http://localhost:8000/api/modules/",
    type: "modules",
    data: data,
    fetchData: fetchData,
    item: {
      code: "",
      nom: "",
      coordonnateur1: {
        id: 0,
        nom: "",
        prenom: "",
        departement: "",
      },
      coordonnateur2: {
        id: 0,
        nom: "",
        prenom: "",
        departement: "",
      },
      nb_heures_tp: 0,
      nb_heures_td: 0,
      nb_heures_be: 0,
      nb_heures_ci: 0,
      nb_heures_cm: 0,
      nb_heures_hors_presentiel: 0,
      nb_heures_total: 0,
    },
    columns: [
      { data: "code", width: "10%" },
      { data: "nom", width: "30%" },
      {
        data: "coordonnateur1",
        width: "10%",
        render: function (data) {
          if (data) {
            const { nom, prenom } = data;
            return `${nom} ${prenom}`;
          } else {
            return "";
          }
        },
      },
      {
        data: "coordonnateur2",
        width: "10%",
        render: function (data) {
          if (data) {
            const { nom, prenom } = data;
            return `${nom} ${prenom}`;
          } else {
            return "";
          }
        },
      },
      { data: null, width: "20%" },
    ],
    nameColumns: ["Code", "Nom", "Coordonnateur1", "Coordonnateur2", "Actions"],
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
