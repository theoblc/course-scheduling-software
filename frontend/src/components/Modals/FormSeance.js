import React, { useState, useEffect } from "react";
import $ from "jquery";
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
  const [chevauchError, setChevauchError] = useState(false);
  const messageError = "Le champ est obligatoire.";

  useEffect(() => {
    const fetchData = async () => {
      const raw_cours = await fetch(
        `http://localhost:8000/api/modules/${item.module.id}/cours`
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
    if (["cours", "salle", "enseignant"].includes(name)) {
      value = JSON.parse(value);
    }
    const newItem = { ...item, [name]: value };
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
      <option key={cours.id} value={JSON.stringify(cours)}>
        {cours.nom}
      </option>
    ));
  }

  function generateOptionsSalle() {
    return salles.map((salle) => (
      <option key={salle.id} value={JSON.stringify(salle)}>
        {salle.numero}
      </option>
    ));
  }

  function generateOptionsEnseignant() {
    return enseignants.map((enseignant) => (
      <option key={enseignant.id} value={JSON.stringify(enseignant)}>
        {enseignant.nom} {enseignant.prenom}
      </option>
    ));
  }

  function isValidDate(dateString) {
    // Expression régulière pour vérifier le format dd/MM/yyyy
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return regex.test(dateString);
  }

  async function detecter_conflits() {
    const {
      id,
      date,
      heure_debut,
      heure_fin,
      effectif,
      commentaire,
      module,
      cours,
      enseignant,
      salle,
      numero_groupe_td,
    } = item;

    const data = JSON.stringify({
      id: id,
      date: date,
      heure_debut: heure_debut,
      heure_fin: heure_fin,
      effectif: effectif,
      commentaire: commentaire,
      module: module.id,
      cours: cours.id,
      enseignant: enseignant.id,
      salle: salle.id,
      numero_groupe_td: numero_groupe_td,
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/seances/chevauchements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );

      if (response.ok) {
        setChevauchError(false);
        return false;
      } else if (response.status === 400) {
        const json = await response.json();
        const errorMessage = json.error;
        if (errorMessage) {
          alert(errorMessage);
        }
        setChevauchError(true);
        return true;
      } else {
        alert("Une erreur s'est produite. Veuillez réessayer.");
        setChevauchError(false);
        return false;
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
      setChevauchError(false);
      return false;
    }
  }

  async function testValid() {
    setCoursError(false);
    setDateError(false);
    setDebutError(false);
    setFinError(false);
    setCoherenceError(false);
    setChevauchError(false);
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
      const chevauchement = await detecter_conflits();
      setChevauchError(chevauchement);
      if (!chevauchement) {
        return toggle(item);
      }
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form className="formulaire">
          <FormGroup>
            <Label for="cours">Cours</Label>
            <select
              className="form-control"
              name="cours"
              onChange={handleChange}
              value={JSON.stringify(item.cours)}
              placeholder={item.cours.nom}
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
              value={JSON.stringify(item.salle)}
              placeholder={item.salle.numero}
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
              value={JSON.stringify(item.enseignant)}
              placeholder={`${item.enseignant.nom} ${item.enseignant.prenom}`}
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
      {chevauchError && (
        <p style={{ color: "red", margin: "15px" }}>
          Cette séance est en conflit avec une autre séance. Veuillez contacter
          le responsable du module <b>{item.module.code}</b>.
        </p>
      )}
      <ModalFooter>
        <Button
          className="enregistrerButton"
          color="success"
          onClick={() => testValid()}
        >
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormSeance;
