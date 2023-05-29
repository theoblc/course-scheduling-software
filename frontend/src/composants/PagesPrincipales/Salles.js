// Bibliothèques
import React from "react";

// Composants
import ChargeurDonnees from "../Outils/ChargeurDonnees";
import PageGenerator from "../ElementsInterface/GenerateurPage";

// Code
function Salles() {
  const { data, fetchData } = ChargeurDonnees(
    "http://localhost:8000/api/salles/"
  );

  const listParams = {
    title: "Salles",
    url: "http://localhost:8000/api/salles/",
    type: "salles",
    data: data,
    fetchData: fetchData,
    item: {
      numero: "",
      description: "",
    },
    columns: [{ data: "numero" }, { data: "description" }, { data: null }],
    nameColumns: ["Numéro", "Description", "Action"],
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

export default Salles;
