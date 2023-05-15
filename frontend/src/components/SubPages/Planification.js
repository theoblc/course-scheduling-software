import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageGenerator from "../Assets/PageGenerator";

function Planification() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [module, setModule] = useState({ code: "" });

  const fetchData = async () => {
    const raw_seances = await fetch(
      `http://localhost:8000/api/modules/${id}/seances`
    );
    const seances = await raw_seances.json();
    setData(seances);

    const raw_module = await fetch(`http://localhost:8000/api/modules/${id}`);
    const res_module = await raw_module.json();
    setModule(res_module);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  const listParams = {
    title: `Planification de ${module.code}`,
    urlFetch: `http://127.0.0.1:8000/api/seances/`,
    urlModify: `http://127.0.0.1:8000/api/seances/`,
    type: "seances",
    data: data,
    fetchData: fetchData,
    item: {
      id: 0,
      date: "",
      heure_debut: "",
      heure_fin: "",
      effectif: null,
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
      },
      enseignant: "",
      salle: "",
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
      { data: "effectif" },
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
      "Effectif",
      "Commentaire",
      "Action",
    ],
    dom:
      "<'row'<'col-sm-12 col-md-7'f><'col-sm-12 col-md-5 d-flex justify-content-end'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    ordering: true,
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
      <PageGenerator listParams={listParams} />
    </main>
  );
}

export default Planification;
