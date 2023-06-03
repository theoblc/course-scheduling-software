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

// Code
function FormCours({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const [nomError, setNomError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [messageError, setMessageError] = useState("Le champ est obligatoire.");
  const types = ["BE", "CM", "CI", "TD", "TP"];
  const choix_effectif = [
    "Promo complète",
    "1/2 Promo",
    "Groupe de TD",
    "1/2 Groupe de TD",
    "Groupe de TP",
    "1/2 Groupe de TP",
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  function testValid() {
    const nom = item.nom;
    // Afficher un message d'erreur pour chaque champ vide
    if (!nom) {
      setNomError(true);
    } else if (nom.length > 50) {
      setMessageError("Le nom d'un cours ne peut pas excéder 50 caractères.");
      setNomError(true);
    } else if (item.type === null) {
      setTypeError(true);
    } else {
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
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: nomError ? "red" : "" }}
            />
            {nomError && <p style={{ color: "red" }}>{messageError}</p>}
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
                  testValid();
                }
              }}
            />
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
              style={{ borderColor: typeError ? "red" : "" }}
              required
            >
              <option hidden>Type de cours</option>
              {generateOptionsType()}
            </select>
            {typeError && <p style={{ color: "red" }}>{messageError}</p>}
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
