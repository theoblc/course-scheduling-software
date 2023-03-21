import React, { useEffect, useState } from "react";
import List from "../Assets/List";
import { useParams } from "react-router-dom";
import withRouter from "../Assets/WithRouter";

function SeancesCours() {
  const { cours_id } = useParams();
  const [cours, setCours] = useState({
    nom: "",
    nb_heures: 0,
  });
  const urlFetch = `http://127.0.0.1:8000/api/cours/${cours_id}/seances/`;

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
      <List
        title={`Séances du cours : ${cours.nom}`}
        urlFetch={urlFetch}
        type="seances"
        item={{
          date_debut: "",
          date_fin: "",
          numero_groupe_td: "",
        }}
        columns={[
          { data: "date_debut" },
          { data: "date_fin" },
          { data: "numero_groupe_td" },
          { data: null },
        ]}
        nameColumns={[
          "Heure de début",
          "Heure de fin",
          "Numéro groupe de TD",
          "Actions",
        ]}
        add={false}
        buttons={""}
      />
    </main>
  );
}

export default withRouter(SeancesCours);
