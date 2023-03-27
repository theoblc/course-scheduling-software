import React, { useState } from "react";
import axios from "axios";
import FormCours from "../Modals/FormCours";
import FormEnseignant from "../Modals/FormEnseignant";
import FormModule from "../Modals/FormModule";
import FormSalle from "../Modals/FormSalle";
import FormSeance from "../Modals/FormSeance";

function Add({ item, type, url, fetchData }) {
  const [modalCreate, setModalCreate] = useState(false);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function create(item) {
    toggleModalCreate();
    axios
      .post(url, item)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-success btn-lg" onClick={toggleModalCreate}>
        Ajouter
      </button>

      {type === "cours" && modalCreate && (
        <FormCours
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}

      {type === "enseignants" && modalCreate && (
        <FormEnseignant
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}

      {type === "modules" && modalCreate && (
        <FormModule
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}

      {type === "salles" && modalCreate && (
        <FormSalle
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}

      {type === "seances" && modalCreate && (
        <FormSeance
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}
    </div>
  );
}

export default Add;
