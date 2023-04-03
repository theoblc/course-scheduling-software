import React from "react";
import List from "../Assets/List";

function Cours({ idModule }) {
  const listParams = {
    title: "Liste des cours",
    urlFetch: `http://127.0.0.1:8000/api/modules/${idModule}/cours/`,
    urlModify: "http://localhost:8000/api/cours/",
    type: "cours",
    item: {
      nom: "",
      nb_heures: 0,
      module: idModule,
    },
    columns: [{ data: "nom" }, { data: "nb_heures" }, { data: null }],
    nameColumns: ["Nom", "Nombre heures", "Action"],
    add: true,
    buttons: (
      <div className="btn-group" role="group">
        <button className="c btn btn-success btn-sm w-70">Séances</button>
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
