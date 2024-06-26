// Bibliothèques
import React, { useState, useEffect, useCallback } from "react";
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
import { getEnseignantsURL } from "../Outils/Urls";

/**
 * Le rôle de ce composant est d'afficher un formulaire pour rentrer des informations sur un module.
 * Il est utilisé aussi bien pour ajouter un nouveau module que pour modifier un module existant.
 */
function FormModule({ isOpen, toggle, activeItem, onSave, title }) {
  const [sum, setSum] = useState(0);
  const [item, setItem] = useState({ ...activeItem });
  const [enseignants, setEnseignants] = useState([]);
  // Gestion des erreurs
  const [nomError, setNomError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [nombreHeuresError, setNombreHeuresError] = useState(false);
  const [coordonnateur1Error, setCoordonnateur1Error] = useState(false);
  // Gestion des messages d'erreur
  const [messageNomError, setMessageNomError] = useState("");
  const [messageCodeError, setMessageCodeError] = useState("");
  const [messageHeuresError, setMessageHeuresError] = useState("");
  const [messageCoordonnateurError, setMessageCoordonnateurError] =
    useState("");

  const calculateSum = useCallback((item) => {
    const sum = [
      Number(item.nb_heures_be),
      Number(item.nb_heures_tp),
      Number(item.nb_heures_td),
      Number(item.nb_heures_cm),
      Number(item.nb_heures_ci),
      Number(item.nb_heures_hors_presentiel),
    ].reduce((acc, val) => acc + val, 0);
    setSum(sum);
  }, []);

  useEffect(() => {
    calculateSum(item);
    const fetchData = async () => {
      const API_URL_ENSEIGNANTS = getEnseignantsURL();
      const raw_enseignants = await fetch(API_URL_ENSEIGNANTS);
      const enseignants = await raw_enseignants.json();
      setEnseignants(enseignants);
    };

    fetchData().catch(console.error);
  }, [calculateSum, item]);

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "coordonnateur1" || name === "coordonnateur2") {
      value = JSON.parse(value);
    }
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function generateOptionsCoordonnateur() {
    return enseignants.map((enseignant) => (
      <option key={enseignant.id} value={JSON.stringify(enseignant)}>
        {enseignant.nom} {enseignant.prenom}
      </option>
    ));
  }

  function nombreValide(nombre) {
    return !(nombre < 0 || nombre > 999);
  }

  function validation_nombre() {
    return (
      nombreValide(item.nb_heures_be) &&
      nombreValide(item.nb_heures_tp) &&
      nombreValide(item.nb_heures_td) &&
      nombreValide(item.nb_heures_cm) &&
      nombreValide(item.nb_heures_ci) &&
      nombreValide(item.nb_heures_hors_presentiel)
    );
  }

  function resetError() {
    setNomError(false);
    setCodeError(false);
    setCoordonnateur1Error(false);
    setNombreHeuresError(false);
  }

  function testValid() {
    resetError();
    const code = item.code;
    const nom = item.nom;
    const valid_coordonnateur1 = item.coordonnateur1;
    const valid_nombre = validation_nombre();
    if (
      !code ||
      !nom ||
      nom.length > 50 ||
      code.length > 7 ||
      !valid_coordonnateur1 ||
      !valid_nombre
    ) {
      // Afficher un message d'erreur pour chaque champ invalide
      if (!nom) {
        setMessageNomError("Le champ est obligatoire.");
        setNomError(true);
      }
      if (nom.length > 50) {
        setMessageNomError(
          "Le nom d'un module ne peut pas excéder 50 caractères."
        );
        setNomError(true);
      }
      if (!code) {
        console.log(code);
        setMessageCodeError("Le champ est obligatoire.");
        setCodeError(true);
      }
      if (code.length > 7) {
        setMessageCodeError(
          "Le code d'un module ne peut pas excéder 7 caractères."
        );
        setCodeError(true);
      }
      if (!valid_coordonnateur1) {
        setMessageCoordonnateurError("Le champ est obligatoire.");
        setCoordonnateur1Error(true);
      }
      if (!valid_nombre) {
        setMessageHeuresError(
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
      item.nb_heures_total = sum;
      return onSave(item);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="code"
              value={item.code}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: codeError ? "red" : "" }}
            />
            {codeError && <p style={{ color: "red" }}>{messageCodeError}</p>}
          </FormGroup>
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
            <Label for="coordonnateur1">Coordonnateur 1</Label>
            <select
              className="form-control"
              name="coordonnateur1"
              onChange={handleChange}
              value={JSON.stringify(item.coordonnateur1)}
              placeholder={
                module.coordonnateur1
                  ? `${item.coordonnateur1.nom} ${item.coordonnateur1.prenom}`
                  : ""
              }
              style={{ borderColor: coordonnateur1Error ? "red" : "" }}
            >
              <option hidden>Choix du coordinateur 1</option>
              {generateOptionsCoordonnateur()}
            </select>
            {coordonnateur1Error && (
              <p style={{ color: "red" }}>{messageCoordonnateurError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="coordonnateur2">Coordonnateur 2</Label>
            <select
              className="form-control"
              name="coordonnateur2"
              onChange={handleChange}
              value={JSON.stringify(item.coordonnateur2)}
              placeholder={
                module.coordonnateur2
                  ? `${item.coordonnateur2.nom} ${item.coordonnateur2.prenom}`
                  : ""
              }
            >
              <option hidden>Choix du coordinateur 2</option>
              {generateOptionsCoordonnateur()}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_cm">Nombre d'heures de CM</Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures_cm"
              value={item.nb_heures_cm}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageHeuresError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures_ci"
              value={item.nb_heures_ci}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageHeuresError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_td">Nombre d'heures de TD</Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures_td"
              value={item.nb_heures_td}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageHeuresError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures_tp"
              value={item.nb_heures_tp}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageHeuresError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_be">Nombre d'heures de BE</Label>
            <Input
              type="number"
              min={0}
              max={999}
              name="nb_heures_be"
              value={item.nb_heures_be}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  validateForm();
                }
              }}
            />
            {nombreHeuresError && (
              <p style={{ color: "red" }}>{messageHeuresError}</p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_hors_presentiel">
              Nombre d'heures hors présentiel
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
              <p style={{ color: "red" }}>{messageHeuresError}</p>
            )}
          </FormGroup>
          <p>Nombre d'heures total : {sum}</p>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => {
            validateForm();
          }}
        >
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormModule;
