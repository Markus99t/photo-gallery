import React, { useState } from "react";
import Gallery from "../components/gallery/Gallery";
import Card from "../components/card/Card";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

function CategoryPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Gallery title="Fotogaléria" location="Kategórie">
      <Card linkTo={"/category/Jedlo"} name={"Test"} />
      <Card linkTo={"/category/"} name={"Test"} />
      <Card
        onClick={() => {
          setShowAddModal(true);
        }}
        actionName={"Pridať kategóriu"}
        actionIcon={<AddCircleOutlineRoundedIcon />}
      />
      {showAddModal}
    </Gallery>
  );
}

export default CategoryPage;
