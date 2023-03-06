import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";
import $ from "jquery";
import axios from "axios";
import FormCours from "../Modals/FormCours";
import FormEnseignant from "../Modals/FormEnseignant";
import FormModule from "../Modals/FormModule";
import FormSalle from "../Modals/FormSalle";
import FormSeance from "../Modals/FormSeance";
import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";

function DataTable(props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [item, setItem] = useState(null);
  const baseURL = props.baseURL;
  const fetchData = props.fetchData;
  const data = props.data;
  const type = props.type;
  const columns = props.columns;
  const nameColumns = props.nameColumns;
  const navigate = useNavigate();

  function open(id) {
    navigate(`/` + props.type + `/${id}`);
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

  function remove(id) {
    axios
      .delete(baseURL + id + "/")
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
    if ($.fn.dataTable.isDataTable("#moduleTable")) {
      let table = $("#moduleTable").DataTable();
      table.destroy();
    }

    //Création d'une nouvelle DataTable
    let new_table = $("#moduleTable").DataTable({
      language: language_fr,
      data: data,
      columns: columns,
      columnDefs: [
        {
          targets: -1,
          render: function () {
            if (type === "modules" || type === "cours") {
              return '<button class="btn btn-success btn-sm">Détails</button><button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>';
            } else {
              return '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>';
            }
          },
        },
      ],
    });

    $("#moduleTable tbody").on("click", "button", function () {
      var action = this.className;
      var data = new_table.row($(this).parents("tr")).data();

      // Si les données de la ligne ne sont pas vides
      if (data !== undefined) {
        // Si l'action est d'ouvrir
        if (action !== undefined && action === "btn btn-success btn-sm") {
          open(data.id);
        }
        // Si l'action est de modifier
        else if (action !== undefined && action === "btn btn-warning btn-sm") {
          toggleModalEdit(data);
        }
        // Si l'action est de supprimer
        else if (action !== undefined && action === "btn btn-danger btn-sm") {
          remove(data.id);
        }
      }
    });
  });

  return (
    <div className="container-fluid py-4">
      <div className="table-responsive p-0 pb-2">
        <table id="moduleTable" className="display" width="100%">
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
      {type === "cours" && modalEdit && (
        <FormCours
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
        />
      )}

      {type === "enseignants" && modalEdit && (
        <FormEnseignant
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
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
        <FormSalle
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
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
    </div>
  );
}

export default DataTable;
