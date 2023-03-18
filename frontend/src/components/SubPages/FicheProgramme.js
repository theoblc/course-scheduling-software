import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Title from "../Assets/Title";
import axios from "axios";

function FicheProgramme({ idModule }) {
  const [module, setModule] = useState({
    id: 0,
    code: "",
    nom: "",
    nb_heures_tp: 0,
    nb_heures_be: 0,
    nb_heures_td: 0,
    nb_heures_cm: 0,
    nb_heures_ci: 0,
    nb_heures_total: 0,
    seances: null,
    cours: null,
  });
  const navigate = useNavigate();
  const baseURLModule = "http://localhost:8000/api/modules/";

  useEffect(() => {
    const fetchData = async () => {
      const urlModule = baseURLModule + idModule;
      const dataModule = await fetch(urlModule);
      const module = await dataModule.json();
      setModule(module);
    };

    fetchData().catch(console.error);
  }, [idModule]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedActiveItem = { ...module, [name]: value };
    updatedActiveItem.nb_heures_total = calculSum(updatedActiveItem);
    setModule(updatedActiveItem);
  }

  function calculSum(module) {
    let sum = [
      Number(module.nb_heures_be),
      Number(module.nb_heures_tp),
      Number(module.nb_heures_td),
      Number(module.nb_heures_cm),
      Number(module.nb_heures_ci),
    ].reduce((acc, val) => acc + val, 0);
    return sum;
  }

  function editModule(itemModified) {
    let sum = calculSum(itemModified);
    itemModified.nb_heures_total = sum;
    setModule(itemModified);
    axios
      .patch(baseURLModule + itemModified.id + "/", itemModified)
      .then(() => {
        navigate(`/modules`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeModule(item) {
    axios
      .delete(baseURLModule + item.id + "/")
      .then(() => {
        navigate(`/modules`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
        <Title type={"Fiche programme"} />
      </div>
      <div className="card mx-auto" style={{ maxWidth: "30rem" }}>
        <div className="card-body">
          <Form>
            <FormGroup>
              <Label for="code">Code</Label>
              <Input
                type="text"
                name="code"
                value={module.code}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input
                type="text"
                name="nom"
                value={module.nom}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
              <Input
                type="number"
                name="nb_heures_tp"
                value={module.nb_heures_tp}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_td">Nombre d'heures de TD</Label>
              <Input
                type="number"
                name="nb_heures_td"
                value={module.nb_heures_td}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_be">Nombre d'heures de BE</Label>
              <Input
                type="number"
                name="nb_heures_be"
                value={module.nb_heures_be}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
              <Input
                type="number"
                name="nb_heures_ci"
                value={module.nb_heures_ci}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_cm">Nombre d'heures de CM</Label>
              <Input
                type="number"
                name="nb_heures_cm"
                value={module.nb_heures_cm}
                onChange={handleChange}
              />
            </FormGroup>
            <p>Nombre d'heures total : {module.nb_heures_total}</p>
            <div className="d-flex justify-content-between">
              <Button
                className="float-start"
                color="success"
                onClick={() => editModule(module)}
              >
                Enregistrer
              </Button>
              <Button
                onClick={() => removeModule(module)}
                className="float-end"
                color="danger"
              >
                Supprimer
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default FicheProgramme;
