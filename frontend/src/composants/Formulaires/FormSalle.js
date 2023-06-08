// Bibliothèques
import React, { useState } from "react";
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

/**
 * Le rôle de ce composant est d'afficher un formulaire pour rentrer des informations sur une salle.
 * Il est utilisé aussi bien pour ajouter une nouvelle salle que pour modifier une salle existante.
 */
function FormSalle({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  // Gestion des erreurs
  const [numeroError, setNumeroError] = useState(false);
  // Gestion des messages d'erreur
  const [messageError, setMessageError] = useState("Le champ est obligatoire.");

  function handleChange(e) {
    let { name, value } = e.target;
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function resetError() {
    setNumeroError(false);
    setMessageError(false);
  }

  function testValid() {
    resetError();
    // Afficher un message d'erreur pour chaque champ invalide
    if (!item.numero || item.numero.length !== 4) {
      if (!item.numero) {
        setMessageError("Le champ est obligatoire.");
        setNumeroError(true);
      }
      if (item.numero.length !== 4) {
        setMessageError(
          "Le numéro d'une salle doit faire exactement 4 caractères."
        );
        setNumeroError(true);
      }
      return false;
    }
    return true;
  }

  function validateForm() {
    if (testValid()) {
      return onSave(item);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="numero">Numéro</Label>
            <Input
              type="text"
              name="numero"
              value={item.numero}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: numeroError ? "red" : "" }}
            />
            {numeroError && <p style={{ color: "red" }}>{messageError}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              value={item.description}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => validateForm()}>
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormSalle;
