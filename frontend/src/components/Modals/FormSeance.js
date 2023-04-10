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

function FormSeance({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const [salles, setSalles] = useState([]);
  const [cours, setCours] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [coursError, setCoursError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [debutError, setDebutError] = useState(false);
  const [finError, setFinError] = useState(false);
  const [coherenceError, setCoherenceError] = useState(false);
  const messageError = "Le champ est obligatoire.";

  useEffect(() => {
    const fetchData = async () => {
      const raw_cours = await fetch(
        `http://localhost:8000/api/modules/${item.module}/cours`
      );
      const cours = await raw_cours.json();
      setCours(cours);

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
  }, [item.module]);

  function handleChange(e) {
    let { name, value } = e.target;
    let newItem = { ...item, [name]: value };
    setItem(newItem);
  }

  function generateOptionsEffectif() {
    const choix_effectif = [
      "1/2 Promo",
      "Promo complète",
      "Groupe de TP",
      "1/2 Groupe de TP",
      "Groupe de TD",
      "1/2 Groupe de TD",
    ];
    return choix_effectif.map((effectif) => (
      <option key={effectif} value={effectif}>
        {effectif}
      </option>
    ));
  }

  function generateOptionsCours() {
    return cours.map((cours) => (
      <option key={cours.id} value={cours.id}>
        {cours.nom}
      </option>
    ));
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

  function isValidDate(dateString) {
    // Expression régulière pour vérifier le format dd/MM/yyyy
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return regex.test(dateString);
  }

  function testValid() {
    setCoursError(false);
    setDateError(false);
    setDebutError(false);
    setFinError(false);
    setCoherenceError(false);
    const { date, heure_debut, heure_fin } = item;
    var debut_avant_fin = heure_debut <= heure_fin;
    var date_valide = isValidDate(date);
    var cours_valide = item.cours.id !== 0;
    if (
      !date ||
      !heure_debut ||
      !heure_fin ||
      !debut_avant_fin ||
      !date_valide ||
      !cours_valide
    ) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!cours_valide) {
        setCoursError(true);
      }
      if (!date | !date_valide) {
        setDateError(true);
      }
      if (!heure_debut) {
        setDebutError(true);
      }
      if (!heure_fin) {
        setFinError(true);
      }
      if (!debut_avant_fin) {
        setCoherenceError(true);
      }
    } else {
      return onSave(item);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="salle">Cours</Label>
            <select
              className="form-control"
              name="cours"
              onChange={handleChange}
              value={item.cours}
              placeholder={item.cours}
              style={{ borderColor: coursError ? "red" : "" }}
            >
              <option hidden>Choix du cours</option>
              {generateOptionsCours()}
            </select>
            {coursError && <p style={{ color: "red" }}>{messageError}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="text"
              name="date"
              defaultValue={item.date}
              onChange={handleChange}
              placeholder="dd/MM/yyyy"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: dateError ? "red" : "" }}
            />
            {dateError && <p style={{ color: "red" }}>{messageError}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="heure_debut">Heure Début</Label>
            <Input
              type="time"
              name="heure_debut"
              value={item.heure_debut}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{
                borderColor: debutError || coherenceError ? "red" : "",
              }}
            />
            {debutError && <p style={{ color: "red" }}>{messageError}</p>}
            {coherenceError && (
              <p style={{ color: "red" }}>
                L'heure de début doit être avant l'heure de fin de séance
              </p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="heure_fin">Heure Fin</Label>
            <Input
              type="time"
              name="heure_fin"
              value={item.heure_fin}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{
                borderColor: finError || coherenceError ? "red" : "",
              }}
            />
            {finError && <p style={{ color: "red" }}>{messageError}</p>}
            {coherenceError && (
              <p style={{ color: "red" }}>
                L'heure de début doit être avant l'heure de fin de séance
              </p>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="numero_groupe_td">Numéro Groupe TD</Label>
            <Input
              type="number"
              min={0}
              max={9}
              name="numero_groupe_td"
              value={item.numero_groupe_td}
              onChange={handleChange}
            />
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
            <Label for="commentaire">Commentaire</Label>
            <Input
              type="textarea"
              name="commentaire"
              value={item.commentaire}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
            />
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

export default FormSeance;
