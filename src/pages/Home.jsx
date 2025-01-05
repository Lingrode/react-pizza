import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const { categoryId, sort, order } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `title=${searchValue}` : "";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/items?limit=8&page=${currentPage}&${category}&sortBy=${sort.sortProperty}&order=${order}&${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, order, searchValue, currentPage]);

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
        {isLoading ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />)
        ) : Array.isArray(items) && items.length > 0 ? (
          items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
        ) : (
          <h2>No pizzas found</h2>
        )}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
