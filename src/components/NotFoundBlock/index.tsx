import style from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={style.wrapper}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found...
      </h1>
      <p className={style.descr}>
        Unfortunately, this page is not available in our online store.
      </p>
    </div>
  );
};
