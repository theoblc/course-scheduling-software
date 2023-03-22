import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
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
      <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
        <Title type={listParams.title} />

        {listParams.add && (
          <Add
            type={listParams.type}
            item={listParams.item}
            fetchData={fetchData}
            url={listParams.urlFetch}
          />
        )}

        <DataTable
          columns={listParams.columns}
          nameColumns={listParams.nameColumns}
          baseURL={listParams.urlModify}
          fetchData={fetchData}
          data={data}
          type={listParams.type}
          buttons={listParams.buttons}
        />
      </div>
    </main>
  );
}

export default withRouter(List);
