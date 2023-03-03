import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import Add from "../Assets/Add";
import DataTable from "../Assets/DataTable";

function ListeSeance() {
  const [listSeances, setListSeances] = useState([]);
  const baseURL = "http://localhost:8000/api/seances/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const seances = await data.json();
    setListSeances(seances);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <main>
      <Title type="séances" />

      <Add
        type="seances"
        item={{
          date_debut: "",
          date_fin: "",
          numero_groupe_td: "",
        }}
        fetchData={fetchData}
      />

      <DataTable
        columns={[
          { data: "date_debut" },
          { data: "date_fin" },
          { data: "numero_groupe_td" },
          { data: null },
        ]}
        nameColumns={[
          "Heure de début",
          "Heure de fin",
          "Numéro groupe de TD",
          "Action",
        ]}
        baseURL={baseURL}
        fetchData={fetchData}
        data={listSeances}
        type="seances"
      />
    </main>
  );
}

export default withRouter(ListeSeance);
