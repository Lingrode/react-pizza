import React from "react";

import emptyCartImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <>
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Кошик порожній <icon>😕</icon>
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
