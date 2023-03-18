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

  return (
    <main>
      <List
        title={title}
        baseURL={baseURL}
        type={type}
        item={item}
        columns={columns}
        nameColumns={nameColumns}
      />
    </main>
  );
}

export default withRouter(Enseignants);
