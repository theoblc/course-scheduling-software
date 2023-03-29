import React, { useEffect, useState } from "react";
import FormModule from "../Modals/FormModule";
import { Button, Form, FormGroup, FormText, Label } from "reactstrap";
import Title from "../Assets/Title";
import axios from "axios";

function Module({ idModule }) {
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
  const [modalEdit, setModalEdit] = useState(false);
  const baseURLModule = "http://localhost:8000/api/modules/";

  useEffect(() => {
    const fetchData = async () => {
      const urlModule = baseURLModule + idModule;
      const dataModule = await fetch(urlModule);
      const module = await dataModule.json();
      let sum = calculSum(module);
      module.nb_heures_total = sum;
      setModule(module);
    };

    fetchData().catch(console.error);
  }, [idModule]);

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

  function toggleModalEdit() {
    setModalEdit(!modalEdit);
  }

  function editModule(itemModified) {
    let sum = calculSum(itemModified);
    itemModified.nb_heures_total = sum;
    setModule(itemModified);
    axios
      .patch(`${baseURLModule}${itemModified.id}/`, itemModified)
      .then(() => {
        toggleModalEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
        <Title type={"Module"} />
      </div>
      <div className="card mx-auto" style={{ maxWidth: "30rem" }}>
        <div className="card-body">
          <Form>
            <FormGroup>
              <Label for="code">Code</Label>
              <FormText>{module.code}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <FormText>{module.nom}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
              <FormText>{module.nb_heures_tp}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_td">Nombre d'heures de TD</Label>
              <FormText>{module.nb_heures_td}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_be">Nombre d'heures de BE</Label>
              <FormText>{module.nb_heures_be}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
              <FormText>{module.nb_heures_ci}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_cm">Nombre d'heures de CM</Label>
              <FormText>{module.nb_heures_cm}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_cm">Nombre d'heures total</Label>
              <FormText>{module.nb_heures_total}</FormText>
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="btn btn-warning" onClick={toggleModalEdit}>
                Modifier
              </Button>
            </div>
          </Form>
          {modalEdit && (
            <FormModule
              isOpen={modalEdit}
              toggle={toggleModalEdit}
              activeItem={module}
              onSave={editModule}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default Module;
