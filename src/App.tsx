import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useTranslation } from "react-i18next";

import NotFound from "./pages/NotFound";
import { Loader, Header } from "./components";

import { useAppDispatch, useTranslatedSortItems } from "./hooks";
import { changeSort } from "./redux/filter/slice";

import "./scss/app.scss";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const list = useTranslatedSortItems();

  useEffect(() => {
    const defaultSort = list.find((item) => item.sortProperty === "rating");

    if (defaultSort) {
      dispatch(changeSort(defaultSort));
    }
  }, [i18n.language, list]);

  return (
    <div className="wrapper">
      <Suspense fallback={<Loader />}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
