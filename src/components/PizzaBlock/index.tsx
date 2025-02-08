import { useState } from "react";
import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import i18next from "i18next";

import { PizzaSelector, ButtonAdd } from "../index";
import {
  usePizzaActions,
  useAddedCount,
  useTranslatedTypes,
} from "../../hooks";

import { CartItem } from "../../redux/cart/types";
import { PizzaItem, TitleLang } from "../../redux/pizza/types";

export const PizzaBlock = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  prices,
}: PizzaItem) => {
  const { t } = useTranslation("home", { keyPrefix: "pizza_block" });
  const { addPizzaToCart } = usePizzaActions();
  const addedCount = useAddedCount(id);
  const [activeType, setActiveType] = useState<number>(
    types.length === 1 ? types[0] : 0
  );
  const [activeSize, setActiveSize] = useState<number>(0);

  const typeNames = useTranslatedTypes();

  const currentLang = i18next.language;
  const currentPrice = prices[activeSize] || prices[0];

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      imageUrl,
      title,
      type: activeType,
      size: sizes[activeSize],
      price: currentPrice,
      count: 1,
      cartId: `${id}-${sizes[activeSize]}-${activeType}`,
    };

    addPizzaToCart(item);
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt={title[currentLang as keyof TitleLang]}
      />
      <Link to={`/pizza/${id}`} className="pizza-block__link">
        <h4 className="pizza-block__title">
          {title[currentLang as keyof TitleLang]}
        </h4>
      </Link>
      <PizzaSelector
        activeType={activeType}
        setActiveType={setActiveType}
        activeSize={activeSize}
        setActiveSize={setActiveSize}
        types={types}
        sizes={sizes}
        typeNames={typeNames}
      />
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">
          {currentPrice === prices[0] ? (
            <Trans
              i18nKey="home.pizza_block.price"
              components={{ s: <span /> }}
            >
              {t("price", { price: currentPrice })}
            </Trans>
          ) : (
            <span>
              {currentPrice} {currentLang === "ua" ? "₴" : "$"}
            </span>
          )}
        </div>
        <ButtonAdd onClickAdd={onClickAdd}>
          {t("add_btn")} {addedCount > 0 && <i>{addedCount}</i>}
        </ButtonAdd>
      </div>
    </div>
  );
};
