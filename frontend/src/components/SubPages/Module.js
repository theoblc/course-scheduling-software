import React, { useEffect, useState } from "react";
import FormModule from "../Modals/FormModule";
import { Button, Table } from "reactstrap";
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
      <Title type={"Module"} />

      <Table bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
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
