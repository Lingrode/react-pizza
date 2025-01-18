import style from "./ErrorMessage.module.scss";

const index = () => {
  return (
    <>
      <div className={style.containerError}>
        <div className={style.error}>
          <h2>
            An error occurred <span>😕</span>
          </h2>
          <p>
            Sorry, we couldn&apos;t get any pizzas.
            <br />
            Please try again later.
          </p>
        </div>
      </div>
    </>
  );
};

export default index;
