import React, { useContext, useEffect, useRef, useState } from "react";
import Gallery from "../components/Gallery";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import ModalAddPhoto from "../components/modal/AddPhoto";
import ModalPhoto from "../components/modal/Photo";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/redux/gallerySlice";
import { UrlContext } from "../App";
import Header from "../components/Header";

function ImagesPage() {
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

  const url = useContext(UrlContext);

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
  });

  useEffect(() => {
    setThumbnailWidth(
      Math.ceil(itemWidthRef.current.clientWidth * window.devicePixelRatio),
    );
  }, []);

  useEffect(() => {
    function loadImage(image) {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => {
          console.log(err);
          reject(err);
        };
      });
    }

    Promise.all(
      category?.images.map((image) =>
        loadImage(url + "/images/0x0/" + image.fullpath),
      ),
    )
      .then()
      .catch((err) => {
        console.error("Failed to load images.\n", err);
      });
  }, [category?.images, url]);

  useEffect(() => {
    if (urlPhotoId !== undefined && category?.images[urlPhotoId]) {
      setShowPhotoModal(true);
      setModalImageUrl(
        url + "/images/0x0/" + category.images[urlPhotoId].fullpath,
      );
    }
  }, [urlPhotoId, category, url]);

  function handleShowPhoto(e, id) {
    navigate("/category/" + urlCategory + "/" + id, { replace: true });
    e.preventDefault();
  }

  function handleOnPrevious() {
    const id = parseInt(urlPhotoId) - 1;
    if (category.images[id])
      navigate("/category/" + urlCategory + "/" + id, {
        replace: true,
      });
  }

  function handleOnNext() {
    const id = parseInt(urlPhotoId) + 1;
    if (category.images[id])
      navigate("/category/" + urlCategory + "/" + id, {
        replace: true,
      });
  }

  return (
    <div className="gallery-container">
      <Header title="Fotogaléria" location={urlCategory} locationBackTo="/" />
      <Gallery>
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
            onPrevious={handleOnPrevious}
            onNext={handleOnNext}
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
    </div>
  );
}

export default ImagesPage;
