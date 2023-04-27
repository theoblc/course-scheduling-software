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

function FormModule({ isOpen, toggle, activeItem, onSave, title }) {
  const [sum, setSum] = useState(0);
  const [item, setItem] = useState({ ...activeItem });
  const [enseignants, setEnseignants] = useState([]);
  const [nomError, setNomError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [coordinateurError, setCoordinateurError] = useState(false);
  const [messageError, setMessageError] = useState("Le champ est obligatoire.");

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
      const raw_enseignants = await fetch(
        "http://localhost:8000/api/enseignants/"
      );
      const enseignants = await raw_enseignants.json();
      setEnseignants(enseignants);
    };

    fetchData().catch(console.error);
  }, [calculateSum, item]);

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "enseignant") {
      value = JSON.parse(value);
    }
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function testValid() {
    setNomError(false);
    setCodeError(false);
    const code = item.code;
    const nom = item.nom;
    const enseignant = item.enseignant.id;
    if (!nom || !code || enseignant === null) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!nom) {
        setNomError(true);
      }
      if (!code) {
        setCodeError(true);
      }
      if (!enseignant) {
        setCoordinateurError(true);
      }
      return false;
    }
    if (code.length > 7) {
      setMessageError("Le code d'un module ne peut pas excéder 7 caractères.");
      setCodeError(true);
      return false;
    }
    if (nom.length > 50) {
      setMessageError("Le nom d'un module ne peut pas excéder 50 caractères.");
      setNomError(true);
      return false;
    }
    return true;
  }

  function generateOptionsCoordinateur() {
    return enseignants.map((enseignant) => (
      <option key={enseignant.id} value={JSON.stringify(enseignant)}>
        {enseignant.nom} {enseignant.prenom}
      </option>
    ));
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
            {codeError && <p style={{ color: "red" }}>{messageError}</p>}
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
            {nomError && <p style={{ color: "red" }}>{messageError}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="enseignant">Coordinateur</Label>
            <select
              className="form-control"
              name="enseignant"
              onChange={handleChange}
              value={JSON.stringify(item.enseignant)}
              placeholder={`${item.enseignant.nom} ${item.enseignant.prenom}`}
              style={{ borderColor: coordinateurError ? "red" : "" }}
            >
              <option hidden>Choix du coordinateur</option>
              {generateOptionsCoordinateur()}
            </select>
            {coordinateurError && (
              <p style={{ color: "red" }}>{messageError}</p>
            )}
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
