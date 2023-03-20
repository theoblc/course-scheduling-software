import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Enseignants() {
  const title = "Enseignants";
  const baseURL = "http://localhost:8000/api/enseignants/";
  const type = "enseignants";
  const item = {
    nom: "",
    prenom: "",
    departement: "EPH",
  };
  const columns = [
    { data: "nom" },
    { data: "prenom" },
    { data: "departement" },
    { data: null },
  ];
  const nameColumns = ["Nom", "Prénom", "Département", "Action"];
  const buttons =
    '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>';

  return (
    <main>
      <List
        title={title}
        urlFetch={baseURL}
        urlModify={baseURL}
        baseURL={baseURL}
        type={type}
        item={item}
        columns={columns}
        nameColumns={nameColumns}
        add={true}
        buttons={buttons}
      />
    </main>
  );
}

export default withRouter(Enseignants);
