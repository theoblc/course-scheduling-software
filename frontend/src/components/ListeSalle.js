import React, { useEffect, useState } from "react";
import FormSalle from "../modals/FormSalle";
import axios from "axios";
import withRouter from "./withRouter";
import Salle from "./Salle";

function ListeSalle() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listSalles, setListSalles] = useState([]);
  const baseURL = "http://localhost:8000/api/salles/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const salles = await data.json();
    setListSalles(salles);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createSalle(item) {
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
    const list = listSalles;
    return list.map((salle) => (
      <Salle key={salle.id} id={salle.id} update={fetchData} />
    ));
  }

  return (
    <main>
      <h2>Liste des salles</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Numéro</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>

      {modalCreate ? (
        <FormSalle
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            numero: "",
          }}
          onSave={createSalle}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeSalle);
