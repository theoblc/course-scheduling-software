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

  function handleChange(e) {
    let { name, value } = e.target;
    let newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function generateOptionsSalle() {
    return salles.map((salle) => (
      <option key={salle.id} value={salle.id}>
        {salle.numero}
      </option>
    ));
  }

  function generateOptionsEnseignant() {
    return enseignants.map((enseignant) => (
      <option key={enseignant.id} value={enseignant.id}>
        {enseignant.nom} {enseignant.prenom}
      </option>
    ));
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Ajout d'une séance</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              value={item.date}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="heure_debut">Heure Début</Label>
            <Input
              type="time"
              name="heure_debut"
              value={item.heure_debut}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="heure_fin">Heure Fin</Label>
            <Input
              type="time"
              name="heure_fin"
              value={item.heure_fin}
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
              {generateOptionsSalle()}
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
              {generateOptionsEnseignant()}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="effectif">Effectif</Label>
            <Input
              type="text"
              name="effectif"
              value={item.effectif}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSave(item);
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="commentaire">Commentaire</Label>
            <Input
              type="textarea"
              name="commentaire"
              value={item.commentaire}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSave(item);
                }
              }}
            />
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
