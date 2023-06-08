// Bibliothèques
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";

// Composants
import FormConfirmation from "../Formulaires/FormConfirmation";

/**
 * Le rôle de ce composant est de gérer la suppression d'un élément dans PEPH.
 * Il affiche un bouton "Supprimer" qui, lorsqu'il est cliqué, ouvre un formulaire de confirmation.
 * Lorsque la fenêtre de confirmation est validée, une requête DELETE est envoyée à l'API.
 */
function Delete({ baseURL, id, redirection, message }) {
  const [item, setItem] = useState(null);
  const [modalRemove, setModalRemove] = useState(false);
  const navigate = useNavigate();

  function toggleModalRemove(item) {
    setItem(item);
    setModalRemove(!modalRemove);
  }

  function remove(id) {
    setModalRemove(!modalRemove);
    axios
      .delete(`${baseURL}${id}/`)
      .then(() => {
        navigate(redirection);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <Button
        className="btn btn-lg bg-black text-white float-end"
        onClick={toggleModalRemove}
      >
        {message}
      </Button>

      <FormConfirmation
        isOpen={modalRemove}
        toggle={toggleModalRemove}
        onSave={() => remove(id)}
        item={item}
      />
    </main>
  );
}

export default Delete;
