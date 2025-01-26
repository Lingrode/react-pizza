import header from "./en/header.json";
import home from "./en/home.json";

import headerUa from "./ua/header.json";
import homeUa from "./ua/home.json";

import cart from "./en/cart.json";
import cartUa from "./ua/cart.json";

import notFound from "./en/notFound.json";
import notFoundUa from "./ua/notFound.json";

import fullPizza from "./en/fullPizza.json";
import fullPizzaUa from "./ua/fullPizza.json";

const translations = {
  en: {
    header,
    home,
    cart,
    notFound,
    fullPizza,
  },
  ua: {
    header: headerUa,
    home: homeUa,
    cart: cartUa,
    notFound: notFoundUa,
    fullPizza: fullPizzaUa,
  },
};

export default translations;
