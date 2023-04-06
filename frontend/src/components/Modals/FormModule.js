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
  const [item, setItem] = useState(activeItem);
  const [nomError, setNomError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const calculateSum = useCallback((item) => {
    const sum = [
      Number(item.nb_heures_be),
      Number(item.nb_heures_tp),
      Number(item.nb_heures_td),
      Number(item.nb_heures_cm),
      Number(item.nb_heures_ci),
    ].reduce((acc, val) => acc + val, 0);
    setSum(sum);
  }, []);

  useEffect(() => {
    calculateSum(item);
  }, [calculateSum, item]);

  function handleChange(e) {
    let { name, value } = e.target;
    const newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function testValid() {
    const code = item.code;
    const nom = item.nom;
    if (!nom || !code) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!nom) {
        setNomError(true);
      }
      if (!code) {
        setCodeError(true);
      }
      return;
    } else {
      return onSave(item, sum);
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
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: codeError ? "red" : "" }}
            />
            {codeError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
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
            <Label for="nb_heures_cm">Nombre d'heures de CM</Label>
            <Input
              type="number"
              name="nb_heures_cm"
              value={item.nb_heures_cm}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
            <Input
              type="number"
              name="nb_heures_ci"
              value={item.nb_heures_ci}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_td">Nombre d'heures de TD</Label>
            <Input
              type="number"
              name="nb_heures_td"
              value={item.nb_heures_td}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
            <Input
              type="number"
              name="nb_heures_tp"
              value={item.nb_heures_tp}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_be">Nombre d'heures de BE</Label>
            <Input
              type="number"
              name="nb_heures_be"
              value={item.nb_heures_be}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
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
            item.nb_heures_total = sum;
            testValid();
          }}
        >
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormModule;
