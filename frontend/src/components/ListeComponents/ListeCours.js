import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withRouter from "../Assets/WithRouter";
import Title from "../Assets/Title";
import Add from "../Assets/Add";

import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";

import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";
import $ from "jquery";

function ListeCours() {
  const [listCours, setListCours] = useState([]);
  const baseURL = "http://localhost:8000/api/cours/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const cours = await data.json();
    setListCours(cours);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function openCours(id) {
    navigate(`/cours/${id}`);
  }

  function activateDataTable() {
    // Récupération des cours dans un tableau de json
    var cours = listCours;

    // Fonction qui lance l'API DataTable
    $(function () {
      // Si la DataTable est déjà créée on l'écrase pour la mettre à jour
      if ($.fn.dataTable.isDataTable("#coursTable")) {
        let table = $("#coursTable").DataTable();

        table.destroy();
      }

      //Création d'une nouvelle DataTable
      let new_table = $("#coursTable").DataTable({
        language: language_fr,
        data: cours,
        columns: [{ data: "nom" }, { data: "nb_heures" }, { data: null }],
        columnDefs: [
          {
            targets: -1,
            render: function () {
              return '<button class="btn btn-success btn-sm">Détails</button>';
            },
          },
        ],
      });

      $("#coursTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "btn btn-success btn-sm") {
            openCours(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <Title type="cours" />

      <Add
        type="cours"
        item={{
          nom: "",
          nb_heures: "",
        }}
        fetchData={fetchData}
      />

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="coursTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Nom</th>
                <th className="th-sm">Nombre heures</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </main>
  );
}

export default withRouter(ListeCours);
