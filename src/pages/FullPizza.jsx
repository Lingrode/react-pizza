import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://663c26aa17145c4d8c354a8e.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (err) {
        navigate("/");
        alert("Помилка при спробі отримати піцу!");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Завантаження...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizzaImg" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus qui
        molestias molestiae aspernatur facere mollitia soluta odio provident
        animi dolor!
      </p>
      <h4>{pizza.price} ₴</h4>
    </div>
  );
};

export default FullPizza;
