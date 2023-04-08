import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom";
import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";
import $ from "jquery";
import axios from "axios";
import FormConfirmation from "../Modals/FormConfirmation";
import FormEnseignant from "../Modals/FormEnseignant";
import FormCours from "../Modals/FormCours";
import FormSalle from "../Modals/FormSalle";
import FormModule from "../Modals/FormModule";
import FormSeance from "../Modals/FormSeance";

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
  }

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
      dom: dom,
      language: language_fr,
      data: data,
      columns: columns,
      autoWidth: true,
      order: [[0, "asc"]],
      columnDefs: [
        { orderable: ordering, targets: "_all" },
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
          if ((type = "cours") && action === "btn btn-secondary btn-sm w-70") {
            redirect(`/modules/${data.id}/FicheProgramme`);
          }
          // Si c'est le bouton "Planification" de la liste des modules
          else if ((type = "cours") && action === "btn btn-dark btn-sm w-70") {
            redirect(`/modules/${data.id}/Planification`);
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
        <FormCours
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'un cours"
        />
      )}

      {type === "enseignants" && modalEdit && (
        <FormEnseignant
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'un enseignant"
        />
      )}

      {type === "modules" && modalEdit && (
        <FormModule
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'un mpdule"
        />
      )}

      {type === "salles" && modalEdit && (
        <FormSalle
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'une salle"
        />
      )}

      {type === "seances" && modalEdit && (
        <FormSeance
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'une séance"
        />
      )}

      {type === "cours" && modalCreate && (
        <FormCours
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={itemAdd}
          onSave={create}
          title="Ajout d'un cours"
        />
      )}

      {type === "enseignants" && modalCreate && (
        <FormEnseignant
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={itemAdd}
          onSave={create}
          title="Ajout d'un enseignant"
        />
      )}

      {type === "modules" && modalCreate && (
        <FormModule
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={itemAdd}
          onSave={create}
          title="Ajout d'un module"
        />
      )}

      {type === "salles" && modalCreate && (
        <FormSalle
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={itemAdd}
          onSave={create}
          title="Ajout d'une salle"
        />
      )}

      {type === "seances" && modalCreate && (
        <FormSeance
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={itemAdd}
          onSave={create}
          title="Ajout d'une séance"
        />
      )}
    </div>
  );
}
export default DataTable;
