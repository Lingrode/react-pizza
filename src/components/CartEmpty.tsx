import React from "react";
import { Link } from "react-router-dom";

import emptyCartImg from "../assets/img/empty-cart.png";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Кошик порожній <span>😕</span>
          </h2>
          <p>
            Ймовірно, ви ще не замовляли піцу.
            <br />
            Для того, щоб замовити піцу, перейди на головну сторінку.{" "}
          </p>
          <img src={emptyCartImg} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;
