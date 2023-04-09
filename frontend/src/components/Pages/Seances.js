import React, { useEffect, useState } from "react";
import PageGenerator from "../Assets/PageGenerator";

function Seances() {
  const [data, setData] = useState([]);

  async function fetchData() {
    const raw_data = await fetch("http://localhost:8000/api/seances/");
    const res = await raw_data.json();
    const data = [...res];
    for (let i = 0; i < res.length; i++) {
      const idModule = res[i].module;
      fetch(`http://localhost:8000/api/modules/${idModule}`)
        .then((response) => response.json())
        .then((module) => {
          data[i].module = module;
        });

      const idCours = res[i].cours;
      fetch(`http://localhost:8000/api/cours/${idCours}`)
        .then((response) => response.json())
        .then((cours) => {
          data[i].cours = cours;
        });

      const idEnseignant = res[i].enseignant;
      if (idEnseignant !== null) {
        fetch(`http://localhost:8000/api/enseignants/${idEnseignant}`)
          .then((response) => response.json())
          .then((enseignant) => {
            data[i].enseignant = enseignant;
          });
      }

      const idSalle = res[i].salle;
      if (idSalle !== null) {
        fetch(`http://localhost:8000/api/salles/${idSalle}`)
          .then((response) => response.json())
          .then((salle) => {
            data[i].salle = salle;
          });
      }
    }
    setData(data);
  }

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  const listParams = {
    title: "Séances",
    urlFetch: "http://localhost:8000/api/seances/",
    urlModify: undefined,
    type: "recap_seances",
    data: data,
    fetchData: fetchData,
    item: {
      date: "",
      heure_debut: "",
      heure_fin: "",
      effectif: "",
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
      { data: "effectif" },
      { data: "commentaire" },
      { data: null },
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
      "Effectif",
      "Commentaire",
      "Action",
    ],
    dom:
      "<'row'<'col-sm-12 col-md-7'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    ordering: true,
    buttons: "",
  };

  return (
    <main>
      <PageGenerator listParams={listParams} />
    </main>
  );
}

export default Seances;
