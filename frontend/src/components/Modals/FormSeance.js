import React, { useState, useEffect } from "react";
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
      dateError: false,
      debutError: false,
      finError: false,
      numeroError: false,
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
    const { date, heure_debut, heure_fin, numero_groupe_td } =
      this.state.activeItem;
    if (!date || !heure_debut || !heure_fin || !numero_groupe_td) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!date) {
        this.setState({ dateError: true });
      }
      if (!heure_debut) {
        this.setState({ debutError: true });
      }
      if (!heure_fin) {
        this.setState({ finError: true });
      }
      if (!numero_groupe_td) {
        this.setState({ numeroError: true });
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
        <ModalHeader toggle={toggle}>Ajout d'une séance</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                value={this.state.activeItem.date}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.dateError ? "red" : "" }}
              />
              {this.state.dateError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="heure_debut">Heure Début</Label>
              <Input
                type="time"
                name="heure_debut"
                value={this.state.activeItem.heure_debut}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.debutError ? "red" : "" }}
              />
              {this.state.debutError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="heure_fin">Heure Fin</Label>
              <Input
                type="time"
                name="heure_fin"
                value={this.state.activeItem.heure_fin}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.finError ? "red" : "" }}
              />
              {this.state.finError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="numero_groupe_td">Numéro Groupe TD</Label>
              <Input
                type="number"
                name="numero_groupe_td"
                value={this.state.activeItem.numero_groupe_td}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.numeroError ? "red" : "" }}
              />
              {this.state.numeroError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="effectif">Effectif</Label>
              <Input
                type="text"
                name="effectif"
                value={this.state.activeItem.effectif}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="commentaire">Commentaire</Label>
              <Input
                type="textarea"
                name="commentaire"
                value={this.state.activeItem.commentaire}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
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
