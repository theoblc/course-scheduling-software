// Bibliothèques
import React from "react";

// Composants
import Tableau from "./Tableau";
import Titre from "./Titre";
import Ajout from "./Ajout";

// Code
function GenerateurPage({ listParams }) {
  return (
    <main>
      <Titre type={listParams.title} />

      <Ajout
        type={listParams.type}
        item={listParams.item}
        fetchData={listParams.fetchData}
        url={listParams.url}
      />

      <Tableau
        columns={listParams.columns}
        nameColumns={listParams.nameColumns}
        url={listParams.url}
        fetchData={listParams.fetchData}
        itemAdd={listParams.item}
        data={listParams.data}
        type={listParams.type}
        buttons={listParams.buttons}
      />
    </main>
  );
}

export default GenerateurPage;
