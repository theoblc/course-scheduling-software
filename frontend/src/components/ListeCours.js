import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCours from "../modals/FormCours";
import axios from "axios";
import withRouter from "./withRouter";

function ListeCours() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listCours, setListCours] = useState([]);
  const baseURL = "http://localhost:8000/api/cours/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const cours = await data.json();
    setListCours(cours);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createCours(item) {
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

  function openCours(id) {
    navigate(`/cours/${id}`);
  }

  function renderItems() {
    const list = listCours;
    return list.map((cours) => (
      <tr key={cours.id}>
        <td>{cours.nom}</td>
        <td>{cours.nb_heures}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => openCours(cours.id)}
          >
            Ouvrir
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <main>
      <h2>Liste des cours</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Nombre d'heures</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>

      {modalCreate ? (
        <FormCours
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            nom: "",
            nb_heures: "",
          }}
          onSave={createCours}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeCours);
