import React, { Component } from "react";

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: {
        code: "",
        nom: "",
        cours: [],
        seances: [],
        nb_heures_total: 0,
        nb_heures_tp: 0,
        nb_heures_be: 0,
        nb_heures_ci: 0,
      },
      modules: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/modules/");
      const modules = await res.json();
      console.log(modules);
      this.setState({
        modules,
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItems = () => {
    const newItems = this.state.modules;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`} title={item.code}>
          Nom : {item.nom} <br></br>
          Cours : {item.cours} <br></br>
          Seances : {item.seances} <br></br>
          {item.nb_heures_total} ={item.nb_heures_tp} +{item.nb_heures_be} +
          {item.nb_heures_ci}
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Module;
