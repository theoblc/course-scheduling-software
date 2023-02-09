import React, { Component } from "react";

class Cours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cour: {
        nom: "",
        nb_heures: "",
      },
      cours: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/cours/");
      const cours = await res.json();
      console.log(cours);
      this.setState({
        cours,
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItems = () => {
    const newItems = this.state.cours;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Nom : {item.nom} <br></br>
          Nombre d'heures : {item.nb_heures} <br></br>
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

export default Cours;
