// Bibliothèques
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Composants
import GenerateurPage from "../ElementsInterface/GenerateurPage";

// Code
function PlanificationModule() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [module, setModule] = useState({ code: "" });
  const API_URL_SEANCES = "http://157.159.52.53:8000/api/seances/";

  const fetchData = async () => {
    const raw_seances = await fetch(
      `http://157.159.52.53:8000/api/modules/${id}/seances`
    );
    const seances = await raw_seances.json();
    setData(seances);

    const raw_module = await fetch(
      `http://157.159.52.53:8000/api/modules/${id}`
    );
    const res_module = await raw_module.json();
    setModule(res_module);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  const listParams = {
    title: `Planification de ${module.code}`,
    url: API_URL_SEANCES,
    type: "seances",
    data: data,
    fetchData: fetchData,
    boutonAjout: true,
    item: {
      id: 0,
      date: "",
      heure_debut: "",
      heure_fin: "",
      commentaire: null,
      numero_groupe_td: null,
      module: module,
      cours: {
        id: 0,
        nom: "",
        nb_heures: 0,
        module: "",
        nb_heures_hors_presentiel: 0,
        type: "",
        effectif: "",
      },
      enseignant: null,
      salle: null,
    },
    columns: [
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
      { data: null },
    ],
    nameColumns: [
      "Cours",
      "Date",
      "Heure de début",
      "Heure de fin",
      "Groupe de TD",
      "Salle",
      "Enseignant",
      "Commentaire",
      "Action",
    ],
    buttons: (
      <div className="btn-group" role="group">
        <button className="btn btn-success btn-sm w-70">Dupliquer</button>
        <button className="btn btn-warning btn-sm w-70">Modifier</button>
        <button className="btn btn-danger btn-sm w-70">Supprimer</button>
      </div>
    ),
  };

  return (
    <main>
      <GenerateurPage listParams={listParams} />
    </main>
  );
}

export default PlanificationModule;
