// Bibliothèques
import React from "react";

// Composants
import Tableau from "./Tableau";
import Titre from "./Titre";
import Ajout from "./Ajout";

// Code
function GenerateurPage({ listParams }) {
  const {
    title,
    url,
    type,
    data,
    fetchData,
    boutonAjout,
    item,
    columns,
    nameColumns,
    buttons,
  } = listParams;

  return (
    <main>
      <Titre type={title} />

      {boutonAjout && (
        <Ajout type={type} item={item} fetchData={fetchData} url={url} />
      )}

      <Tableau
        url={url}
        type={type}
        data={data}
        fetchData={fetchData}
        columns={columns}
        nameColumns={nameColumns}
        buttons={buttons}
      />
    </main>
  );
}

export default GenerateurPage;
