import React, { useState } from "react";
import Modal, { ModalTemplate } from "../Modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputButton from "../inputs/InputButton";

import "../../styles/modal/addPhoto.scss";
import InputDragNDrop from "../inputs/InputDragNDrop";
import { Alert } from "@mui/material";

const url = "http://api.programator.sk";

function AddPhoto({ open, onClose, onAdded }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const { category: urlCategory } = useParams();

  function onFiles(files) {
    setFiles(files);
  }

  function removeFile(id) {
    setFiles((prevFiles) => {
      prevFiles.filter((file, i) => id !== i);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!files.length) {
      setError("Vyberte fotky.");
      setShowError(true);
      return;
    }

    let errorCheck = false;

    files.forEach((file) => {
      if (file.size > 30 * 1024 * 1024) {
        errorCheck = true;
        setError("Veľkost fotky " + file.name + " je väčšia ako 30 MB.");
        setShowError(true);
      } else if (!file.name.match(/\.(jpg|jpeg)$/i)) {
        errorCheck = true;
        setError("Fotka " + file.name + " nie je vo formáte JPEG.");
        setShowError(true);
      }
    });

    if (errorCheck) return;

    Promise.all(
      files.map(async (file, i) => {
        const fileData = new FormData();
        fileData.append("image", file);

        const uploadedImage = await axios.post(
          url + "/gallery/" + urlCategory,
          fileData,
        );
        switch (uploadedImage.status) {
          case 201:
            removeFile(i);
            break;
          case 400:
            setError("Error_400");
            setShowError(true);
            break;
          case 404:
            setError("Kategóriu sa nepodarilo nájsť.");
            setShowError(true);
            break;
        }
      }),
    ).then((res) => {
      onClose();
      onAdded();
    });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalTemplate title="Pridať fotky">
        <form className="modal-add-photo">
          <InputDragNDrop onFiles={onFiles} />
          <InputButton value="Pridať" type="submit" onClick={handleSubmit} />
          {showError && <Alert severity="error">{error}</Alert>}
        </form>
      </ModalTemplate>
    </Modal>
  );
}

export default AddPhoto;
