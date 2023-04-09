import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageGenerator from "../Assets/PageGenerator";

function Planification() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [module, setModule] = useState([]);

  async function fetchData() {
    const raw_data = await fetch(`http://localhost:8000/api/seances/`);
    const res = await raw_data.json();
    const data = [...res];

    const raw_module = await fetch(`http://localhost:8000/api/modules/${id}`);
    const module = await raw_module.json();
    setModule(module);

    for (let i = 0; i < res.length; i++) {
      const idCours = res[i].cours;
      fetch(`http://localhost:8000/api/cours/${idCours}`)
        .then((response) => response.json())
        .then((cours) => {
          data[i].module = module;
          data[i].cours = cours;
        });
    }
    setData(data);
  }

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  const listParams = {
    title: `Planification de ${module.code}`,
    urlFetch: `http://127.0.0.1:8000/api/modules/${id}/seances/`,
    urlModify: `http://127.0.0.1:8000/api/seances/`,
    type: "seances",
    data: data,
    fetchData: fetchData,
    item: {
      date: "",
      heure_debut: "",
      heure_fin: "",
      effectif: null,
      commentaire: null,
      numero_groupe_td: null,
      module: id,
      cours: {
        nom: "",
        nb_heures: 0,
        module: "",
        nb_heures_hors_presentiel: 0,
        type: "",
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
      { data: "effectif" },
      { data: "commentaire" },
      { data: "numero_groupe_td" },
      { data: null },
    ],
    nameColumns: [
      "Cours",
      "Date",
      "Heure de début",
      "Heure de fin",
      "Effectif",
      "Commentaire",
      "Numéro groupe de TD",
      "Actions",
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
