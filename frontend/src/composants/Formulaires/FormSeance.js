// Bibliothèques
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
import axios from "axios";

// Composants
import TableauSimple from "../ElementsInterface/TableauSimple";
import {
  getModuleCoursURL,
  getEnseignantsURL,
  getSallesURL,
  getConflitsURL,
} from "../Outils/Urls";

/**
 * Le rôle de ce composant est d'afficher un formulaire pour rentrer des informations sur une seance.
 * Il est utilisé aussi bien pour ajouter une nouvelle seance que pour modifier une seance existante.
 */
function FormSeance({ isOpen, toggle, activeItem, onSave, title }) {
  const [item, setItem] = useState(activeItem);
  const [salles, setSalles] = useState([]);
  const [cours, setCours] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [listeConflits, setListeConflits] = useState([]);
  // Gestion des erreurs
  const [coursError, setCoursError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [debutError, setDebutError] = useState(false);
  const [finError, setFinError] = useState(false);
  const [groupeError, setGroupError] = useState(false);
  const [coherenceError, setCoherenceError] = useState(false);
  const [chevauchError, setChevauchError] = useState(false);
  // Gestion des messages d'erreur
  const messageGroupError = "Le numéro doit être compris entre 0 et 9";
  const messageError = "Le champ est obligatoire.";

  useEffect(() => {
    const fetchData = async () => {
      const API_URL_MODULE_COURS = getModuleCoursURL(item.module.id);
      const raw_cours = await fetch(API_URL_MODULE_COURS);
      const cours = await raw_cours.json();
      setCours(cours);

      const API_URL_SALLES = getSallesURL();
      const raw_salles = await fetch(API_URL_SALLES);
      const salles = await raw_salles.json();
      salles.sort((a, b) => a.numero.localeCompare(b.numero));
      setSalles(salles);

      const API_URL_ENSEIGNANTS = getEnseignantsURL();
      const raw_enseignants = await fetch(API_URL_ENSEIGNANTS);
      const enseignants = await raw_enseignants.json();
      enseignants.sort((a, b) => a.nom.localeCompare(b.nom));
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

  function testDate(dateString) {
    // Expression régulière pour vérifier le format dd/MM/yyyy
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return regex.test(dateString);
  }

  async function testConflits() {
    const API_URL_CONFLITS = getConflitsURL();
    const response = await axios.post(API_URL_CONFLITS, item);
    if (!response.data.conflit) {
      setChevauchError(false);
      return false;
    }
    setListeConflits(response.data.liste);
    setChevauchError(true);
    return true;
  }

  function nombreValide(nombre) {
    return !(nombre < 0 || nombre > 9);
  }

  function resetError() {
    setCoursError(false);
    setDateError(false);
    setDebutError(false);
    setFinError(false);
    setCoherenceError(false);
    setChevauchError(false);
  }

  function testValid() {
    resetError();
    console.log(item);
    const { date, heure_debut, heure_fin } = item;
    var debut_avant_fin = heure_debut <= heure_fin;
    var date_valide = testDate(date);
    var cours_valide = item.cours.id !== 0;
    var valid_group = nombreValide(item.numero_groupe_td);
    if (
      !date ||
      !heure_debut ||
      !heure_fin ||
      !debut_avant_fin ||
      !date_valide ||
      !cours_valide ||
      !valid_group
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
      if (!valid_group) {
        setGroupError(true);
      }
      return false;
    }
    return true;
  }

  async function validateForm() {
    if (testValid()) {
      const chevauchement = await testConflits();
      if (!chevauchement) {
        return onSave(item);
      }
    }
  }

  function validateFormWithConflict() {
    item.salle = null;
    item.enseignant = null;
    return onSave(item);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <div className="container-fluid">
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
                    validateForm();
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
                    validateForm();
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
                    validateForm();
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
              {groupeError && (
                <p style={{ color: "red" }}>{messageGroupError}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="salle">Salle</Label>
              <select
                className="form-control"
                name="salle"
                onChange={handleChange}
                value={JSON.stringify(item.salle)}
                placeholder={item.salle ? item.salle.numero : ""}
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
                placeholder={
                  item.enseignant
                    ? `${item.enseignant.nom} ${item.enseignant.prenom}`
                    : ""
                }
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
                    validateForm();
                  }
                }}
              />
            </FormGroup>
          </Form>
        </div>
      </ModalBody>
      {chevauchError && (
        <div>
          <h2 className="text-center text-danger">Liste des conflits</h2>
          <TableauSimple
            data={listeConflits}
            columns={[
              { data: "type_conflit" },
              {
                data: "module",
                render: function (data) {
                  const { code } = data;
                  return `${code}`;
                },
              },
              {
                data: "cours",
                render: function (data) {
                  const { nom } = data;
                  return `${nom}`;
                },
              },
              { data: "date" },
              { data: "heure_debut" },
              { data: "heure_fin" },
              {
                data: "salle",
                render: function (data) {
                  if (data) {
                    const { numero } = data;
                    return `${numero}`;
                  } else {
                    return "";
                  }
                },
              },
              {
                data: "enseignant",
                render: function (data) {
                  if (data) {
                    const { nom, prenom } = data;
                    return `${nom} ${prenom}`;
                  } else {
                    return "";
                  }
                },
              },
            ]}
            nameColumns={[
              "Type de conflit",
              "Module",
              "Cours",
              "Date",
              "Heure de début",
              "Heure de fin",
              "Salle",
              "Enseignant",
            ]}
          />
        </div>
      )}
      <ModalFooter>
        {chevauchError ? (
          <div>
            <Button
              color="warning"
              onClick={validateFormWithConflict}
              className="float-start me-2"
            >
              Conserver
            </Button>
            <Button color="success" onClick={() => validateForm()}>
              Réessayer
            </Button>
          </div>
        ) : (
          <Button color="success" onClick={() => validateForm()}>
            Enregistrer
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default FormSeance;
