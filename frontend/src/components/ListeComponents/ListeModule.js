import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import Add from "../Assets/Add";
import DataTable from "../Assets/DataTable";

function ListeModule() {
  const [listModules, setListModules] = useState([]);
  const baseURL = "http://localhost:8000/api/modules/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const modules = await data.json();
    setListModules(modules);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <main>
      <Title type="modules" />

      <Add
        type="modules"
        item={{
          code: "",
          nom: "",
          nb_heures_tp: 0,
          nb_heures_td: 0,
          nb_heures_be: 0,
          nb_heures_ci: 0,
          nb_heures_cm: 0,
          nb_heures_total: 0,
        }}
        fetchData={fetchData}
      />

      <DataTable
        columns={[
          { data: "code" },
          { data: "nom" },
          { data: "nb_heures_tp" },
          { data: "nb_heures_td" },
          { data: "nb_heures_be" },
          { data: "nb_heures_ci" },
          { data: "nb_heures_cm" },
          { data: "nb_heures_total" },
          { data: null },
        ]}
        nameColumns={[
          "Code",
          "Nom",
          "Nombre d'heures de TP",
          "Nombre d'heures de TD",
          "Nombre d'heures de BE",
          "Nombre d'heures de CI",
          "Nombre d'heures de CM",
          "Nombre heures total",
          "Action",
        ]}
        baseURL={baseURL}
        fetchData={fetchData}
        data={listModules}
        type="modules"
      />
    </main>
  );
}

export default withRouter(ListeModule);
