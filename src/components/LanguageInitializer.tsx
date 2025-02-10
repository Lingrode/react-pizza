import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectLang } from "../redux/lang/selectors";

export const LanguageInitializer = () => {
  const { i18n } = useTranslation();
  const currLang = useSelector(selectLang);

  useEffect(() => {
    if (currLang) i18n.changeLanguage(currLang);
  }, [currLang, i18n]);

  return null;
};
