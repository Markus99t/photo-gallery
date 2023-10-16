import React from "react";
import Modal from "../Modal";
import "../../styles/modal/photo.scss";
import { IconButton } from "@mui/material";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function Photo({
  open,
  image,
  onClose,
  onNext,
  onPrevious,
  hasPrevious,
  hasNext,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <img src={image} alt="" className="modal-photo" />
      {hasPrevious() && (
        <IconButton className="modal-photo-previous" onClick={onPrevious}>
          <ArrowCircleLeftIcon fontSize="large" />
        </IconButton>
      )}
      {hasNext() && (
        <IconButton className="modal-photo-next" onClick={onNext}>
          <ArrowCircleRightIcon fontSize="large" />
        </IconButton>
      )}
    </Modal>
  );
}

export default Photo;
