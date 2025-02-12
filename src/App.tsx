import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import NotFound from "./pages/NotFound";
import { Loader, Header } from "./components";

import { useAppDispatch, useTranslatedSortItems } from "./hooks";
import { selectLastUpdated } from "./redux/rate/selectors";
import { getRate } from "./redux/rate/operations";
import { changeSort } from "./redux/filter/slice";

import "./scss/app.scss";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const list = useTranslatedSortItems();
  const lastUpdated = useSelector(selectLastUpdated);

  useEffect(() => {
    const defaultSort = list.find((item) => item.sortProperty === "rating");

    if (defaultSort) {
      dispatch(changeSort(defaultSort));
    }
  }, [dispatch, i18n.language, list]);

  useEffect(() => {
    if (!lastUpdated || Date.now() - lastUpdated > 24 * 60 * 60 * 1000) {
      dispatch(getRate());
    }
  }, [dispatch, lastUpdated]);

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
