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

function FormModule({ toggle, onSave, activeItem }) {
  const [sum, setSum] = useState(0);
  const [item, setItem] = useState(activeItem);

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

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Ajout d'un module</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="code"
              value={item.code}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nom">Nom</Label>
            <Input
              type="text"
              name="nom"
              value={item.nom}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_tp">Nombre d'heures de TP</Label>
            <Input
              type="number"
              name="nb_heures_tp"
              value={item.nb_heures_tp}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_td">Nombre d'heures de TD</Label>
            <Input
              type="number"
              name="nb_heures_td"
              value={item.nb_heures_td}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_be">Nombre d'heures de BE</Label>
            <Input
              type="number"
              name="nb_heures_be"
              value={item.nb_heures_be}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_ci">Nombre d'heures de CI</Label>
            <Input
              type="number"
              name="nb_heures_ci"
              value={item.nb_heures_ci}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nb_heures_cm">Nombre d'heures de CM</Label>
            <Input
              type="number"
              name="nb_heures_cm"
              value={item.nb_heures_cm}
              onChange={handleChange}
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
            console.log(item);
            onSave(item);
          }}
        >
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormModule;
