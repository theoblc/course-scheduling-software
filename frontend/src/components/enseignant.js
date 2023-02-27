import React, { useEffect, useState } from "react";
import FormEnseignant from "../modals/FormEnseignant";
import axios from "axios";

export default function Enseignant() {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [listEnseignants, setListEnseignants] = useState([]);
  const [enseignant, setEnseignant] = useState({
    id: null,
    nom: "",
    prenom: "",
    departement: "",
  });

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

  function toggleModalEdit(item) {
    setModalEdit(!modalEdit);
    setEnseignant(item);
  }

  function triggerCreation() {
    const enseignant = { nom: "", prenom: "" };
    setEnseignant(enseignant);
    toggleModalCreate();
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

  function editEnseignant(itemModified) {
    toggleModalEdit();
    axios
      .patch(baseURL + itemModified.id + "/", itemModified)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeEnseignant(item) {
    axios
      .delete(baseURL + item.id + "/")
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderItems() {
    const newItems = listEnseignants;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Nom : {item.nom} <br></br>
          Prenom : {item.prenom} <br></br>
          Département : {item.departement} <br></br>
        </span>
        <button
          onClick={() => toggleModalEdit(item)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => removeEnseignant(item)}
          className="btn btn-danger"
        >
          Supprimer
        </button>
      </li>
    ));
  }

  return (
    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">
        App Enseignant
      </h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={triggerCreation} className="btn btn-success">
                Ajouter
              </button>
            </div>
            <ul className="list-group list-group-flush">{renderItems()}</ul>
          </div>
        </div>
      </div>

      {modalCreate ? (
        <FormEnseignant
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={enseignant}
          onSave={createEnseignant}
        />
      ) : null}

      {modalEdit ? (
        <FormEnseignant
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={enseignant}
          onSave={editEnseignant}
        />
      ) : null}
    </main>
  );
}
