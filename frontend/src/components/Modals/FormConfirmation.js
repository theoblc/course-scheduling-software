import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function FormConfirmation({ isOpen, toggle, onSave }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Confirmation</ModalHeader>
      <ModalBody>Etes-vous sûr de vouloir supprimer cet élément ?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          Annuler
        </Button>
        <Button className="ml-auto" color="success" onClick={onSave}>
          Valider
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormConfirmation;
