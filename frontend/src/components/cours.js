import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormCours from "../modals/FormCours";
import axios from "axios";
import withRouter from "./withRouter";

function Cours() {
  const [modalEdit, setModalEdit] = useState(false);
  const [cours, setCours] = useState({
    id: 0,
    nom: "",
    nb_heures: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api/cours/";

  const fetchData = async () => {
    const url = baseURL + id;
    const data = await fetch(url);
    const cours = await data.json();
    setCours(cours);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editCours(itemModified, sum) {
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

  function removeCours(item) {
    axios
      .delete(baseURL + item.id + "/")
      .then(() => {
        navigate(`/cours`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleModalEdit(item) {
    setCours(item);
    setModalEdit(!modalEdit);
  }

  return (
    <li
      key={cours.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span className={`todo-title mr-2`} title={cours.id}>
        Nom : {cours.nom} <br></br>
        Nombre d'heures : {cours.nb_heures} <br></br>
      </span>
      <button
        onClick={() => toggleModalEdit(cours)}
        className="btn btn-warning"
      >
        Modifier
      </button>
      <button onClick={() => removeCours(cours)} className="btn btn-danger">
        Supprimer
      </button>
      {modalEdit ? (
        <FormCours
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={cours}
          onSave={editCours}
        />
      ) : null}
    </li>
  );
}

export default withRouter(Cours);
