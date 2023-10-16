import React, { useEffect, useRef, useState } from "react";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import ModalAddPhoto from "../components/modal/AddPhoto";
import ModalPhoto from "../components/modal/Photo";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/redux/gallerySlice";

const url = "http://api.programator.sk";

function ImagesPage() {
  const [images, setImages] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [thumbnailWidth, setThumbnailWidth] = useState(null);
  const itemWidthRef = useRef();

  const { category: urlCategory } = useParams();
  const { photo: urlPhotoId } = useParams();

  const category = useSelector(
    (state) => state.galleryReducer.categoryList[encodeURI(urlCategory)],
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function loadCategory() {
    axios
      .get(url + "/gallery/" + urlCategory)
      .then((res) => {
        dispatch(
          setCategory({
            id: res.data.gallery.path,
            category: {
              ...res.data.gallery,
              images: res.data.images,
              image: res.data.images[0],
            },
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (!category) loadCategory();
  }, []);

  useEffect(() => {
    setThumbnailWidth(
      Math.ceil(itemWidthRef.current.clientWidth * window.devicePixelRatio),
    );
  }, []);

  useEffect(() => {
    if (urlPhotoId !== undefined && category?.images[urlPhotoId]) {
      setShowPhotoModal(true);
      setModalImageUrl(
        url + "/images/0x0/" + category.images[urlPhotoId].fullpath,
      );
    }
  }, [urlPhotoId, category]);

  function handleShowPhoto(e, id) {
    navigate("/category/" + urlCategory + "/" + id, { replace: true });
    e.preventDefault();
  }

  return (
    <Gallery title="Fotogaléria" location={urlCategory} locationBackTo="/">
      {category &&
        category.images &&
        category.images.map((image, i) => (
          <Card
            key={i}
            id={i}
            image={image}
            width={thumbnailWidth}
            onClick={handleShowPhoto}
          />
        ))}
      <Card
        onClick={() => {
          setShowAddModal(true);
        }}
        actionName={"Pridať fotky"}
        actionIcon={<AddCircleOutlineRoundedIcon />}
      />
      <div ref={itemWidthRef}></div>
      {showAddModal && (
        <ModalAddPhoto
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdded={() => {
            loadCategory();
          }}
        />
      )}
      {showPhotoModal && (
        <ModalPhoto
          image={modalImageUrl}
          open={showPhotoModal}
          onClose={() => {
            setShowPhotoModal(false);
            navigate("/category/" + urlCategory, { replace: true });
          }}
          onPrevious={() => {
            const id = parseInt(urlPhotoId) - 1;
            if (category.images[id])
              navigate("/category/" + urlCategory + "/" + id, {
                replace: true,
              });
          }}
          onNext={() => {
            const id = parseInt(urlPhotoId) + 1;
            if (category.images[id])
              navigate("/category/" + urlCategory + "/" + id, {
                replace: true,
              });
          }}
          hasNext={() => {
            const id = parseInt(urlPhotoId) + 1;
            return !!category.images[id];
          }}
          hasPrevious={() => {
            const id = parseInt(urlPhotoId) - 1;
            return !!category.images[id];
          }}
        />
      )}
    </Gallery>
  );
}

export default ImagesPage;
