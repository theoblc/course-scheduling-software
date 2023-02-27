import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormModule from "../modals/FormModule";
import axios from "axios";
import withRouter from "./withRouter";

function ListeModule() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listModules, setListModules] = useState([]);
  const baseURL = "http://localhost:8000/api/modules/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const modules = await data.json();
    setListModules(modules);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createModule(item) {
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

  function openModule(id) {
    navigate(`/Modules/${id}`);
  }

  function renderItems() {
    const list = listModules;
    return list.map((module) => (
      <tr key={module.id}>
        <td>{module.code}</td>
        <td>{module.nom}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => openModule(module.id)}
          >
            Ouvrir
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <main>
      <h2>Liste des modules</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>

      {modalCreate ? (
        <FormModule
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            code: "",
            nom: "",
            nb_heures_tp: 0,
            nb_heures_td: 0,
            nb_heures_be: 0,
            nb_heures_ci: 0,
            nb_heures_cm: 0,
            nb_heures_total: 0,
          }}
          onSave={createModule}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeModule);
