import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSalle from "../modals/FormSalle";
import axios from "axios";
import withRouter from "../components/withRouter";
import Salle from "../components/salle";

import "./jquery.dataTables.min.css";
import language_fr from "./language_fr";

import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";
import $ from "jquery";

function ListeSalle() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listSalles, setListSalles] = useState([]);
  const baseURL = "http://localhost:8000/api/salles/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const salles = await data.json();
    setListSalles(salles);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createSalle(item) {
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

  function openSalle(id) {
    navigate(`/salles/${id}`);
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
        columns: [
          { data: "id" },
          { data: "numero" },
          {
            data: null,
            defaultContent: "<button class=Open>Ouvrir</button>",
          },
        ],
      });

      $("#salleTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "Open") {
            openSalle(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <h2>Liste des salles</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="salleTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Id</th>
                <th className="th-sm">Numéro</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {modalCreate ? (
        <FormSalle
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            numero: "",
          }}
          onSave={createSalle}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeSalle);
