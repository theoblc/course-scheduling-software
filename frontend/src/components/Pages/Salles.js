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

export default withRouter(Salles);
