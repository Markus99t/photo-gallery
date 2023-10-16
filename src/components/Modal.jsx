import React, { useCallback, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "../styles/modal.scss";

function Modal({ open, onClose, children }) {
  const dialogRef = useRef(null);

  const onOutsideClick = useCallback(
    ({ target }) => {
      const { current: el } = dialogRef;
      if (target === el) onClose();
    },
    [onClose],
  );

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = dialogRef;
    if (!open) el.close();
  }, [open]);

  useEffect(() => {
    const { current: el } = dialogRef;
    if (open) el.showModal();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`modal${!open ? " modal--closing" : ""}`}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onOutsideClick}
      onAnimationEnd={onAnimEnd}
    >
      <div className="modal-container">
        <IconButton className="modal-close-button" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </div>
    </dialog>
  );
}

function ModalTemplate({ title, children }) {
  return (
    <div className="modal-template">
      <div className="modal-template-title">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export { ModalTemplate };

export default Modal;
