import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";

import {
  changeCategory,
  changeSort,
  changeOrder,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";

import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

import type { AppDispatch } from "../redux/store";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, order, pageCount, searchValue } =
    useSelector(selectFilter);

  const getPizzas = async () => {
    const search = searchValue ? `title=${searchValue}` : "";
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
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, [dispatch]);

  // If there was a first render, then we request pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, order, searchValue, pageCount]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id: number) => dispatch(changeCategory(id))}
        />
        <Sort
          value={sort}
          onChangeSort={(obj: object) => dispatch(changeSort(obj))}
          order={order}
          onChangeOrder={(value: string) => dispatch(changeOrder(value))}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {status === "error" ? (
          <ErrorMessage />
        ) : status === "loading" ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />)
        ) : (
          items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
