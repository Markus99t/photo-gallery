import React from "react";

import "../../styles/inputs.scss";

function InputButton({ value, onClick }) {
  function _onClick(e) {
    onClick(e);
  }

  return (
    <button className="input-button" type="submit" onClick={_onClick}>
      {value}
    </button>
  );
}

export default InputButton;
