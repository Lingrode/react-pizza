import { useTranslation } from "react-i18next";

import { GoBackBtn } from "./GoBackBtn";
import emptyCartImg from "../assets/img/empty-cart.png";

export const CartEmpty = () => {
  const { t } = useTranslation("cart");

  return (
    <>
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            {t("empty_title")} <span>😕</span>
          </h2>
          <p>
            {t("empty_top_text")}
            <br />
            {t("empty_bottom_text")}
          </p>
          <img src={emptyCartImg} alt="Empty cart" />
          <GoBackBtn />
        </div>
      </div>
    </>
  );
};
