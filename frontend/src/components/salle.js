import React, { Component } from "react";
import FormSalle from "../modals/FormSalle";
import axios from "axios";

class Salle extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/salles/";
    this.state = {
      modalCreate: false,
      modalEdit: false,
      liste_salles: [],
      salle: {
        numero: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(this.baseURL);
      const salles = await res.json();
      this.setState({ liste_salles: salles });
    } catch (e) {
      console.log(e);
    }
  }

  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
  };

  toggleModalEdit = (item) => {
    this.setState({ modalEdit: !this.state.modalEdit, salle: item });
  };

  triggerCreation = () => {
    const salle = { numero: "" };
    this.setState({ salle: salle });
    this.toggleModalCreate();
  };

  createSalle = (item) => {
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

  editSalle = (itemModified) => {
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

  removeSalle = (item) => {
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
    const newItems = this.state.liste_salles;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Salle : {item.numero} <br></br>
        </span>
        <button
          onClick={() => this.toggleModalEdit(item)}
          className="btn btn-warning"
        >
          Modifier
        </button>
        <button
          onClick={() => this.removeSalle(item)}
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
          App Salle
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
          <FormSalle
            isOpen={this.state.modalCreate}
            toggle={this.toggleModalCreate}
            activeItem={this.state.salle}
            onSave={this.createSalle}
          />
        ) : null}

        {this.state.modalEdit ? (
          <FormSalle
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit}
            activeItem={this.state.salle}
            onSave={this.editSalle}
          />
        ) : null}
      </main>
    );
  }
}

export default Salle;
