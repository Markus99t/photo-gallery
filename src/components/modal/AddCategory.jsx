import React, { useState } from "react";
import Modal, { ModalTemplate } from "../Modal";
import { TextField, Alert } from "@mui/material";

import "../../styles/modal/addCategory.scss";
import axios from "axios";
import InputButton from "../inputs/InputButton";

const url = "http://api.programator.sk";

function AddCategory({ open, onClose, onAdded }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setName(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setError("Zadajte názov kategórie.");
      setShowError(true);
      return;
    }

    const nameTrimmed = name.trim();

    await axios
      .post(url + "/gallery", { name: nameTrimmed })
      .then(() => {
        onClose();
        onAdded();
      })
      .catch((err) => {
        console.error(err);
        switch (err.response.status) {
          case 409:
            setError("Error_409 - Názov už existuje!");
            setShowError(true);
            break;
          case 400:
            setError("Error_400");
            setShowError(true);
            break;
          case 500:
            setError("Error_500");
            setShowError(true);
            break;
        }
      });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalTemplate title="Pridať kategóriu">
        <form className="modal-add-category">
          <TextField
            required
            id="outlined-required"
            label="Názov kategórie"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
          <InputButton value="Pridať" type="submit" onClick={handleSubmit} />
          {showError && <Alert severity="error">{error}</Alert>}
        </form>
      </ModalTemplate>
    </Modal>
  );
}

export default AddCategory;
