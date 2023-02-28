import React, { useEffect, useState } from "react";
import FormSeance from "../modals/FormSeance";
import axios from "axios";
import withRouter from "./withRouter";
import Seance from "./Seance";

function ListeSeance() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listSeances, setListSeances] = useState([]);
  const baseURL = "http://localhost:8000/api/seances/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const seances = await data.json();
    setListSeances(seances);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createSeance(item) {
    toggleModalCreate();
    axios
      .post(baseURL, item)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderItems() {
    const list = listSeances;
    return list.map((seance) => (
      <Seance key={seance.id} id={seance.id} update={fetchData} />
    ));
  }

  return (
    <main>
      <h2>Liste des séances</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Numéro Groupe TD</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>

      {modalCreate ? (
        <FormSeance
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            date_debut: "",
            date_fin: "",
            numero_groupe_td: "",
          }}
          onSave={createSeance}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeSeance);
