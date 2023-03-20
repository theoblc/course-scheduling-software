import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import DataTable from "../Assets/DataTable";
import Title from "../Assets/Title";
import Add from "../Assets/Add";

function List({
  urlFetch,
  urlModify,
  title,
  type,
  item,
  columns,
  nameColumns,
  add,
  buttons,
}) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const raw_data = await fetch(urlFetch);
    const res = await raw_data.json();
    setData(res);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
        <Title type={title} />

        {add && (
          <Add type={type} item={item} fetchData={fetchData} url={urlFetch} />
        )}

        <DataTable
          columns={columns}
          nameColumns={nameColumns}
          baseURL={urlModify}
          fetchData={fetchData}
          data={data}
          type={type}
          buttons={buttons}
        />
      </div>
    </main>
  );
}

export default withRouter(List);
