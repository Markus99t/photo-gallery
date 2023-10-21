import React, { useEffect } from "react";
import Modal from "../Modal";
import "../../styles/modal/photo.scss";
import { IconButton } from "@mui/material";

import ArrowLeft from "@mui/icons-material/ArrowBackIosNew";
import ArrowRight from "@mui/icons-material/ArrowForwardIos";

function Photo({
  open,
  image,
  onClose,
  onNext,
  onPrevious,
  hasPrevious,
  hasNext,
}) {
  useEffect(() => {
    function keyDownHandler(e) {
      switch (e.key) {
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        default:
          break;
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Modal open={open} onClose={onClose}>
      <img src={image} alt="" className="modal-photo" />
      {hasPrevious() && (
        <IconButton className="modal-photo-previous" onClick={onPrevious}>
          <ArrowLeft fontSize="small" />
        </IconButton>
      )}
      {hasNext() && (
        <IconButton className="modal-photo-next" onClick={onNext}>
          <ArrowRight fontSize="small" />
        </IconButton>
      )}
    </Modal>
  );
}

export default Photo;
