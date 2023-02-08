import React, { Component } from "react"

class Cours extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nom: "",
        seances:[],
        nb_heures: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {nom: props.nom,
            seances: props.seances,
            nb_heures: props.nb_heures,
        };
  }

    render() {
      return (
        <div>
           Nom du cours : {this.state.nom}
                <div>
                    Séances : {this.state.seances} <br></br>
                    Nombre d'heures : {this.state.nb_heures}
                </div>
        </div>         
      )
    }
  }
  
export default Cours;