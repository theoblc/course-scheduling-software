import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import FormSeance from "../Modals/FormSeance";
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

function ListeSeance() {
  const [modalEdit, setModalEdit] = useState(false);
  const [seance, setSeance] = useState({
    date_debut: "",
    date_fin: "",
    numero_groupe_td: "",
  });
  const [listSeances, setListSeances] = useState([]);
  const baseURL = "http://localhost:8000/api/seances/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const seances = await data.json();
    setListSeances(seances);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function editSeance(itemModified, sum) {
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

  function removeSeance(id) {
    axios
      .delete(baseURL + id + "/")
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleModalEdit(item) {
    setSeance(item);
    setModalEdit(!modalEdit);
  }

  function activateDataTable() {
    // Récupération des seances dans un tableau de json
    var seances = listSeances;

    // Fonction qui lance l'API DataTable
    $(function () {
      // Si la DataTable est déjà créée on l'écrase pour la mettre à jour
      if ($.fn.dataTable.isDataTable("#seanceTable")) {
        let table = $("#seanceTable").DataTable();

        table.destroy();
      }

      //Création d'une nouvelle DataTable
      let new_table = $("#seanceTable").DataTable({
        language: language_fr,
        data: seances,
        columns: [
          { data: "date_debut" },
          { data: "date_fin" },
          { data: "numero_groupe_td" },
          { data: null },
        ],
        columnDefs: [
          {
            targets: -1,
            render: function () {
              return '<button class="btn btn-warning btn-sm">Modifier</button><button class="btn btn-danger btn-sm">Supprimer</button>';
            },
          },
        ],
      });

      $("#seanceTable tbody").on("click", "button", function () {
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
            removeSeance(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <Title type="séances" />

      <Add
        type="seances"
        item={{
          date_debut: "",
          date_fin: "",
          numero_groupe_td: "",
        }}
        fetchData={fetchData}
      />

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="seanceTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Heure de début</th>
                <th className="th-sm">Heure de fin</th>
                <th className="th-sm">Numéro groupe de TD</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {modalEdit ? (
        <FormSeance
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={seance}
          onSave={editSeance}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeSeance);
