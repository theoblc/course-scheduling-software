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
  render() {
    const { toggle, onSave } = this.props;
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="prenom">Prénom</Label>
              <Input
                type="text"
                name="prenom"
                value={this.state.activeItem.prenom}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="departement">Département</Label>
              <Input
                type="select"
                name="departement"
                value={this.state.activeItem.departement}
                onChange={this.handleChange}
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
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
