import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormModule from "../Modals/FormModule";
import axios from "axios";
import withRouter from "../Assets/WithRouter";

function Module() {
  const [modalEdit, setModalEdit] = useState(false);
  const [module, setModule] = useState({
    id: 0,
    code: "",
    nom: "",
    nb_heures_tp: 0,
    nb_heures_be: 0,
    nb_heures_td: 0,
    nb_heures_cm: 0,
    nb_heures_ci: 0,
    nb_heures_total: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api/modules/";

  const fetchData = async () => {
    const url = baseURL + id;
    const data = await fetch(url);
    const module = await data.json();
    setModule(module);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editModule(itemModified, sum) {
    toggleModalEdit(itemModified);
    itemModified.nb_heures_total = sum;
    axios
      .patch(baseURL + itemModified.id + "/", itemModified)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeModule(item) {
    axios
      .delete(baseURL + item.id + "/")
      .then(() => {
        navigate(`/modules`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleModalEdit(item) {
    setModule(item);
    setModalEdit(!modalEdit);
  }

  return (
    <li
      key={module.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span className={`todo-title mr-2`} title={module.code}>
        Code : {module.code} <br></br>
        Nom : {module.nom} <br></br>
        Nombre d'heures de TP : {module.nb_heures_tp} <br></br>
        Nombre d'heures de TD : {module.nb_heures_td} <br></br>
        Nombre d'heures de BE : {module.nb_heures_be} <br></br>
        Nombre d'heures de CI : {module.nb_heures_ci} <br></br>
        Nombre d'heures de CM : {module.nb_heures_cm} <br></br>
        Nombre d'heures total : {module.nb_heures_total} <br></br>
      </span>
      <button
        onClick={() => toggleModalEdit(module)}
        className="btn btn-warning"
      >
        Modifier
      </button>
      <button onClick={() => removeModule(module)} className="btn btn-danger">
        Supprimer
      </button>
      {modalEdit ? (
        <FormModule
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={module}
          onSave={editModule}
        />
      ) : null}
    </li>
  );
}

export default withRouter(Module);
