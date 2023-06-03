// Bibliothèques
import React, { useEffect, useRef } from "react";
import "../../style/jquery.dataTables.min.css";
import language_fr from "../../style/language_fr";
import $ from "jquery";
import "jquery";
import "datatable";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-buttons";

// Code
function TableauSimple({ data, columns, nameColumns }) {
  const tableRef = useRef(null);

  useEffect(() => {
    $(tableRef.current).DataTable({
      language: language_fr,
      data: data,
      columns: columns,
      autoWidth: true,
      order: [[0, "asc"]],
      searching: false, // Désactiver la barre de recherche
      ordering: false, // Désactiver le tri par colonne
      paging: false, // Désactiver la pagination
      info: false, // Désactiver les informations sur le nombre d'éléments affichés
      lengthChange: false, // Désactiver le changement du nombre d'éléments affichés par page
      dom: "Bfrtip", // Désactiver les éléments de contrôle (boutons)
      buttons: [], // Supprimer tous les boutons
      bDestroy: true,
    });
  }, [data, columns]);

  return (
    <div className="container-fluid py-4">
      <div className="table-responsive p-0 pb-2">
        <table id="datatable" className="display" ref={tableRef}>
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
    </div>
  );
}

export default TableauSimple;
