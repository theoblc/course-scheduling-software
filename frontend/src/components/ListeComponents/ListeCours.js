import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import DataTable from "../Assets/DataTable";

function ListeCours(props) {
  const [listCours, setListCours] = useState([]);
  const idModule = props.idModule;

  useEffect(() => {
    const fetchData = async () => {
      let url = `http://127.0.0.1:8000/api/module/${idModule}/cours/`;
      console.log(url);
      const data = await fetch(url);
      const cours = await data.json();
      setListCours(cours);
    };

    fetchData().catch(console.error);
  }, [idModule]);

  return (
    <main>
      <Title type="Cours" />

      <DataTable
        columns={[{ data: "nom" }, { data: "nb_heures" }, { data: null }]}
        nameColumns={["Nom", "Nombre heures", "Action"]}
        data={listCours}
        type="cours"
      />
    </main>
  );
}

export default withRouter(ListeCours);
