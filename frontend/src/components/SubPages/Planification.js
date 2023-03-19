import React, { useEffect, useState } from "react";
import List from "../Assets/List";
import { useParams } from "react-router-dom";
import withRouter from "../Assets/WithRouter";

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
  const baseURL = `http://127.0.0.1:8000/api/modules/${id}/seances/`;
  const baseURLModule = "http://localhost:8000/api/modules/";

  useEffect(() => {
    const fetchData = async () => {
      const urlModule = baseURLModule + id;
      const dataModule = await fetch(urlModule);
      const module = await dataModule.json();
      setModule(module);
    };

    fetchData().catch(console.error);
  }, [id]);

  return (
    <main>
      <List
        title={`Liste des séances de ${module.code}`}
        baseURL={baseURL}
        type="seances"
        item={{
          date_debut: "",
          date_fin: "",
          numero_groupe_td: "",
        }}
        columns={[
          {
            data: () => module.code,
          },
          { data: "cours" },
          { data: "date_debut" },
          { data: "date_fin" },
          { data: "numero_groupe_td" },
          { data: null },
        ]}
        nameColumns={[
          "Module",
          "Cours",
          "Heure de début",
          "Heure de fin",
          "Numéro groupe de TD",
          "Action",
        ]}
      />
    </main>
  );
}

export default withRouter(Planification);
