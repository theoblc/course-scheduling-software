import React, { Component } from "react";
import FormEnseignant from "../modals/FormEnseignant";
import axios from "axios";

class Enseignant extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/enseignants/";
    this.state = {
      modalCreate: false,
      modalEdit: false,
      liste_enseignants: [],
      enseignant: {
        id: null,
        nom: "",
        prenom: "",
        departement: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(this.baseURL);
      const enseignants = await response.json();
      this.setState({ liste_enseignants: enseignants });
    } catch (error) {
      console.error(error);
    }
  }

  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
  };

  toggleModalEdit = (item) => {
    this.setState({ modalEdit: !this.state.modalEdit, enseignant: item });
  };

  triggerCreation = () => {
    const enseignant = { nom: "", prenom: "" };
    this.setState({ enseignant: enseignant });
    this.toggleModalCreate();
  };

  createEnseignant = (item) => {
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

  editEnseignant = (itemModified) => {
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

  removeEnseignant = (item) => {
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
    const newItems = this.state.liste_enseignants;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Nom : {item.nom} <br></br>
          Prenom : {item.prenom} <br></br>
          Département : {item.departement} <br></br>
        </span>
        <button
          onClick={() => this.toggleModalEdit(item)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeEnseignant(item)}
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
          App Enseignant
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
          <FormEnseignant
            isOpen={this.state.modalCreate}
            toggle={this.toggleModalCreate}
            activeItem={this.state.enseignant}
            onSave={this.createEnseignant}
          />
        ) : null}

        {this.state.modalEdit ? (
          <FormEnseignant
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state.enseignant}
            onSave={this.editEnseignant}
          />
        ) : null}
      </main>
    );
  }
}

export default Enseignant;
