import { useState, useEffect } from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import "./scss/app.scss";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://663c26aa17145c4d8c354a8e.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {items.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
