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

function ListeModule() {
  const [listModules, setListModules] = useState([]);
  const baseURL = "http://localhost:8000/api/modules/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const modules = await data.json();
    setListModules(modules);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function openModule(id) {
    navigate(`/modules/${id}`);
  }

  function activateDataTable() {
    // Récupération des modules dans un tableau de json
    var modules = listModules;

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
        data: modules,
        columns: [
          { data: "code" },
          { data: "nom" },
          { data: "nb_heures_tp" },
          { data: "nb_heures_td" },
          { data: "nb_heures_be" },
          { data: "nb_heures_ci" },
          { data: "nb_heures_cm" },
          { data: "nb_heures_total" },
          { data: null },
        ],
        columnDefs: [
          {
            targets: -1,
            render: function () {
              return '<button class="btn btn-success btn-sm">Détails</button>';
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
            openModule(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <Title type="modules" />

      <Add
        type="modules"
        item={{
          code: "",
          nom: "",
          nb_heures_tp: 0,
          nb_heures_td: 0,
          nb_heures_be: 0,
          nb_heures_ci: 0,
          nb_heures_cm: 0,
          nb_heures_total: 0,
        }}
        fetchData={fetchData}
      />

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="moduleTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Code</th>
                <th className="th-sm">Nom</th>
                <th className="th-sm">Nombre d'heures de TP</th>
                <th className="th-sm">Nombre d'heures de TD</th>
                <th className="th-sm">Nombre d'heures de BE</th>
                <th className="th-sm">Nombre d'heures de CI</th>
                <th className="th-sm">Nombre d'heures de CM</th>
                <th className="th-sm">Nombre heures total</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </main>
  );
}

export default withRouter(ListeModule);
