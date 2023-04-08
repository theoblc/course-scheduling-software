import React, { useEffect, useState } from "react";
import List from "../Assets/List";
import { useParams } from "react-router-dom";

function Planification() {
  const { id } = useParams();
  const [module, setModule] = useState({
    id: 0,
    code: "",
    nom: "",
    nb_heures_tp: 0,
    nb_heures_be: 0,
    nb_heures_td: 0,
    nb_heures_cm: 0,
    nb_heures_ci: 0,
    nb_heures_total: 0,
    seances: null,
    cours: null,
  });

  const listParams = {
    title: `Planification de ${module.code}`,
    urlFetch: `http://127.0.0.1:8000/api/modules/${id}/seances/`,
    urlModify: undefined,
    type: "seances",
    item: {
      date_debut: "",
      date_fin: "",
      effectif: "",
      commentaire: "",
      numero_groupe_td: "",
    },
    columns: [
      { data: "cours" },
      { data: "date" },
      { data: "heure_debut" },
      { data: "heure_fin" },
      { data: "effectif" },
      { data: "commentaire" },
      { data: "numero_groupe_td" },
      { data: null },
    ],
    nameColumns: [
      "Cours",
      "Date",
      "Heure de début",
      "Heure de fin",
      "Effectif",
      "Commentaire",
      "Numéro groupe de TD",
      "Actions",
    ],
    dom:
      "<'row'<'col-sm-12 col-md-7'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    ordering: false,
    buttons: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlModule = `http://localhost:8000/api/modules/${id}`;
      const dataModule = await fetch(urlModule);
      const module = await dataModule.json();
      setModule(module);
    };

    fetchData().catch(console.error);
  }, [id]);

  return (
    <main>
      <List listParams={listParams} />
    </main>
  );
}

export default Planification;
