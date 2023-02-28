import React, { useEffect, useState } from "react";
import FormEnseignant from "../modals/FormEnseignant";
import axios from "axios";
import withRouter from "./withRouter";
import Enseignant from "./Enseignant";

function ListeEnseignant() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listEnseignants, setListEnseignants] = useState([]);
  const baseURL = "http://localhost:8000/api/enseignants/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const enseignants = await data.json();
    setListEnseignants(enseignants);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createEnseignant(item) {
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
    const list = listEnseignants;
    return list.map((enseignant) => (
      <Enseignant key={enseignant.id} id={enseignant.id} update={fetchData} />
    ));
  }

  return (
    <main>
      <h2>Liste des enseignants</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Département</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>

      {modalCreate ? (
        <FormEnseignant
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            nom: "",
            prenom: "",
            departement: "",
          }}
          onSave={createEnseignant}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeEnseignant);
