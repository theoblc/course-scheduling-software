import React from "react";
import withRouter from "../Assets/WithRouter";
import List from "../Assets/List";

function Salles() {
  const title = "Salles";
  const baseURL = "http://localhost:8000/api/salles/";
  const type = "salles";
  const item = {
    numero: "",
  };
  const columns = [{ data: "numero" }, { data: null }];
  const nameColumns = ["Numéro", "Action"];
  const buttons =
    '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>';

  return (
    <main>
      <List
        title={title}
        urlFetch={baseURL}
        urlModify={baseURL}
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

export default withRouter(Salles);
