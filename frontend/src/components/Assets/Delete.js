import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";
import FormConfirmation from "../Modals/FormConfirmation";

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
      <Button onClick={toggleModalRemove} className="float-end" color="danger">
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
