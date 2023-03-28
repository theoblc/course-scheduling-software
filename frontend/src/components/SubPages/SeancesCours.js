import React, { useEffect, useState } from "react";
import List from "../Assets/List";
import { useParams } from "react-router-dom";

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
      date_debut: "",
      date_fin: "",
      numero_groupe_td: "",
      enseignant: 0,
      module: module_id,
      cours: cours_id,
      salle: 0,
    },
    columns: [
      { data: "date_debut" },
      { data: "date_fin" },
      { data: "numero_groupe_td" },
      { data: "salle" },
      { data: "enseignant" },
      { data: null },
    ],
    nameColumns: [
      "Heure de début",
      "Heure de fin",
      "Numéro groupe de TD",
      "Salle",
      "Enseignant",
      "Actions",
    ],
    buttons: (
      <div className="btn-group" role="group">
        <button className="btn btn-warning btn-sm w-70">Modifier</button>
        <button className="btn btn-danger btn-sm w-70">Supprimer</button>
      </div>
    ),
    dom:
      "<'row'<'col-sm-12 col-md-7'f><'col-sm-12 col-md-2'B>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    ordering: true,
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

export default SeancesCours;
