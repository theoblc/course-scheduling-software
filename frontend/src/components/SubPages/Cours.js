import React from "react";
import List from "../Assets/List";

function Cours({ idModule }) {
  const baseURL = `http://127.0.0.1:8000/api/modules/${idModule}/cours/`;

  return (
    <main>
      <List
        title="Liste des cours"
        baseURL={baseURL}
        type="cours"
        item={{
          nom: "",
          nb_heures: 0,
        }}
        columns={[{ data: "nom" }, { data: "nb_heures" }, { data: null }]}
        nameColumns={["Nom", "Nombre heures", "Action"]}
      />
    </main>
  );
}

export default Cours;
