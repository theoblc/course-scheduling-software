import React from "react";
import List from "../Assets/List";

function Seances() {
  const listParams = {
    title: "Séances",
    urlFetch: "http://localhost:8000/api/seances/",
    urlModify: undefined,
    type: "recap_seances",
    item: {
      date_debut: "",
      date_fin: "",
      numero_groupe_td: "",
      enseignant: "",
      module: "",
      cours: "",
      salle: "",
    },
    columns: [
      { data: "module" },
      { data: "cours" },
      { data: "date_debut" },
      { data: "date_fin" },
      { data: "numero_groupe_td" },
      { data: "salle" },
      { data: "enseignant" },
      { data: null },
    ],
    nameColumns: [
      "Module",
      "Cours",
      "Heure de début",
      "Heure de fin",
      "Groupe de TD",
      "Salle",
      "Enseignant",
      "Action",
    ],
    add: false,
    ordering: true,
    buttons: (
      <div className="btn-group" role="group">
        <button className="rs btn btn-success btn-sm w-70">Détails</button>
      </div>
    ),
  };

  /** 
  // On récupère le nom du module et le nom du cours de la séance.
  const fetchData = async () => {
    let url_module = `http://localhost:8000/api/modules/${item.module}`;
    const raw_module = await fetch(url_module);
    const module = await raw_module.json();
    setModule(module);

    let url_cours = `http://localhost:8000/api/cours/${item.cours}`;
    const raw_cours = await fetch(url_cours);
    const cours = await raw_cours.json();
    setCours(cours);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);
  */

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default Seances;
