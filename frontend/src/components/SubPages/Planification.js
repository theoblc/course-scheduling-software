import React from "react";
import { useParams } from "react-router-dom";
import PageGenerator from "../Assets/PageGenerator";
import DataFetcher from "../Assets/DataFetcher";

function Planification() {
  const { id } = useParams();
  const { data } = DataFetcher(`http://localhost:8000/api/modules/${id}`);

  const listParams = {
    title: `Planification de ${data.code}`,
    urlFetch: `http://127.0.0.1:8000/api/modules/${id}/seances/`,
    urlModify: `http://127.0.0.1:8000/api/seances/`,
    type: "seances",
    item: {
      date: "",
      heure_debut: "",
      heure_fin: "",
      effectif: null,
      commentaire: null,
      numero_groupe_td: null,
      module: id,
      cours: null,
      enseignant: null,
      salle: null,
    },
    columns: [
      { data: "cours" },
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
