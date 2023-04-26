import { useEffect, useState } from "react";

function CalculHeures(id) {
  const [listeCours, setListeCours] = useState([]);
  const [result, setResult] = useState({
    nb_heures_be: 0,
    nb_heures_tp: 0,
    nb_heures_td: 0,
    nb_heures_cm: 0,
    nb_heures_ci: 0,
    nb_heures_hors_presentiel: 0,
    nb_heures_total: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const raw_data = await fetch(
        `http://localhost:8000/api/modules/${id}/cours/`
      );
      const data = await raw_data.json();
      setListeCours(data);
    }
    fetchData().catch(console.error);
  }, [id]);

  useEffect(() => {
    function calcul() {
      let res = {
        nb_heures_be: 0,
        nb_heures_tp: 0,
        nb_heures_td: 0,
        nb_heures_cm: 0,
        nb_heures_ci: 0,
        nb_heures_hors_presentiel: 0,
        nb_heures_total: 0,
      };
      listeCours.forEach((cours) => {
        res.nb_heures_hors_presentiel += Number(
          cours.nb_heures_hors_presentiel
        );
        if (cours.type === "CM") {
          res.nb_heures_cm += Number(cours.nb_heures);
        } else if (cours.type === "CI") {
          res.nb_heures_ci += Number(cours.nb_heures);
        } else if (cours.type === "TD") {
          res.nb_heures_td += Number(cours.nb_heures);
        } else if (cours.type === "TP") {
          res.nb_heures_tp += Number(cours.nb_heures);
        } else if (cours.type === "BE") {
          res.nb_heures_be += Number(cours.nb_heures);
        }
      });
      res.nb_heures_total =
        res.nb_heures_hors_presentiel +
        res.nb_heures_cm +
        res.nb_heures_ci +
        res.nb_heures_td +
        res.nb_heures_tp +
        res.nb_heures_be;
      setResult(res);
    }

    calcul();
  }, [listeCours]);

  return result;
}

export default CalculHeures;
