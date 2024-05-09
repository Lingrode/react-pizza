import React from "react";

import style from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={style.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={style.description}>
        Нажаль, дана сторінка відсутня в нашому інетрент-магазині
      </p>
    </div>
  );
};

export default NotFoundBlock;
