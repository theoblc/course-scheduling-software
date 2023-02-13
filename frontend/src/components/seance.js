import React, { Component } from "react";
import FormSeance from "../modals/FormSeance";
import axios from "axios";

class Seance extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/seances/";
    this.state = {
      modalCreate: false,
      modalEdit: false,
      liste_seances: [],
      seance: {
        date_debut: "",
        date_fin: "",
        numero_groupe_td: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(this.baseURL);
      const seances = await res.json();
      this.setState({ liste_seances: seances });
    } catch (e) {
      console.log(e);
    }
  }

  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
  };

  toggleModalEdit = (item) => {
    this.setState({ modalEdit: !this.state.modalEdit, seance: item });
  };

  triggerCreation = () => {
    const seance = { date_debut: "", date_fin: "", numero_groupe_td: "" };
    this.setState({ seance: seance });
    this.toggleModalCreate();
  };

  createSeance = (item) => {
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

  editSeance = (itemModified) => {
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

  removeSeance = (item) => {
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
    const newItems = this.state.liste_seances;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Date Début : {item.date_debut} <br></br>
          Date Fin : {item.date_fin} <br></br>
          Numéro Groupe TD : {item.numero_groupe_td} <br></br>
        </span>
        <button
          onClick={() => this.toggleModalEdit(item)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeSeance(item)}
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
          <FormSeance
            isOpen={this.state.modalCreate}
            toggle={this.toggleModalCreate}
            activeItem={this.state.seance}
            onSave={this.createSeance}
          />
        ) : null}

        {this.state.modalEdit ? (
          <FormSeance
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state.seance}
            onSave={this.editSeance}
          />
        ) : null}
      </main>
    );
  }
}

export default Seance;
