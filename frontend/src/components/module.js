import React, { Component } from "react";
import FormModule from "../modals/FormModule";
import axios from "axios";

class Module extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/modules/";
    this.state = {
      modalCreate: false,
      modalEdit: false,
      liste_modules: [],
      module: {
        code: "",
        nom: "",
        nb_heures_total: 0,
        nb_heures_tp: 0,
        nb_heures_be: 0,
        nb_heures_ci: 0,
      },
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(this.baseURL);
      const liste_modules = await res.json();
      this.setState({ liste_modules: liste_modules });
    } catch (e) {
      console.log(e);
    }
  }

  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
  };

  toggleModalEdit = (item) => {
    this.setState({ modalEdit: !this.state.modalEdit, module: item });
  };

  triggerCreation = () => {
    const module = {
      code: "",
      nom: "",
      nb_heures_total: "",
      nb_heures_tp: 0,
      nb_heures_be: 0,
      nb_heures_ci: 0,
    };
    this.setState({ module: module });
    this.toggleModalCreate();
  };

  createModule = (item) => {
    this.toggleModalCreate();
    axios
      .post(this.baseURL, item)
      .then((response) => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  editModule = (itemModified) => {
    this.toggleModalEdit();
    axios
      .patch(this.baseURL + itemModified.id + "/", itemModified)
      .then((response) => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  removeModule = (item) => {
    axios
      .delete(this.baseURL + item.id + "/")
      .then((response) => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderItems = () => {
    const newItems = this.state.liste_modules;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`} title={item.code}>
          Code : {item.code} <br></br>
          Nom : {item.nom} <br></br>
          {item.nb_heures_total} ={item.nb_heures_tp} +{item.nb_heures_be} +
          {item.nb_heures_ci}
        </span>
        <button
          onClick={() => this.toggleModalEdit(item)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeModule(item)}
          className="btn btn-danger"
        >
          Supprimer
        </button>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">
          App Module
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button
                  onClick={this.triggerCreation}
                  className="btn btn-success"
                >
                  Ajouter
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modalCreate ? (
          <FormModule
            isOpen={this.state.modalCreate}
            toggle={this.toggleModalCreate}
            activeItem={this.state.module}
            onSave={this.createModule}
          />
        ) : null}

        {this.state.modalEdit ? (
          <FormModule
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state.module}
            onSave={this.editModule}
          />
        ) : null}
      </main>
    );
  }
}

export default Module;
