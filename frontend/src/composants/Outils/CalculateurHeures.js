// Bibliothèques
import { useEffect, useState } from "react";
import { getModuleCoursURL } from "./Urls";

/**
 * Le rôle de ce composant est de calculer et de retourner les heures totales d'un module.
 * Le composant récupère la liste des cours du module d'identifiant "id" puis somme les heures.
 */
function CalculHeures(id) {
  const [listeCours, setListeCours] = useState([]);
  const [result, setResult] = useState({
    nb_heures_be: 0.0,
    nb_heures_tp: 0.0,
    nb_heures_td: 0.0,
    nb_heures_cm: 0.0,
    nb_heures_ci: 0.0,
    nb_heures_hors_presentiel: 0.0,
    nb_heures_total: 0.0,
  });

  useEffect(() => {
    async function fetchData() {
      const API_URL_MODULE_COURS = getModuleCoursURL(id);
      const raw_data = await fetch(API_URL_MODULE_COURS);
      const data = await raw_data.json();
      setListeCours(data);
    }
    fetchData().catch(console.error);
  }, [id]);

  useEffect(() => {
    function calcul() {
      let res = {
        nb_heures_be: 0.0,
        nb_heures_tp: 0.0,
        nb_heures_td: 0.0,
        nb_heures_cm: 0.0,
        nb_heures_ci: 0.0,
        nb_heures_hors_presentiel: 0.0,
        nb_heures_total: 0.0,
      };
      listeCours.forEach((cours) => {
        res.nb_heures_hors_presentiel += Number.parseFloat(
          cours.nb_heures_hors_presentiel
        );
        if (cours.type === "CM") {
          res.nb_heures_cm += Number.parseFloat(cours.nb_heures);
        } else if (cours.type === "CI") {
          res.nb_heures_ci += Number.parseFloat(cours.nb_heures);
        } else if (cours.type === "TD") {
          res.nb_heures_td += Number.parseFloat(cours.nb_heures);
        } else if (cours.type === "TP") {
          res.nb_heures_tp += Number.parseFloat(cours.nb_heures);
        } else if (cours.type === "BE") {
          res.nb_heures_be += Number.parseFloat(cours.nb_heures);
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
