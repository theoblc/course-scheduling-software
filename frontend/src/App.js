import React, { Component } from "react"

import Cours from "./Entity/Cours";
import Enseignant from "./Entity/Enseignant";
import Module from "./Entity/Module";
import Salle from "./Entity/Salle";
import Seance from "./Entity/Seance";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cours: [],
      enseignants: [],
      modules: [],
      salles: [],
      seances: [],
      };
  }

    async componentDidMount() {
      try {
        const resMod = await fetch('http://localhost:8000/api/modules/');
        const resCou = await fetch('http://localhost:8000/api/cours/');

        const modules = await resMod.json();
        const cours = await resCou.json();

        console.log(modules)
        console.log(cours)

        this.setState({
          modules,
          cours
        });
      } catch (e) {
        console.log(e);
    }
    }

    renderModules = () => {
      const newModules = this.state.modules;
      return newModules.map(module => (
        <li 
          key={module.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <Module code={module.code} 
            nom={module.nom}
            cours={module.cours}
            seances={module.seances}
            nb_heures_be={module.nb_heures_be}
            nb_heures_ci={module.nb_heures_ci}
            nb_heures_tp={module.nb_heures_tp}
            nb_heures_total={module.nb_heures_total}/>
            <br></br>
        </li>
        

      ));
    };

    renderCours = () => {
      const newCours = this.state.cours;
      return newCours.map(cours => (
        <li 
          key={cours.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <Cours nom={cours.nom}
            seances={cours.seances}
            nb_heures={cours.nb_heures}/>
            <br></br>
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
                {this.renderModules()}
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderCours()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;