import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import FormSalle from "../Modals/FormSalle";
import Title from "../Assets/Title";
import Add from "../Assets/Add";
import axios from "axios";

import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";

import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";
import $ from "jquery";

function ListeSalle() {
  const [modalEdit, setModalEdit] = useState(false);
  const [salle, setSalle] = useState({
    id: 0,
    numero: "",
  });
  const [listSalles, setListSalles] = useState([]);
  const baseURL = "http://localhost:8000/api/salles/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const salles = await data.json();
    setListSalles(salles);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function editSalle(itemModified, sum) {
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

  function toggleModalEdit(item) {
    setSalle(item);
    setModalEdit(!modalEdit);
  }

  function removeSalle(id) {
    axios
      .delete(baseURL + id + "/")
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function activateDataTable() {
    // Récupération des salles dans un tableau de json
    var salles = listSalles;

    // Fonction qui lance l'API DataTable
    $(function () {
      // Si la DataTable est déjà créée on l'écrase pour la mettre à jour
      if ($.fn.dataTable.isDataTable("#salleTable")) {
        let table = $("#salleTable").DataTable();

        table.destroy();
      }

      //Création d'une nouvelle DataTable
      let new_table = $("#salleTable").DataTable({
        language: language_fr,
        data: salles,
        columns: [{ data: "numero" }, { data: null }],
        columnDefs: [
          {
            targets: -1,
            render: function () {
              return '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>';
            },
          },
        ],
      });

      $("#salleTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "btn btn-warning btn-sm") {
            toggleModalEdit(data);
          } else if (
            action !== undefined &&
            action === "btn btn-danger btn-sm"
          ) {
            removeSalle(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <Title type="salles" />

      <Add
        type="salles"
        item={{
          numero: "",
        }}
        fetchData={fetchData}
      />

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="salleTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Numéro</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {modalEdit ? (
        <FormSalle
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={salle}
          onSave={editSalle}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeSalle);