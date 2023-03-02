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

function ListeEnseignant() {
  const [listEnseignants, setListEnseignants] = useState([]);
  const baseURL = "http://localhost:8000/api/enseignants/";
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await fetch(baseURL);
    const enseignants = await data.json();
    setListEnseignants(enseignants);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function openEnseignant(id) {
    navigate(`/enseignants/${id}`);
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
          { data: "id" },
          { data: "prenom" },
          { data: "nom" },
          { data: "seances" },
          { data: "module" },
          {
            data: null,
            defaultContent: "<button class=Open>Ouvrir</button>",
          },
        ],
      });

      $("#enseignantTable tbody").on("click", "button", function () {
        var action = this.className;
        var data = new_table.row($(this).parents("tr")).data();

        // Si les données de la ligne ne sont pas vides
        if (data !== undefined) {
          // Si l'action est d'ouvrir
          if (action !== undefined && action === "Open") {
            openEnseignant(data.id);
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
          departement: "",
        }}
        fetchData={fetchData}
      />

      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <table id="enseignantTable" className="display" width="100%">
            <thead>
              <tr>
                <th className="th-sm">Id</th>
                <th className="th-sm">Prénom</th>
                <th className="th-sm">Nom</th>
                <th className="th-sm">Séances</th>
                <th className="th-sm">Modules</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </main>
  );
}

export default withRouter(ListeEnseignant);
