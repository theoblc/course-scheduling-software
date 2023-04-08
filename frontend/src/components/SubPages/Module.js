import React, { useState, useContext } from "react";
import FormModule from "../Modals/FormModule";
import { Button, Table } from "reactstrap";
import FicheProgrammeContext from "../Assets/Contexte";
import Title from "../Assets/Title";
import axios from "axios";

function Module() {
  const data = useContext(FicheProgrammeContext);
  const [module, setModule] = useState(data);
  const [modalEdit, setModalEdit] = useState(false);
  const baseURLModule = "http://localhost:8000/api/modules/";

  function toggleModalEdit() {
    setModalEdit(!modalEdit);
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
      <Title type={"Module"} />

      <Table bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Coordinateur</th>
            <th>Heures de CM</th>
            <th>Heures de CI</th>
            <th>Heures de TD</th>
            <th>Heures de TP</th>
            <th>Heures de BE</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{module.code}</td>
            <td>{module.nom}</td>
            <td>{module.enseignant}</td>
            <td>{module.nb_heures_cm}</td>
            <td>{module.nb_heures_ci}</td>
            <td>{module.nb_heures_td}</td>
            <td>{module.nb_heures_tp}</td>
            <td>{module.nb_heures_be}</td>
            <td>{module.nb_heures_total}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Button className="btn btn-warning btn-lg" onClick={toggleModalEdit}>
          Modifier
        </Button>
      </div>

      {modalEdit && (
        <FormModule
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={module}
          onSave={editModule}
          title={"Modification d'un module"}
        />
      )}
    </main>
  );
}

export default Module;
