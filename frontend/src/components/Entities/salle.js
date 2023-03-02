import React, { useEffect, useState } from "react";
import FormSalle from "../Modals/FormSalle";
import axios from "axios";
import withRouter from "../Assets/WithRouter";

function Salle(props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [salle, setSalle] = useState({
    id: 0,
    numero: "",
  });
  const id = props.id;
  const update = props.update;
  const baseURL = "http://localhost:8000/api/salles/";

  const fetchData = async () => {
    const url = baseURL + id;
    console.log(url);
    const data = await fetch(url);
    const salle = await data.json();
    setSalle(salle);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editSalle(itemModified, sum) {
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

  function removeSalle(item) {
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
    setSalle(item);
    setModalEdit(!modalEdit);
  }

  return (
    <tr key={salle.id}>
      <td>{salle.numero}</td>
      <td>
        <button
          onClick={() => toggleModalEdit(salle)}
          className="btn btn-warning"
        >
          Modifier
        </button>
      </td>
      <td>
        <button onClick={() => removeSalle(salle)} className="btn btn-danger">
          Supprimer
        </button>
      </td>
      {modalEdit ? (
        <FormSalle
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={salle}
          onSave={editSalle}
        />
      ) : null}
    </tr>
  );
}

export default withRouter(Salle);
