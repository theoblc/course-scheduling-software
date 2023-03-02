import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormModule from "../modals/FormModule";
import axios from "axios";
import withRouter from "../components/withRouter";

import "./jquery.dataTables.min.css";
import language_fr from "./language_fr";

import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";
import $ from "jquery";

function ListeModule() {
  const [modalCreate, setModalCreate] = useState(false);
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

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createModule(item) {
    toggleModalCreate();
    axios
      .post(baseURL, item)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
          { data: "id" },
          { data: "code" },
          { data: "nom" },
          { data: "seances" },
          { data: "cours" },
          { data: "nb_heures_total" },
          {
            data: null,
            defaultContent: "<button class=Open>Ouvrir</button>",
          },
        ],
      });

      $("#moduleTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "Open") {
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
      <h2>Liste des modules</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="moduleTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Id</th>
                <th className="th-sm">Code</th>
                <th className="th-sm">Nom</th>
                <th className="th-sm">Séances</th>
                <th className="th-sm">Cours</th>
                <th className="th-sm">Nombre heures total</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {modalCreate ? (
        <FormModule
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            code: "",
            nom: "",
            nb_heures_tp: 0,
            nb_heures_td: 0,
            nb_heures_be: 0,
            nb_heures_ci: 0,
            nb_heures_cm: 0,
            nb_heures_total: 0,
          }}
          onSave={createModule}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeModule);
