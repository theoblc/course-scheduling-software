import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import DataTable from "../Assets/DataTable";
import Title from "../Assets/Title";
import Add from "../Assets/Add";

function List({ baseURL, title, type, item, columns, nameColumns }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const raw_data = await fetch(baseURL);
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

        <Add type={type} item={item} fetchData={fetchData} url={baseURL} />

        <DataTable
          columns={columns}
          nameColumns={nameColumns}
          baseURL={baseURL}
          fetchData={fetchData}
          data={data}
          type={type}
        />
      </div>
    </main>
  );
}

export default withRouter(List);
