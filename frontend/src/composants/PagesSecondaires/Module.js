// Bibliothèques
import React, { useState, useContext } from "react";
import { Button, Table } from "reactstrap";
import axios from "axios";

// Composants
import FormModule from "../Formulaires/FormModule";
import FicheProgrammeContext from "../Outils/Contexte";
import CalculateurHeures from "../Outils/CalculateurHeures";
import Suppression from "../ElementsInterface/Suppression";
import Titre from "../ElementsInterface/Titre";

// Code
function Module() {
  const [module, setModule] = useState(useContext(FicheProgrammeContext));
  const baseURLModule = "http://localhost:8000/api/modules/";
  const repartitionHeures = CalculateurHeures(module.id);
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

  const numeratorExceedsDenominator = (numerator, denominator) =>
    numerator > denominator;

  return (
    <main>
      <Titre type={"Module"} />

      <Table bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Coordonnateur</th>
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
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_cm,
                  module.nb_heures_cm
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >
              {`${repartitionHeures.nb_heures_cm}/${Number(
                module.nb_heures_cm
              )}`}
            </td>
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_ci,
                  module.nb_heures_ci
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >{`${repartitionHeures.nb_heures_ci}/${Number(
              module.nb_heures_ci
            )}`}</td>
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_td,
                  module.nb_heures_td
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >{`${repartitionHeures.nb_heures_td}/${Number(
              module.nb_heures_td
            )}`}</td>
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_tp,
                  module.nb_heures_tp
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >{`${repartitionHeures.nb_heures_tp}/${Number(
              module.nb_heures_tp
            )}`}</td>
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_be,
                  module.nb_heures_be
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >{`${repartitionHeures.nb_heures_be}/${Number(
              module.nb_heures_be
            )}`}</td>
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_hors_presentiel,
                  module.nb_heures_hors_presentiel
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >{`${repartitionHeures.nb_heures_hors_presentiel}/${Number(
              module.nb_heures_hors_presentiel
            )}`}</td>
            <td
              className={`${
                numeratorExceedsDenominator(
                  repartitionHeures.nb_heures_total,
                  module.nb_heures_total
                )
                  ? "bg-danger text-white"
                  : "bg-success text-white"
              }`}
            >{`${repartitionHeures.nb_heures_total}/${Number(
              module.nb_heures_total
            )}`}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button className="btn btn-warning btn-lg" onClick={toggleModalEdit}>
          Modifier
        </Button>
        <div>
          <Suppression
            baseURL={"http://localhost:8000/api/modules/"}
            id={module.id}
            redirection="/modules"
            message="Supprimer le module"
          />
        </div>
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
