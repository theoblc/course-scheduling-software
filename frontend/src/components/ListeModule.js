import React, { Component } from "react";
import FormModule from "../modals/FormModule";
import Module from "./Module";
import axios from "axios";

class ListeModule extends Component {
  constructor(props) {
    super(props);
    this.baseURL = "http://localhost:8000/api/modules/";
    this.state = {
      modalCreate: false,
      liste_modules: [],
    };
    this.updateList = this.updateList.bind(this);
  }

  updateList(liste_modules) {
    this.setState({ liste_modules: liste_modules });
  }

  async componentDidMount() {
    try {
      const res = await fetch(this.baseURL);
      const liste_modules = await res.json();
      this.updateList(liste_modules);
    } catch (e) {
      console.log(e);
    }
  }

  toggleModalCreate = () => {
    this.setState({ modalCreate: !this.state.modalCreate });
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

  renderItems = () => {
    const liste_modules = this.state.liste_modules;
    return liste_modules.map((item) => (
      <Module key={item.id} module={item} updateList={this.updateList} />
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
                  onClick={this.toggleModalCreate}
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
            activeItem={{
              code: "",
              nom: "",
              nb_heures_tp: 0,
              nb_heures_td: 0,
              nb_heures_be: 0,
              nb_heures_ci: 0,
              nb_heures_cm: 0,
              nb_heures_total: 0,
            }}
            onSave={this.createModule}
          />
        ) : null}
      </main>
    );
  }
}

export default ListeModule;
