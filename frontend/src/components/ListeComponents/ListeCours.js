import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import Add from "../Assets/Add";
import DataTable from "../Assets/DataTable";

function ListeCours() {
  const [listCours, setListCours] = useState([]);
  const baseURL = "http://localhost:8000/api/cours/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const cours = await data.json();
    setListCours(cours);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <main>
      <Title type="cours" />

      <Add
        type="cours"
        item={{
          nom: "",
          nb_heures: "",
        }}
        fetchData={fetchData}
      />

      <DataTable
        columns={[{ data: "nom" }, { data: "nb_heures" }, { data: null }]}
        nameColumns={["Nom", "Nombre heures", "Action"]}
        baseURL={baseURL}
        fetchData={fetchData}
        data={listCours}
        type="cours"
      />
    </main>
  );
}

export default withRouter(ListeCours);
