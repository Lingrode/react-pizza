import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "popularity",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `title=${searchValue}` : "";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortType.sortProperty}&order=${order}&${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    // window.scrollTo(0, 0);
  }, [categoryId, sortType, order, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort
          value={sortType}
          onChangeSort={(obj) => setSortType(obj)}
          order={order}
          onChangeOrder={(value) => setOrder(value)}
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
