import React, { useEffect, useState } from "react";
import DataTable from "../Assets/DataTable";
import Title from "../Assets/Title";

function List({ listParams }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const raw_data = await fetch(listParams.urlFetch);
    const res = await raw_data.json();
    setData(res);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Title type={listParams.title} />

      <DataTable
        dom={listParams.dom}
        columns={listParams.columns}
        nameColumns={listParams.nameColumns}
        baseURL={listParams.urlModify}
        fetchURL={listParams.urlFetch}
        // début bouton "ajouter"
        fetchData={fetchData}
        itemAdd={listParams.item}
        // fin   bouton "ajouter"
        data={data}
        type={listParams.type}
        buttons={listParams.buttons}
        ordering={listParams.ordering}
      />
    </main>
  );
}

export default List;
