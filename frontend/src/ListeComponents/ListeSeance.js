import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSeance from "../modals/FormSeance";
import axios from "axios";
import withRouter from "../components/withRouter";
import Seance from "../components/seance";

import "./jquery.dataTables.min.css";
import language_fr from "./language_fr";

import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";
import $ from "jquery";

function ListeSeance() {
  const [modalCreate, setModalCreate] = useState(false);
  const [listSeances, setListSeances] = useState([]);
  const baseURL = "http://localhost:8000/api/seances/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const seances = await data.json();
    setListSeances(seances);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function createSeance(item) {
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

  function openSeance(id) {
    navigate(`/seances/${id}`);
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
          { data: "id" },
          { data: "date_debut" },
          { data: "date_fin" },
          { data: "numero_groupe_td" },
          {
            data: null,
            defaultContent: "<button class=Open>Ouvrir</button>",
          },
        ],
      });

      $("#seanceTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "Open") {
            openSeance(data.id);
          }
        }
      });
    });
  }

  // Lancement de l'API DataTable
  activateDataTable();

  return (
    <main>
      <h2>Liste des séances</h2>
      <div>
        <button className="btn btn-success" onClick={toggleModalCreate}>
          Ajouter
        </button>
      </div>

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="seanceTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Id</th>
                <th className="th-sm">Heure de début</th>
                <th className="th-sm">Heure de fin</th>
                <th className="th-sm">Numéro groupe de TD</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {modalCreate ? (
        <FormSeance
          isOpen={modalCreate}
          toggle={toggleModalCreate}
          activeItem={{
            date_debut: "",
            date_fin: "",
            numero_groupe_td: "",
          }}
          onSave={createSeance}
        />
      ) : null}
    </main>
  );
}

export default withRouter(ListeSeance);
