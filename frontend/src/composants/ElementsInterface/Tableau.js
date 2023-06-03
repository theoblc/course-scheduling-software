// Bibliothèques
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate } from "react-router-dom";
import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";
import $ from "jquery";
import axios from "axios";
import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";

// Composants
import FormSeance from "../Formulaires/FormSeance";
import FormSalle from "../Formulaires/FormSalle";
import FormCours from "../Formulaires/FormCours";
import FormEnseignant from "../Formulaires/FormEnseignant";
import FormModule from "../Formulaires/FormModule";
import FormConfirmation from "../Formulaires/FormConfirmation";

// Code
function Tableau({
  url,
  type,
  data,
  fetchData,
  columns,
  nameColumns,
  buttons,
}) {
  const [modalEdit, setModalEdit] = useState(false);
  const [item, setItem] = useState(null);
  const [modalRemove, setModalRemove] = useState(false);
  const navigate = useNavigate();

  // Fonction permettant de rediriger l'utilisateur vers l'URL passée en paramètre.
  function redirect(url) {
    navigate(url);
  }

  // Fonction permettant d'afficher ou de cacher le formulaire de suppression.
  // Le formulaire affiché dépend du paramètre 'type' passé en paramètre du composant.
  function toggleModalEdit(item) {
    setItem(item);
    setModalEdit(!modalEdit);
  }

  // Fonction permettant d'envoyer la modification de l'item dans la base de données.
  // Cette fonction est appelée après l'affichage du formulaire, au moment où l'utilisateur
  // appuie sur le bouton 'Enregistrer'. Remarquez que le formulaire est cachée au lancement
  // de la fonction puis une requête PATCH est faite à l'API.
  function edit(itemModified) {
    toggleModalEdit(itemModified);
    axios
      .patch(`${url}${itemModified.id}/`, itemModified)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Fonction permettant d'afficher ou de cacher le formulaire de suppression.
  // Le formulaire affiché dépend du paramètre 'type' passé en paramètre du composant.
  function toggleModalRemove(item) {
    setItem(item);
    setModalRemove(!modalRemove);
  }

  // Fonction permettant de dupliquer l'objet sélectionné.
  function duplicate(item) {
    delete item.id;
    // On supprime les éléments qui vont causer des conflits
    item.salle = null;
    item.enseignant = null;
    axios
      .post(url, item)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Fonction permettant d'envoyer la suppression de l'item dans la base de données.
  // Cette fonction est appelée après l'affichage du formulaire, au moment où l'utilisateur
  // appuie sur le bouton 'Enregistrer'. Remarquez que le formulaire est cachée au lancement
  // de la fonction puis une requête PATCH est faite à l'API.
  function remove(id) {
    setModalRemove(!modalRemove);
    axios
      .delete(`${url}${id}/`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Fonction responsable de l'affichage du tableau (DataTable)
  $(function () {
    // Si la DataTable est déjà créée on l'écrase pour la mettre à jour
    if ($.fn.dataTable.isDataTable("#datatable")) {
      let table = $("#datatable").DataTable();
      table.destroy();
    }

    // Vérifier si les filtres ont déjà été ajoutés et sinon ajout des filtres
    if ($("#datatable thead tr.filters").length === 0) {
      $("#datatable thead tr")
        .clone(true)
        .addClass("filters")
        .appendTo("#datatable thead");
    }

    //Création d'une nouvelle DataTable
    let new_table = $("#datatable").DataTable({
      dom: "tpi",
      language: language_fr,
      data: data,
      columns: columns,
      autoWidth: true,
      order: [[0, "asc"]],
      initComplete: function () {
        var api = this.api();

        api
          .columns()
          .eq(0)
          .each(function (colIdx) {
            var column = api.column(colIdx);

            // Add the filter input element to the header cell
            $(column.header())
              .addClass("filter-header")
              .html(
                '<input type="text" class="form-control form-control-sm" placeholder="' +
                  column.header().textContent +
                  "Filtre" +
                  '" />'
              );

            // Apply the filtering on change
            $(column.header())
              .find("input")
              .on("keyup change", function () {
                column.search(this.value).draw();
              });
          });
      },
      columnDefs: [
        { orderable: false, targets: "_all" },
        {
          targets: -1,
          render: function (data, type) {
            if (buttons !== "") {
              // Si des boutons sont précisés, on les affiche dans la dernière colonne
              return ReactDOMServer.renderToString(buttons);
            } else {
              // Sinon on applique le comportement par défaut de DataTable
              if (type === "display" || type === "filter") {
                return data;
              }
              return "";
            }
          },
        },
      ],
    });

    // Paramètres du corps du tableau.
    $("#datatable tbody").on("click", "button", function () {
      var action = this.className;
      var data = new_table.row($(this).parents("tr")).data();

      if (data !== undefined) {
        if (action !== undefined) {
          // Si c'est le bouton "Fiche Programme" de la liste des modules
          if ((type = "cours") && action === "btn btn-secondary btn-sm w-70") {
            redirect(`/modules/${data.id}/FicheProgramme`);
          }
          // Si c'est le bouton "Planification" de la liste des modules
          else if ((type = "cours") && action === "btn btn-dark btn-sm w-70") {
            redirect(`/modules/${data.id}/PlanificationModule`);
          }
          // Si c'est le bouton "Dupliquer" de la liste des séances
          else if (
            (type = "seances") &&
            action === "btn btn-success btn-sm w-70"
          ) {
            duplicate(data);
          }
          // Si c'est bouton "modifier"
          else if (action === "btn btn-warning btn-sm w-70") {
            toggleModalEdit(data);
          }
          // Si c'est bouton "supprimer"
          else if (action === "btn btn-danger btn-sm w-70") {
            toggleModalRemove(data);
          }
        }
      }
    });
  });

  // Code JSX du tableau + des formulaires qui peuvent être affichés.
  // Il y a de nombreux formulaires car ce composant peut gérer tous les types
  // d'entités de la base de données mais à chaque fois le fonctionnement est similaire :
  // on détermine quel formulaire affiché avec le paramètre 'type' puis on appelle le composant
  // en lui passant les paramètres adéquats.
  return (
    <div className="container-fluid py-4">
      <div className="table-responsive p-0 pb-2">
        <table id="datatable" className="display">
          <thead>
            <tr>
              {nameColumns.map((colonne) => (
                <th key={colonne} className="th-sm">
                  {colonne}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <FormConfirmation
        isOpen={modalRemove}
        toggle={toggleModalRemove}
        onSave={() => remove(item.id)}
        item={item}
      />

      {type === "cours" && modalEdit && (
        <FormCours
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'un cours"
        />
      )}

      {type === "enseignants" && modalEdit && (
        <FormEnseignant
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'un enseignant"
        />
      )}

      {type === "modules" && modalEdit && (
        <FormModule
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'un mpdule"
        />
      )}

      {type === "salles" && modalEdit && (
        <FormSalle
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'une salle"
        />
      )}

      {type === "seances" && modalEdit && (
        <FormSeance
          isOpen={modalEdit}
          toggle={toggleModalEdit}
          activeItem={item}
          onSave={edit}
          title="Modification d'une séance"
        />
      )}
    </div>
  );
}
export default Tableau;
