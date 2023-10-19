import React from "react";

import "../styles/gallery.scss";

function Gallery({ children }) {
  return <section className="gallery-cardList">{children}</section>;
}

export default Gallery;
