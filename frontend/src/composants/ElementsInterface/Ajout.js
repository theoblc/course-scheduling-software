// Bibliothèques
import React, { useState } from "react";
import axios from "axios";

// Composants
import FormSeance from "../Formulaires/FormSeance";
import FormSalle from "../Formulaires/FormSalle";
import FormCours from "../Formulaires/FormCours";
import FormEnseignant from "../Formulaires/FormEnseignant";
import FormModule from "../Formulaires/FormModule";

/**
 * Le rôle de ce composant est de gérer l'ajout d'éléments dans PEPH.
 * Il affiche un bouton "Ajouter" qui, lorsqu'il est cliqué, ouvre un formulaire
 * correspondant au type d'élément spécifié. Lorsque le formulaire est rempli
 * et validé, cela envoie une requête POST à l'API.
 */
function Ajout({ item, type, url, fetchData }) {
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
          title="Ajout d'un cours"
        />
      )}

      {type === "enseignants" && modalCreate && (
        <FormEnseignant
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
          title="Ajout d'un enseignant"
        />
      )}

      {type === "modules" && modalCreate && (
        <FormModule
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
          title="Ajout d'un module"
        />
      )}

      {type === "salles" && modalCreate && (
        <FormSalle
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
          title="Ajout d'une salle"
        />
      )}

      {type === "seances" && modalCreate && (
        <FormSeance
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
          title="Ajout d'une séance"
        />
      )}
    </div>
  );
}

export default Ajout;
