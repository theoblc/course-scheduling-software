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
    const numero = this.state.activeItem.numero;
    // Afficher un message d'erreur pour chaque champ vide
    if (!numero) {
      this.setState({ numeroError: true });
      return;
    } else {
      return this.props.onSave(this.state.activeItem);
    }
  };

  render() {
    const toggle = this.props.toggle;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajout d'une salle</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="numero">Numéro</Label>
              <Input
                type="text"
                name="numero"
                value={this.state.activeItem.numero}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    if (!this.state.activeItem.numero) {
                      event.preventDefault();
                      this.setState({ numeroError: true });
                    } else {
                      this.testValid();
                    }
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
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                value={this.state.activeItem.description}
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
