import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "./Icon";

import "../styles/header.scss";
import { TextField } from "@mui/material";

function Header({ title, location, locationBackTo, searchBar, onInputUpdate }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (onInputUpdate) onInputUpdate(searchValue);
    }, 600);
    return () => {
      clearTimeout(delayDebounce);
    };
  }, [onInputUpdate, searchValue]);

  return (
    <header className="gallery-header">
      <div>
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
      </div>
      {searchBar && (
        <div className="search">
          <TextField
            id="outlined-basic"
            label="Search"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setSearchValue(e.target.value.toLowerCase());
            }}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
