import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../Contexts";

import {
  changeCategory,
  changeSort,
  changeOrder,
} from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, order, pageCount } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `title=${searchValue}` : "";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    axios
      .get(
        `https://663c26aa17145c4d8c354a8e.mockapi.io/items?limit=8&page=${pageCount}&${category}&sortBy=${sort.sortProperty}&order=${order}&${search}`
      )
      .then((res) => {
        setItems(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, order, searchValue, pageCount]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(changeCategory(id))}
        />
        <Sort
          value={sort}
          onChangeSort={(obj) => dispatch(changeSort(obj))}
          order={order}
          onChangeOrder={(value) => dispatch(changeOrder(value))}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
