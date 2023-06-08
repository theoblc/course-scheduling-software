// Bibliothèques
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Composants
import Module from "./Module";
import Cours from "./Cours";
import { getModuleURL } from "../Outils/Urls";

/**
 * Le rôle de ce composant est d'afficher la page "FicheProgramme" d'un module.
 */
function FicheProgramme() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL_MODULE = getModuleURL(id);
      const raw_data = await fetch(API_URL_MODULE);
      const res = await raw_data.json();
      setData(res);
    };

    fetchData();
  }, [id]);

  // Affiche un message de chargement pendant la récupération des données.
  if (data === null) {
    return <div>Chargement des données...</div>;
  }

  return (
    <>
      <Module data={data} />
      <hr className="mt-4 mb-0" />
      <Cours module={data} />
    </>
  );
}

export default FicheProgramme;
