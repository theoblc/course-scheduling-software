// Bibliothèques
import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import axios from "axios";

// Composants
import FormModule from "../Formulaires/FormModule";
import CalculateurHeures from "../Outils/CalculateurHeures";
import Suppression from "../ElementsInterface/Suppression";
import Titre from "../ElementsInterface/Titre";

// Code
function Module({ data }) {
  const [module, setModule] = useState(data);
  const repartitionHeures = CalculateurHeures(module.id);
  const [modalEdit, setModalEdit] = useState(false);
  const API_URL_MODULES = "http://localhost:8000/api/modules/";

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
      .patch(`${API_URL_MODULES}${itemModified.id}/`, itemModified)
      .then(() => {
        toggleModalEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function couleurCase(numerateur, denominateur) {
    const estSuperieur = numerateur > denominateur;
    return estSuperieur ? "bg-danger text-white" : "bg-success text-white";
  }

  return (
    <main>
      <Titre type={"Module"} />

      <Table bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Coordonnateur 1</th>
            <th>Coordonnateur 2</th>
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
              {module.coordonnateur1.nom} {module.coordonnateur1.prenom}
            </td>
            <td>
              {module.coordonnateur2.nom} {module.coordonnateur2.prenom}
            </td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_cm,
                module.nb_heures_cm
              )}
            >{`${repartitionHeures.nb_heures_cm}/${module.nb_heures_cm}`}</td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_ci,
                module.nb_heures_ci
              )}
            >{`${repartitionHeures.nb_heures_ci}/${module.nb_heures_ci}`}</td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_td,
                module.nb_heures_td
              )}
            >{`${repartitionHeures.nb_heures_td}/${module.nb_heures_td}`}</td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_tp,
                module.nb_heures_tp
              )}
            >{`${repartitionHeures.nb_heures_tp}/${module.nb_heures_tp}`}</td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_be,
                module.nb_heures_be
              )}
            >{`${repartitionHeures.nb_heures_be}/${module.nb_heures_be}`}</td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_hors_presentiel,
                module.nb_heures_hors_presentiel
              )}
            >{`${repartitionHeures.nb_heures_hors_presentiel}/${module.nb_heures_hors_presentiel}`}</td>
            <td
              className={couleurCase(
                repartitionHeures.nb_heures_total,
                module.nb_heures_total
              )}
            >{`${repartitionHeures.nb_heures_total}/${module.nb_heures_total}`}</td>
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
