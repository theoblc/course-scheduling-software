import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Salles() {
  const listParams = {
    title: "Salles",
    urlFetch: "http://localhost:8000/api/salles/",
    urlModify: "http://localhost:8000/api/salles/",
    type: "salles",
    item: {
      numero: "",
    },
    columns: [{ data: "numero" }, { data: null }],
    nameColumns: ["Numéro", "Action"],
    add: true,
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

export default withRouter(Salles);
