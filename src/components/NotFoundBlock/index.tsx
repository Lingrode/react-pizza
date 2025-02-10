import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import i18next from "i18next";

import { selectLang } from "../../redux/lang/selectors";
import style from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  const { t } = useTranslation("notFound");
  const lang = useSelector(selectLang);

  const currLang = i18next.language;

  useEffect(() => {
    if (currLang !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className={style.wrapper} key={currLang}>
      <h1>
        <span>😕</span>
        <br />
        {t("title")}
      </h1>
      <p className={style.descr}>{t("text")}</p>
    </div>
  );
};
