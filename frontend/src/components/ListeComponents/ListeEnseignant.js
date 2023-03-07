import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import Add from "../Assets/Add";
import DataTable from "../Assets/DataTable";

function ListeEnseignant() {
  const [listEnseignants, setListEnseignants] = useState([]);
  const baseURL = "http://localhost:8000/api/enseignants/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const enseignants = await data.json();
    setListEnseignants(enseignants);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <main>
      <Title type="Liste des enseignants" />

      <Add
        type="enseignants"
        item={{
          nom: "",
          prenom: "",
          departement: "EPH",
        }}
        fetchData={fetchData}
      />

      <DataTable
        columns={[
          { data: "prenom" },
          { data: "nom" },
          { data: "departement" },
          { data: null },
        ]}
        nameColumns={["Prénom", "Nom", "Département", "Action"]}
        baseURL={baseURL}
        fetchData={fetchData}
        data={listEnseignants}
        type="enseignants"
      />
    </main>
  );
}

export default withRouter(ListeEnseignant);
