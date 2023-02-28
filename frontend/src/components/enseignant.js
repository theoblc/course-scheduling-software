import React, { useEffect, useState } from "react";
import FormEnseignant from "../modals/FormEnseignant";
import axios from "axios";
import withRouter from "./withRouter";

function Enseignant(props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [enseignant, setEnseignant] = useState({
    id: 0,
    nom: "",
    prenom: "",
    departement: "",
  });
  const id = props.id;
  const update = props.update;
  const baseURL = "http://localhost:8000/api/enseignants/";

  const fetchData = async () => {
    const url = baseURL + id;
    const data = await fetch(url);
    const enseignant = await data.json();
    setEnseignant(enseignant);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editEnseignant(itemModified, sum) {
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

  function removeEnseignant(item) {
    axios
      .delete(baseURL + item.id + "/")
      .then(() => {
        update();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleModalEdit(item) {
    setEnseignant(item);
    setModalEdit(!modalEdit);
  }

  return (
    <tr key={enseignant.id}>
      <td>{enseignant.nom}</td>
      <td>{enseignant.prenom}</td>
      <td>{enseignant.departement}</td>
      <td>
        <button
          onClick={() => toggleModalEdit(enseignant)}
          className="btn btn-warning"
        >
          Modifier
        </button>
      </td>
      <td>
        <button
          onClick={() => removeEnseignant(enseignant)}
          className="btn btn-danger"
        >
          Supprimer
        </button>
      </td>
      {modalEdit ? (
        <FormEnseignant
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={enseignant}
          onSave={editEnseignant}
        />
      ) : null}
    </tr>
  );
}

export default withRouter(Enseignant);
