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

function ListeSalle() {
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
                <th className="th-sm">Id</th>
                <th className="th-sm">Numéro</th>
                <th className="th-sm">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </main>
  );
}

export default withRouter(ListeSalle);
