import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

interface Pizza {
  imageUrl: string;
  title: string;
  price: number;
}

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<Pizza>();

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
    <div className="full-pizza">
      <div className="container">
        <div className="full-pizza__inner">
          <img src={pizza.imageUrl} alt={pizza.title} />
          <div className="full-pizza__wrapper">
            <h2>{pizza.title}</h2>
            <h3>{pizza.price} ₴</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
