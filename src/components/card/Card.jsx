import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";

function Card({
  id,
  linkTo,
  image,
  actionName,
  actionIcon,
  name,
  description,
  onClick,
}) {
  function handleOnClick(e) {
    onClick(e, id);
    e.preventDefault();
  }

  function handleOnKeyDown(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onClick(e, id);
    }
  }

  return (
    <div className="card-container">
      <Link
        className="card-wrapper"
        to={linkTo}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
      >
        <div className={`card ${actionName || actionIcon ? "--action" : ""}`}>
          {image && <div className="card-image">{image}</div>}
          {(name || description) && (
            <div className="card-details">
              <div className="card-name">{name}</div>
            </div>
          )}
          {(actionName || actionIcon) && (
            <div className="card-action">
              <div className="card-action-icon">{actionIcon}</div>
              <div className="card-action-name">{actionName}</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default Card;
