import React, { Component } from "react";
import FormModule from "../modals/FormModule";
import axios from "axios";
import withRouter from "./withRouter";

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
      .then(() => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  openModule = (id) => {
    this.props.navigate(`/Modules/${id}`);
  };

  renderItems = () => {
    const liste_modules = this.state.liste_modules;
    return liste_modules.map((module) => (
      <tr key={module.id}>
        <td>{module.code}</td>
        <td>{module.nom}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => this.openModule(module.id)}
          >
            Ouvrir
          </button>
        </td>
      </tr>
    ));
  };

  render() {
    return (
      <main>
        <h2>Liste des modules</h2>
        <div>
          <button className="btn btn-success" onClick={this.toggleModalCreate}>
            Ajouter
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Nom</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderItems()}</tbody>
        </table>

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

export default withRouter(ListeModule);
