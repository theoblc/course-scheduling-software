import React, { useEffect, useState } from "react";
import List from "../Assets/List";
import { useParams } from "react-router-dom";
import withRouter from "../Assets/WithRouter";

function SeancesCours() {
  const { module_id, cours_id } = useParams();
  const [cours, setCours] = useState({
    nom: "",
    nb_heures: 0,
  });

  const listParams = {
    title: `Séances du cours : ${cours.nom}`,
    urlFetch: `http://127.0.0.1:8000/api/cours/${cours_id}/seances/`,
    urlModify: "http://127.0.0.1:8000/api/seances/",
    type: "seances",
    item: {
      module: module_id,
      date_debut: "",
      date_fin: "",
      numero_groupe_td: "",
    },
    columns: [
      { data: "date_debut" },
      { data: "date_fin" },
      { data: "numero_groupe_td" },
      { data: null },
    ],
    nameColumns: [
      "Heure de début",
      "Heure de fin",
      "Numéro groupe de TD",
      "Actions",
    ],
    add: true,
    buttons:
      '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>',
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlCours = `http://localhost:8000/api/cours/${cours_id}`;
      const dataCours = await fetch(urlCours);
      const cours = await dataCours.json();
      setCours(cours);
    };

    fetchData().catch(console.error);
  }, [cours_id]);

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default withRouter(SeancesCours);
