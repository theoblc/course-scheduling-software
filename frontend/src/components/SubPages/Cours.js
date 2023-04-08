import React, { useContext } from "react";
import FicheProgrammeContext from "../Assets/Contexte";
import List from "../Assets/List";

function Cours() {
  const module = useContext(FicheProgrammeContext);
  const listParams = {
    title: "Liste des cours",
    urlFetch: `http://127.0.0.1:8000/api/modules/${module.id}/cours/`,
    urlModify: "http://localhost:8000/api/cours/",
    type: "cours",
    item: {
      nom: "",
      nb_heures: 0,
      module: module.id,
      nb_heures_hors_presentiel: 0,
      type: "",
    },
    columns: [
      { data: "nom" },
      { data: "nb_heures" },
      { data: "nb_heures_hors_presentiel" },
      { data: "type" },
      { data: null },
    ],
    nameColumns: [
      "Nom",
      "Nombre heures",
      "Nombre heures hors présentiel",
      "Type",
      "Action",
    ],
    dom:
      "<'row'<'col-sm-12 col-md-7'f><'col-sm-12 col-md-5 d-flex justify-content-end'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    ordering: false,
    buttons: (
      <div className="btn-group" role="group">
        <button className="btn btn-warning btn-sm w-70">Modifier</button>
        <button className="btn btn-danger btn-sm w-70">Supprimer</button>
      </div>
    ),
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default Cours;
