import React, { useState, useContext } from "react";
import FormModule from "../Modals/FormModule";
import { Button, Table } from "reactstrap";
import FicheProgrammeContext from "../Assets/Contexte";
import CalculHeures from "../Assets/CalculHeures";
import Title from "../Assets/Title";
import axios from "axios";

function Module() {
  const [module, setModule] = useState(useContext(FicheProgrammeContext));
  const baseURLModule = "http://localhost:8000/api/modules/";
  const repartitionHeures = CalculHeures(module.id);
  const [modalEdit, setModalEdit] = useState(false);

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
    toggleModalEdit();
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
            <th>Heures HP</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{module.code}</td>
            <td>{module.nom}</td>
            <td>
              {module.enseignant.nom} {module.enseignant.prenom}
            </td>
            <td>{`${repartitionHeures.nb_heures_cm}/${Number(
              module.nb_heures_cm
            )}`}</td>
            <td>{`${repartitionHeures.nb_heures_ci}/${Number(
              module.nb_heures_ci
            )}`}</td>
            <td>{`${repartitionHeures.nb_heures_td}/${Number(
              module.nb_heures_td
            )}`}</td>
            <td>{`${repartitionHeures.nb_heures_tp}/${Number(
              module.nb_heures_tp
            )}`}</td>
            <td>{`${repartitionHeures.nb_heures_be}/${Number(
              module.nb_heures_be
            )}`}</td>
            <td>{`${repartitionHeures.nb_heures_hors_presentiel}/${Number(
              module.nb_heures_hors_presentiel
            )}`}</td>
            <td>{`${repartitionHeures.nb_heures_total}/${Number(
              module.nb_heures_total
            )}`}</td>
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
