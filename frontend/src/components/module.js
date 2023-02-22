import React, { Component } from "react";
import FormModule from "../modals/FormModule";
import axios from "axios";

class Module extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/modules/";
    this.state = {
      modalEdit: false,
      id: this.props.module.id,
      code: this.props.module.code,
      nom: this.props.module.nom,
      nb_heures_tp: this.props.module.nb_heures_tp,
      nb_heures_td: this.props.module.nb_heures_td,
      nb_heures_be: this.props.module.nb_heures_be,
      nb_heures_ci: this.props.module.nb_heures_ci,
      nb_heures_cm: this.props.module.nb_heures_cm,
      nb_heures_total: this.props.module.nb_heures_total,
    };
  }

  async update() {
    try {
      const res = await fetch(this.baseURL);
      const liste_modules = await res.json();
      this.props.updateList(liste_modules);
    } catch (e) {
      console.log(e);
    }
  }

  editModule = (itemModified, sum) => {
    this.toggleModalEdit();
    itemModified.nb_heures_total = sum;
    axios
      .patch(this.baseURL + itemModified.id + "/", itemModified)
      .then(() => {
        this.update();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  removeModule = (item) => {
    axios
      .delete(this.baseURL + item.id + "/")
      .then(() => {
        this.update();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  toggleModalEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };

  render() {
    return (
      <li
        key={this.state.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`} title={this.state.code}>
          Code : {this.state.code} <br></br>
          Nom : {this.state.nom} <br></br>
          Nombre d'heures de TP : {this.state.nb_heures_tp} <br></br>
          Nombre d'heures de TD : {this.state.nb_heures_td} <br></br>
          Nombre d'heures de BE : {this.state.nb_heures_be} <br></br>
          Nombre d'heures de CI : {this.state.nb_heures_ci} <br></br>
          Nombre d'heures de CM : {this.state.nb_heures_cm} <br></br>
          Nombre d'heures total : {this.state.nb_heures_total} <br></br>
        </span>
        <button
          onClick={() => this.toggleModalEdit(this.state)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeModule(this.state)}
          className="btn btn-danger"
        >
          Supprimer
        </button>
        {this.state.modalEdit ? (
          <FormModule
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state}
            onSave={this.editModule}
          />
        ) : null}
      </li>
    );
  }
}

export default Module;
