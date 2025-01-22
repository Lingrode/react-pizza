import { GoBackBtn } from "./GoBackBtn";
import emptyCartImg from "../assets/img/empty-cart.png";

export const CartEmpty = () => {
  return (
    <>
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Cart is empty <span>😕</span>
          </h2>
          <p>
            Chances are you haven&apos;t ordered pizza yet.
            <br />
            To order pizza, go to the main page.
          </p>
          <img src={emptyCartImg} alt="Empty cart" />
          <GoBackBtn />
        </div>
      </div>
    </>
  );
};
