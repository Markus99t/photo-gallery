import React from "react";
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
