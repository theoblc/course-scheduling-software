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

function FormSalle({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const [numeroError, setNumeroError] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function testValid() {
    const numero = item.numero;
    // Afficher un message d'erreur pour chaque champ vide
    if (!numero) {
      setNumeroError(true);
    } else {
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
                  if (!item.numero) {
                    event.preventDefault();
                    setNumeroError(true);
                  } else {
                    testValid();
                  }
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: numeroError ? "red" : "" }}
            />
            {numeroError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
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
                  testValid();
                }
              }}
            />
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

export default FormSalle;
