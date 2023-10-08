import { Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ImagesPage from "./pages/ImagesPage";
import { useEffect, useState } from "react";

function App() {
  const [galleries, setGalleries] = useState(null);

  useEffect(() => {
    fetch("http://api.programator.sk/gallery", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setGalleries(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<CategoryPage galleries={galleries} />} />
      <Route path={"/category/:category"} element={<ImagesPage />} />
      <Route path={"*"}>404</Route>
    </Routes>
  );
}

export default App;
