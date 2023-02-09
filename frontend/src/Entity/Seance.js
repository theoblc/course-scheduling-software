import React, { Component } from "react"

class Seance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        date_debut: "",
        date_fin: "",
        numero_groupe_td: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {date_debut: props.date_debut,
            date_fin: props.date_fin,
            numero_groupe_td: props.numero_groupe_td,
        };
  }

    render() {
      return (
        <div>
           Numéro du groupe de TD : {this.state.numero_groupe_td}
                <div>
                    Date de début de la séance : {this.state.date_debut} <br></br>
                    Date de fin de la séance : {this.state.date_fin}
                </div>
        </div>         
      )
    }
  }
  
export default Seance;