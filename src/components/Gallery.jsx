import React from "react";
import { Link } from "react-router-dom";

import "../styles/gallery.scss";
import { ArrowLeftIcon } from "./Icon";

function Gallery({ children, title, location, locationBackTo }) {
  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>{title}</h1>
        <nav>
          {locationBackTo ? (
            <Link to={locationBackTo} style={{ textDecoration: "none" }}>
              <ArrowLeftIcon />
              <h2>{location}</h2>
            </Link>
          ) : (
            <h2>{location}</h2>
          )}
        </nav>
      </header>
      <section className="gallery-cardList">{children}</section>
    </div>
  );
}

export default Gallery;
