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

function Formulaire({ nomFormulaire, item, isOpen, toggle, onSave, fields }) {
  const [activeItem, setActiveItem] = useState(item);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setActiveItem({ ...activeItem, [name]: value });
  };

  // fonction pour générer le contenu du formulaire
  const generateFormFields = () => {
    return fields.map((field) => (
      <FormGroup key={field.nom}>
        <Label for={field.nom}>{field.titre}</Label>
        {field.type === "select" ? (
          <Input
            type={field.type}
            name={field.nom}
            value={activeItem[field.nom]}
            onChange={handleChange}
          >
            {field.options.map((option) => (
              <option key={option.nameOption} value={option.value}>
                {option.nameOption}
              </option>
            ))}
          </Input>
        ) : (
          <Input
            type={field.type}
            name={field.nom}
            value={activeItem[field.nom]}
            onChange={handleChange}
          />
        )}
      </FormGroup>
    ));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{nomFormulaire}</ModalHeader>
      <ModalBody>
        <Form>{generateFormFields()}</Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Formulaire;
