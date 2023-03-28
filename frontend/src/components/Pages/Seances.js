import React from "react";
import List from "../Assets/List";

function Seances() {
  const listParams = {
    title: "Séances",
    urlFetch: "http://localhost:8000/api/seances/",
    urlModify: undefined,
    type: "recap_seances",
    item: {
      date_debut: "",
      date_fin: "",
      numero_groupe_td: "",
      enseignant: "",
      module: "",
      cours: "",
      salle: "",
    },
    columns: [
      { data: "module" },
      { data: "cours" },
      { data: "date_debut" },
      { data: "date_fin" },
      { data: "numero_groupe_td" },
      { data: "salle" },
      { data: "enseignant" },
      { data: null },
    ],
    nameColumns: [
      "Module",
      "Cours",
      "Heure de début",
      "Heure de fin",
      "Groupe de TD",
      "Salle",
      "Enseignant",
      "Action",
    ],
    dom:
      "<'row'<'col-sm-12 col-md-7'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    ordering: true,
    buttons: (
      <div className="btn-group" role="group">
        <button className="rs btn btn-success btn-sm w-70">Détails</button>
      </div>
    ),
  };

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default Seances;
