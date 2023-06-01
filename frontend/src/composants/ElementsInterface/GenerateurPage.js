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
