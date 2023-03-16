import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import Add from "../Assets/Add";
import DataTable from "../Assets/DataTable";

function ListeSalle() {
  const [listSalles, setListSalles] = useState([]);
  const baseURL = "http://localhost:8000/api/salles/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const salles = await data.json();
    setListSalles(salles);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <main>
      <Title type="Salles" />

      <Add
        type="salles"
        item={{
          numero: "",
        }}
        fetchData={fetchData}
        url={baseURL}
      />

      <DataTable
        columns={[{ data: "numero" }, { data: null }]}
        nameColumns={["Numéro", "Action"]}
        baseURL={baseURL}
        fetchData={fetchData}
        data={listSalles}
        type="salles"
      />
    </main>
  );
}

export default withRouter(ListeSalle);
