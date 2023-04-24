import React, { useState, useEffect } from "react";

function Chevauchements() {
  const [nbChevauchements, setNbChevauchements] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/seances/chevauchements");
      const data = await response.json();
      setNbChevauchements(data.nb_chevauchements);
    }
    fetchData();
  }, []);

  return (
    <div>
      {nbChevauchements === null ? (
        <p>Chargement...</p>
      ) : (
        <p>Nombre de chevauchements : {nbChevauchements}</p>
      )}
    </div>
  );
}

export default Chevauchements;
