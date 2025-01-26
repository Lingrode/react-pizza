import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  IngredientsList,
  GoBackBtn,
  Loader,
  PizzaSelector,
  ButtonAdd,
  IngredientsLang,
} from "../components";
import { usePizzaActions, useAddedCount, useTranslatedTypes } from "../hooks";
import { CartItem, TitleLang } from "../redux/cart/types";

interface Pizza {
  imageUrl: string;
  title: TitleLang;
  price: number;
  ingredients: IngredientsLang;
  types: number[];
  sizes: number[];
}

const FullPizza = () => {
  const { t } = useTranslation("fullPizza");
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPizzaToCart } = usePizzaActions();
  const [pizza, setPizza] = useState<Pizza>();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const pizzaId = id || "0";
  const addedCount = useAddedCount(pizzaId);
  const typeNames = useTranslatedTypes();
  const currentLang = i18next.language;

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

  const onClickAdd = () => {
    if (!pizza) return;

    const item: CartItem = {
      id: pizzaId,
      imageUrl: pizza.imageUrl,
      title: pizza.title,
      type: activeType,
      size: pizza.sizes[activeSize],
      price: pizza.price,
      count: 1,
      cartId: `${id}-${pizza.sizes[activeSize]}-${typeNames[activeType]}`,
    };

    addPizzaToCart(item);
  };

  if (!pizza) return <Loader />;

  return (
    <div className="full-pizza">
      <div className="container">
        <GoBackBtn />
        <div className="full-pizza__inner">
          <img
            src={pizza.imageUrl}
            alt={pizza.title[currentLang as keyof TitleLang]}
          />
          <div className="full-pizza__wrapper">
            <h2>{pizza.title[currentLang as keyof TitleLang]}</h2>
            <IngredientsList
              list={pizza.ingredients[currentLang as keyof IngredientsLang]}
            />
            <PizzaSelector
              activeType={activeType}
              setActiveType={setActiveType}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
              types={pizza.types}
              sizes={pizza.sizes}
              typeNames={typeNames}
            />
            <ButtonAdd onClickAdd={onClickAdd}>
              {t("add_btn", { price: pizza.price })}
              {addedCount > 0 && <i>{addedCount}</i>}
            </ButtonAdd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
