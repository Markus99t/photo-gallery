import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/card.scss";

const url = "http://api.programator.sk";

function Card({
  id,
  linkTo,
  image,
  actionName,
  actionIcon,
  name,
  description,
  href,
  onClick,
  width,
}) {
  function handleOnClick(e) {
    if (onClick) {
      onClick(e, id);
    }
  }

  function handleOnKeyDown(e) {
    if (!href && !linkTo && onClick)
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        onClick(e, id);
      }
  }

  return (
    <Link
      className="card-container"
      to={linkTo}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
    >
      <div className={`card ${actionName || actionIcon ? "--action" : ""}`}>
        {image && (
          <div className="card-image">
            <img
              src={url + `/images/${width}x0/` + image.fullpath}
              alt={image.name}
            />
          </div>
        )}
        {name && (
          <div className="card-details">
            <div className="card-name">{name}</div>
          </div>
        )}
        {description && <div className="card-description">{description}</div>}
        {(actionName || actionIcon) && (
          <div className="card-action">
            <div className="card-action-icon">{actionIcon}</div>
            <div className="card-action-name">{actionName}</div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Card;
