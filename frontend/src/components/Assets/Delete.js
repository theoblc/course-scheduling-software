import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";

function Delete({ baseURL, id, redirection, message }) {
  const navigate = useNavigate();

  function remove() {
    axios
      .delete(baseURL + id + "/")
      .then(() => {
        navigate(redirection);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Button onClick={() => remove()} className="float-end" color="danger">
      {message}
    </Button>
  );
}

export default Delete;
