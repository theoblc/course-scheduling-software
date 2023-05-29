// Bibliothèques
import React from "react";

// Composants
import Tableau from "./Tableau";
import Titre from "./Titre";

// Code
function GenerateurPage({ listParams }) {
  return (
    <main>
      <Titre type={listParams.title} />

      <Tableau
        dom={listParams.dom}
        columns={listParams.columns}
        nameColumns={listParams.nameColumns}
        url={listParams.url}
        fetchData={listParams.fetchData}
        itemAdd={listParams.item}
        data={listParams.data}
        type={listParams.type}
        buttons={listParams.buttons}
        ordering={listParams.ordering}
      />
    </main>
  );
}

export default GenerateurPage;
