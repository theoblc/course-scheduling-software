// Bibliothèques
import React from "react";

// Composants
import DataTable from "./DataTable";
import Title from "./Title";

// Code
function PageGenerator({ listParams }) {
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
        fetchData={listParams.fetchData}
        itemAdd={listParams.item}
        // fin   bouton "ajouter"
        data={listParams.data}
        type={listParams.type}
        buttons={listParams.buttons}
        ordering={listParams.ordering}
      />
    </main>
  );
}

export default PageGenerator;
