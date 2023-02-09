import React, { Component } from "react";

class Seance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seance: {
        date_debut: "",
        date_fin: "",
        numero_groupe_td: "",
      },
      salles: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/seances/");
      const salles = await res.json();
      console.log(salles);
      this.setState({
        salles,
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItems = () => {
    const newItems = this.state.salles;
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

export default Seance;
