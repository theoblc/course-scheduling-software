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
    const { nom, nb_heures, nb_heures_autonomie } = this.state.activeItem;
    if (!nom || !nb_heures || !nb_heures_autonomie) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!nom) {
        this.setState({ nomError: true });
      }
      if (!nb_heures) {
        this.setState({ nb_heuresError: true });
      }
      if (!nb_heures_autonomie) {
        this.setState({ nb_heures_autonomieError: true });
      }
      return;
    } else {
      return this.props.onSave(this.state.activeItem);
    }
  };

  render() {
    const toggle = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajout d'un cours</ModalHeader>
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
              <Label for="nb_heures">Nombre d'heures</Label>
              <Input
                type="number"
                name="nb_heures"
                value={this.state.activeItem.nb_heures}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.nb_heuresError ? "red" : "" }}
              />
              {this.state.nb_heuresError && (
                <p style={{ color: "red" }}>Ce champ est inchangé</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_autonomie">
                Nombre d'heures en autonomie
              </Label>
              <Input
                type="number"
                name="nb_heures_autonomie"
                value={this.state.activeItem.nb_heures_autonomie}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{
                  borderColor: this.state.nb_heures_autonomieError ? "red" : "",
                }}
              />
              {this.state.nb_heures_autonomieError && (
                <p style={{ color: "red" }}>Ce champ est inchangé</p>
              )}
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
