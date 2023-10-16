import React, { useEffect, useState, useRef } from "react";

import "../../styles/inputs.scss";

import PhotoIcon from "@mui/icons-material/InsertPhotoOutlined";

function InputDragNDrop({ onFiles }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

  useEffect(() => {
    onFiles(images);
  }, [images, onFiles]);

  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    setFiles(files);
  }

  function deleteImage(id) {
    setImages((prevImages) => prevImages.filter((image, i) => id !== i));
  }

  function onFileSelect(e) {
    const files = Object.values(e.target.files);
    setFiles(files);
  }

  function setFiles(files) {
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [...prevImages, files[i]]);
      }
    }
  }

  return (
    <div
      className={`input-dragndrop ${isDragging ? "--isDragging" : ""}`}
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => onDragOver(e)}
      onDragLeave={(e) => onDragLeave(e)}
    >
      {images.length === 0 ? (
        <div className="input-dragndrop-asker">
          <PhotoIcon />
          <div className="input-label">
            Sem presunte fotky
            <br />
            <span>alebo</span>
            <br />
            <button className="select" onClick={selectFiles}>
              Vyberte súbory
            </button>
          </div>
          <input
            name="file"
            type="file"
            accept="image/*"
            className="input-file"
            multiple
            onChange={onFileSelect}
            ref={fileInputRef}
          ></input>
        </div>
      ) : (
        <div className="input-dragndrop-preview" tabIndex="-1">
          {images.map((image, i) => (
            <div className="input-dragndrop-preview-photo" key={i}>
              <img src={URL.createObjectURL(image)} alt={image.name} />
              <span className="delete" onClick={() => deleteImage(i)}>
                &times;
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputDragNDrop;
