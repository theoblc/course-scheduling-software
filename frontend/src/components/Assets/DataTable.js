import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom";
import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";
import $ from "jquery";
import axios from "axios";
import FormModule from "../Modals/FormModule";
import Formulaire from "../Modals/Formulaire";
import FormSeance from "../Modals/FormSeance";
import FormConfirmation from "../Modals/FormConfirmation";

import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";

function DataTable({
  baseURL,
  fetchData,
  fetchURL,
  itemAdd,
  data,
  type,
  dom,
  columns,
  nameColumns,
  buttons,
  ordering,
}) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [item, setItem] = useState(null);
  const [modalRemove, setModalRemove] = useState(false);
  const navigate = useNavigate();

  function redirect(url) {
    navigate(url);
  }

  function toggleModalEdit(item) {
    setItem(item);
    setModalEdit(!modalEdit);
  }

  function edit(itemModified, sum) {
    toggleModalEdit(itemModified);
    itemModified.nb_heures_total = sum;
    axios
      .patch(baseURL + itemModified.id + "/", itemModified)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleModalRemove(item) {
    setItem(item);
    setModalRemove(!modalRemove);

    function toggleModalCreate() {
      setModalCreate(!modalCreate);
    }

    function create(itemAdd) {
      toggleModalCreate();
      axios
        .post(fetchURL, itemAdd)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function remove(id) {
      setModalRemove(!modalRemove);
      axios
        .delete(`${baseURL}${id}/`)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Fonction qui lance l'API DataTable
    $(function () {
      // Si la DataTable est déjà créée on l'écrase pour la mettre à jour
      if ($.fn.dataTable.isDataTable("#datatable")) {
        let table = $("#datatable").DataTable();
        table.destroy();
      }

      //Création d'une nouvelle DataTable
      let new_table = $("#datatable").DataTable({
        dom:
          "<'row'<'col-sm-12 col-md-7'f><'col-sm-12 col-md-2'B>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        language: language_fr,
        data: data,
        columns: columns,
        ordering: ordering,
        columnDefs: [
          {
            targets: -1,
            render: function () {
              return ReactDOMServer.renderToString(buttons);
            },
          },
        ],
        buttons: [
          {
            text: "Ajouter",
            className: "btn btn-success",
            action: function (e, dt, node, config) {
              // Action à exécuter lors du clic sur le bouton "Ajouter"
              toggleModalCreate();
            },
          },
        ],
      });

      $("#datatable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        if (data !== undefined) {
          if (action !== undefined) {
            // Si c'est le bouton "Fiche Programme" de la liste des modules
            if (
              (type = "cours") &&
              action === "btn btn-secondary btn-sm w-70"
            ) {
              redirect(`/modules/${data.id}/FicheProgramme`);
            }
            // Si c'est le bouton "Planification" de la liste des modules
            else if (
              (type = "cours") &&
              action === "btn btn-dark btn-sm w-70"
            ) {
              redirect(`/modules/${data.id}/Planification`);
            }
            // Si c'est le bouton "Détails" de la liste des Séances
            else if (
              (type = "recap_seances") &&
              action === "rs btn btn-success btn-sm w-70"
            ) {
              redirect(`/modules/${data.module}/cours/${data.cours}/seances`);
            }
            // Si c'est le bouton "Séances" de la fiche programme d'un module
            else if (
              (type = "cours") &&
              action === "c btn btn-success btn-sm w-70"
            ) {
              redirect(`/modules/${data.module}/cours/${data.id}/seances`);
            }
            // Si c'est bouton "modifier"
            else if (action === "btn btn-warning btn-sm w-70") {
              toggleModalEdit(data);
            }
            // Si c'est bouton "supprimer"
            else if (action === "btn btn-danger btn-sm w-70") {
              toggleModalRemove(data);
            }
          }
        }
      });
    });

    return (
      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="datatable" className="display" width="100%">
            <thead>
              <tr>
                {nameColumns.map((colonne) => (
                  <th key={colonne} className="th-sm">
                    {colonne}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <FormConfirmation
          isOpen={modalRemove}
          toggle={toggleModalRemove}
          onSave={() => remove(item.id)}
          item={item}
        />

        {type === "cours" && modalEdit && (
          <Formulaire
            nomFormulaire={"Ajout d'un cours"}
            item={item}
            isOpen={modalEdit}
            toggle={toggleModalEdit}
            onSave={edit}
            fields={[
              { titre: "Nom", nom: "nom", type: "text" },
              { titre: "Nombre d'heures", nom: "nb_heures", type: "number" },
            ]}
          />
        )}

        {type === "enseignants" && modalEdit && (
          <Formulaire
            nomFormulaire={"Ajout d'un enseignant"}
            item={item}
            isOpen={modalEdit}
            toggle={toggleModalEdit}
            onSave={edit}
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

        {type === "modules" && modalEdit && (
          <FormModule
            isOpen={modalEdit}
            toggle={toggleModalEdit}
            activeItem={item}
            onSave={edit}
          />
        )}

        {type === "salles" && modalEdit && (
          <Formulaire
            nomFormulaire={"Modification d'une salle"}
            item={item}
            isOpen={modalEdit}
            toggle={toggleModalEdit}
            onSave={edit}
            fields={[{ titre: "Numéro", nom: "numero", type: "text" }]}
          />
        )}

        {type === "seances" && modalEdit && (
          <FormSeance
            isOpen={modalEdit}
            toggle={toggleModalEdit}
            activeItem={item}
            onSave={edit}
          />
        )}

        {type === "cours" && modalCreate && (
          <FormCours
            isOpen={modalCreate}
            toggle={toggleModalCreate}
            activeItem={itemAdd}
            onSave={create}
          />
        )}

        {type === "enseignants" && modalCreate && (
          <FormEnseignant
            isOpen={modalCreate}
            toggle={toggleModalCreate}
            activeItem={itemAdd}
            onSave={create}
          />
        )}

        {type === "modules" && modalCreate && (
          <FormModule
            isOpen={modalCreate}
            toggle={toggleModalCreate}
            activeItem={itemAdd}
            onSave={create}
          />
        )}

        {type === "salles" && modalCreate && (
          <FormSalle
            isOpen={modalCreate}
            toggle={toggleModalCreate}
            activeItem={itemAdd}
            onSave={create}
          />
        )}

        {type === "seances" && modalCreate && (
          <FormSeance
            isOpen={modalCreate}
            toggle={toggleModalCreate}
            activeItem={itemAdd}
            onSave={create}
          />
        )}
      </div>
    );
  }
}
export default DataTable;
