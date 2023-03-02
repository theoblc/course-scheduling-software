import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCours from "../modals/FormCours";
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

function ListeCours() {
  const [modalCreate, setModalCreate] = useState(false);
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

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createCours(item) {
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
        columns: [
          { data: "id" },
          { data: "nom" },
          { data: "nb_heures" },
          {
            data: null,
            defaultContent: "<button class=Open>Ouvrir</button>",
          },
        ],
      });

      $("#coursTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "Open") {
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
      <h2>Liste des cours</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="coursTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Id</th>
                <th className="th-sm">Nom</th>
                <th className="th-sm">Nombre heures</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {modalCreate ? (
        <FormCours
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            nom: "",
            nb_heures: "",
          }}
          onSave={createCours}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeCours);
