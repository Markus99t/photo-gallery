import React, { useState } from "react";
import Gallery from "../components/gallery/Gallery";
import Card from "../components/card/Card";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

function ImagesPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Gallery title="Fotogaléria" location="Jedlo" locationBackTo="/">
      <Card />
      {/*<Card key={i} id={i} image={}/>*/}
      <Card
        onClick={() => {
          setShowAddModal(true);
        }}
        actionName={"Pridať fotky"}
        actionIcon={<AddCircleOutlineRoundedIcon />}
      />

      {showAddModal}
    </Gallery>
  );
}

export default ImagesPage;
