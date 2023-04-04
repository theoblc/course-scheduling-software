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

function FormEnseignant({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const [nomError, setNomError] = useState(false);
  const [prenomError, setPrenomError] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function testValid() {
    const nom = item.nom;
    const prenom = item.prenom;
    if (!nom || !prenom) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!nom) {
        setNomError(true);
      }
      if (!prenom) {
        setPrenomError(true);
      }
      return;
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
            <Label for="prenom">Prénom</Label>
            <Input
              type="text"
              name="prenom"
              value={item.prenom}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: prenomError ? "red" : "" }}
            />
            {prenomError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="departement">Département</Label>
            <Input
              type="select"
              name="departement"
              value={item.departement}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
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
        <Button color="success" onClick={() => testValid()}>
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormEnseignant;
