import React, { Component } from "react";
import FormCours from "../modals/FormCours";
import axios from "axios";

class Cours extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/cours/";
    this.state = {
      modalCreate: false,
      modalEdit: false,
      liste_cours: [],
      cours: {
        nom: "",
        nb_heures: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(this.baseURL);
      const liste_cours = await response.json();
      this.setState({ liste_cours: liste_cours });
    } catch (error) {
      console.error(error);
    }
  }

  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
  };

  toggleModalEdit = (item) => {
    this.setState({ modalEdit: !this.state.modalEdit, cours: item });
  };

  triggerCreation = () => {
    const cours = { nom: "", nb_heures: "" };
    this.setState({ cours: cours });
    this.toggleModalCreate();
  };

  createCours = (item) => {
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

  editCours = (itemModified) => {
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

  removeCours = (item) => {
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
    const newItems = this.state.liste_cours;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Nom : {item.nom} <br></br>
          Nombre d'heures : {item.nb_heures} <br></br>
        </span>
        <button
          onClick={() => this.toggleModalEdit(item)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeCours(item)}
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
          App Cours
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
          <FormCours
            isOpen={this.state.modalCreate}
            toggle={this.toggleModalCreate}
            activeItem={this.state.cours}
            onSave={this.createCours}
          />
        ) : null}

        {this.state.modalEdit ? (
          <FormCours
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state.cours}
            onSave={this.editCours}
          />
        ) : null}
      </main>
    );
  }
}

export default Cours;
