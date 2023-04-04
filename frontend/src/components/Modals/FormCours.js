import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";

function FormCours({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const [nomError, setNomError] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  function testValid() {
    const nom = item.nom;
    // Afficher un message d'erreur pour chaque champ vide
    if (!nom) {
      setNomError(true);
    } else {
      return onSave(item);
    }
  }

  function generateOptionsType() {
    const types = ["CM", "CI", "TD", "TP", "BE", "AUTONOMIE"];
    return types.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="nom">Nom</Label>
            <Input
              type="text"
              name="nom"
              value={item.nom}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: nomError ? "red" : "" }}
            />
            {nomError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures">Nombre d'heures</Label>
            <Input
              type="number"
              name="nb_heures"
              value={item.nb_heures}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_autonomie">
              Nombre d'heures en autonomie
            </Label>
            <Input
              type="number"
              name="nb_heures_autonomie"
              value={item.nb_heures_autonomie}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <select
              className="form-control"
              name="type"
              onChange={handleChange}
              value={item.type}
              placeholder={item.type}
            >
              <option hidden>Type de cours</option>
              {generateOptionsType()}
            </select>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => testValid()}>
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormCours;
