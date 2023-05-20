// Bibliothèques
import React from "react";

// Composants
import DataFetcher from "../Assets/DataFetcher";
import PageGenerator from "../Assets/PageGenerator";

// Code
function Enseignants() {
  const { data, fetchData } = DataFetcher(
    "http://localhost:8000/api/enseignants/"
  );

  const listParams = {
    title: "Enseignants",
    urlFetch: "http://localhost:8000/api/enseignants/",
    urlModify: "http://localhost:8000/api/enseignants/",
    type: "enseignants",
    data: data,
    fetchData: fetchData,
    item: {
      nom: "",
      prenom: "",
      departement: "EPH",
    },
    columns: [
      { data: "nom" },
      { data: "prenom" },
      { data: "departement" },
      { data: null },
    ],
    nameColumns: ["Nom", "Prénom", "Département", "Action"],
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
      <PageGenerator listParams={listParams} />
    </main>
  );
}

export default Enseignants;
