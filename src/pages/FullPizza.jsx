import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    const getFullPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://663c26aa17145c4d8c354a8e.mockapi.io/items/${id}`
        );

        setPizza(data);
      } catch {
        alert("Error while getting pizza...");
        navigate("/");
      }
    };

    getFullPizza();
  }, [id]);

  if (!pizza) return <h2>Loading...</h2>;

  return (
    <div>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} ₴</h3>
    </div>
  );
};

export default FullPizza;
