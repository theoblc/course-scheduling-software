import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Title from "../Assets/Title";

function Chevauchements() {
  const [nbChevauchements, setNbChevauchements] = useState(null);
  const [chevauchements, setChevauchements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/seances/chevauchements"
      );
      var data = await response.json();
      data = JSON.parse(data);
      setNbChevauchements(data.nb_chevauchements);
      setChevauchements(data.chevauchements);
    }
    fetchData();
  }, []);

  return (
    <div>
      {nbChevauchements === null ? (
        <main className="h-100 d-flex flex-column justify-content-center align-items-center">
          <h3 className="text-center mb-4">
            Calcul des chevauchements entre les séances
          </h3>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </main>
      ) : (
        <main>
          <Title type={`Nombre de chevauchements : ${nbChevauchements}`} />
          {chevauchements.map((c, i) => (
            <Table bordered>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Cours</th>
                  <th>Date</th>
                  <th>Heure de début</th>
                  <th>Heure de fin</th>
                  <th>Groupe de TD</th>
                  <th>Salle</th>
                  <th>Enseignant</th>
                  <th>Effectif</th>
                  <th>Commentaire</th>
                </tr>
              </thead>
              <tbody>
                <tr key={i}>
                  {c[0]} chevauche {c[1]}
                </tr>
                <tr key={i}>
                  {c[1]} chevauche {c[0]}
                </tr>
              </tbody>
            </Table>
          ))}
        </main>
      )}
    </div>
  );
}

export default Chevauchements;
