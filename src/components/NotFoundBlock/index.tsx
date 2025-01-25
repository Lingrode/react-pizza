import { useTranslation } from "react-i18next";
import style from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  const { t } = useTranslation("notFound");

  return (
    <div className={style.wrapper}>
      <h1>
        <span>😕</span>
        <br />
        {t("title")}
      </h1>
      <p className={style.descr}>{t("text")}</p>
    </div>
  );
};
