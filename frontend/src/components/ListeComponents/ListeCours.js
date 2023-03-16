import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import DataTable from "../Assets/DataTable";
import Add from "../Assets/Add";

function ListeCours(props) {
  const [listCours, setListCours] = useState([]);
  const idModule = props.idModule;
  const baseURL = `http://127.0.0.1:8000/api/modules/${idModule}/cours/`;

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const cours = await data.json();
    setListCours(cours);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Title type="Liste des cours" />

      <Add
        type="cours"
        item={{
          nom: "",
          nb_heures: 0,
        }}
        fetchData={fetchData}
        url={baseURL}
      />

      <DataTable
        columns={[{ data: "nom" }, { data: "nb_heures" }, { data: null }]}
        nameColumns={["Nom", "Nombre heures", "Action"]}
        baseURL={"http://127.0.0.1:8000/api/cours/"}
        fetchData={fetchData}
        data={listCours}
        type="cours"
      />
    </main>
  );
}

export default withRouter(ListeCours);
