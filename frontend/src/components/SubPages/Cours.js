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
    },
    columns: [{ data: "nom" }, { data: "nb_heures" }, { data: null }],
    nameColumns: ["Nom", "Nombre heures", "Action"],
    add: true,
    buttons:
      '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button><button class="c btn btn-success btn-sm">Séances</button>',
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default Cours;
