import React, { Component } from "react";

class Enseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enseignant: {
        nom: "",
        prenom: "",
      },
      enseignants: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/enseignants/");
      const enseignants = await res.json();
      console.log(enseignants);
      this.setState({
        enseignants,
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItems = () => {
    const newItems = this.state.enseignants;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`}>
          Nom : {item.nom} <br></br>
          Prenom : {item.prenom} <br></br>
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

export default Enseignant;
