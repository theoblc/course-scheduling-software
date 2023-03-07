import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import withRouter from "../Assets/WithRouter";

function Cours() {
  const [cours, setCours] = useState({
    id: 0,
    nom: "",
    nb_heures: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api/cours/";

  useEffect(() => {
    const fetchData = async () => {
      const url = baseURL + id;
      const data = await fetch(url);
      const cours = await data.json();
      setCours(cours);
    };

    fetchData().catch(console.error);
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedActiveItem = { ...cours, [name]: value };
    setCours(updatedActiveItem);
  }

  function editCours(itemModified) {
    setCours(itemModified);
    axios
      .patch(baseURL + itemModified.id + "/", itemModified)
      .then(() => {
        navigate(`/cours`);
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

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="card mx-auto" style={{ maxWidth: "30rem" }}>
        <div className="card-body">
          <Form>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input
                type="text"
                name="nom"
                value={cours.nom}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures">Nombre d'heures</Label>
              <Input
                type="number"
                name="nb_heures"
                value={cours.nb_heures}
                onChange={handleChange}
              />
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button
                className="float-start"
                color="success"
                onClick={() => editCours(cours)}
              >
                Enregistrer
              </Button>
              <Button
                onClick={() => removeCours(cours)}
                className="float-end"
                color="danger"
              >
                Supprimer
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Cours);
