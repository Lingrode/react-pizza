import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import qs from "qs";

import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
  ErrorMessage,
} from "../components";

import { setFilters } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";

import { fetchPizzas } from "../redux/pizza/operations";
import { selectPizzaData } from "../redux/pizza/selectors";
import { Status } from "../redux/pizza/types";

import type { AppDispatch } from "../redux/store";
import { useTranslatedSortItems } from "../hooks";

const Home = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const list = useTranslatedSortItems();

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, order, pageCount, searchValue } =
    useSelector(selectFilter);

  const getPizzas = async () => {
    const search = searchValue ? `search=${searchValue}` : "";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(fetchPizzas({ pageCount, category, sort, order, search }));
  };

  // if parameters was changed and was the first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        order,
        pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, order, pageCount, navigate]);

  // If it was the first render, then we check the URL parameters and save them in Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort =
        list.find((obj) => obj.sortProperty === params.sortProperty) || list[0];

      dispatch(
        setFilters({
          categoryId: 0,
          order: "",
          pageCount: 1,
          searchValue: "",
          sort,
          ...params,
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  // If there was a first render, then we request pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, order, searchValue, pageCount]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} />

        <Sort value={sort} order={order} />
      </div>
      <h2 className="content__title">{t("title")}</h2>
      {status === Status.ERROR ? (
        <ErrorMessage />
      ) : status === Status.LOADING ? (
        <div className="content__items">
          {[...new Array(8)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="content__items">
          {items.map((pizza) => {
            return <PizzaBlock key={pizza.id} {...pizza} />;
          })}
        </div>
      )}

      {status !== Status.ERROR && <Pagination />}
    </div>
  );
};

export default Home;
