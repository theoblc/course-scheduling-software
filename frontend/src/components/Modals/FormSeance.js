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
  const [enseignants, setEnseignants] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [debutError, setDebutError] = useState(false);
  const [finError, setFinError] = useState(false);
  const [numeroError, setNumeroError] = useState(false);
  const [coherenceError, setCoherenceError] = useState(false);

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

  function testValid() {
    const { date, heure_debut, heure_fin, numero_groupe_td } = item;
    var debut_avant_fin = heure_debut <= heure_fin;
    if (
      !date ||
      !heure_debut ||
      !heure_fin ||
      !numero_groupe_td ||
      !debut_avant_fin
    ) {
      // Afficher un message d'erreur pour chaque champ vide
      if (!date) {
        setDateError(true);
      }
      if (!heure_debut) {
        setDebutError(true);
      }
      if (!heure_fin) {
        setFinError(true);
      }
      if (!numero_groupe_td) {
        setNumeroError(true);
      }
      if (!debut_avant_fin) {
        setCoherenceError(true);
      }
    } else {
      $(function () {
        // Sélectionner les champs d'heure de début, heure de fin et salle du formulaire
        var date_input = $("#date");
        var heure_debut_input = $("#heure_debut");
        var heure_fin_input = $("#heure_fin");
        var salle_input = $("#salle");
        var numero_groupe_td_input = $("#numero_groupe_td");

        // Fonction à appeler lorsqu'un champ est modifié
        function detecter_conflits() {
          // Récupérer les valeurs des champs
          var date = date_input.val();
          var heure_debut = heure_debut_input.val();
          var heure_fin = heure_fin_input.val();
          var salle = salle_input.val();
          var numero_groupe_td = numero_groupe_td_input.val();

          // Envoyer une requête AJAX pour vérifier les conflits
          $.ajax({
            url: "/conflit_creation_salle/",
            type: "POST",
            data: {
              id: "", // Mettez l'identifiant de la séance ici si vous voulez modifier une séance existante
              date: date,
              heure_debut: heure_debut,
              heure_fin: heure_fin,
              salle: salle,
              numero_groupe_td: numero_groupe_td,
              csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(), // Ajouter le jeton CSRF pour la sécurité
            },
            success: function (response) {
              // Si la réponse indique un conflit, afficher un message d'erreur
              if (response.error) {
                alert(response.error);
              }
            },
            error: function (xhr, status, error) {
              // En cas d'erreur, afficher un message d'erreur générique
              alert("Une erreur s'est produite. Veuillez réessayer.");
            },
          });
        }

        // Ajouter un événement de changement aux champs suivants
        date_input.on("change", detecter_conflits);
        heure_debut_input.on("change", detecter_conflits);
        heure_fin_input.on("change", detecter_conflits);
        salle_input.on("change", detecter_conflits);
        numero_groupe_td_input.on("change", detecter_conflits);
      });
      return onSave(item);
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              value={item.date}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: dateError ? "red" : "" }}
            />
            {dateError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
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
            {debutError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
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
            {finError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
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
              name="numero_groupe_td"
              value={item.numero_groupe_td}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  testValid();
                }
              }}
              // Afficher une bordure rouge si le champ est vide
              style={{ borderColor: numeroError ? "red" : "" }}
            />
            {numeroError && (
              <p style={{ color: "red" }}>Ce champ est obligatoire</p>
            )}
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
