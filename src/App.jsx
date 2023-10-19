import { Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ImagesPage from "./pages/ImagesPage";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import { createContext } from "react";

const UrlContext = createContext(null);

function App() {
  return (
    <Provider store={store}>
      <UrlContext.Provider value={"http://api.programator.sk"}>
        <Routes>
          <Route path={"/"} element={<CategoryPage />} />
          <Route
            path={"/category/:category/:photo?"}
            element={<ImagesPage />}
          />
          <Route path={"*"}>404</Route>
        </Routes>
      </UrlContext.Provider>
    </Provider>
  );
}

export default App;

export { UrlContext };
