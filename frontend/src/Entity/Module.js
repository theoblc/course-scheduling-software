import React, { Component } from "react"

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
        code: "",
        nom: "",
        cours:[],
        seances:[],
        nb_heures_total: 0,
        nb_heures_tp: 0,
        nb_heures_be: 0,
        nb_heures_ci: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {code: props.code,
            nom: props.nom,
            cours: props.cours,
            seances: props.seances,
            nb_heures_be: props.nb_heures_be,
            nb_heures_ci: props.nb_heures_ci,
            nb_heures_tp: props.nb_heures_tp,
            nb_heures_total: props.nb_heures_total,
        };
  }

    render() {
      return (
        <div>
           Titre du module : {this.state.code}
                <div>
                    Nom : {this.state.nom} <br></br>
                    Cours : {this.state.cours} <br></br>
                    Seances : {this.state.seances} <br></br>
                    Nombre d'heures total : {this.state.nb_heures_total} =
                    {this.state.nb_heures_tp} (TP) +
                    {this.state.nb_heures_be} (BE) +
                    {this.state.nb_heures_ci} (CI)
                </div>
        </div>         
      )
    }
  }
  
export default Module;