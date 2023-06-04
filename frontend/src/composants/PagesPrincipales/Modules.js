// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";
import { getModulesURL } from "../Outils/Urls";

// Code
function Modules() {
  const API_URL_MODULES = getModulesURL();
  const { data, fetchData } = ChargeurDonnees(API_URL_MODULES);

  const listParams = {
    title: "Modules",
    url: API_URL_MODULES,
    type: "modules",
    data: data,
    fetchData: fetchData,
    boutonAjout: true,
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
      <GenerateurPage listParams={listParams} />
    </main>
  );
}

export default Modules;
