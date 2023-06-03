// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import GenerateurPage from "../ElementsInterface/GenerateurPage";

// Code
function PlanificationEPH() {
  const API_URL_SEANCES = "http://localhost:8000/api/seances/";
  const { data, fetchData } = ChargeurDonnees(API_URL_SEANCES);

  const listParams = {
    title: "Planification EPH",
    url: API_URL_SEANCES,
    type: "seances",
    data: data,
    fetchData: fetchData,
    boutonAjout: false,
    item: {
      date: "",
      heure_debut: "",
      heure_fin: "",
      commentaire: "",
      numero_groupe_td: "",
      enseignant: {
        nom: "",
        prenom: "",
        departement: "EPH",
      },
      module: {
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
      cours: {
        nom: "",
        nb_heures: 0,
        module: 0,
        nb_heures_hors_presentiel: 0,
        type: "",
        effectif: "",
      },
      salle: {
        numero: "",
        description: "",
      },
    },
    columns: [
      {
        data: "module",
        render: function (data) {
          const { code } = data;
          return `${code}`;
        },
      },
      {
        data: "cours",
        render: function (data) {
          const { nom } = data;
          return `${nom}`;
        },
      },
      { data: "date" },
      { data: "heure_debut" },
      { data: "heure_fin" },
      { data: "numero_groupe_td" },
      {
        data: "salle",
        render: function (data) {
          if (data) {
            const { numero } = data;
            return `${numero}`;
          } else {
            return "";
          }
        },
      },
      {
        data: "enseignant",
        render: function (data) {
          if (data) {
            const { nom, prenom } = data;
            return `${nom} ${prenom}`;
          } else {
            return "";
          }
        },
      },
      { data: "commentaire" },
    ],
    nameColumns: [
      "Module",
      "Cours",
      "Date",
      "Heure de début",
      "Heure de fin",
      "Groupe de TD",
      "Salle",
      "Enseignant",
      "Commentaire",
    ],
    buttons: "",
  };

  return (
    <main>
      <GenerateurPage listParams={listParams} />
    </main>
  );
}

export default PlanificationEPH;
