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
        <ModalHeader toggle={toggle}>Ajout d'une séance</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="date_debut">Date Début</Label>
              <Input
                type="datetime-local"
                name="date_debut"
                value={this.state.activeItem.date_debut}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date_fin">Date Fin</Label>
              <Input
                type="datetime-local"
                name="date_fin"
                value={this.state.activeItem.date_fin}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numero_groupe_td">Numéro Groupe TD</Label>
              <Input
                type="number"
                name="numero_groupe_td"
                value={this.state.activeItem.numero_groupe_td}
                onChange={this.handleChange}
              />
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
