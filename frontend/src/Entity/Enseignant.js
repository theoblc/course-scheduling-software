import React, { Component } from "react"

class Enseignant extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nom: "",
        prenom: "",
        modules: [],
        seances:[],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {nom: props.nom,
            prenom: props.prenom,
            modules: props.module,
            seances: props.seances,
        };
  }

    render() {
      return (
        <div>
           Nom de l'enseignant : {this.state.nom}<br></br>
           Prénom de l'enseignant : {this.state.prenom}<br></br>
                <div>
                    Modules : {this.state.modules} <br></br>
                    Séances : {this.state.seances} <br></br>
                </div>
        </div>         
      )
    }
  }
  
export default Enseignant;