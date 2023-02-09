import React, { Component } from "react"

class Salle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        numero: "",
        seances:[],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {numero: props.numero,
            seances: props.seances,
        };
  }

    render() {
      return (
        <div>
           Numéro de la salle : {this.state.numero}
                <div>
                    Séances : {this.state.seances} <br></br>
                </div>
        </div>         
      )
    }
  }
  
export default Salle;