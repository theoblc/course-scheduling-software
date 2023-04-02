import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      nomError: false,
      prenomError: false,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  testValid = () => {
    const nom = this.state.activeItem.nom;
    const prenom = this.state.activeItem.prenom;
    if (!nom || !prenom) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!nom) {
        this.setState({ nomError: true });
      }
      if (!prenom) {
        this.setState({ prenomError: true });
      }
      return;
    } else {
      return this.props.onSave(this.state.activeItem);
    }
  };

  render() {
    const toggle = this.props.toggle;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajout d'un enseignant</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input
                type="text"
                name="nom"
                value={this.state.activeItem.nom}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.nomError ? "red" : "" }}
              />
              {this.state.nomError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="prenom">Prénom</Label>
              <Input
                type="text"
                name="prenom"
                value={this.state.activeItem.prenom}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.prenomError ? "red" : "" }}
              />
              {this.state.prenomError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="departement">Département</Label>
              <Input
                type="select"
                name="departement"
                value={this.state.activeItem.departement}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              >
                <option value="EPH" defaultValue>
                  EPH
                </option>
                <option value="Vacataire">Vacataire</option>
                <option value="Autre">Autre</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => this.testValid()}>
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
