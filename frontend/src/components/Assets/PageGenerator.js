import React from "react";
import DataTable from "./DataTable";
import DataFetcher from "./DataFetcher";
import Title from "./Title";

function PageGenerator({ listParams }) {
  const { data, fetchData } = DataFetcher(listParams.urlFetch);

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

export default PageGenerator;
