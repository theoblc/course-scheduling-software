import React, { useEffect, useState } from "react";
import withRouter from "../Assets/WithRouter";
import FormEnseignant from "../Modals/FormEnseignant";
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

function ListeEnseignant() {
  const [modalEdit, setModalEdit] = useState(false);
  const [enseignant, setEnseignant] = useState({
    id: 0,
    nom: "",
    prenom: "",
    departement: "",
  });
  const [listEnseignants, setListEnseignants] = useState([]);
  const baseURL = "http://localhost:8000/api/enseignants/";

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const enseignants = await data.json();
    setListEnseignants(enseignants);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function editEnseignant(itemModified, sum) {
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

  function removeEnseignant(id) {
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
    setEnseignant(item);
    setModalEdit(!modalEdit);
  }

  function activateDataTable() {
    // Récupération des modules dans un tableau de json
    var enseignants = listEnseignants;

    // Fonction qui lance l'API DataTable
    $(function () {
      // Si la DataTable est déjà créée on l'écrase pour la mettre à jour
      if ($.fn.dataTable.isDataTable("#enseignantTable")) {
        let table = $("#enseignantTable").DataTable();

        table.destroy();
      }

      //Création d'une nouvelle DataTable
      let new_table = $("#enseignantTable").DataTable({
        language: language_fr,
        data: enseignants,
        columns: [
          { data: "prenom" },
          { data: "nom" },
          { data: "departement" },
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

      $("#enseignantTable tbody").on("click", "button", function () {
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
            removeEnseignant(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <Title type="enseignants" />

      <Add
        type="enseignants"
        item={{
          nom: "",
          prenom: "",
          departement: "EPH",
        }}
        fetchData={fetchData}
      />

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="enseignantTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Prénom</th>
                <th className="th-sm">Nom</th>
                <th className="th-sm">Département</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {modalEdit ? (
        <FormEnseignant
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={enseignant}
          onSave={editEnseignant}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeEnseignant);
