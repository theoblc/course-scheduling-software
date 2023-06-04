// Bibliothèques
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Composants
import Module from "./Module";
import Cours from "./Cours";

// Code
function FicheProgramme() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const raw_data = await fetch(
        `http://157.159.52.53:8000/api/modules/${id}`
      );
      const res = await raw_data.json();

      if (res.coordonnateur2 == null) {
        res.coordonnateur2 = {
          id: 0,
          nom: "",
          prenom: "",
          departement: "",
        };
      }
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
