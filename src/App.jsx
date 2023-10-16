import { Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ImagesPage from "./pages/ImagesPage";
import { Provider } from "react-redux";
import store from "./utils/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={"/"} element={<CategoryPage />} />
        <Route path={"/category/:category/:photo?"} element={<ImagesPage />} />
        <Route path={"*"}>404</Route>
      </Routes>
    </Provider>
  );
}

export default App;
