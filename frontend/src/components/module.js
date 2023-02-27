import React, { Component } from "react";
import FormModule from "../modals/FormModule";
import axios from "axios";
import withRouter from "./withRouter";

class Module extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/modules/";
    this.id = 0;
    this.state = {
      id: 0,
      modalEdit: false,
      module: {},
    };
  }

  async componentDidMount() {
    try {
      const id = window.location.pathname.split("/")[2];
      const url = this.baseURL + id;
      const res = await fetch(url);
      const module = await res.json();
      this.setState({ module: module });
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
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  removeModule = (item) => {
    axios
      .delete(this.baseURL + item.id + "/")
      .then(() => {
        this.props.navigate(`/Modules`);
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
        <span className={`todo-title mr-2`} title={this.state.module.code}>
          Code : {this.state.module.code} <br></br>
          Nom : {this.state.module.nom} <br></br>
          Nombre d'heures de TP : {this.state.module.nb_heures_tp} <br></br>
          Nombre d'heures de TD : {this.state.module.nb_heures_td} <br></br>
          Nombre d'heures de BE : {this.state.module.nb_heures_be} <br></br>
          Nombre d'heures de CI : {this.state.module.nb_heures_ci} <br></br>
          Nombre d'heures de CM : {this.state.module.nb_heures_cm} <br></br>
          Nombre d'heures total : {this.state.module.nb_heures_total} <br></br>
        </span>
        <button
          onClick={() => this.toggleModalEdit()}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeModule(this.state.module)}
          className="btn btn-danger"
        >
          Supprimer
        </button>
        {this.state.modalEdit ? (
          <FormModule
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state.module}
            onSave={this.editModule}
          />
        ) : null}
      </li>
    );
  }
}

export default withRouter(Module);
