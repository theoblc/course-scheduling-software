// Bibliothèques
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

/**
 * Le rôle de ce composant est d'afficher un formulaire pour rentrer des informations sur un cours.
 * Il est utilisé aussi bien pour ajouter un nouveau cours que pour modifier un cours existant.
 */
function FormCours({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const types = ["BE", "CM", "CI", "TD", "TP"];
  const choix_effectif = [
    "Promo complète",
    "1/2 Promo",
    "Groupe de TD",
    "1/2 Groupe de TD",
    "Groupe de TP",
    "1/2 Groupe de TP",
  ];
  // Gestion des erreurs
  const [nomError, setNomError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [nombreHeuresError, setNombreHeuresError] = useState(false);
  // Gestion des messages d'erreur
  const [messageNomError, setMessageNomError] = useState("");
  const [messageTypeError, setMessageTypeError] = useState("");
  const [messageNombreHeuresError, setMessageNombreHeuresError] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  function nombreValide(nombre) {
    return !(nombre < 0 || nombre > 999);
  }

  function validation_nombre() {
    return (
      nombreValide(item.nb_heures) &&
      nombreValide(item.nb_heures_hors_presentiel)
    );
  }

  function resetError() {
    setNomError(false);
    setTypeError(false);
    setNombreHeuresError(false);
  }

  function testValid() {
    resetError();
    const valid_nombre = validation_nombre();
    // Afficher un message d'erreur pour chaque champ invalide
    if (!item.nom || item.nom.length > 50 || !item.type || !valid_nombre) {
      if (!item.nom) {
        setMessageNomError("Le champ est obligatoire.");
        setNomError(true);
      }
      if (item.nom.length > 50) {
        setMessageNomError(
          "Le nom d'un cours ne peut pas excéder 50 caractères."
        );
        setNomError(true);
      }
      if (!item.type) {
        setMessageTypeError("Le champ est obligatoire.");
        setTypeError(true);
      }
      if (!valid_nombre) {
        setMessageNombreHeuresError(
          "Le nombre d'heures doit être compris entre 0 et 999"
        );
        setNombreHeuresError(true);
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

  function generateOptionsEffectif() {
    return choix_effectif.map((effectif) => (
      <option key={effectif} value={effectif}>
        {effectif}
      </option>
    ));
  }

  function generateOptionsType() {
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
                  validateForm();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: nomError ? "red" : "" }}
            />
            {nomError && <p style={{ color: "red" }}>{messageNomError}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <select
              className="form-control"
              name="type"
              onChange={handleChange}
              value={item.type}
              placeholder={item.type}
              style={{ borderColor: typeError ? "red" : "" }}
              required
            >
              <option hidden>Type de cours</option>
              {generateOptionsType()}
            </select>
            {typeError && <p style={{ color: "red" }}>{messageTypeError}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="effectif">Effectif</Label>
            <select
              className="form-control"
              name="effectif"
              onChange={handleChange}
              value={item.effectif}
              placeholder={item.effectif}
            >
              <option hidden>Choix de l'effectif</option>
              {generateOptionsEffectif()}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures">Nombre d'heures</Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures"
              value={item.nb_heures}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageNombreHeuresError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_hors_presentiel">
              Nombre d'heures en hors présentiel
            </Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures_hors_presentiel"
              value={item.nb_heures_hors_presentiel}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageNombreHeuresError}</p>
            )}
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

export default FormCours;
