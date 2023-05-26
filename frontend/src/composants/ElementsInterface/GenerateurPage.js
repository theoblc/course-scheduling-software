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

export default GenerateurPage;
