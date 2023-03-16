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
      <Title type="Enseignants" />

      <Add
        type="enseignants"
        item={{
          nom: "",
          prenom: "",
          departement: "EPH",
        }}
        fetchData={fetchData}
        url={baseURL}
      />

      <DataTable
        columns={[
          { data: "nom" },
          { data: "prenom" },
          { data: "departement" },
          { data: null },
        ]}
        nameColumns={["Nom", "Prénom", "Département", "Action"]}
        baseURL={baseURL}
        fetchData={fetchData}
        data={listEnseignants}
        type="enseignants"
      />
    </main>
  );
}

export default withRouter(ListeEnseignant);
