import React, { useState, useEffect } from "react";
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

function FormSeance({ isOpen, toggle, activeItem, onSave }) {
  const [item, setItem] = useState(activeItem);
  const [salles, setSalles] = useState([]);
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const raw_salles = await fetch("http://localhost:8000/api/salles/");
      const salles = await raw_salles.json();
      setSalles(salles);

      const raw_enseignants = await fetch(
        "http://localhost:8000/api/enseignants/"
      );
      const enseignants = await raw_enseignants.json();
      setEnseignants(enseignants);
    };

    fetchData().catch(console.error);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    let newItem = { ...item, [name]: value };
    setItem(newItem);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Ajout d'une séance</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="date_debut">Date Début</Label>
            <Input
              type="datetime-local"
              name="date_debut"
              value={item.date_debut}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="date_fin">Date Fin</Label>
            <Input
              type="datetime-local"
              name="date_fin"
              value={item.date_fin}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="numero_groupe_td">Numéro Groupe TD</Label>
            <Input
              type="number"
              name="numero_groupe_td"
              value={item.numero_groupe_td}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="salle">Salle</Label>
            <select
              className="form-control"
              name="salle"
              onChange={handleChange}
              value={item.salle}
              placeholder={item.salle}
            >
              <option hidden>Choix de la salle</option>
              {salles.map((salle) => (
                <option key={salle.id} value={salle.id}>
                  {salle.numero}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="enseignant">Enseignant</Label>
            <select
              className="form-control"
              name="enseignant"
              onChange={handleChange}
              value={item.enseignant}
              placeholder={item.enseignant}
            >
              <option hidden>Choix de l'enseignant</option>
              {enseignants.map((enseignant) => (
                <option key={enseignant.id} value={enseignant.id}>
                  {enseignant.nom} {enseignant.prenom}
                </option>
              ))}
            </select>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormSeance;
