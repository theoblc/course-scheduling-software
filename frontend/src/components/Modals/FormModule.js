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
      sum: 0,
      nomError: false,
      codeError: false,
    };
  }

  componentDidMount() {
    const activeItem = { ...this.state.activeItem };
    this.calculSum(activeItem);
  }

  calculSum(activeItem) {
    const sum = [
      Number(activeItem.nb_heures_be),
      Number(activeItem.nb_heures_tp),
      Number(activeItem.nb_heures_td),
      Number(activeItem.nb_heures_cm),
      Number(activeItem.nb_heures_ci),
    ].reduce((acc, val) => acc + val, 0);
    this.setState({ sum: sum });
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem: activeItem }, () => {
      this.calculSum(activeItem);
    });
  };

  testValid = () => {
    const code = this.state.activeItem.code;
    const nom = this.state.activeItem.nom;
    if (!nom || !code) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!nom) {
        this.setState({ nomError: true });
      }
      if (!code) {
        this.setState({ codeError: true });
      }
      return;
    } else {
      return this.props.onSave(this.state.activeItem, this.state.sum);
    }
  };

  render() {
    const toggle = this.props.toggle;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajout d'un module</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="code">Code</Label>
              <Input
                type="text"
                name="code"
                value={this.state.activeItem.code}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
                // Afficher une bordure rouge si le champ est vide
                style={{ borderColor: this.state.codeError ? "red" : "" }}
              />
              {this.state.codeError && (
                <p style={{ color: "red" }}>Ce champ est obligatoire</p>
              )}
            </FormGroup>
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
              <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
              <Input
                type="number"
                name="nb_heures_tp"
                value={this.state.activeItem.nb_heures_tp}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_td">Nombre d'heures de TD</Label>
              <Input
                type="number"
                name="nb_heures_td"
                value={this.state.activeItem.nb_heures_td}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_be">Nombre d'heures de BE</Label>
              <Input
                type="number"
                name="nb_heures_be"
                value={this.state.activeItem.nb_heures_be}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
              <Input
                type="number"
                name="nb_heures_ci"
                value={this.state.activeItem.nb_heures_ci}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_cm">Nombre d'heures de CM</Label>
              <Input
                type="number"
                name="nb_heures_cm"
                value={this.state.activeItem.nb_heures_cm}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.testValid();
                  }
                }}
              />
            </FormGroup>
            <p>Nombre d'heures total : {this.state.sum}</p>
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
