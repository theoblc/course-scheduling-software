import React from "react";
import List from "../Assets/List";

function Salles() {
  const listParams = {
    title: "Salles",
    urlFetch: "http://localhost:8000/api/salles/",
    urlModify: "http://localhost:8000/api/salles/",
    type: "salles",
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
      <List listParams={listParams} />
    </main>
  );
}

export default Salles;
