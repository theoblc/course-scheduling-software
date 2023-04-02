import React, { useState } from "react";
import axios from "axios";
import FormModule from "../Modals/FormModule";
import Formulaire from "../Modals/Formulaire";
import FormSeance from "../Modals/FormSeance";

function Add({ item, type, url, fetchData }) {
  const [modalCreate, setModalCreate] = useState(false);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function create(item) {
    toggleModalCreate();
    axios
      .post(url, item)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-success btn-lg" onClick={toggleModalCreate}>
        Ajouter
      </button>

      {type === "cours" && modalCreate && (
        <Formulaire
          nomFormulaire={"Ajout d'un cours"}
          item={item}
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          onSave={create}
          fields={[
            { titre: "Nom", nom: "nom", type: "text" },
            { titre: "Nombre d'heures", nom: "nb_heures", type: "number" },
          ]}
        />
      )}

      {type === "enseignants" && modalCreate && (
        <Formulaire
          nomFormulaire={"Ajout d'un enseignant"}
          item={item}
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          onSave={create}
          fields={[
            { titre: "Nom", nom: "nom", type: "text" },
            { titre: "Prénom", nom: "prenom", type: "text" },
            {
              titre: "Département",
              nom: "departement",
              type: "select",
              options: [
                { value: "EPH", defaultValue: true, nameOption: "EPH" },
                {
                  value: "Vacataire",
                  defaultValue: false,
                  nameOption: "Vacataire",
                },
                { value: "Autre", defaultValue: false, nameOption: "Autre" },
              ],
            },
          ]}
        />
      )}

      {type === "modules" && modalCreate && (
        <FormModule
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}

      {type === "salles" && modalCreate && (
        <Formulaire
          nomFormulaire={"Ajout d'une salle"}
          item={item}
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          onSave={create}
          fields={[{ titre: "Numéro", nom: "numero", type: "text" }]}
        />
      )}

      {type === "seances" && modalCreate && (
        <FormSeance
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={item}
          onSave={create}
        />
      )}
    </div>
  );
}

export default Add;
