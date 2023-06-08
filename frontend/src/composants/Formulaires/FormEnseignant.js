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
 * Le rôle de ce composant est d'afficher un formulaire pour rentrer des informations sur un enseignant.
 * Il est utilisé aussi bien pour ajouter un nouvel enseignant que pour modifier un enseignant existant.
 */
function FormEnseignant({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const departements = ["EPH", "Vacataire", "Autre"];
  // Gestion des erreurs
  const [nomError, setNomError] = useState(false);
  const [prenomError, setPrenomError] = useState(false);
  // Gestion des messages d'erreur
  const messageError = "Le champ est obligatoire.";

  function handleChange(e) {
    let { name, value } = e.target;
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function resetError() {
    setNomError(false);
    setPrenomError(false);
  }

  function testValid() {
    resetError();
    // Afficher un message d'erreur pour chaque champ invalide
    if (!item.nom || !item.prenom) {
      if (!item.nom) {
        setNomError(true);
      }
      if (!item.prenom) {
        setPrenomError(true);
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

  function generateOptionsDepartement() {
    return departements.map((departement) => (
      <option key={departement} value={departement}>
        {departement}
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
                  validateForm();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: nomError ? "red" : "" }}
            />
            {nomError && <p style={{ color: "red" }}>{messageError}</p>}
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
                  validateForm();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: prenomError ? "red" : "" }}
            />
            {prenomError && <p style={{ color: "red" }}>{messageError}</p>}
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
                  validateForm();
                }
              }}
            >
              {generateOptionsDepartement()}
            </Input>
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

export default FormEnseignant;
