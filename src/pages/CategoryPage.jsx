import React, { useContext, useEffect, useRef, useState } from "react";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import ModalAddCategory from "../components/modal/AddCategory";
import axios from "axios";
import { AddIcon } from "../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategory } from "../utils/redux/gallerySlice";
import { UrlContext } from "../App";

function CategoryPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [thumbnailWidth, setThumbnailWidth] = useState(null);
  const itemWidthRef = useRef();

  const dispatch = useDispatch();

  const categoryIds = useSelector((state) => state.galleryReducer.categoryIds);
  const categoryList = useSelector(
    (state) => state.galleryReducer.categoryList,
  );
  const categoryListComplete = useSelector(
    (state) => state.galleryReducer.categoryListComplete,
  );

  const url = useContext(UrlContext);

  function loadCategories() {
    axios
      .get(url + "/gallery")
      .then((res) => {
        dispatch(setCategories(res.data.galleries));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function loadCategory(id) {
    axios
      .get(url + "/gallery/" + categoryList[id].path)
      .then((res) => {
        dispatch(
          setCategory({
            id,
            category: res.data,
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (!categoryListComplete) {
      loadCategories();
    } else {
      categoryIds.forEach((id) => loadCategory(id));
    }
  }, [categoryListComplete]);

  useEffect(() => {
    setThumbnailWidth(
      Math.ceil(itemWidthRef.current.clientWidth * window.devicePixelRatio),
    );
  }, [itemWidthRef]);

  function getCategoryLength(length) {
    if (length === 1) return length + " fotka";
    else if (length > 1 && length < 5) {
      return length + " fotky";
    } else {
      return length + " fotiek";
    }
  }

  return (
    <Gallery title="Fotogaléria" location="Kategórie">
      {categoryIds.map((id, i) => {
        return (
          <Card
            key={i}
            linkTo={"/category/" + categoryList[id].path}
            name={categoryList[id].name}
            description={
              categoryList[id].images !== undefined
                ? getCategoryLength(categoryList[id].images.length)
                : null
            }
            image={categoryList[id].image}
            width={thumbnailWidth}
          />
        );
      })}
      <Card
        onClick={() => {
          setShowAddModal(true);
        }}
        actionName={"Pridať kategóriu"}
        actionIcon={<AddIcon />}
      />
      <div ref={itemWidthRef}></div>
      {showAddModal && (
        <ModalAddCategory
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdded={() => {
            loadCategories();
          }}
        />
      )}
    </Gallery>
  );
}

export default CategoryPage;
