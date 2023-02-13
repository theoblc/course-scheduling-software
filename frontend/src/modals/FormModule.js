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
        <ModalHeader toggle={toggle}>Ajout d'un cours</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="code">Code</Label>
              <Input
                type="text"
                name="code"
                value={this.state.activeItem.code}
                onChange={this.handleChange}
              />
            </FormGroup>
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
              <Label for="nb_heures_total">Nombre d'heures total</Label>
              <Input
                type="number"
                name="nb_heures_total"
                value={this.state.activeItem.nb_heures_total}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
              <Input
                type="number"
                name="nb_heures_tp"
                value={this.state.activeItem.nb_heures_tp}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_be">Nombre d'heures de BE</Label>
              <Input
                type="number"
                name="nb_heures_be"
                value={this.state.activeItem.nb_heures_be}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
              <Input
                type="number"
                name="nb_heures_ci"
                value={this.state.activeItem.nb_heures_ci}
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
