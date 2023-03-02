import React, { useEffect, useState } from "react";
import FormSeance from "../Modals/FormSeance";
import axios from "axios";
import withRouter from "../Assets/WithRouter";

function Seance(props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [seance, setSeance] = useState({
    date_debut: "",
    date_fin: "",
    numero_groupe_td: "",
  });
  const id = props.id;
  const update = props.update;
  const baseURL = "http://localhost:8000/api/seances/";

  const fetchData = async () => {
    const url = baseURL + id;
    const data = await fetch(url);
    const seance = await data.json();
    setSeance(seance);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editSeance(itemModified, sum) {
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

  function removeSeance(item) {
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
    setSeance(item);
    setModalEdit(!modalEdit);
  }

  return (
    <tr key={seance.id}>
      <td>{seance.date_debut}</td>
      <td>{seance.date_fin}</td>
      <td>{seance.numero_groupe_td}</td>
      <td>
        <button
          onClick={() => toggleModalEdit(seance)}
          className="btn btn-warning"
        >
          Modifier
        </button>
      </td>
      <td>
        <button onClick={() => removeSeance(seance)} className="btn btn-danger">
          Supprimer
        </button>
      </td>
      {modalEdit ? (
        <FormSeance
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={seance}
          onSave={editSeance}
        />
      ) : null}
    </tr>
  );
}

export default withRouter(Seance);
