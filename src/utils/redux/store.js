import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../redux/gallerySlice";

export default configureStore({
  reducer: {
    galleryReducer,
  },
});
