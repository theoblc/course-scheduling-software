import React, { useEffect, useState } from "react";
import DataTable from "../Assets/DataTable";
import Title from "../Assets/Title";
import Add from "../Assets/Add";

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
        columns={listParams.columns}
        nameColumns={listParams.nameColumns}
        baseURL={listParams.urlModify}
        fetchURL={listParams.urlFetch}
        fetchData={fetchData}
        itemAdd={listParams.item}
        data={data}
        type={listParams.type}
        item={listParams.item}
        url={listParams.urlModify}
      />
    </main>
  );
}

export default List;
